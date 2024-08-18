import { useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { scale, moderateScale } from './responsive';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

const palette = {
  white: 'rgb(251 248 255)',
  black: "#000000",
  grey: "rgb(27 27 33)"
};

interface ThemeColors {
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  error: string;
  onError: string;
}

const lightTheme: ThemeColors = {
  primary: "rgb(83 90 146)",
  onPrimary: palette.white,
  secondary: "rgb(224 225 249)",
  onSecondary: palette.black,
  tertiary: palette.lightPurple,
  onTertiary: palette.black,
  background: palette.white,
  onBackground: palette.black,
  surface: palette.grey,
  onSurface: palette.black,
  error: palette.red,
  onError: palette.white,
};

const darkTheme: ThemeColors = {
  primary: "rgb(188 195 255)",
  onPrimary: palette.black,
  secondary: "rgb(34 34 43)",
  onSecondary: palette.white,
  tertiary: palette.darkPurple,
  onTertiary: palette.white,
  background: "rgb(19 19 24)",
  onBackground: palette.white,
  surface: palette.black,
  onSurface: palette.white,
  error: palette.red,
  onError: palette.white,
};

export const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// Hook to get the current theme
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors: ThemeColors = isDark ? darkTheme : lightTheme;

  const setNavigationBarColor = async () => {
    await NavigationBar.setBackgroundColorAsync(colors.background);
    await NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
    setStatusBarBackgroundColor(colors.background, true)
  };

  setNavigationBarColor();

  return {
    isDark,
    colors,
    spacing: {
      s: moderateScale(5),
      m: moderateScale(16),
      l: moderateScale(24),
      xl: moderateScale(45),
    },
    textVariants: {
      header: {
        fontFamily: 'Poppins_700Bold',
        fontSize: scale(34),
      },
      title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: scale(12),
        fontWeight: '500' as const,
      },
      body: {
        fontFamily: 'Poppins_400Regular',
        fontSize: scale(10),
      },
      button: {
        fontFamily: 'Poppins_500Medium',
        fontSize: scale(14),
        fontWeight: '500' as const,
      },
    },
  };
};

// Type for style functions
type StylesFunction = (theme: ReturnType<typeof useTheme>) => { [key: string]: any };

// Function to create responsive styles
export const createStyles = (stylesFunction: StylesFunction) => {
  return () => {
    const theme = useTheme();
    const baseStyles = stylesFunction(theme);
    
    return baseStyles;
  };
};