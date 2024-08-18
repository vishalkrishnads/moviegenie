import { createStyles, useTheme } from "@/assets/utils/theme"
import { StyleSheet, View, Text } from "react-native"
import { isTablet, scale } from "@/assets/utils/responsive";
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = { popularity: number }
const Popularity = ({ popularity }: Props) => {
    const styles = useStyles()
    const theme = useTheme()

    return <View style={styles.root}>
        <AntDesign name="rocket1" size={scale(12)} color={theme.colors.primary} />
        <View style={styles.bar}>
            <View style={[styles.popularity, { width: `${popularity}%` }]}>
                <Text style={styles.label}>{popularity}%</Text>
            </View>
        </View>
    </View>
}

const useStyles = createStyles((theme) => StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        width: '90%',
        height: isTablet() ? '95%' : '50%',
        marginLeft: scale(5),
        backgroundColor: 'grey',
        borderRadius: scale(20)
    },
    popularity: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: scale(20),
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: scale(5),
    },
    label: {
        color: theme.colors.onPrimary,
        fontFamily: 'Poppins_700Bold',
        fontSize: scale(5),
        marginBottom: scale(1)
    }
}))

export default Popularity