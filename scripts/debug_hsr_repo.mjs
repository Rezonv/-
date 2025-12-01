import https from 'https';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

// Guessing the path based on genshin structure
const url = 'https://api.github.com/repos/ScobbleQ/HoYo-Assets/contents/starrail/icon';

https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (Array.isArray(json)) {
                console.log('Found ' + json.length + ' files.');
                const names = json.map(f => f.name);
                console.log('Files:', names.join(', '));

                // Check for the missing characters (using likely romanizations)
                const missing = ['Haiseyin', 'Sapphire', 'Kelyudela', 'Xilian', 'Fengjin', 'Aglaea', 'Castorice', 'Tribbie'];
                missing.forEach(name => {
                    const match = names.find(n => n.toLowerCase().includes(name.toLowerCase()));
                    console.log(`Has ${name}? ${match || 'No'}`);
                });
            } else {
                console.log('Not an array or path invalid:', json);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
        }
    });
}).on('error', console.error);
