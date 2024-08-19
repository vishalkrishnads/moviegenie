import { useState, useEffect, useMemo } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

/*
    This file contains all the logic for tracking orientation changes
    along with some utilities for responsive UI design.
*/

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = width - 100;
const guidelineBaseHeight = 680;

const getOrientation = ({ width, height }: ScaledSize): 'portrait' | 'landscape' => 
  width > height ? 'landscape' : 'portrait';

// a react hook for re-rendering the UI based on orientation changes
// basically it tells the consumer what state the UI is currently in
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

// some helper functions for scaling the dimensions based on the screen sizes.
// you'll find these in the stylesheets across the project
export const scale = (size: number): number => width / guidelineBaseWidth * size;
export const verticalScale = (size: number): number => height / guidelineBaseHeight * size;
export const moderateScale = (size: number, factor: number = 0.5): number => size + (scale(size) - size) * factor;

// helper function to know whether the current device is a tablet
export const isTablet = (): boolean => {
  const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  return diagonal/100 > 10;
};
