import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import { View, FlatList, Dimensions } from 'react-native';
import { scale, useOrientation, isTablet } from '@/assets/utils/responsive';
import { useTheme } from '@/assets/utils/theme'
import { Movie } from '@/constants/types';
import useStyles from './styles/movieList.styles'
import { Bar } from '@/components/Search';
import { useMovieContext } from '@/contexts/MovieContext';
import Card from '@/components/Card';

const MovieListScreen = () => {

    const styles = useStyles()
    const theme = useTheme()
    const orientation = useOrientation()

    const { state, fetchMovies } = useMovieContext()
    const [loading, setLoading] = useState(false);

    const loadMoreMovies = () => {
        if (!loading && state[state.currentFilter].page < state[state.currentFilter].total_pages) {
            setLoading(true);
            fetchMovies(state.currentFilter, state[state.currentFilter].page + 1).then(() => setLoading(false));
        }
    };

    const screenWidth = Dimensions.get('window').width;
    const getNumColumns = () => {
        if (isTablet()) {
            return Math.floor(screenWidth / 350);
        }
        return orientation === 'landscape' ? 2 : 1;
    };

    const numColumns = getNumColumns();
    const cardWidth = screenWidth / numColumns - (styles.container.padding as number) * 2;

    const renderItem = React.useCallback(({ item }: { item: Movie }) => (
        <Card movie={item} width={cardWidth - 10} />
    ), [cardWidth]);

    return (
        <View style={styles.container}>
            <Bar />
            <FlatList
                data={state[state.currentFilter].movies}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numColumns}
                renderItem={renderItem}
                contentContainerStyle={[styles.listContainer, { paddingTop: scale(90) }]}
                key={numColumns} // Force re-render on orientation change
                onEndReached={loadMoreMovies}
                onEndReachedThreshold={0.5}
            />
            {loading && <Progress.Bar
                indeterminate
                borderWidth={0}
                color={theme.colors.primary}
            />}
        </View>
    );
};

export default MovieListScreen;