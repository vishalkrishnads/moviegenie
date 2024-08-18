import { Redirect } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export default function App() {

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    useEffect(() => {
        async function prepare() {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return <Redirect href="/(stack)/" />;
}
