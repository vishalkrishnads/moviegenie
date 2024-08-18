import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Movie } from "@/constants/types";
import { formatReleaseDate, image } from "@/api";
import { createStyles, useTheme } from "@/assets/utils/theme";
import { isTablet, scale, verticalScale } from "@/assets/utils/responsive";
import Ratings from "./Rating";
import Popularity from "./Popularity";
import Genres from "./Gentre";

type Props = { movie: Movie; width: number };
const Card = React.memo(({ movie, width }: Props) => {
    const theme = useTheme()
    const styles = useStyles()

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
                        {movie.genre_ids.length > 0 && <Genres genres_id={movie.genre_ids.splice(0, 2)} />}
                        <Text style={[theme.textVariants.body, { color: 'grey' }]}>Released {formatReleaseDate(movie.release_date)}</Text>
                        <View style={styles.popularity}>
                            <Popularity popularity={Math.round(movie.popularity / 100)} />
                        </View>
                        <View style={styles.rating}>
                            <Ratings rating={movie.vote_average} />
                        </View>
                    </View>
                </View>
            </View>
        </Link>
    );
});

const useStyles = createStyles((theme) => StyleSheet.create({
    movie: {
        height: verticalScale(isTablet() ? 150 : 200),
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
    },
    card: {
        backgroundColor: theme.colors.secondary,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        borderRadius: scale(20)
    },
    cardPoster: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardDetails: {
        flex: 3,
        justifyContent: 'center',
        paddingRight: scale(5)
    },

    poster: {
        width: 80,
        height: 140,
        borderRadius: scale(10)
    },

    title: {
        ...theme.textVariants.title,
        color: theme.colors.onSecondary,
        marginBottom: theme.spacing.s,
    },
    popularity: {
        height: scale(19),
        paddingRight: scale(20),
        paddingVertical: verticalScale(2),
    },
    rating: {
        height: scale(20),
        width: '100%',
    }
}))

export default Card
