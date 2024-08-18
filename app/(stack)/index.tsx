import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { scale, useOrientation, isTablet } from '@/assets/utils/responsive';
import { useTheme, blurhash } from '@/assets/utils/theme'
import { Movie } from '@/constants/types';
import Genre from '@/components/Gentre';
import useStyles from './styles/movieList.styles'
import { Bar } from '@/components/Search';
import Popularity from '@/components/Popularity';
import Rating from '@/components/Rating';
import { useMovieContext } from '@/contexts/MovieContext';
import { formatReleaseDate, image } from '@/api';

const MovieListScreen = () => {

    const styles = useStyles()
    const theme = useTheme()
    const orientation = useOrientation()

    const { state, dispatch, fetchMovies } = useMovieContext()
    const [loading, setLoading] = useState(false);

    const loadMoreMovies = () => {
        if (!loading && state[state.currentFilter].page < state[state.currentFilter].total_pages) {
            setLoading(true);
            fetchMovies(state.currentFilter, state[state.currentFilter].page + 1).then(() => setLoading(false));
        }
    };

    type CardProps = { movie: Movie; width: number };
    const Card = React.memo(({ movie, width }: CardProps) => {
        return (
            <Link href={`/(stack)/${movie.id}`}>
                <View style={[styles.movie, { width }]}>
                    <View style={styles.card}>
                        <View style={styles.cardPoster}>
                            <Image
                                style={styles.poster}
                                placeholder={theme.isDark ? require('@/assets/images/pacman-dark.gif') : require('@/assets/images/pacman-light.gif')}
                                source={image(movie.poster_path)}
                                autoplay
                            />
                        </View>
                        <View style={styles.cardDetails}>
                            <Text style={styles.title}>{movie.original_title}</Text>
                            {movie.genre_ids.length > 0 && <Genre genres_id={movie.genre_ids.splice(0, 2)} />}
                            <Text style={[theme.textVariants.body, { color: 'grey' }]}>Released {formatReleaseDate(movie.release_date)}</Text>
                            <View style={styles.popularity}>
                                <Popularity popularity={Math.round(movie.popularity / 100)} />
                            </View>
                            <View style={styles.rating}>
                                <Rating rating={movie.vote_average} />
                            </View>
                        </View>
                    </View>
                </View>
            </Link>
        );
    });

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