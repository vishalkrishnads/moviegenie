import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TMDBResponse, Movie, Genre, Genres } from '@/constants/types';
import { getGenres } from '@/api/genre';
import * as api from '@/api/list';
import * as cache from '@/api/cache';

export type MovieState = {
    trending: cache.CacheFormat;
    upcoming: cache.CacheFormat;
    nowPlaying: cache.CacheFormat;
    topRated: cache.CacheFormat;
    genres: Genre[];
    currentFilter: 'trending' | 'upcoming' | 'nowPlaying' | 'topRated';
};

type MovieAction =
    | { type: 'SET_MOVIES'; payload: { key: keyof MovieState; data: cache.CacheFormat } }
    | { type: 'SET_FILTER'; payload: MovieState['currentFilter'] }
    | { type: 'SET_GENRES', payload: Genre[] };

const initialState: MovieState = {
    trending: { movies: [], page: 1, total_pages: 1 },
    upcoming: { movies: [], page: 1, total_pages: 1 },
    nowPlaying: { movies: [], page: 1, total_pages: 1 },
    topRated: { movies: [], page: 1, total_pages: 1 },
    genres: [],
    currentFilter: 'nowPlaying',
};

const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
    switch (action.type) {
        case 'SET_MOVIES': {
            const key = action.payload.key as keyof MovieState;

            // Ensure we don't inadvertently overwrite other state properties
            if (key === 'genres' || key === 'currentFilter') {
                return state; // No change needed if the key is 'genres' or 'currentFilter'
            }

            return {
                ...state,
                [key]: {
                    ...state[key],
                    movies: [...state[key].movies, ...action.payload.data.movies],
                    page: action.payload.data.page,
                    total_pages: action.payload.data.total_pages,
                },
            };
        }
        case 'SET_FILTER':
            return { ...state, currentFilter: action.payload };
        case 'SET_GENRES':
            return { ...state, genres: action.payload };
        default:
            return state;
    }
};


const MovieContext = createContext<{
    state: MovieState;
    dispatch: React.Dispatch<MovieAction>;
    fetchMovies: (filter: MovieState['currentFilter'], page: number) => Promise<void>;
} | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState);

    const fetchGenres = async () => {
        try {
            const genreData: Genres = await getGenres(); // Fetch genres data
            dispatch({ type: 'SET_GENRES', payload: genreData.genres }); // Dispatch the data to the reducer
        } catch (error) {
            console.error('Failed to fetch genres:', error);
        }
    };

    const fetchMovies = async (filter: MovieState['currentFilter'], page: number) => {
        let data: TMDBResponse;
        let cacheData: cache.CacheFormat | null;

        switch (filter) {
            case 'trending':
                cacheData = await cache.getTrendingMovies();
                if (cacheData && cacheData.page >= page) {
                    dispatch({ type: 'SET_MOVIES', payload: { key: 'trending', data: cacheData } });
                    return;
                }
                data = await api.trendingMovies(page);
                cache.setTrendingMovies({ movies: data.results, page: data.page, total_pages: data.total_pages });
                break;
            case 'upcoming':
                cacheData = await cache.getUpcomingMovies();
                if (cacheData && cacheData.page >= page) {
                    dispatch({ type: 'SET_MOVIES', payload: { key: 'upcoming', data: cacheData } });
                    return;
                }
                data = await api.upcomingMovies(page);
                cache.setUpcomingMovies({ movies: data.results, page: data.page, total_pages: data.total_pages });
                break;
            case 'nowPlaying':
                cacheData = await cache.getNowPlayingMovies();
                if (cacheData && cacheData.page >= page) {
                    dispatch({ type: 'SET_MOVIES', payload: { key: 'nowPlaying', data: cacheData } });
                    return;
                }
                data = await api.nowPlayingMovies(page);
                cache.setNowPlayingMovies({ movies: data.results, page: data.page, total_pages: data.total_pages });
                break;
            case 'topRated':
                cacheData = await cache.getTopRatedMovies();
                if (cacheData && cacheData.page >= page) {
                    dispatch({ type: 'SET_MOVIES', payload: { key: 'topRated', data: cacheData } });
                    return;
                }
                data = await api.topRatedMovies(page);
                cache.setTopRatedMovies({ movies: data.results, page: data.page, total_pages: data.total_pages });
                break;
        }

        dispatch({
            type: 'SET_MOVIES',
            payload: { key: filter, data: { movies: data.results, page: data.page, total_pages: data.total_pages } },
        });
    };

    useEffect(() => {
        fetchGenres();
        fetchMovies(state.currentFilter, 1);
    }, [state.currentFilter]);

    return (
        <MovieContext.Provider value={{ state, dispatch, fetchMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (context === undefined) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};