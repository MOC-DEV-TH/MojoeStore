import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export function saveToStorage(key: string, value: any) {
  return storage.set(key, value);
}

export function getFromStorage(key: string) {
  return storage.getString(key) ?? '';
}

export function clearStorage(key: string) {
  storage.contains(key) && storage.delete(key);
}
