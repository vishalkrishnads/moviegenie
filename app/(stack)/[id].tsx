import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { scale, useOrientation } from '@/assets/utils/responsive';
import useStyles from './styles/movieDetail.styles'
import { useTheme } from '@/assets/utils/theme';
import { Image } from 'expo-image';
import Genres from '@/components/Gentre';
import Popularity from '@/components/Popularity';
import Ratings from '@/components/Rating';

const MovieDetailScreen = () => {

    const styles = useStyles()
    const orientation = useOrientation()
    const theme = useTheme()
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View style={[styles.container, { flexDirection: orientation === 'landscape' ? 'row' : 'column' }]}>
            <View style={styles.top}>
                <View style={styles.header}>
                    <Pressable style={styles.back}>
                        <AntDesign name="left" size={scale(15)} color={theme.colors.primary} />
                        <Text style={styles.ios}>Back</Text>
                    </Pressable>
                </View>
                <View style={styles.backdrop}>
                    <Image
                        style={styles.poster}
                        source={`https://image.tmdb.org/t/p/original/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg`}
                    />
                </View>
            </View>
            <View style={[styles.bottom, { justifyContent: orientation === 'landscape' ? 'center' : 'flex-start' }]}>
                <Text style={styles.name}>The Fast & The Furious 5</Text>
                <View style={styles.info}>
                    <Text style={styles.date}>Released 27 June, 2007</Text>
                    <Ratings rating={5} />
                </View>
                <Genres />
                <View style={styles.popularity}>
                    <Text style={styles.popularity_label}>popularity</Text>
                    <Popularity popularity={70} />
                </View>
                <Text style={styles.description}>
                    Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.
                </Text>
            </View>
        </View>
    );
};

export default MovieDetailScreen;