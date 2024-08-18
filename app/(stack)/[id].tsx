import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { scale, useOrientation } from '@/assets/utils/responsive';
import { useTheme } from '@/assets/utils/theme';
import { Image } from 'expo-image';
import { useMovieContext } from '@/contexts/MovieContext';
import { Movie } from '@/constants/types';
import { formatReleaseDate, image } from '@/api'

import AntDesign from '@expo/vector-icons/AntDesign';
import Genres from '@/components/Gentre';
import Popularity from '@/components/Popularity';
import Ratings from '@/components/Rating';
import useStyles from './styles/movieDetail.styles'

const MovieDetailScreen = () => {

    const styles = useStyles()
    const orientation = useOrientation()
    const theme = useTheme()
    const navigation = useNavigation()

    const { id } = useLocalSearchParams<{ id: string }>();
    const { state } = useMovieContext();

    const movie: Movie = state[state.currentFilter].movies.find((m) => m.id === parseInt(id));

    return (
        <View style={[styles.container, { flexDirection: orientation === 'landscape' ? 'row' : 'column' }]}>
            <View style={styles.top}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.back}>
                        <AntDesign name="left" size={scale(15)} color={theme.colors.primary} />
                        <Text style={styles.ios}>Back</Text>
                    </Pressable>
                </View>
                <View style={styles.backdrop}>
                    <Image
                        style={styles.poster}
                        source={image(movie.poster_path)}
                    />
                </View>
            </View>
            <View style={[styles.bottom, { justifyContent: orientation === 'landscape' ? 'center' : 'flex-start' }]}>
                <Text style={styles.name}>{movie.original_title}</Text>
                <View style={styles.info}>
                    <Text style={styles.date}>Released {formatReleaseDate(movie.release_date)}</Text>
                    <Ratings rating={movie.vote_average} />
                </View>
                {movie.genre_ids.length > 0 && <Genres genres_id={movie.genre_ids.slice(0, 3)} />}
                <View style={styles.popularity}>
                    <Text style={styles.popularity_label}>popularity</Text>
                    <Popularity popularity={movie.popularity} />
                </View>
                <Text style={styles.description}>{movie.overview}</Text>
            </View>
        </View>
    );
};

export default MovieDetailScreen;