import { StyleSheet } from 'react-native';
import { scale, isTablet, moderateScale, verticalScale } from '@/assets/utils/responsive';
import { createStyles } from '@/assets/utils/theme';

export default createStyles((theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.m,
        backgroundColor: theme.colors.background,
    },
    top: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: scale(isTablet() ? 10 : 5)
    },
    back: {
        width: '25%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    ios: {
        ...theme.textVariants.title,
        color: theme.colors.primary,
        marginTop: 3,
        marginLeft: 3
    },
    backdrop: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    poster: {
        width: moderateScale(isTablet() ? 500 : 250),
        height: moderateScale(isTablet() ? 500 : 250),
        borderRadius: scale(20)
    },
    bottom: {
        flex: 1,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10)
    },
    name: {
        ...theme.textVariants.header,
        fontSize: scale(isTablet() ? 34 : 20),
        color: theme.colors.onSecondary,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: verticalScale(10)
    },
    date: {
        ...theme.textVariants.body,
        color: 'grey',
        fontSize: scale(isTablet() ? 20 : 10),
        marginRight: scale(10)
    },
    popularity: {
        height: verticalScale(40),
        marginVertical: verticalScale(5)
    },
    popularity_label: {
        color: theme.colors.primary,
        fontSize: scale(isTablet() ? 15 : 12),
        marginBottom: verticalScale(5)
    },
    description: {
        ...theme.textVariants.body,
        fontSize: scale(isTablet() ? 18 : 10),
        color: theme.colors.onSecondary
    }
}));