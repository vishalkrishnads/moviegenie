import { createStyles, useTheme } from "@/assets/utils/theme"
import { StyleSheet, View, Text } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { scale, verticalScale } from "@/assets/utils/responsive";

const Help = () => {
    const styles = useStyles()
    const theme = useTheme()

    return <View style={styles.container}>
        <MaterialCommunityIcons name="server-network-off" size={scale(24)} color={theme.colors.onBackground} />
        <Text style={styles.title}>Unable to reach TMDB servers. Government Of India has been known to block TMDB.</Text>
        <Text style={styles.title}>Try using a VPN instead & relaunch the app.</Text>
    </View>
}

const useStyles = createStyles((theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(20)
    },
    title: {
        ...theme.textVariants.body,
        color: theme.colors.onBackground,
        textAlign: 'center',
        marginTop: verticalScale(5)
    }
}))

export default Help
