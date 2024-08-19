import React, { useState, useEffect } from "react"
import * as Progress from 'react-native-progress'
import { View, Dimensions, FlatList } from "react-native"
import { Search } from "@/components/Search"
import { useOrientation, isTablet, scale } from "@/assets/utils/responsive"
import { Movie } from "@/constants/types"
import Card from "@/components/Card"
import useStyles from './styles/search.styles'
import { useMovieContext } from "@/contexts/MovieContext"
import { useTheme } from "@/assets/utils/theme"
import { useNavigation } from "expo-router"

const SearchScreen = () => {
    const styles = useStyles();
    const orientation = useOrientation();
    const theme = useTheme();
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState<string | null>(null); // Store search query
    const [page, setPage] = useState(1); // Track current page

    const { state, dispatch, searchMovies } = useMovieContext();
    
    // fix for a small logical bug. since searchResults is treated as a filter in the context,
    // the list screen shows search results when navigating back. this forces the filter to be reset
    useEffect(() => { 
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            dispatch({ type: 'SET_FILTER', payload: 'upcoming' })
            navigation.dispatch(e.data.action);
        });
    }, []);

    // helper function to search
    const handleSearch = async (searchQuery: string) => {
        setLoading(true);
        setQuery(searchQuery);
        setPage(1);
        try {
            await searchMovies(searchQuery, 1);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    // helper function for infinite scroll
    const loadMoreMovies = async () => {
        if (!loading && query) {
            setLoading(true);
            try {
                const nextPage = page + 1;
                await searchMovies(query, nextPage);
                setPage(nextPage);
            } catch (error) {
                console.error('Load more error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    // logic for adjusting columns based on orientation
    // repeats in list screen, can be refactored
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
            <Search onSearch={handleSearch} />
            <FlatList
                data={state.searchResults.movies}
                keyExtractor={(_, index) => index.toString()}
                numColumns={numColumns}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: scale(90) }}
                key={numColumns} // Force re-render on orientation change
                onEndReached={loadMoreMovies}
                onEndReachedThreshold={0.5}
            />
            {loading && (
                <Progress.Bar
                    indeterminate
                    borderWidth={0}
                    color={theme.colors.primary}
                />
            )}
        </View>
    );
};

export default SearchScreen;

