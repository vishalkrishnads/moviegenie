import { verticalScale } from "@/assets/utils/responsive"
import { createStyles, useTheme } from "@/assets/utils/theme"
import { scale } from "@/assets/utils/responsive"
import { StyleSheet, Text, View } from "react-native"

const Genres = () => {
    const styles = useStyles()
    const theme = useTheme()

    const Genre = () => {
        return <View style={styles.genre}>
            <Text style={styles.name}>Adventure</Text>
        </View>
    }

    return <View style={styles.root}>
        <Genre />
        <Genre />
    </View>
}

const useStyles = createStyles((theme) => StyleSheet.create({
    root: {
        height: verticalScale(20),
        flexDirection: 'row',
        marginBottom: theme.spacing.s
    },
    genre: {
        paddingHorizontal: 10,
        marginRight: scale(12),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        borderRadius: scale(20)
    },
    name: {
        color: theme.colors.onPrimary,
        fontSize: scale(8),
        fontFamily: 'Poppins_500Medium'
    }
}))

export default Genres
