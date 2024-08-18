import React from 'react';
import { View, Text, FlatList, TextInput, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { scale, useOrientation, isTablet } from '@/assets/utils/responsive';
import { useTheme, blurhash } from '@/assets/utils/theme'
import Genre from '@/components/Gentre';
import useStyles from './styles/movieList.styles'
import Search from '@/components/Search';
import Popularity from '@/components/Popularity';
import Rating from '@/components/Rating';

const MovieListScreen = () => {

    const styles = useStyles()
    const theme = useTheme()
    const orientation = useOrientation()
    const screenWidth = Dimensions.get('window').width;

    // Mock data for demonstration
    const movies: Movie[] = [
        {
            "adult": false,
            "backdrop_path": "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
            "genre_ids": [
                28,
                35,
                878
            ],
            "id": 533535,
            "original_language": "en",
            "original_title": "Deadpool & Wolverine",
            "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
            "popularity": 9734.605,
            "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
            "release_date": "2024-07-24",
            "title": "Deadpool & Wolverine",
            "video": false,
            "vote_average": 7.8,
            "vote_count": 1846
        },
        {
            "adult": false,
            "backdrop_path": "/3q01ACG0MWm0DekhvkPFCXyPZSu.jpg",
            "genre_ids": [
                28,
                80,
                53,
                35
            ],
            "id": 573435,
            "original_language": "en",
            "original_title": "Bad Boys: Ride or Die",
            "overview": "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
            "popularity": 3001.161,
            "poster_path": "/oGythE98MYleE6mZlGs5oBGkux1.jpg",
            "release_date": "2024-06-05",
            "title": "Bad Boys: Ride or Die",
            "video": false,
            "vote_average": 7.63,
            "vote_count": 1530
        },
        {
            "adult": false,
            "backdrop_path": "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
            "genre_ids": [
                16,
                10751,
                12,
                35
            ],
            "id": 1022789,
            "original_language": "en",
            "original_title": "Inside Out 2",
            "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
            "popularity": 3179.049,
            "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
            "release_date": "2024-06-11",
            "title": "Inside Out 2",
            "video": false,
            "vote_average": 7.609,
            "vote_count": 2374
        },
        {
            "adult": false,
            "backdrop_path": "/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
            "genre_ids": [
                16,
                10751,
                35,
                28
            ],
            "id": 519182,
            "original_language": "en",
            "original_title": "Despicable Me 4",
            "overview": "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
            "popularity": 2783.962,
            "poster_path": "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
            "release_date": "2024-06-20",
            "title": "Despicable Me 4",
            "video": false,
            "vote_average": 7.353,
            "vote_count": 991
        },

    ];

    type CardProps = { movie: Movie; width: number };
    const Card = ({ movie, width }: CardProps) => {
        return (
            <Link href={`/(stack)/${movie.id}`}>
                <View style={[styles.movie, { width }]}>
                    <View style={styles.card}>
                        <View style={styles.cardPoster}>
                            <Image
                                style={styles.poster}
                                placeholder={{ blurhash }}
                                source={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            />
                        </View>
                        <View style={styles.cardDetails}>
                            <Text style={styles.title}>{movie.original_title}</Text>
                            <Genre />
                            <Text style={[theme.textVariants.body, { color: 'grey' }]}>Released {movie.release_date}</Text>
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
    };

    const getNumColumns = () => {
        if (isTablet()) {
            return Math.floor(screenWidth / 350);
        }
        return orientation === 'landscape' ? 2 : 1;
    };

    const numColumns = getNumColumns();
    const cardWidth = screenWidth / numColumns - (styles.container.padding as number) * 2;

    return (
        <View style={styles.container}>
            <Search />
            <FlatList
                data={movies}
                keyExtractor={(item) => `${item.id}`}
                numColumns={numColumns}
                renderItem={({ item }) => <Card movie={item} width={cardWidth - 10} />}
                contentContainerStyle={[styles.listContainer, { paddingTop: scale(70) }]}
                key={numColumns} // Force re-render on orientation change
            />
        </View>
    );
};

export default MovieListScreen;