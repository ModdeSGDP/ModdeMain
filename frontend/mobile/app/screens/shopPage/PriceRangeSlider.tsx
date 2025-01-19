import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, LayoutChangeEvent } from 'react-native';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  onChange: (low: number, high: number) => void;
  initialLow?: number;
  initialHigh?: number;
  step?: number;
  prefix?: string;
  thumbColor?: string;
  thumbBorderColor?: string;
  trackColor?: string;
  highlightColor?: string;
  textColor?: string;
  thumbSize?: number;
  trackHeight?: number;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min,
  max,
  onChange,
  initialLow = min,
  initialHigh = max,
  step = 1,
  prefix = 'LKR',
  thumbColor = '#FFFFFF',
  thumbBorderColor = '#F97C7C',
  trackColor = '#DADADA',
  highlightColor = '#F97C7C',
  textColor = '#321919',
  thumbSize = 20,
  trackHeight = 2,
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const lowPrice = useRef(new Animated.Value(initialLow)).current;
  const highPrice = useRef(new Animated.Value(initialHigh)).current;

  const updatePrices = useCallback((low: number, high: number) => {
    onChange(low, high);
  }, [onChange]);

  useEffect(() => {
    updatePrices(initialLow, initialHigh);
  }, [initialLow, initialHigh, updatePrices]);

  const valueToPosition = useCallback((value: number) => {
    return ((value - min) / (max - min)) * sliderWidth;
  }, [min, max, sliderWidth]);

  const positionToValue = useCallback((position: number) => {
    let value = min + (position / sliderWidth) * (max - min);
    return Math.round(value / step) * step;
  }, [min, max, sliderWidth, step]);

  useEffect(() => {
    if (sliderWidth > 0) {
      Animated.parallel([
        Animated.timing(lowPrice, { toValue: initialLow, duration: 0, useNativeDriver: false }),
        Animated.timing(highPrice, { toValue: initialHigh, duration: 0, useNativeDriver: false }),
      ]).start();
    }
  }, [sliderWidth, lowPrice, highPrice, initialLow, initialHigh]);

  const lowThumbX = lowPrice.interpolate({
    inputRange: [min, max],
    outputRange: [0, sliderWidth],
    extrapolate: 'clamp',
  });

  const highThumbX = highPrice.interpolate({
    inputRange: [min, max],
    outputRange: [0, sliderWidth],
    extrapolate: 'clamp',
  });

  const createPanResponder = useCallback((isLow: boolean) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const value = isLow ? lowPrice : highPrice;
      let newPosition = valueToPosition(value._value) + gestureState.dx;
      newPosition = Math.max(0, Math.min(newPosition, sliderWidth));
      
      const newValue = positionToValue(newPosition);
      
      if (isLow && newValue < highPrice._value) {
        Animated.timing(value, { toValue: newValue, duration: 0, useNativeDriver: false }).start();
      } else if (!isLow && newValue > lowPrice._value) {
        Animated.timing(value, { toValue: newValue, duration: 0, useNativeDriver: false }).start();
      }
      
      updatePrices(lowPrice._value, highPrice._value);
    },
    onPanResponderRelease: () => {
      updatePrices(lowPrice._value, highPrice._value);
    },
  }), [lowPrice, highPrice, valueToPosition, positionToValue, sliderWidth, updatePrices]);

  const lowPanResponder = useRef(createPanResponder(true)).current;
  const highPanResponder = useRef(createPanResponder(false)).current;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  const formatPrice = (price: Animated.Value) => {
    return price.interpolate({
      inputRange: [min, max],
      outputRange: [min.toFixed(0), max.toFixed(0)],
      extrapolate: 'clamp',
    });
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, { color: textColor }]}>Price Range</Animated.Text>
      <View style={styles.labelContainer}>
        <Animated.Text style={[styles.label, { color: textColor }]}>
          {prefix} {formatPrice(lowPrice)}
        </Animated.Text>
        <Animated.Text style={[styles.label, { color: textColor }]}>
          {prefix} {formatPrice(highPrice)}
        </Animated.Text>
      </View>
      <View style={styles.sliderContainer} onLayout={onLayout}>
        <View style={[styles.track, { height: trackHeight, backgroundColor: trackColor }]} />
        <Animated.View
          style={[
            styles.selectedTrack,
            {
              left: lowThumbX,
              right: Animated.subtract(sliderWidth, highThumbX),
              height: trackHeight,
              backgroundColor: highlightColor,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: lowThumbX }],
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              borderColor: thumbBorderColor,
            },
          ]}
          {...lowPanResponder.panHandlers}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: highThumbX }],
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              borderColor: thumbBorderColor,
            },
          ]}
          {...highPanResponder.panHandlers}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  sliderContainer: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  selectedTrack: {
    position: 'absolute',
  },
  thumb: {
    position: 'absolute',
    borderWidth: 2,
    top: 10,
    marginLeft: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PriceRangeSlider;

