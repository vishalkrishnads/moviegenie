import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MovieListScreen from '@/app/(stack)/index';
import { useMovieContext } from '@/contexts/MovieContext';
import { useOrientation } from '@/assets/utils/responsive';
import { emptyMovie } from './movie';

jest.mock('@/contexts/MovieContext', () => ({
    useMovieContext: jest.fn(),
}));

jest.mock('@/assets/utils/responsive', () => ({
    useOrientation: jest.fn(),
}));

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
    get: jest.fn(() => ({ width: 400, height: 800 })),
}));

describe('MovieListScreen', () => {
    const mockFetchMovies = jest.fn();

    const mockedUseMovieContext = useMovieContext as jest.MockedFunction<typeof useMovieContext>;
    const mockedUseOrientation = useOrientation as jest.MockedFunction<typeof useOrientation>;

    beforeEach(() => {
        mockedUseMovieContext.mockReturnValue({
            state: {
                trending: { movies: [emptyMovie(1), emptyMovie(2)], page: 1, total_pages: 3 },
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
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of columns based on orientation', () => {
        const { getByTestId } = render(<MovieListScreen />);

        const flatList = getByTestId('movie-flatlist');
        expect(flatList.props.numColumns).toBe(1); // Portrait mode should have 1 column
    });

    it('calls fetchMovies when reaching the end of the list', async () => {
        const { getByTestId } = render(<MovieListScreen />);

        const flatList = getByTestId('movie-flatlist');
        fireEvent.scroll(flatList, {
            nativeEvent: {
                contentOffset: { y: 1000 },
                contentSize: { height: 2000 },
                layoutMeasurement: { height: 500 },
            },
        });

        await waitFor(() => expect(mockFetchMovies).toHaveBeenCalledWith('popular', 2));
    });

    it('displays the progress bar when loading', () => {
        mockedUseMovieContext.mockReturnValue({
            state: {
                trending: { movies: [emptyMovie(1), emptyMovie(2)], page: 1, total_pages: 3 },
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

        const { getByTestId } = render(<MovieListScreen />);
        const progressBar = getByTestId('progress-bar');
        expect(progressBar).toBeTruthy();
    });
});
