import { StyleSheet } from "react-native";
import { createStyles } from "@/assets/utils/theme";

export default createStyles((theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    }
}))