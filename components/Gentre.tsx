import { verticalScale } from "@/assets/utils/responsive"
import { createStyles } from "@/assets/utils/theme"
import { scale } from "@/assets/utils/responsive"
import { StyleSheet, Text, View } from "react-native"
import { useMovieContext } from "@/contexts/MovieContext"

type Props = {
    genres_id: number[];
};

const Genres = ({ genres_id }: Props) => {
    const styles = useStyles();
    const { genres } = useMovieContext().state;

    const getGenreName = (id: number) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
    };

    const Genre = ({ name }: { name: string }) => {
        return (
            <View style={styles.genre}>
                <Text style={styles.name}>{name}</Text>
            </View>
        );
    };

    return (
        <View style={styles.root}>
            {genres_id
                .map((id) => getGenreName(id))
                .filter((name) => name !== null)
                .map((name, index) => (
                    <Genre key={index} name={name!} />
                ))}
        </View>
    );
};


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
