import { StyleSheet } from 'react-native';
import { isTablet, scale, verticalScale } from '@/assets/utils/responsive';
import { createStyles } from '@/assets/utils/theme';

export default createStyles((theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        paddingHorizontal: theme.spacing.s,
    },
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
}));
