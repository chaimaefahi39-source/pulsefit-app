import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, useDerivedValue } from 'react-native-reanimated';
import { TextInput, StyleSheet } from 'react-native';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function AnimatedCounter({ value }: { value: number }) {
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    sharedValue.value = withTiming(value, { duration: 800 });
  }, [value]);

  const animatedProps = useDerivedValue(() => {
    return { text: `${Math.floor(sharedValue.value)}` };
  });

  return (
    <AnimatedTextInput
      style={styles.text}
      defaultValue="0"
      editable={false}
      animatedProps={animatedProps as any}
    />
  );
}

const styles = StyleSheet.create({
  text: { color: '#FFFFFF', fontSize: 48, fontWeight: 'bold', textAlign: 'center' },
});