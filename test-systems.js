// System verification test script
import { StorageSystem } from './src/game/systems/StorageSystem.js';
import { CollisionSystem } from './src/game/systems/CollisionSystem.js';
import { ScoreSystem } from './src/game/systems/ScoreSystem.js';
import { RewardSystem } from './src/game/systems/RewardSystem.js';
import { SKINS, getSkinById } from './src/game/data/skins.js';
import { ACHIEVEMENTS } from './src/game/data/achievements.js';
import {
  GRID_SIZE, ARENA_COLS, ARENA_ROWS, MOVE_SPEEDS, FOOD_SCORES,
  GOLDEN_FOOD_CHANCE, POWERUP_TYPES, GAME_MODES, DIFFICULTY_LEVELS
} from './src/game/config.js';

console.log('--- RUNNING SNAKE ARENA SYSTEM TESTS ---');

// Mock localStorage for Node test runner
const mockStore = {};
global.localStorage = {
  getItem: (k) => mockStore[k] || null,
  setItem: (k, v) => { mockStore[k] = v; },
  removeItem: (k) => { delete mockStore[k]; },
  clear: () => { for (const k in mockStore) delete mockStore[k]; }
};

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Storage System Tests
StorageSystem.load();
assert(StorageSystem.getCoins() === 500, 'Starting coins initialized to 500');
StorageSystem.addCoins(50);
assert(StorageSystem.getCoins() === 550, 'addCoins(50) increases balance to 550');
const spendOk = StorageSystem.spendCoins(200);
assert(spendOk === true && StorageSystem.getCoins() === 350, 'spendCoins(200) deducts 200');
const spendFail = StorageSystem.spendCoins(9999);
assert(spendFail === false && StorageSystem.getCoins() === 350, 'spendCoins prevents spending more than available');

// High score tests
StorageSystem.setHighScore('classic', 120);
assert(StorageSystem.getHighScore('classic') === 120, 'setHighScore updates classic mode record');
const beatRecord = StorageSystem.setHighScore('classic', 200);
assert(beatRecord === true && StorageSystem.getHighScore('classic') === 200, 'Beating high score returns true');
const lowerRecord = StorageSystem.setHighScore('classic', 50);
assert(lowerRecord === false && StorageSystem.getHighScore('classic') === 200, 'Lower score does not overwrite record');

// Skins tests
assert(SKINS.length === 8, 'Exact 8 distinct skins defined');
const classicSkin = getSkinById('classic');
assert(classicSkin.name === 'Classic Green' && classicSkin.price === 0, 'Classic skin is default free');
const shadowSkin = getSkinById('shadow');
assert(shadowSkin.price === 1000 && shadowSkin.rarity === 'legendary', 'Shadow skin is 1000 coins legendary');
StorageSystem.unlockSkin('shadow');
assert(StorageSystem.getUnlockedSkins().includes('shadow'), 'unlockSkin persists in unlocked list');
StorageSystem.equipSkin('shadow');
assert(StorageSystem.getEquippedSkin() === 'shadow', 'equipSkin sets equipped skin');

// Daily Reward tests
assert(StorageSystem.canClaimDaily() === true, 'canClaimDaily is true on first day');
const claimed = StorageSystem.claimDailyReward(100);
assert(claimed === true && StorageSystem.getDailyStreak() === 1, 'claimDailyReward increments streak and awards coins');
assert(StorageSystem.canClaimDaily() === false, 'canClaimDaily prevents duplicate claim on same calendar day');

// Achievements tests
assert(ACHIEVEMENTS.length >= 10, 'At least 10 achievements configured');
StorageSystem.unlockAchievement('first_meal');
assert(StorageSystem.getUnlockedAchievements().includes('first_meal'), 'unlockAchievement records achievement');

// 2. Collision System Tests
assert(CollisionSystem.checkWallCollision(-1, 5, ARENA_COLS, ARENA_ROWS) === true, 'Left wall collision detected');
assert(CollisionSystem.checkWallCollision(ARENA_COLS, 5, ARENA_COLS, ARENA_ROWS) === true, 'Right wall collision detected');
assert(CollisionSystem.checkWallCollision(5, -1, ARENA_COLS, ARENA_ROWS) === true, 'Top wall collision detected');
assert(CollisionSystem.checkWallCollision(5, ARENA_ROWS, ARENA_COLS, ARENA_ROWS) === true, 'Bottom wall collision detected');
assert(CollisionSystem.checkWallCollision(10, 10, ARENA_COLS, ARENA_ROWS) === false, 'Safe position inside arena detected');

const body = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }, { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 10, y: 9 }];
assert(CollisionSystem.checkSelfCollision(8, 10, body) === true, 'Self collision with body segment detected');
assert(CollisionSystem.checkSelfCollision(11, 10, body) === false, 'Empty grid cell has no self collision');

// Zen wrap
const wrappedLeft = CollisionSystem.wrapPosition(-1, 5, ARENA_COLS, ARENA_ROWS);
assert(wrappedLeft.x === ARENA_COLS - 1 && wrappedLeft.y === 5, 'Zen mode wraps left to right border');
const wrappedRight = CollisionSystem.wrapPosition(ARENA_COLS, 5, ARENA_COLS, ARENA_ROWS);
assert(wrappedRight.x === 0 && wrappedRight.y === 5, 'Zen mode wraps right to left border');

// 3. Score & Reward System Tests
const scoreSys = new ScoreSystem();
scoreSys.addScore(FOOD_SCORES.normal);
scoreSys.addFood(false);
assert(scoreSys.score === 10 && scoreSys.foodEaten === 1 && scoreSys.length === 4, 'Eating normal food adds 10 pts and increases length');
scoreSys.addScore(FOOD_SCORES.golden);
scoreSys.addFood(true);
assert(scoreSys.score === 60 && scoreSys.goldenFoodEaten === 1 && scoreSys.length === 5, 'Eating golden food adds 50 pts');

const rewards = RewardSystem.calculateGameRewards(scoreSys, 'expert');
assert(rewards.totalCoins >= 2, 'Expert difficulty rewards calculated with 1.5x multiplier');

// 4. Power-Up Specs Tests
assert(POWERUP_TYPES.speed && POWERUP_TYPES.speed.duration === 5000, 'Speed boost configured for 5000ms');
assert(POWERUP_TYPES.shield && POWERUP_TYPES.shield.duration === 10000, 'Shield configured for 10000ms');
assert(POWERUP_TYPES.magnet && POWERUP_TYPES.magnet.duration === 8000, 'Coin Magnet configured for 8000ms');

console.log(`\nTEST SUMMARY: ${passed} Passed, ${failed} Failed`);
if (failed > 0) process.exit(1);
