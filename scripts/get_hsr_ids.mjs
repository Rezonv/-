import https from 'https';

const mar7CnUrl = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_new/cn/characters.json';

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
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
    const mar7Data = await fetchJson(mar7CnUrl);
    if (mar7Data) {
        const targets = ['海瑟音', '刻律德菈'];
        for (const id in mar7Data) {
            const char = mar7Data[id];
            if (targets.includes(char.name)) {
                console.log(`Found ${char.name}: ID ${id}, Icon: ${char.icon}`);
            }
        }
    }
}

main();
