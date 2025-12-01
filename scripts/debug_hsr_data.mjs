import https from 'https';

const mar7Url = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/en/characters.json';
const scobbleUrl = 'https://raw.githubusercontent.com/ScobbleQ/HoYo-Assets/main/hsr_characters.json';

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                resolve(null); // Not found
                return;
            }
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
    console.log('Checking Mar-7th...');
    const mar7Data = await fetch(mar7Url);
    if (mar7Data) {
        console.log(`Found ${Object.keys(mar7Data).length} characters in Mar-7th.`);
        const names = Object.values(mar7Data).map(c => `${c.name} (${c.id})`);
        console.log('Sample names:', names.slice(0, 10).join(', '));

        // Check for our missing ones
        const missing = ['Haiseyin', 'Sapphire', 'Kelyudela', 'Xilian', 'Fengjin', 'Aglaea', 'Castorice', 'Tribbie'];
        missing.forEach(m => {
            const match = names.find(n => n.toLowerCase().includes(m.toLowerCase()));
            console.log(`Mar-7th has ${m}? ${match || 'No'}`);
        });
    } else {
        console.log('Failed to fetch Mar-7th data.');
    }

    console.log('\nChecking ScobbleQ mapping...');
    const scobbleData = await fetch(scobbleUrl);
    if (scobbleData) {
        console.log('Found ScobbleQ mapping!');
        console.log(scobbleData);
    } else {
        console.log('ScobbleQ mapping not found (404).');
    }
}

main();
