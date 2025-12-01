
import { Character } from '../types';
import { CHARS_ORIGINAL } from './characters/original';
import { CHARS_HSR_AMPHOREUS } from './characters/hsr_amphoreus';
import { CHARS_HSR_XIANZHOU } from './characters/hsr_xianzhou';
import { CHARS_HSR_PENACONY } from './characters/hsr_penacony';
import { CHARS_HSR_JARILO } from './characters/hsr_jarilo';
import { CHARS_HSR_HERTA } from './characters/hsr_herta';
import { CHARS_HSR_ASTRAL } from './characters/hsr_astral';
import { CHARS_HSR_STELLARON } from './characters/hsr_stellaron';
import { CHARS_HSR_IPC } from './characters/hsr_ipc';
import { CHARS_GENSHIN_INAZUMA } from './characters/genshin_inazuma';
import { CHARS_GENSHIN_LIYUE } from './characters/genshin_liyue';
import { CHARS_GENSHIN_FONTAINE } from './characters/genshin_fontaine';
import { CHARS_GENSHIN_NATLAN } from './characters/genshin_natlan';
import { CHARS_GENSHIN_MONDSTADT } from './characters/genshin_mondstadt';
import { CHARS_GENSHIN_SUMERU } from './characters/genshin_sumeru';

export const CHARACTERS: Character[] = [
  ...CHARS_ORIGINAL,
  // --- HSR ---
  ...CHARS_HSR_AMPHOREUS,
  ...CHARS_HSR_XIANZHOU,
  ...CHARS_HSR_PENACONY,
  ...CHARS_HSR_STELLARON,
  ...CHARS_HSR_ASTRAL,
  ...CHARS_HSR_JARILO,
  ...CHARS_HSR_HERTA,
  ...CHARS_HSR_IPC,
  // --- GENSHIN ---
  ...CHARS_GENSHIN_INAZUMA,
  ...CHARS_GENSHIN_FONTAINE,
  ...CHARS_GENSHIN_NATLAN,
  ...CHARS_GENSHIN_LIYUE,
  ...CHARS_GENSHIN_MONDSTADT,
  ...CHARS_GENSHIN_SUMERU
];
