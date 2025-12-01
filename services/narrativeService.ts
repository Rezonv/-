
import { Character, NarrativeTrigger } from '../types';
import { NARRATIVES } from '../data/narratives';
import { getCharData } from '../data/combatData';

interface NarrativeContext {
  regionId: string;
  trigger: NarrativeTrigger;
  squad: Character[];
}

export const NarrativeService = {
  /**
   * Resolve a narrative based on the current context.
   * Prioritizes: Pairings > Specific Character > Region Specific > Generic
   */
  resolveNarrative: (context: NarrativeContext): string => {
    const { regionId, trigger, squad } = context;
    const squadIds = squad.map(c => c.id);

    // Filter events matching trigger
    let candidates = NARRATIVES.filter(n => n.trigger === trigger);

    // Calculate Score for each candidate
    const scoredCandidates = candidates.map(event => {
      let score = 0;

      // 1. Region Match (Must match exact or 'all')
      if (event.regionId && event.regionId !== 'all' && event.regionId !== regionId) {
        return { event, score: -1 }; // Invalid
      }
      if (event.regionId === regionId) score += 10;

      // 2. Character Requirement
      if (event.requiredCharId) {
        if (squadIds.includes(event.requiredCharId)) {
          score += 50;
        } else {
          return { event, score: -1 }; // Character missing
        }
      }

      // 3. Pair Requirement
      if (event.requiredPair) {
        const [c1, c2] = event.requiredPair;
        if (squadIds.includes(c1) && squadIds.includes(c2)) {
          score += 100;
        } else {
          return { event, score: -1 }; // Pair missing
        }
      }

      // Base weight
      score += (event.weight || 0);

      return { event, score };
    }).filter(item => item.score >= 0);

    // Sort by score descending
    scoredCandidates.sort((a, b) => b.score - a.score);

    if (scoredCandidates.length === 0) return "隊伍正在小心翼翼地探索周圍...";

    // Pick from top candidates (to add some randomness if scores are tied)
    const highestScore = scoredCandidates[0].score;
    const topPicks = scoredCandidates.filter(c => c.score >= highestScore - 5); // Allow slight variance
    const selected = topPicks[Math.floor(Math.random() * topPicks.length)].event;

    // Interpolate Text
    return interpolateText(selected.text, squad);
  }
};

const interpolateText = (template: string, squad: Character[]): string => {
  if (squad.length === 0) return template;

  const leader = squad[0];
  // Pick a random teammate that is NOT the leader (if possible)
  const teammates = squad.filter(c => c.id !== leader.id);
  const randomTeammate = teammates.length > 0 ? teammates[Math.floor(Math.random() * teammates.length)] : leader;

  // Role Identification Helper
  const findRole = (paths: string[]): Character => {
    const candidates = squad.filter(c => {
      const data = getCharData(c.id, c.name);
      return paths.includes(data.path);
    });
    if (candidates.length > 0) return candidates[Math.floor(Math.random() * candidates.length)];
    // Fallback priority: Teammate -> Leader
    return randomTeammate.id !== leader.id ? randomTeammate : leader;
  };

  // Mapping HSR Paths to RPG Roles
  const tank = findRole(['Preservation']);
  const healer = findRole(['Abundance']);
  const dps = findRole(['Destruction', 'Hunt', 'Erudition']);
  const support = findRole(['Harmony', 'Nihility']);

  let text = template;
  
  // Basic placeholders
  text = text.replace(/{leader}/g, leader.name);
  text = text.replace(/{teammate}/g, randomTeammate.name);
  
  // Role placeholders
  text = text.replace(/{tank}/g, tank.name);
  text = text.replace(/{healer}/g, healer.name);
  text = text.replace(/{dps}/g, dps.name);
  text = text.replace(/{support}/g, support.name);
  
  return text;
};
