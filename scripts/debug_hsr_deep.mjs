import https from 'https';

const mar7CnUrl = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/cn/characters.json';
const scobbleSplashUrl = 'https://api.github.com/repos/ScobbleQ/HoYo-Assets/contents/starrail/splash';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function main() {
    console.log('Checking Mar-7th CN...');
    const mar7Data = await fetchJson(mar7CnUrl);
    if (mar7Data) {
        console.log(`Found ${Object.keys(mar7Data).length} characters in Mar-7th CN.`);
        const names = Object.values(mar7Data).map(c => c.name);

        // Check for Chinese names directly
        const missing = ['海瑟音', '賽飛兒', '刻律德菈', '昔漣', '風堇'];
        missing.forEach(m => {
            console.log(`Mar-7th CN has ${m}? ${names.includes(m) ? 'YES' : 'No'}`);
        });
    }

    console.log('\nChecking ScobbleQ Splash...');
    const splashData = await fetchJson(scobbleSplashUrl);
    if (Array.isArray(splashData)) {
        console.log(`Found ${splashData.length} splash images.`);
        const files = splashData.map(f => f.name);
        // Check for IDs or Names
        console.log('Sample files:', files.slice(0, 10).join(', '));
    }
}

main();
