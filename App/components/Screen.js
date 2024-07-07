import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Screen = ({ children, colors, start, end, locations, style, ...restProps }) => {
  const defaultColors = ['#FFFFFF', '#6DA0E6']; // Default gradient colors
  const defaultStart = { x: 0, y: 0 }; // Default start position
  const defaultEnd = { x: 1, y: 1 }; // Default end position

  return (
    <LinearGradient
      colors={colors || defaultColors}
      start={start || defaultStart}
      end={end || defaultEnd}
      locations={locations}
      style={[styles.container, style]}
      {...restProps}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;