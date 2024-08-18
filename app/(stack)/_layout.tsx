import { MovieProvider } from '@/contexts/MovieContext';
import { Stack } from 'expo-router';

export default function StackLayout() {
    return <MovieProvider>
        <Stack screenOptions={{ headerShown: false }} />
    </MovieProvider>;
}