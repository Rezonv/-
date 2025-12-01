
import { NarrativeEvent } from '../types';
import { COMMON_NARRATIVES } from './narratives_common';
import { CHAR_NARRATIVES } from './narratives_chars';

// Merge all narrative sources
export const NARRATIVES: NarrativeEvent[] = [
  ...COMMON_NARRATIVES,
  ...CHAR_NARRATIVES
];
