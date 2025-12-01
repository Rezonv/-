

const DB_NAME = 'DreamCompanionDB';
const DB_VERSION = 5; // Incremented version for region images
const STORE_AVATARS = 'avatars';
const STORE_DATA = 'app_data'; 
// New Stores
const STORE_MAP_IMAGES = 'map_images';
const STORE_ENEMY_IMAGES = 'enemy_images';
const STORE_ITEM_IMAGES = 'item_images';
const STORE_REGION_IMAGES = 'region_images'; // New

interface ImageRecord { id: string; dataUrl: string; }
interface DataRecord { key: string; value: any; }

export const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_AVATARS)) db.createObjectStore(STORE_AVATARS, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_DATA)) db.createObjectStore(STORE_DATA, { keyPath: 'key' });
      
      // Create new stores if they don't exist
      if (!db.objectStoreNames.contains(STORE_MAP_IMAGES)) db.createObjectStore(STORE_MAP_IMAGES, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_ENEMY_IMAGES)) db.createObjectStore(STORE_ENEMY_IMAGES, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_ITEM_IMAGES)) db.createObjectStore(STORE_ITEM_IMAGES, { keyPath: 'id' });
      if (!db.objectStoreNames.contains(STORE_REGION_IMAGES)) db.createObjectStore(STORE_REGION_IMAGES, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event);
  });
};

export const saveGameData = (key: string, value: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_DATA, 'readwrite');
      tx.objectStore(STORE_DATA).put({ key, value });
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e);
    };
  });
};

export const getGameData = <T>(key: string): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_DATA, 'readonly');
      const query = tx.objectStore(STORE_DATA).get(key);
      query.onsuccess = () => resolve(query.result ? query.result.value : null);
      query.onerror = (e) => reject(e);
    };
  });
};

export const getAllGameData = (): Promise<{ [key: string]: any }> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      const db = request.result;
      const query = db.transaction(STORE_DATA, 'readonly').objectStore(STORE_DATA).getAll();
      query.onsuccess = () => {
        const map: { [key: string]: any } = {};
        (query.result as DataRecord[]).forEach(r => map[r.key] = r.value);
        resolve(map);
      };
      query.onerror = (e) => reject(e);
    };
  });
};

// --- GENERIC IMAGE HANDLERS ---

const saveImageToStore = (storeName: string, id: string, dataUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put({ id, dataUrl });
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e);
    };
  });
};

const getAllImagesFromStore = (storeName: string): Promise<{ [key: string]: string }> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
          resolve({});
          return;
      }
      const query = db.transaction(storeName, 'readonly').objectStore(storeName).getAll();
      query.onsuccess = () => {
        const map: { [key: string]: string } = {};
        (query.result as ImageRecord[]).forEach(r => map[r.id] = r.dataUrl);
        resolve(map);
      };
      query.onerror = (e) => reject(e);
    };
  });
};

// Avatar (Character)
export const saveAvatarToDB = (id: string, dataUrl: string) => saveImageToStore(STORE_AVATARS, id, dataUrl);
export const getAllAvatarsFromDB = () => getAllImagesFromStore(STORE_AVATARS);

// Dashboard & Ult (Stored in Avatars for now to keep compatibility or separate if needed, keeping in avatars as per existing code)
export const saveDashboardImageToDB = (charId: string, dataUrl: string) => saveAvatarToDB('dashboard_' + charId, dataUrl);
export const saveUltImageToDB = (charId: string, dataUrl: string) => saveAvatarToDB('ult_' + charId, dataUrl);

// New Types
export const saveMapImageToDB = (id: string, dataUrl: string) => saveImageToStore(STORE_MAP_IMAGES, id, dataUrl);
export const getAllMapImagesFromDB = () => getAllImagesFromStore(STORE_MAP_IMAGES);

export const saveEnemyImageToDB = (id: string, dataUrl: string) => saveImageToStore(STORE_ENEMY_IMAGES, id, dataUrl);
export const getAllEnemyImagesFromDB = () => getAllImagesFromStore(STORE_ENEMY_IMAGES);

export const saveItemImageToDB = (id: string, dataUrl: string) => saveImageToStore(STORE_ITEM_IMAGES, id, dataUrl);
export const getAllItemImagesFromDB = () => getAllImagesFromStore(STORE_ITEM_IMAGES);

export const saveRegionImageToDB = (id: string, dataUrl: string) => saveImageToStore(STORE_REGION_IMAGES, id, dataUrl);
export const getAllRegionImagesFromDB = () => getAllImagesFromStore(STORE_REGION_IMAGES);


// --- ATOMIC BULK RESTORE ---
export const bulkRestore = (gameData: { [key: string]: any }, avatars: { [key: string]: string }): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (e) => {
        console.error("DB Open Failed", e);
        reject(e);
    };

    request.onsuccess = () => {
      const db = request.result;
      
      try {
          // Include new stores in transaction
          const storeNames = [STORE_AVATARS, STORE_DATA, STORE_MAP_IMAGES, STORE_ENEMY_IMAGES, STORE_ITEM_IMAGES, STORE_REGION_IMAGES];
          // Verify stores exist before transaction (in case version mismatch)
          const activeStores = storeNames.filter(name => db.objectStoreNames.contains(name));
          
          const tx = db.transaction(activeStores, 'readwrite');
          const avatarStore = tx.objectStore(STORE_AVATARS);
          const dataStore = tx.objectStore(STORE_DATA);

          // Clear
          activeStores.forEach(s => tx.objectStore(s).clear());

          // Batch Write Game Data
          if (gameData) {
            Object.entries(gameData).forEach(([key, value]) => dataStore.put({ key, value }));
          }

          // Batch Write Avatars (and legacy images)
          if (avatars) {
            Object.entries(avatars).forEach(([id, dataUrl]) => avatarStore.put({ id, dataUrl }));
          }
          
          tx.oncomplete = () => {
            setTimeout(() => resolve(), 100); 
          };

          tx.onerror = (e) => {
            reject(e);
          };

      } catch (err) {
          reject(err);
      }
    };
  });
};

export const migrateLocalStorageToIDB = async (): Promise<boolean> => {
    if (!localStorage.getItem('user_state')) return false;
    const keysToMigrate = ['user_state', 'favorite_chars', 'story_library', 'custom_characters', 'user_credits', 'user_inventory', 'dashboard_girl_ids', 'home_state', 'affection_map', 'active_expeditions', 'preset_equipment'];
    try {
        for (const key of keysToMigrate) {
            const raw = localStorage.getItem(key);
            if (raw) {
                try { await saveGameData(key, JSON.parse(raw)); } catch { await saveGameData(key, raw); }
            }
        }
        keysToMigrate.forEach(key => localStorage.removeItem(key));
        return true;
    } catch (e) { return false; }
};