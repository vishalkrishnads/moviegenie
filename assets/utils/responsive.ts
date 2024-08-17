import { useState, useEffect, useMemo } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = width - 100;
const guidelineBaseHeight = 680;

const getOrientation = ({ width, height }: ScaledSize): 'portrait' | 'landscape' => 
  width > height ? 'landscape' : 'portrait';

export const useOrientation = (): 'portrait' | 'landscape' => {
  const [dimensions, setDimensions] = useState<ScaledSize>(Dimensions.get('window'));

  useEffect(() => {
    const handleOrientationChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      subscription?.remove();
    };
  }, []);

  const orientation = useMemo(() => getOrientation(dimensions), [dimensions]);

  return orientation;
};

export const scale = (size: number): number => width / guidelineBaseWidth * size;
export const verticalScale = (size: number): number => height / guidelineBaseHeight * size;
export const moderateScale = (size: number, factor: number = 0.5): number => size + (scale(size) - size) * factor;

export const isTablet = (): boolean => {
  const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  return diagonal/100 > 10;
};
