import { createStyles } from "@/assets/utils/theme"
import { StyleSheet, View, TextInput, Pressable } from "react-native"
import { useTheme } from "@/assets/utils/theme"
import { isTablet, scale, useOrientation } from "@/assets/utils/responsive"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

const Search = () => {
    const styles = useStyles()
    const theme = useTheme()
    const orientation = useOrientation()

    const [query, setQuery] = useState('')

    return <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search movies..."
                placeholderTextColor={theme.colors.onSecondary}
                value={query}
                onChangeText={value => setQuery(value)}
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
        flexDirection: 'row',
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
    }
}))

export default Search
