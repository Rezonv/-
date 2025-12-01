import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data', 'characters');

async function main() {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.ts'));

    for (const file of files) {
        const filePath = path.join(DATA_DIR, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Regex to find character objects and extract ID and Game
        // We can't easily parse the whole file as JSON/JS because it's TS export
        // But we can iterate line by line or use regex replace with callback

        // Strategy: Replace `avatarUrl: '...'` with new content
        // We need to know the ID and Game for the *current* block.
        // We can assume standard formatting:
        // id: '...',
        // ...
        // game: '...',
        // ...
        // avatarUrl: '...',

        // Let's split by `id:` to find blocks? No, that's risky.
        // Let's match the whole block? No.

        // Better: Use a regex that captures ID and Game, then we need to find the avatarUrl *after* it.
        // But the order might vary.

        // Alternative: Read the file, find all `id: '...'` and `game: '...'` and `avatarUrl: '...'`.
        // Since the file is a list of objects, we can assume they are in order.

        // Let's try to parse the file content as a string and replace carefully.

        let newContent = content.replace(/\{\s*id:\s*'([^']+)',[\s\S]*?game:\s*'([^']+)',[\s\S]*?avatarUrl:\s*'([^']+)'/g, (match, id, game, oldUrl) => {
            const gameDir = game === 'Genshin Impact' ? 'genshin' : 'hsr';
            // Check if we already updated it (to avoid double update if run twice)
            if (oldUrl.includes('/characters/')) return match;

            const newAvatarUrl = `/characters/${gameDir}/${id}/avatar.png`;
            const newPortraitUrl = `/characters/${gameDir}/${id}/portrait.png`;

            // Replace the avatarUrl line in the match
            return match.replace(`avatarUrl: '${oldUrl}'`, `avatarUrl: '${newAvatarUrl}',\n    portraitUrl: '${newPortraitUrl}'`);
        });

        // Also handle case where game comes after avatarUrl? (Unlikely based on file structure)
        // Or if fields are in different order.

        // Let's try a more robust approach:
        // 1. Find all `id: '...'` positions.
        // 2. For each ID, find the corresponding `game:` and `avatarUrl:` in the vicinity.

        // Actually, the previous regex `\{\s*id...` relies on `id` being first.
        // Looking at `genshin_natlan.ts`:
        // {
        //   id: 'mualani',
        //   name: '...',
        //   game: '...',
        //   ...
        //   avatarUrl: '...',
        // }
        // The order seems consistent.

        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`No changes for ${file}`);
        }
    }
}

main().catch(console.error);
