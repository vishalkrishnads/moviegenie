import AsyncStorage from '@react-native-async-storage/async-storage';
import { CacheFormat } from '@/api/cache';

/*
    Helper methods to store and get data to & from the cache 
*/

export type Keys = {
    key: 'popular' | 'trending' | 'topRated' | 'nowPlaying' | 'upcoming';
}

export const storeData = async ({ key }: Keys, value: CacheFormat) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        throw e;
    }
};

export const getData = async ({ key }: Keys): Promise<CacheFormat | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) as CacheFormat : null;
    } catch (e) {
        throw e;
    }
};
