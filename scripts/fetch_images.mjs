import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data', 'characters');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public', 'characters');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Helper to download image
async function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(destPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        const file = fs.createWriteStream(destPath);
        https.get(url, options, (response) => {
            // Handle Redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                if (response.headers.location) {
                    file.close();
                    fs.unlink(destPath, () => { });
                    downloadImage(response.headers.location, destPath)
                        .then(resolve)
                        .catch(reject);
                    return;
                }
            }

            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(destPath, () => { }); // Delete partial file
                reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}

// Helper to read all character files
async function getAllCharacters() {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.ts'));
    let allChars = [];

    for (const file of files) {
        const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
        // Simple regex parsing to avoid compiling TS
        // Matches objects in the array: { id: '...', name: '...', ... }
        const matches = content.matchAll(/id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*game:\s*'([^']+)'/g);
        for (const match of matches) {
            allChars.push({
                id: match[1],
                name: match[2],
                game: match[3]
            });
        }
    }
    return allChars;
}

async function fetchGenshinData() {
    console.log('Fetching Genshin Data...');
    const indexUrl = 'https://raw.githubusercontent.com/ScobbleQ/HoYo-Assets/main/gi_characters.json';

    return new Promise((resolve, reject) => {
        https.get(indexUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.error('Failed to parse Genshin JSON.');
                    resolve({}); // Fallback to empty
                }
            });
        }).on('error', reject);
    });
}

async function fetchHSRData() {
    console.log('Fetching HSR Data (EN & CN)...');
    const enUrl = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/en/characters.json';
    const cnUrl = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/cn/characters.json';

    const fetchJson = (url) => new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    console.error('Failed to parse JSON from ' + url);
                    resolve({});
                }
            });
        }).on('error', reject);
    });

    const [enData, cnData] = await Promise.all([fetchJson(enUrl), fetchJson(cnUrl)]);
    return { en: enData, cn: cnData };
}

function normalize(str) {
    return str.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, ''); // Keep Chinese chars
}

async function main() {
    console.log('Starting image fetch...');
    const characters = await getAllCharacters();
    console.log(`Found ${characters.length} characters in local data.`);

    const { en: hsrDataEn, cn: hsrDataCn } = await fetchHSRData();
    const genshinData = await fetchGenshinData();

    // Create HSR lookup (EN and CN)
    const hsrLookup = {};

    // EN Data
    for (const id in hsrDataEn) {
        const char = hsrDataEn[id];
        hsrLookup[normalize(char.name)] = char;
        hsrLookup[id] = char;
    }

    // CN Data (Overwrite/Add) - Key by Chinese name
    for (const id in hsrDataCn) {
        const char = hsrDataCn[id];
        hsrLookup[normalize(char.name)] = char; // This allows looking up by '海瑟音'
        if (!hsrLookup[id]) hsrLookup[id] = char;
    }

    // Create Genshin Name -> ID lookup
    const genshinNameLookup = {};
    for (const id in genshinData) {
        const name = genshinData[id];
        genshinNameLookup[name] = id;
        genshinNameLookup[name.toLowerCase()] = id; // Case insensitive fallback
    }

    for (const char of characters) {
        const gameDir = char.game === 'Genshin Impact' ? 'genshin' : 'hsr';
        const charDir = path.join(PUBLIC_DIR, gameDir, char.id);

        console.log(`Processing ${char.name} (${char.id})...`);

        if (char.game === 'Honkai: Star Rail') {
            // Try to match by ID first (normalized)
            let match = hsrLookup[normalize(char.id)];

            // Try removing _hsr suffix
            if (!match) {
                const cleanId = char.id.replace('_hsr', '');
                match = hsrLookup[normalize(cleanId)];
            }

            // Try matching by Name (Chinese or English)
            if (!match) {
                match = hsrLookup[normalize(char.name)];
            }

            // Special manual mappings
            if (!match) {
                if (char.id === 'march7th') match = hsrLookup[normalize('March 7th')];
                if (char.id === 'danheng_il') match = hsrLookup[normalize('Dan Heng • Imbibitor Lunae')];
                if (char.id === 'topaz') match = hsrLookup[normalize('Topaz & Numby')];
                if (char.id === 'stelle') match = hsrDataEn['8002']; // Destruction Stelle
                if (char.id === 'caelus') match = hsrDataEn['8001']; // Destruction Caelus
                if (char.id === 'blackswan') match = hsrLookup[normalize('Black Swan')];
                if (char.id === 'sparkle') match = hsrLookup[normalize('Sparkle')];
                if (char.id === 'acheron') match = hsrLookup[normalize('Acheron')];
                if (char.id === 'robin') match = hsrLookup[normalize('Robin')];
                if (char.id === 'firefly') match = hsrLookup[normalize('Firefly')];
                if (char.id === 'feixiao') match = hsrLookup[normalize('Feixiao')];
                if (char.id === 'lingsha') match = hsrLookup[normalize('Lingsha')];
                if (char.id === 'jingliu') match = hsrLookup[normalize('Jingliu')];
                if (char.id === 'tingyun') match = hsrLookup[normalize('Tingyun')];
                if (char.id === 'huohuo') match = hsrLookup[normalize('Huohuo')];
                if (char.id === 'yunli') match = hsrLookup[normalize('Yunli')];
                if (char.id === 'qingque') match = hsrLookup[normalize('Qingque')];
                if (char.id === 'bailu') match = hsrLookup[normalize('Bailu')];
                if (char.id === 'xueyi') match = hsrLookup[normalize('Xueyi')];
                if (char.id === 'hanya') match = hsrLookup[normalize('Hanya')];
                if (char.id === 'sushang') match = hsrLookup[normalize('Sushang')];
                if (char.id === 'yukong') match = hsrLookup[normalize('Yukong')];
                if (char.id === 'guinaifen') match = hsrLookup[normalize('Guinaifen')];
            }

            if (match) {
                // Icon
                const iconUrl = `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${match.icon}`;
                await downloadImage(iconUrl, path.join(charDir, 'avatar.png'))
                    .then(() => console.log(`  - Downloaded avatar for ${char.name}`))
                    .catch(e => console.error(`  ! Failed avatar for ${char.name}: ${e.message}`));

                // Portrait
                const portraitUrl = `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${match.portrait}`;
                await downloadImage(portraitUrl, path.join(charDir, 'portrait.png'))
                    .then(() => console.log(`  - Downloaded portrait for ${char.name}`))
                    .catch(e => console.error(`  ! Failed portrait for ${char.name}: ${e.message}`));

            } else {
                console.warn(`  ! Could not find HSR data for ${char.name} (ID: ${char.id})`);
            }
        } else if (char.game === 'Genshin Impact') {
            // Genshin Logic
            let apiName = char.id.charAt(0).toUpperCase() + char.id.slice(1);

            // Comprehensive Mapping for ScobbleQ/HoYo-Assets
            const genshinMap = {
                // Inazuma
                'raiden': 'Shougun',
                'yaemiko': 'Yae',
                'ayaka': 'Ayaka',
                'ayato': 'Ayato',
                'kokomi': 'Kokomi',
                'kujousara': 'Sara',
                'kukishinobu': 'Shinobu',
                'itto': 'Itto',
                'heizou': 'Heizo', // Repo uses Heizo
                'kazuha': 'Kazuha',
                'yoimiya': 'Yoimiya',
                'thoma': 'Tohma',
                'kirara': 'Momoka', // Repo uses Momoka
                'chiori': 'Chiori',
                'sayu': 'Sayu',
                'gorou': 'Gorou',

                // Liyue
                'hutao': 'Hutao',
                'yunjin': 'Yunjin',
                'keqing': 'Keqing',
                'yelan': 'Yelan',
                'ganyu': 'Ganyu',
                'beidou': 'Beidou',
                'ningguang': 'Ningguang',
                'shenhe': 'Shenhe',
                'xianyun': 'Liuyun',
                'yanfei': 'Feiyan',
                'xiangling': 'Xiangling',
                'xinyan': 'Xinyan',
                'qiqi': 'Qiqi',
                'yaoyao': 'Yaoyao',
                'baizhu': 'Baizhuer',
                'gaming': 'Gaming',
                'zhongli': 'Zhongli',
                'xiao': 'Xiao',
                'chongyun': 'Chongyun',
                'xingqiu': 'Xingqiu',

                // Mondstadt
                'jean': 'Qin',
                'eula': 'Eula',
                'klee': 'Klee',
                'mona': 'Mona',
                'lisa': 'Lisa',
                'amber': 'Ambor',
                'kaeya': 'Kaeya',
                'barbara': 'Barbara',
                'razor': 'Razor',
                'venti': 'Venti',
                'bennett': 'Bennett',
                'noelle': 'Noel',
                'fischl': 'Fischl',
                'sucrose': 'Sucrose',
                'diona': 'Diona',
                'albedo': 'Albedo',
                'rosaria': 'Rosaria',
                'mika': 'Mika',

                // Sumeru
                'nahida': 'Nahida',
                'nilou': 'Nilou',
                'cyno': 'Cyno',
                'alhaitham': 'Alhatham',
                'tighnari': 'Tighnari',
                'wanderer': 'Wanderer',
                'dehya': 'Dehya',
                'layla': 'Layla',
                'faruzan': 'Faruzan',
                'collei': 'Collei',
                'dori': 'Dori',
                'candace': 'Candace',
                'kaveh': 'Kaveh',

                // Fontaine
                'furina': 'Furina',
                'neuvillette': 'Neuvillette',
                'navia': 'Navia',
                'wriothesley': 'Wriothesley',
                'clorinde': 'Clorinde',
                'sigewinne': 'Sigewinne',
                'arlecchino': 'Arlecchino',
                'lynette': 'Linette', // Repo uses Linette
                'lyney': 'Liney', // Repo uses Liney
                'freminet': 'Freminet',
                'charlotte': 'Charlotte',
                'chevreuse': 'Chevreuse',
                'emilie': 'Emilie',
                'sethos': 'Sethos',

                // Natlan
                'mualani': 'Mualani',
                'kinich': 'Kinich',
                'kachina': 'Kachina',
                'xilonen': 'Xilonen',
                'chasca': 'Chasca',
                'ororon': 'Olorun', // Repo uses Olorun
                'citlali': 'Citlali',
                'mavuika': 'Mavuika',

                // Others
                'aloy': 'Aloy',
                'lumine': 'PlayerGirl',
                'aether': 'PlayerBoy',
            };

            // Handle Inazuma/Liyue names (Last name usually)
            if (genshinMap[char.id]) {
                apiName = genshinMap[char.id];
            } else if (char.id.includes('_')) {
                // Try last part for names like 'Kujou Sara' -> 'Sara'
                const parts = char.id.split('_');
                apiName = parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
            }

            // Get Game ID from Repo Data
            const gameId = genshinNameLookup[apiName] || genshinNameLookup[apiName.toLowerCase()];

            // ScobbleQ/HoYo-Assets Repo URLs (Using IDs)
            if (gameId) {
                // Icon
                const avatarUrl = `https://raw.githubusercontent.com/ScobbleQ/HoYo-Assets/main/genshin/icon/${gameId}.png`;
                await downloadImage(avatarUrl, path.join(charDir, 'avatar.png'))
                    .then(() => console.log(`  - Downloaded avatar for ${char.name} (${apiName} -> ${gameId})`))
                    .catch(async (e) => {
                        // Fallback to official if repo fails (unlikely but good safety)
                        console.warn(`  ! Repo avatar failed for ${char.name} (${gameId}), trying official...`);
                        const officialUrl = `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_${apiName}.png`;
                        try {
                            await downloadImage(officialUrl, path.join(charDir, 'avatar.png'));
                            console.log(`  - Downloaded avatar (Official) for ${char.name} (${apiName})`);
                        } catch (e2) {
                            console.error(`  ! Failed avatar for ${char.name} (${apiName})`);
                        }
                    });

                // Portrait (Splash)
                const portraitUrl = `https://raw.githubusercontent.com/ScobbleQ/HoYo-Assets/main/genshin/splash/${gameId}.png`;
                await downloadImage(portraitUrl, path.join(charDir, 'portrait.png'))
                    .then(() => console.log(`  - Downloaded portrait for ${char.name} (${apiName} -> ${gameId})`))
                    .catch(async (e) => {
                        console.warn(`  ! Repo portrait failed for ${char.name} (${gameId}), trying official...`);

                        // Fallback 1: Official Gacha Splash
                        const officialUrl = `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/UI_Gacha_AvatarImg_${apiName}.png`;
                        try {
                            await downloadImage(officialUrl, path.join(charDir, 'portrait.png'));
                            console.log(`  - Downloaded portrait (Official Gacha) for ${char.name} (${apiName})`);
                        } catch (e2) {
                            // Fallback 2: Official Card
                            const cardUrl = `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/UI_AvatarIcon_${apiName}_Card.png`;
                            try {
                                await downloadImage(cardUrl, path.join(charDir, 'portrait.png'));
                                console.log(`  - Downloaded portrait (Official Card) for ${char.name} (${apiName})`);
                            } catch (e3) {
                                console.error(`  ! Failed portrait for ${char.name} (${apiName}): ${e.message}`);
                            }
                        }
                    });
            } else {
                console.warn(`  ! Could not find Game ID for ${char.name} (${apiName}) in repo data.`);
                // Fallback to official directly if no ID found
                const officialUrl = `https://upload-os-bbs.mihoyo.com/game_record/genshin/character_image/UI_Gacha_AvatarImg_${apiName}.png`;
                try {
                    await downloadImage(officialUrl, path.join(charDir, 'portrait.png'));
                    console.log(`  - Downloaded portrait (Official Gacha) for ${char.name} (${apiName})`);
                } catch (e2) {
                    console.error(`  ! Failed portrait for ${char.name} (${apiName}) - No ID and Official failed.`);
                }
            }
        }
    }
    console.log('Done!');
}

main().catch(console.error);
