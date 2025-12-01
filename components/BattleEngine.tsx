
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CombatStats, CombatStatus, CombatUnit, InventoryItem } from '../types';
import { getCharData, CharacterCombatData, ELEMENT_ICONS, ELEMENT_COLORS, CombatActionType, getRealtimeUnitStats, calculateDamage } from '../data/combatData';
import { EngineApi, executeSkill } from './SkillSystem';
import { EnemyAiRegistry } from './EnemyAiSystem';
import { CHARACTER_SKILL_DB } from '../data/skill_db';
import BattleUnit from './BattleUnit';
import BattleInspection from './BattleInspection';

interface FloatingText { id: string; x: number; y: number; text: string; type: 'damage' | 'crit' | 'heal' | 'break' | 'buff' | 'resist'; life: number; }
export interface CombatMetrics { damageDealt: number; healingDone: number; shieldProvided: number; damageTaken: number; }

// Action Node for the Queue Visualization
interface ActionNode {
    uniqueId: string; 
    uid: string;
    charId: string;
    name: string;
    avatarUrl: string;
    isEnemy: boolean;
    avScore: number; // The absolute sort key
    displayAv: number; // The relative value shown to user (0 = current)
    isCurrent: boolean;
}

interface Props {
  allies: CombatUnit[];
  enemies: CombatUnit[];
  backgroundUrl: string;
  onBattleEnd: (win: boolean, survivingAllies: CombatUnit[], metrics: Record<string, CombatMetrics>, allFinalAllies?: CombatUnit[]) => void;
  gameSpeed: number;
  setGameSpeed: (s: number) => void;
  isAuto: boolean;
  setIsAuto: (a: boolean) => void;
  enemyImages: { [key: string]: string };
  ultImages: { [key: string]: string };
  inventory?: InventoryItem[];
  staminaCost?: number;
  onRetreat?: () => void;
  initialStatuses?: Record<string, CombatStatus[]>;
}

const BattleEngine: React.FC<Props> = ({ 
  allies: initialAllies, enemies: initialEnemies, backgroundUrl, onBattleEnd, gameSpeed, setGameSpeed, isAuto, setIsAuto, enemyImages, ultImages, inventory = [], staminaCost = 0, onRetreat, initialStatuses
}) => {
  const [units, setUnits] = useState<CombatUnit[]>([]); 
  const unitsRef = useRef<CombatUnit[]>([]); // Ref for async access (AI loops)
  const [sp, setSp] = useState(3); 
  
  // Actor Tracking
  const currentActorUidRef = useRef<string | null>(null);
  const [currentActorUid, setCurrentActorUid] = useState<string | null>(null);
  
  const combatMetrics = useRef<Record<string, CombatMetrics>>({}); 
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [ultCutIn, setUltCutIn] = useState<{show: boolean, charId: string, text: string, avatarUrl: string, exit: boolean} | null>(null);
  const [logs, setLogs] = useState<{time: string, text: string, type: string}[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  
  const [inspectedUnit, setInspectedUnit] = useState<CombatUnit | null>(null);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [selectedSkillType, setSelectedSkillType] = useState<'BASIC' | 'SKILL' | null>(null);
  const [isTargeting, setIsTargeting] = useState(false);
  const [menuState, setMenuState] = useState<'CLOSED' | 'MENU' | 'RETREAT_CONFIRM'>('CLOSED');
  
  const isBattleOver = useRef(false);
  const longPressTimer = useRef<number | null>(null);
  const isLongPressTriggered = useRef(false);

  // --- Helper: Logging & Metrics ---
  const addLog = (text: string, type: 'info'|'damage'|'heal'|'buff'|'voice'|'critical'|'break' = 'info') => setLogs(prev => [...prev, { time: new Date().toLocaleTimeString([], {hour12: false, hour: "2-digit", minute:"2-digit", second:"2-digit"}), text, type }]);
  
  const recordMetric = (uid: string, type: 'damage' | 'heal' | 'shield' | 'taken', amount: number) => {
      if (!combatMetrics.current[uid]) combatMetrics.current[uid] = { damageDealt: 0, healingDone: 0, shieldProvided: 0, damageTaken: 0 };
      if (type === 'damage') combatMetrics.current[uid].damageDealt += amount;
      if (type === 'heal') combatMetrics.current[uid].healingDone += amount;
      if (type === 'shield') combatMetrics.current[uid].shieldProvided += amount;
      if (type === 'taken') combatMetrics.current[uid].damageTaken += amount;
  };

  const spawnText = (uid: string, text: string, type: FloatingText['type']) => {
      if (!unitsRef.current.find(u => u.uid === uid)) return;
      const offsetX = (Math.random() - 0.5) * 3;
      const offsetY = (Math.random() - 0.5) * 2;
      setFloatingTexts(prev => [...prev, { id: Date.now() + Math.random().toString(), x: offsetX, y: offsetY, text, type, life: 1.5 }]);
  };

  // --- Initialization ---
  useEffect(() => {
      const preppedAllies = initialAllies.map(a => {
          const buffs = initialStatuses?.[a.charId] || [];
          if (a.charId === 'acheron') {
              return { ...a, statuses: [...a.statuses, ...buffs], maxEnergy: 9, currentEnergy: 0 };
          }
          return { ...a, statuses: [...a.statuses, ...buffs] };
      });
      const startUnits = [...preppedAllies, ...initialEnemies];
      
      const normalizedUnits = startUnits.map(u => {
          const spd = getRealtimeUnitStats(u, 'spd');
          return { ...u, av: 10000 / Math.max(1, spd) };
      });

      normalizedUnits.sort((a, b) => a.av - b.av);
      
      const minAv = normalizedUnits[0].av;
      const finalUnits = normalizedUnits.map(u => ({ ...u, av: u.av - minAv }));

      setUnits(finalUnits);
      unitsRef.current = finalUnits;
      isBattleOver.current = false;

      initialAllies.forEach(a => recordMetric(a.uid, 'damage', 0)); 
      
      if (finalUnits.length > 0) {
          const first = finalUnits[0];
          currentActorUidRef.current = first.uid;
          setCurrentActorUid(first.uid);
          setTimeout(() => processTurnStart(first, finalUnits), 100);
      }

      setTimeout(() => setIntroPlayed(true), 1000);
      addLog("戰鬥程序啟動。", "info");
  }, []);

  useEffect(() => { if(logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight; }, [logs]);

  useEffect(() => {
      let frameId: number;
      const loop = () => {
          setFloatingTexts(prev => prev.map(ft => ({...ft, life: ft.life - 0.02})).filter(ft => ft.life > 0));
          frameId = requestAnimationFrame(loop);
      };
      loop();
      return () => cancelAnimationFrame(frameId);
  }, []);

  // --- CORE: Action Queue Calculation ---
  const actionQueue = useMemo(() => {
      if (units.length === 0 || isBattleOver.current) return [];

      const aliveUnits = units.filter(u => !u.isDead);
      const queue: ActionNode[] = [];
      
      const minAv = Math.min(...aliveUnits.map(u => u.av));

      aliveUnits.forEach(unit => {
          const speed = Math.max(1, getRealtimeUnitStats(unit, 'spd'));
          const actionCost = 10000 / speed;

          queue.push({
              uniqueId: `${unit.uid}_now`,
              uid: unit.uid,
              charId: unit.charId,
              name: unit.name,
              avatarUrl: unit.avatarUrl,
              isEnemy: unit.isEnemy,
              avScore: unit.av, 
              displayAv: Math.floor(unit.av - minAv),
              isCurrent: unit.uid === currentActorUid
          });

          const nextAv = unit.av + actionCost;
          queue.push({
              uniqueId: `${unit.uid}_next`,
              uid: unit.uid,
              charId: unit.charId,
              name: unit.name,
              avatarUrl: unit.avatarUrl,
              isEnemy: unit.isEnemy,
              avScore: nextAv,
              displayAv: Math.floor(nextAv - minAv),
              isCurrent: false
          });
      });

      queue.sort((a, b) => {
          if (Math.abs(a.avScore - b.avScore) < 0.01) {
              if (a.isEnemy !== b.isEnemy) return a.isEnemy ? 1 : -1;
              return a.uid.localeCompare(b.uid);
          }
          return a.avScore - b.avScore;
      });

      return queue.slice(0, 8);
  }, [units, currentActorUid]);

  // --- Turn Management Logic ---
  const endTurn = (actorUid: string, actionCostMultiplier: number = 1.0) => {
      const actor = unitsRef.current.find(u => u.uid === actorUid);
      if (!actor) return;

      const speed = Math.max(1, getRealtimeUnitStats(actor, 'spd'));
      const baseActionCost = 10000 / speed;
      
      const updatedUnits = unitsRef.current.map(u => {
          if (u.uid === actorUid) {
              return { ...u, av: u.av + (baseActionCost * actionCostMultiplier) };
          }
          return u;
      });

      unitsRef.current = updatedUnits;
      setUnits([...updatedUnits]);

      advanceTimeAndStartTurn(updatedUnits);
  };

  const advanceTimeAndStartTurn = (currentUnitsState: CombatUnit[]) => {
      if (isBattleOver.current) return;

      const alive = currentUnitsState.filter(u => !u.isDead);
      if (alive.length === 0) return;

      const minAv = Math.min(...alive.map(u => u.av));

      const advancedUnits = currentUnitsState.map(u => {
          if (u.isDead) return u;
          return { ...u, av: Math.max(0, u.av - minAv) };
      });

      const candidates = advancedUnits.filter(u => !u.isDead);
      candidates.sort((a, b) => {
          if (Math.abs(a.av - b.av) < 0.1) {
              if (a.isEnemy !== b.isEnemy) return a.isEnemy ? 1 : -1;
              return a.uid.localeCompare(b.uid);
          }
          return a.av - b.av;
      });

      unitsRef.current = advancedUnits;
      setUnits([...advancedUnits]);

      if (candidates.length > 0) {
          const nextActor = candidates[0];
          setTimeout(() => {
              currentActorUidRef.current = nextActor.uid;
              setCurrentActorUid(nextActor.uid);
              processTurnStart(nextActor, advancedUnits);
          }, 500 / gameSpeed);
      }
  };

  const processTurnStart = (actor: CombatUnit, currentUnitsState: CombatUnit[]) => {
      let hpChange = 0;
      let hasDoT = false;

      const newStatuses = actor.statuses.filter(s => {
          if (s.isDoT && s.dotDamage) {
              hpChange += s.dotDamage;
              hasDoT = true;
              spawnText(actor.uid, Math.floor(s.dotDamage).toString(), 'damage');
          }
          if (s.duration !== 99) {
              s.duration -= 1;
          }
          return s.duration > 0 || s.duration === 99; 
      });

      let updatedActor = { ...actor, statuses: newStatuses };
      let updatedUnits = currentUnitsState.map(u => u.uid === actor.uid ? updatedActor : u);

      if (hasDoT && hpChange > 0) {
          const shield = updatedActor.shield || 0;
          const damageToHp = Math.max(0, hpChange - shield);
          const remainingShield = Math.max(0, shield - hpChange);
          const newHp = Math.max(0, updatedActor.currentHp - damageToHp);
          
          updatedActor = { ...updatedActor, currentHp: newHp, shield: remainingShield, isDead: newHp <= 0 };
          updatedUnits = updatedUnits.map(u => u.uid === actor.uid ? updatedActor : u);
          
          unitsRef.current = updatedUnits;
          setUnits([...updatedUnits]);

          if (newHp <= 0) {
              addLog(`${updatedActor.name} 倒下了 (持續傷害)`, 'damage');
              setTimeout(() => advanceTimeAndStartTurn(updatedUnits), 1000);
              return;
          }
      } else {
          unitsRef.current = updatedUnits;
          setUnits([...updatedUnits]);
      }
  };

  // --- Engine API ---
  const engineApi: EngineApi = {
      getUnits: () => unitsRef.current,
      getUnit: (uid) => unitsRef.current.find(u => u.uid === uid),
      updateUnit: (uid, updates) => {
          const idx = unitsRef.current.findIndex(u => u.uid === uid);
          if (idx !== -1) {
              const updated = { ...unitsRef.current[idx], ...updates };
              unitsRef.current[idx] = updated; 
              setUnits(prev => prev.map(u => u.uid === uid ? { ...u, ...updates } : u));
          }
      },
      dealDamage: (attacker, target, mult, ele, ignore) => executeDamage(attacker, target, mult, ele, ignore),
      heal: (src, tgt, amt) => executeHeal(src, tgt, amt),
      addBuff: (tgt, buff) => executeAddBuff(tgt, buff),
      modifySp: (amt) => setSp(prev => Math.min(5, Math.max(0, prev + amt))),
      spawnText,
      addLog,
      addUnit: (unit) => {
          unitsRef.current = [...unitsRef.current, unit];
          setUnits(prev => [...prev, unit]);
      }
  };

  // --- Execution Loops ---
  useEffect(() => {
      if (!introPlayed || !currentActorUid || isBattleOver.current) return;

      const actor = unitsRef.current.find(u => u.uid === currentActorUid);
      if (!actor || actor.isDead) {
          advanceTimeAndStartTurn(unitsRef.current);
          return;
      }

      const enemiesAlive = unitsRef.current.some(u => u.isEnemy && !u.isDead);
      const alliesAlive = unitsRef.current.some(u => !u.isEnemy && !u.isDead);
      if (!enemiesAlive || !alliesAlive) {
          if(!isBattleOver.current) handleBattleOver(alliesAlive);
          return;
      }

      const frozen = actor.statuses.some(s => s.id.includes('freeze') || s.id.includes('imprison'));
      if (frozen) {
          addLog(`${actor.name} 無法行動`, 'info');
          spawnText(actor.uid, "SKIP", 'break');
          setTimeout(() => endTurn(actor.uid, 0.5), 800);
          return;
      }

      if (actor.isEnemy || isAuto || actor.isSummon) {
          const delay = (gameSpeed === 2 ? 600 : 1000);
          const timer = setTimeout(() => {
              executeAiTurn(actor.uid);
          }, delay);
          return () => clearTimeout(timer);
      }

  }, [currentActorUid, introPlayed, isAuto, units]); 

  // --- Strict IFF & Smart Targeting Logic ---
  const performTurnAction = (actorUid: string) => {
      const freshActor = unitsRef.current.find(u => u.uid === actorUid);
      if (!freshActor || freshActor.isDead) { 
          advanceTimeAndStartTurn(unitsRef.current); 
          return; 
      }

      if (!freshActor.isEnemy) {
          const cData = getCharData(freshActor.charId, freshActor.name);
          const skillConfig = CHARACTER_SKILL_DB[freshActor.charId]; // New DB lookup
          
          const canSkill = sp > 0;

          // IFF Logic
          const beneficialTypes = ['HEAL_SINGLE', 'HEAL_ALL', 'HEAL_MULTI', 'BUFF_ATK', 'SHIELD'];
          const isBeneficialSkill = beneficialTypes.includes(cData.skillType);

          let skillTarget: CombatUnit | null = null;

          if (canSkill) {
              const allUnits = unitsRef.current.filter(u => !u.isDead);
              const validTargets = allUnits.filter(u => 
                  isBeneficialSkill ? u.isEnemy === freshActor.isEnemy : u.isEnemy !== freshActor.isEnemy
              );

              if (validTargets.length > 0) {
                  if (cData.skillType.includes('HEAL')) {
                      skillTarget = validTargets.sort((a, b) => (a.currentHp / a.maxHp) - (b.currentHp / b.maxHp))[0];
                  } else if (cData.skillType.includes('BUFF') || cData.skillType === 'SHIELD') {
                      skillTarget = validTargets.sort((a, b) => b.stats.atk - a.stats.atk)[0];
                  } else {
                      skillTarget = validTargets.sort((a, b) => a.currentHp - b.currentHp)[0];
                  }
              }
          }

          const enemies = unitsRef.current.filter(u => u.isEnemy !== freshActor.isEnemy && !u.isDead);
          const basicAttackTarget = enemies.length > 0 ? enemies.sort((a, b) => a.currentHp - b.currentHp)[0] : null;

          if (canSkill && skillTarget) {
              const skillName = skillConfig?.skill.name || cData.skillName;
              addLog(`${freshActor.name} (Auto) 對 ${skillTarget.name} 使用了戰技: ${skillName}`, 'info');
              setSp(prev => prev - 1);
              
              // Use new Data-Driven skill execution
              executeSkill(freshActor, skillTarget, engineApi, false, skillConfig?.skill);
              
          } else if (basicAttackTarget) {
              const basicName = skillConfig?.basic.name || cData.basicName;
              addLog(`${freshActor.name} (Auto) 對 ${basicAttackTarget.name} 使用了普攻: ${basicName}`, 'info');
              setSp(prev => Math.min(5, prev + 1));
              
              // Use new Data-Driven skill execution for Basic
              executeSkill(freshActor, basicAttackTarget, engineApi, false, skillConfig?.basic);
          }
          endTurn(freshActor.uid);
      } else {
          const ai = EnemyAiRegistry[freshActor.charId] || EnemyAiRegistry['default'];
          try {
              ai(freshActor, engineApi);
          } catch (e) {
              console.error("Enemy AI Error", e);
          }
          endTurn(freshActor.uid);
      }
  };

  const executeAiTurn = (actorUid: string) => {
      const freshActor = unitsRef.current.find(u => u.uid === actorUid);
      if (!freshActor || freshActor.isDead) { 
          advanceTimeAndStartTurn(unitsRef.current); 
          return; 
      }

      // Auto-Battle Ultimate Logic
      if (!freshActor.isEnemy && !freshActor.isSummon) {
          if (freshActor.currentEnergy >= freshActor.maxEnergy) {
              const cData = getCharData(freshActor.charId, freshActor.name);
              addLog(`${freshActor.name} (Auto) 能量充滿，發動終結技: ${cData.ultName}`, 'voice');
              handleUlt(freshActor.uid);
              
              // Wait for Ult animation before taking actual turn
              setTimeout(() => {
                  performTurnAction(actorUid);
              }, 2500);
              return;
          }
      }

      performTurnAction(actorUid);
  };

  const executeDamage = (attacker: CombatUnit, target: CombatUnit, multiplier: number, element?: string, ignoreWeakness: boolean = false) => {
      const freshTarget = unitsRef.current.find(u => u.uid === target.uid);
      const freshAttacker = unitsRef.current.find(u => u.uid === attacker.uid);
      
      if (!freshTarget || freshTarget.isDead || !freshAttacker) return;

      const dmgElem = element || freshAttacker.element;
      const { damage, isCrit, details } = calculateDamage(freshAttacker, freshTarget, multiplier, dmgElem, ignoreWeakness);
      
      let remainingDmg = damage;
      let currentShield = freshTarget.shield || 0;

      if (currentShield > 0) {
          const absorb = Math.min(currentShield, damage);
          remainingDmg -= absorb;
          currentShield -= absorb;
          engineApi.updateUnit(freshTarget.uid, { shield: currentShield });
          spawnText(freshTarget.uid, `吸收 ${Math.floor(absorb)}`, 'resist');
          recordMetric(freshAttacker.uid, 'shield', absorb);
      }

      if (remainingDmg > 0) {
          const newHp = Math.max(0, freshTarget.currentHp - remainingDmg);
          engineApi.updateUnit(freshTarget.uid, { currentHp: newHp, isDead: newHp <= 0 });
          
          spawnText(freshTarget.uid, Math.floor(remainingDmg).toString(), isCrit ? 'crit' : 'damage');
          recordMetric(freshAttacker.uid, 'damage', remainingDmg);
          recordMetric(freshTarget.uid, 'taken', remainingDmg);
          
          addLog(`${freshAttacker.name} 對 ${freshTarget.name} 造成 ${Math.floor(remainingDmg)} 傷害 ${isCrit ? '(爆擊!)' : ''}`, isCrit ? 'critical' : 'damage');

          if (!freshTarget.isEnemy && freshTarget.charId !== 'acheron') {
              engineApi.updateUnit(freshTarget.uid, { currentEnergy: Math.min(freshTarget.maxEnergy, freshTarget.currentEnergy + 10) });
          }
      }

      if (freshTarget.currentToughness > 0 && (freshTarget.weaknesses?.includes(dmgElem) || ignoreWeakness)) {
          const breakAmt = 30 * (1 + (getRealtimeUnitStats(freshAttacker, 'breakEffect') || 0));
          const newToughness = Math.max(0, freshTarget.currentToughness - breakAmt);
          engineApi.updateUnit(freshTarget.uid, { currentToughness: newToughness });
          
          if (freshTarget.currentToughness > 0 && newToughness === 0) {
              spawnText(freshTarget.uid, "擊破", 'break');
              addLog(`${freshTarget.name} 被擊破！`, 'break');
              engineApi.updateUnit(freshTarget.uid, { av: freshTarget.av + 25 }); 
          }
      }

      // --- COUNTERATTACK LOGIC (Clara / Yunli) ---
      if (!freshTarget.isDead && freshAttacker && !freshAttacker.isDead && freshTarget.uid !== freshAttacker.uid && freshTarget.isEnemy !== freshAttacker.isEnemy) {
          // Clara Counter
          if (freshTarget.charId === 'clara') {
              setTimeout(() => {
                  const source = engineApi.getUnit(freshTarget.uid);
                  const targetUnit = engineApi.getUnit(freshAttacker.uid);
                  if (source && !source.isDead && targetUnit && !targetUnit.isDead) {
                      engineApi.addLog(`史瓦羅啟動自動防衛系統！`, 'damage');
                      engineApi.spawnText(source.uid, "反擊", 'break');
                      executeSkill(source, targetUnit, engineApi, false, {
                          name: '史瓦羅反擊', type: 'Skill', element: 'Physical', spCost: 0,
                          ratio: 1.6, tags: ['Damage', 'FollowUp'], hitSplit: [1.0]
                      });
                  }
              }, 500);
          }
          // Yunli Counter
          if (freshTarget.charId === 'yunli') {
              setTimeout(() => {
                  const source = engineApi.getUnit(freshTarget.uid);
                  const targetUnit = engineApi.getUnit(freshAttacker.uid);
                  if (source && !source.isDead && targetUnit && !targetUnit.isDead) {
                      engineApi.addLog(`雲璃識破了對手的招式！`, 'damage');
                      engineApi.spawnText(source.uid, "確反", 'break');
                      executeSkill(source, targetUnit, engineApi, false, {
                          name: '勘破・滅', type: 'Skill', element: 'Physical', spCost: 0,
                          ratio: 2.2, tags: ['Damage', 'FollowUp', 'Blast'], hitSplit: [1.0]
                      });
                  }
              }, 500);
          }
      }
  };

  const executeHeal = (sourceUid: string, targetUid: string, amount: number) => {
      const target = unitsRef.current.find(u => u.uid === targetUid);
      const source = unitsRef.current.find(u => u.uid === sourceUid);
      if (!target || target.isDead) return;
      const newHp = Math.min(target.maxHp, target.currentHp + amount);
      const diff = newHp - target.currentHp;
      if (diff > 0) {
          engineApi.updateUnit(targetUid, { currentHp: newHp });
          spawnText(targetUid, Math.floor(diff).toString(), 'heal');
          recordMetric(sourceUid, 'heal', diff);
          addLog(`${source?.name || 'Effect'} 為 ${target.name} 回復了 ${Math.floor(diff)} 生命`, 'heal');
      }
  };

  const executeAddBuff = (targetUid: string, buff: CombatStatus) => {
      const target = unitsRef.current.find(u => u.uid === targetUid);
      if (!target || target.isDead) return;
      
      const filtered = target.statuses.filter(s => s.name !== buff.name); 
      engineApi.updateUnit(targetUid, { statuses: [...filtered, buff] });
      spawnText(targetUid, buff.name, buff.type === 'BUFF' ? 'buff' : 'break');
      addLog(`${target.name} 獲得狀態: [${buff.name}]`, 'buff');

      // --- Acheron Mechanic: Enemy Debuff -> Stack +1 ---
      if (buff.type === 'DEBUFF') {
          const acheron = unitsRef.current.find(u => u.charId === 'acheron' && !u.isEnemy && !u.isDead);
          if (acheron) {
              const newStacks = Math.min(9, acheron.currentEnergy + 1);
              if (newStacks > acheron.currentEnergy) {
                  engineApi.updateUnit(acheron.uid, { currentEnergy: newStacks });
                  engineApi.spawnText(acheron.uid, "+1 層", 'buff');
              }
          }
      }
  };

  const handlePlayerAction = (targetUid: string) => {
      if (!currentActorUid || !selectedSkillType) return;
      const actor = unitsRef.current.find(u => u.uid === currentActorUid);
      const target = unitsRef.current.find(u => u.uid === targetUid);
      if (!actor || !target) return;

      const cData = getCharData(actor.charId, actor.name);
      const skillConfig = CHARACTER_SKILL_DB[actor.charId];
      
      if (selectedSkillType === 'BASIC') {
          const basicName = skillConfig?.basic.name || cData.basicName;
          addLog(`${actor.name} 使用了普攻: ${basicName}`, 'info');
          setSp(prev => Math.min(5, prev + 1));
          
          executeSkill(actor, target, engineApi, false, skillConfig?.basic);
          
      } else {
          if (sp < 1) { addLog("戰技點不足", 'info'); return; }
          const skillName = skillConfig?.skill.name || cData.skillName;
          addLog(`${actor.name} 使用了戰技: ${skillName}`, 'info');
          setSp(prev => prev - 1);
          
          // Use centralized executeSkill to handle both generic and specific logic
          executeSkill(actor, target, engineApi, false, skillConfig?.skill);
      }

      endTurn(actor.uid);
      setSelectedSkillType(null);
      setIsTargeting(false);
  };

  const handleUlt = (uid: string) => {
      const unit = unitsRef.current.find(u => u.uid === uid);
      if (!unit || unit.currentEnergy < unit.maxEnergy || unit.isDead) return;
      
      const cData = getCharData(unit.charId, unit.name);
      const skillConfig = CHARACTER_SKILL_DB[unit.charId];

      setUltCutIn({ show: true, charId: unit.charId, text: cData.ultVoice, avatarUrl: ultImages[unit.charId] || unit.avatarUrl, exit: false });
      addLog(`【終結技啟動】${unit.name}: ${cData.ultName}`, 'voice');
      
      engineApi.updateUnit(uid, { currentEnergy: 0 });

      setTimeout(() => {
          setUltCutIn(prev => prev ? { ...prev, exit: true } : null);
          setTimeout(() => {
              setUltCutIn(null);
              const freshUnit = unitsRef.current.find(u => u.uid === uid);
              if(!freshUnit) return;
              
              // Target Logic for Ult (Default: First enemy for damage, random ally for support if none targeted explicitly by UI)
              const enemies = unitsRef.current.filter(u => u.isEnemy && !u.isDead);
              const target = enemies.length > 0 ? enemies[0] : null; 
              
              // Pass Ult Config
              executeSkill(freshUnit, target, engineApi, true, skillConfig?.ult);

          }, 500);
      }, 2000);
  };

  const handleBattleOver = (win: boolean) => {
      isBattleOver.current = true;
      if (win) addLog("戰鬥勝利！所有敵對目標已清除。", 'info');
      else addLog("隊伍全滅... 任務失敗。", 'info');
      setTimeout(() => {
          onBattleEnd(win, unitsRef.current.filter(u => !u.isEnemy && !u.isDead), combatMetrics.current, unitsRef.current.filter(u => !u.isEnemy));
      }, 2000);
  };

  const handleUnitClick = (u: CombatUnit) => {
      if (isTargeting && selectedSkillType) {
          const actor = unitsRef.current.find(x => x.uid === currentActorUid);
          if (!actor) return;
          const cData = getCharData(actor.charId, actor.name);
          const actionType = selectedSkillType === 'BASIC' ? 'DAMAGE' : cData.skillType;
          
          const isBeneficial = ['HEAL_SINGLE', 'HEAL_ALL', 'HEAL_MULTI', 'BUFF_ATK', 'SHIELD'].includes(actionType);
          
          let isValid = false;
          if (isBeneficial) {
              isValid = !u.isEnemy; // Strict Ally Target
          } else {
              isValid = u.isEnemy; // Strict Enemy Target
          }
          
          if (isValid) handlePlayerAction(u.uid);
      } else {
          if (!isLongPressTriggered.current) setInspectedUnit(u);
      }
  };

  const currentActor = units.find(u => u.uid === currentActorUid);
  const isPlayerTurn = currentActor && !currentActor.isEnemy && !isAuto && !currentActor.isSummon;
  const cData = currentActor ? getCharData(currentActor.charId, currentActor.name) : null;
  const cSkillData = currentActor ? CHARACTER_SKILL_DB[currentActor.charId] : null;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden font-sans select-none">
        {/* Background */}
        <div className="absolute inset-0 z-0">
            <img src={backgroundUrl} className="w-full h-full object-cover opacity-60" draggable={false} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        </div>

        {/* 1. Action Queue */}
        <div className="absolute left-0 top-16 bottom-32 w-24 z-20 flex flex-col items-center pointer-events-none">
            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 bg-black/60 px-2 py-1 rounded border border-white/10">
                Action Order
            </div>
            <div className="flex-1 w-full flex flex-col gap-4 items-center overflow-hidden py-2 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-white/20 to-transparent -z-10"></div>
                
                {actionQueue.map((node, idx) => {
                    const isTop = idx === 0;
                    const borderColor = node.isEnemy ? 'border-red-500' : 'border-blue-400';
                    const avColor = node.isEnemy ? 'bg-red-900/80 text-red-200' : 'bg-blue-900/80 text-blue-200';

                    return (
                        <div key={node.uniqueId} className={`relative flex flex-col items-center transition-all duration-500 ${isTop ? 'scale-110 z-10' : 'scale-95 opacity-90'}`}>
                            <div className={`w-14 h-14 rounded-full overflow-hidden border-2 shadow-lg bg-gray-900 relative ${borderColor} ${isTop ? 'ring-4 ring-white/30 shadow-[0_0_15px_rgba(255,255,255,0.5)]' : ''}`}>
                                <img src={node.avatarUrl} className="w-full h-full object-cover" />
                                {isTop && <div className="absolute inset-0 bg-white/10 animate-pulse"></div>}
                            </div>
                            <div className={`absolute -bottom-2 font-mono text-[10px] px-2 py-0.5 rounded-full border shadow-md font-bold min-w-[24px] text-center ${isTop ? 'bg-yellow-500 text-black border-yellow-300' : `${avColor} border-white/10`}`}>
                                {node.displayAv}
                            </div>
                            {isTop && <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-yellow-400 font-bold text-xl animate-bounce-right">▶</div>}
                        </div>
                    );
                })}
            </div>
        </div>

        {/* 2. Menu Button */}
        <button onClick={() => setMenuState('MENU')} className="absolute top-4 left-4 z-50 p-2 bg-gray-900/50 rounded-lg border border-gray-600 text-white hover:bg-gray-800 backdrop-blur-md">
            <span className="text-xl">⏸</span>
        </button>

        {/* 3. Auto/Speed Toggles */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
            <button onClick={() => setGameSpeed(gameSpeed === 1 ? 2 : 1)} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm backdrop-blur-md transition-all ${gameSpeed === 2 ? 'bg-yellow-500 text-black border-yellow-300' : 'bg-black/40 text-white border-white/30'}`}>{gameSpeed}x</button>
            <button onClick={() => setIsAuto(!isAuto)} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-xs backdrop-blur-md transition-all ${isAuto ? 'bg-yellow-500 text-black border-yellow-300' : 'bg-black/40 text-white border-white/30'}`}>AUTO</button>
        </div>

        {/* 4. Units (Battlefield) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center gap-12 md:gap-20 pt-10">
            {/* Enemies */}
            <div className="flex justify-center gap-4 md:gap-8 items-end h-40 px-4 w-full overflow-visible">
                {units.filter(u => u.isEnemy).map(u => (
                    <BattleUnit 
                        key={u.uid} 
                        unit={u} 
                        isActor={u.uid === currentActorUid}
                        isTargeting={isTargeting}
                        isValidTarget={true} 
                        enemyImage={enemyImages[u.charId]}
                        onInteractStart={() => { isLongPressTriggered.current = false; longPressTimer.current = window.setTimeout(() => { isLongPressTriggered.current = true; setInspectedUnit(u); }, 500); }}
                        onInteractEnd={() => { if(longPressTimer.current) clearTimeout(longPressTimer.current); handleUnitClick(u); }}
                        onInteractCancel={() => { if(longPressTimer.current) clearTimeout(longPressTimer.current); }}
                        onContextMenu={(u) => setInspectedUnit(u)}
                    />
                ))}
            </div>
            {/* Allies */}
            <div className="flex justify-center gap-4 md:gap-8 items-end h-40 px-4 w-full overflow-visible">
                {units.filter(u => !u.isEnemy && !u.isSummon).map(u => (
                    <BattleUnit 
                        key={u.uid} 
                        unit={u} 
                        isActor={u.uid === currentActorUid}
                        isTargeting={isTargeting}
                        isValidTarget={selectedSkillType !== 'BASIC'} 
                        skillIntent="SUPPORT"
                        onInteractStart={() => { isLongPressTriggered.current = false; longPressTimer.current = window.setTimeout(() => { isLongPressTriggered.current = true; setInspectedUnit(u); }, 500); }}
                        onInteractEnd={() => { if(longPressTimer.current) clearTimeout(longPressTimer.current); handleUnitClick(u); }}
                        onInteractCancel={() => { if(longPressTimer.current) clearTimeout(longPressTimer.current); }}
                        onContextMenu={(u) => setInspectedUnit(u)}
                        triggerUlt={() => handleUlt(u.uid)}
                    />
                ))}
            </div>
        </div>

        {/* 5. Controls (Bottom Right) */}
        {isPlayerTurn && (
            <div className="absolute bottom-6 right-6 z-30 flex items-end gap-6 animate-slide-up">
                <div className="flex flex-col items-center gap-1 mb-2">
                    <div className="flex gap-1">{[...Array(5)].map((_, i) => <div key={i} className={`w-3 h-3 rounded-full border border-gray-500 ${i < sp ? 'bg-yellow-400 shadow-[0_0_5px_gold]' : 'bg-black/50'}`}></div>)}</div>
                    <span className="text-xs font-bold text-gray-400 tracking-widest">{sp}/5</span>
                </div>
                <button 
                    onClick={() => { setSelectedSkillType('BASIC'); setIsTargeting(true); }} 
                    className={`relative w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 group bg-black/60 backdrop-blur-md ${selectedSkillType === 'BASIC' ? 'border-white bg-white/20' : 'border-gray-500 text-gray-300'}`}
                >
                    <span className="text-2xl mb-1">⚔️</span><span className="text-[10px] font-bold">普攻</span>
                    {selectedSkillType === 'BASIC' && <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-30"></div>}
                </button>
                <button 
                    onClick={() => { if(sp>0) { setSelectedSkillType('SKILL'); setIsTargeting(true); } }} 
                    disabled={sp < 1} 
                    className={`relative w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center transition-all hover:scale-110 active:scale-95 group bg-black/60 backdrop-blur-md ${selectedSkillType === 'SKILL' ? 'border-blue-400 bg-blue-900/30 text-blue-200' : sp < 1 ? 'border-gray-700 opacity-50 cursor-not-allowed' : 'border-gray-400 text-white'}`}
                >
                    <span className="text-3xl mb-1">✨</span><span className="text-xs font-bold">戰技</span>
                    {selectedSkillType === 'SKILL' && <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-30"></div>}
                </button>
            </div>
        )}

        {/* 6. Skill Info */}
        {isPlayerTurn && cData && (
            <div className="absolute bottom-6 left-28 right-40 z-20 pointer-events-none md:block hidden">
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border-l-4 border-yellow-500 animate-fade-in-up max-w-lg">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        {selectedSkillType === 'SKILL' ? (cSkillData?.skill.name || cData.skillName) : (cSkillData?.basic.name || cData.basicName)}
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-gray-200 uppercase">{selectedSkillType === 'SKILL' ? 'Skill' : 'Basic'}</span>
                    </h3>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                        {selectedSkillType === 'SKILL' 
                            ? (cSkillData?.skill.description || cData.skillDesc) 
                            : '對敵方單體造成傷害。'}
                    </p>
                </div>
            </div>
        )}

        {/* Floating Text */}
        {floatingTexts.map(ft => (
            <div key={ft.id} className={`absolute pointer-events-none text-2xl font-black drop-shadow-md animate-float-up z-40 ${ft.type === 'damage' ? 'text-white' : ft.type === 'crit' ? 'text-red-500 text-4xl' : ft.type === 'heal' ? 'text-green-400' : ft.type === 'break' ? 'text-yellow-400 text-3xl' : 'text-blue-300'}`} style={{ left: `50%`, top: `40%`, transform: `translate(${ft.x * 50}px, ${ft.y * 50}px)` }}>{ft.text}</div>
        ))}

        {/* Ult Cut-in */}
        {ultCutIn && (
            <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 transition-opacity duration-300 ${ultCutIn.exit ? 'opacity-0' : 'opacity-100'}`}>
                <img src={ultCutIn.avatarUrl} className="absolute inset-0 w-full h-full object-cover opacity-40 animate-scale-slow" />
                <div className="relative z-10 text-center animate-slide-up"><div className="text-6xl md:text-8xl font-black text-white italic tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] mb-4">{ultCutIn.text}</div></div>
            </div>
        )}

        {/* Log Window - Enhanced for Verbosity */}
        <div className="absolute bottom-32 left-32 w-80 h-48 overflow-hidden pointer-events-none z-10 mask-image-gradient-b">
            <div ref={logContainerRef} className="h-full overflow-y-auto flex flex-col justify-end">
                {logs.slice(-8).map((l, i) => (
                    <div key={i} className={`text-[11px] mb-1 font-mono shadow-sm leading-tight ${l.type === 'damage' ? 'text-red-300' : l.type === 'heal' ? 'text-green-300' : l.type === 'voice' ? 'text-yellow-300 italic' : l.type === 'break' ? 'text-orange-400' : 'text-gray-300'}`}>
                        <span className="opacity-50">[{l.time}]</span> {l.text}
                    </div>
                ))}
            </div>
        </div>

        {/* Inspection Modal */}
        {inspectedUnit && <BattleInspection unit={inspectedUnit} onClose={() => setInspectedUnit(null)} inventory={inventory} enemyImage={enemyImages[inspectedUnit.charId]} allUnits={units} />}

        {/* Menu Modal */}
        {menuState === 'MENU' && (
            <div className="absolute inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-gray-900 p-8 rounded-2xl border border-gray-600 flex flex-col gap-4 w-64 shadow-2xl">
                    <h3 className="text-xl font-bold text-white text-center mb-4">暫停 (PAUSED)</h3>
                    <button onClick={() => setMenuState('CLOSED')} className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg">繼續戰鬥</button>
                    <button onClick={() => setMenuState('RETREAT_CONFIRM')} className="py-3 bg-red-900/50 hover:bg-red-900 text-red-200 font-bold rounded-lg border border-red-800">撤退</button>
                </div>
            </div>
        )}

        {menuState === 'RETREAT_CONFIRM' && (
            <div className="absolute inset-0 z-[160] bg-black/90 flex items-center justify-center">
                <div className="bg-gray-900 p-8 rounded-2xl border border-red-600 max-w-sm text-center shadow-2xl">
                    <h3 className="text-xl font-bold text-red-500 mb-2">確認撤退？</h3>
                    <p className="text-gray-400 text-sm mb-6">現在撤退將返還部分體力 ({staminaCost > 0 ? Math.max(0, staminaCost - 1) : 0})，但會失去所有本次戰鬥的進度。</p>
                    <div className="flex gap-4">
                        <button onClick={() => setMenuState('MENU')} className="flex-1 py-2 bg-gray-700 text-white rounded-lg">取消</button>
                        <button onClick={onRetreat} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-bold">確認撤退</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default BattleEngine;
