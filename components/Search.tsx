import { createStyles } from "@/assets/utils/theme"
import { StyleSheet, View, ScrollView, TextInput, Text, Pressable } from "react-native"
import { useTheme } from "@/assets/utils/theme"
import { isTablet, scale, useOrientation } from "@/assets/utils/responsive"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import { useMovieContext, MovieState } from "@/contexts/MovieContext";
import { useNavigation, useRouter } from "expo-router";

const filterLabels: Record<MovieState['currentFilter'], string> = {
    trending: 'Trending',
    upcoming: 'Upcoming',
    nowPlaying: 'Now Playing',
    topRated: 'Top Rated'
};

export const Bar = () => {
    const styles = useStyles();
    const theme = useTheme();
    const orientation = useOrientation();
    const router = useRouter()
    const { state, dispatch } = useMovieContext();

    const filters: Array<MovieState['currentFilter']> = ['trending', 'upcoming', 'nowPlaying', 'topRated'];

    const handleFilterPress = (filter: MovieState['currentFilter']) => {
        dispatch({ type: 'SET_FILTER', payload: filter });
    };

    return (
        <View style={styles.searchBarContainer}>
            <Pressable onPress={() => router.push("/search")} style={styles.searchBar}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    placeholderTextColor={theme.colors.onSecondary}
                    editable={false}
                />
                <View style={{ flex: orientation === 'landscape' ? 1 : 2, justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="search1" size={24} color={theme.colors.onSecondary} />
                </View>
            </Pressable>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
                {filters.map((filter) => (
                    <Pressable
                        key={filter}
                        style={[
                            styles.filter,
                            state.currentFilter === filter && { backgroundColor: theme.colors.primary }
                        ]}
                        onPress={() => handleFilterPress(filter)}
                    >
                        <Text
                            style={[
                                styles.label,
                                state.currentFilter === filter && { color: theme.colors.onPrimary }
                            ]}
                        >
                            {filterLabels[filter]}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
};

type Props = { onSearch: (query: string) => void }
export const Search = ({ onSearch }: Props) => {
    const styles = useStyles()
    const theme = useTheme()
    const orientation = useOrientation()
    const navigation = useNavigation()

    const [query, setQuery] = useState('')

    useEffect(() => {
        if(query) onSearch(query)
    }, [query])

    return <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
            <Pressable onPress={() => navigation.goBack()} style={{ flex: orientation === 'landscape' ? 1 : 2, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="left" size={scale(15)} color={theme.colors.onSecondary} />
            </Pressable>
            <TextInput
                style={[styles.searchInput, { paddingLeft: 0 }]}
                placeholder="Search by name"
                placeholderTextColor={theme.colors.onSecondary}
                value={query}
                onChangeText={value => setQuery(value)}
                autoFocus
                returnKeyType="search"
            />
            <Pressable onPress={() => setQuery('')} style={{ flex: orientation === 'landscape' ? 1 : 2, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name={query ? "close" : "search1"} size={24} color={theme.colors.onSecondary} />
            </Pressable>
        </View>
    </View>
}

const useStyles = createStyles((theme) => StyleSheet.create({
    searchBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1, // Ensures the search bar is on top
        elevation: 3, // for Android shadow
        padding: theme.spacing.m,
        alignItems: 'center',
        paddingHorizontal: isTablet() ? '15%' : '3%',
    },
    searchBar: {
        flex: 1,
        height: scale(40),
        backgroundColor: theme.colors.secondary,
        borderRadius: scale(20),
        marginLeft: theme.spacing.s,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 8,
        paddingHorizontal: theme.spacing.m,
        color: theme.colors.onSecondary,
        fontSize: scale(10),
        fontFamily: 'Poppins_400Regular'
    },
    filters: {
        height: scale(25),
        width: '90%',
        marginVertical: scale(10)
    },
    filter: {
        borderWidth: scale(2),
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: scale(2),
        padding: scale(5),
        paddingHorizontal: scale(10),
        borderRadius: scale(20)
    },
    label: {
        ...theme.textVariants.title,
        color: theme.colors.onSecondary,
        fontSize: scale(8),
        margin: 0
    }
}))
