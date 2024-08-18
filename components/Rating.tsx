import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createStyles, useTheme } from "@/assets/utils/theme";
import AntDesign from '@expo/vector-icons/AntDesign';
import { scale, verticalScale, isTablet } from "@/assets/utils/responsive";

interface RatingsProps {
    rating: number; // The rating out of 10
}

const Ratings: React.FC<RatingsProps> = ({ rating }) => {
    const styles = useStyles();
    const theme = useTheme();

    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
            <AntDesign
                key={index}
                name="star"
                size={scale(15)}
                color={starValue <= rating / 2 ? theme.colors.primary : 'grey'}
                style={{ marginRight: 2 }}
            />
        );
    });

    return (
        <View style={styles.root}>
            {stars}
            <Text style={[styles.rating, { color: theme.colors.primary, marginLeft: 5 }]}>
                {rating.toFixed(1)}
            </Text>
            <Text style={styles.rating}>/10</Text>
        </View>
    );
};

const useStyles = createStyles((theme) => StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        ...theme.textVariants.title,
        color: theme.colors.onSecondary,
        fontSize: scale(10),
        marginTop: verticalScale(isTablet() ? 2 : 4)
    }
}));

export default Ratings;
