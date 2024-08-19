import { storeData, getData } from "@/assets/utils/cache";
import { Movie } from "@/constants/types";

/*
  Unified interface with helper functions for using the cache.
  It provides methods for storing the different movies based on category.
*/

export type CacheFormat = {
    movies: Movie[],
    page: number,
    total_pages: number
}

export const setPopularMovies = (movies: CacheFormat) => storeData({ key: 'popular' }, movies)
export const getPopularMovies = async(): Promise<CacheFormat | null> => await getData({ key: 'popular' })

export const setUpcomingMovies = (movies: CacheFormat) => storeData({ key: 'upcoming' }, movies)
export const getUpcomingMovies = async(): Promise<CacheFormat | null> => await getData({ key: 'upcoming' })

export const setTrendingMovies = (movies: CacheFormat) => storeData({ key: 'trending' }, movies)
export const getTrendingMovies = async(): Promise<CacheFormat | null> => await getData({ key: 'trending' })

export const setNowPlayingMovies = (movies: CacheFormat) => storeData({ key: 'nowPlaying' }, movies)
export const getNowPlayingMovies = async(): Promise<CacheFormat | null> => await getData({ key: 'nowPlaying' })

export const setTopRatedMovies = (movies: CacheFormat) => storeData({ key: 'topRated' }, movies)
export const getTopRatedMovies = async(): Promise<CacheFormat | null> => await getData({ key: 'topRated' })
