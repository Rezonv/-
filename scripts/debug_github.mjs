import https from 'https';

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

const url = 'https://api.github.com/repos/ScobbleQ/HoYo-Assets/contents/genshin/splash';

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

                // Check specific ones
                console.log('Has Shougun.png?', names.includes('Shougun.png'));
                console.log('Has Yae.png?', names.includes('Yae.png'));
                console.log('Has Nahida.png?', names.includes('Nahida.png'));
            } else {
                console.log('Not an array:', json);
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Raw data:', data);
        }
    });
}).on('error', console.error);
