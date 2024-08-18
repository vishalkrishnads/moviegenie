import React from 'react';
import { render } from '@testing-library/react-native';
import MovieDetailScreen from '@/app/(stack)/[id]';
import { useMovieContext } from '@/contexts/MovieContext';
import { useOrientation } from '@/assets/utils/responsive';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { emptyMovie } from './movie';

jest.mock('@/contexts/MovieContext');
jest.mock('@/assets/utils/responsive');
jest.mock('expo-router', () => ({
    useLocalSearchParams: jest.fn(),
    useNavigation: jest.fn(),
}));

describe('MovieDetailScreen', () => {
    const mockedUseMovieContext = useMovieContext as jest.MockedFunction<typeof useMovieContext>;
    const mockedUseOrientation = useOrientation as jest.MockedFunction<typeof useOrientation>;
    const mockedUseLocalSearchParams = useLocalSearchParams as jest.MockedFunction<typeof useLocalSearchParams>;
    const mockedUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>;

    beforeEach(() => {
        mockedUseMovieContext.mockReturnValue({
            state: {
                trending: { movies: [emptyMovie(1)], page: 1, total_pages: 3 },
                upcoming: { movies: [], page: 1, total_pages: 1 },
                nowPlaying: { movies: [], page: 1, total_pages: 1 },
                topRated: { movies: [], page: 1, total_pages: 1 },
                searchResults: { movies: [], page: 1, total_pages: 1 },
                genres: [],
                currentFilter: 'trending',
            },
            dispatch: jest.fn(),
            fetchMovies: jest.fn(),
            searchMovies: jest.fn(),
        });

        mockedUseOrientation.mockReturnValue('portrait');

        mockedUseLocalSearchParams.mockReturnValue({ id: '1' });

        mockedUseNavigation.mockReturnValue({
            goBack: jest.fn(),
        } as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders movie details correctly', () => {
        const { getByText, getByPlaceholderText } = render(<MovieDetailScreen />);

        expect(getByText('Movie 1')).toBeTruthy();
        expect(getByText('Released')).toBeTruthy();
        expect(getByPlaceholderText('pacman-light.gif')).toBeTruthy();
        expect(getByText('Back')).toBeTruthy();
    });
});
