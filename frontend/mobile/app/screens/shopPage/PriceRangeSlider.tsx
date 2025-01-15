import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  onChange: (low: number, high: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, onChange }) => {
  const [sliderWidth, setSliderWidth] = useState(300);
  const lowPriceRef = useRef(min);
  const highPriceRef = useRef(max);

  const lowThumbX = useRef(new Animated.Value(0)).current;
  const highThumbX = useRef(new Animated.Value(sliderWidth)).current;

  const updatePrices = useCallback((low: number, high: number) => {
    lowPriceRef.current = low;
    highPriceRef.current = high;
    onChange(low, high);
  }, [onChange]);

  useEffect(() => {
    updatePrices(min, max);
  }, [min, max, updatePrices]);

  const createPanResponder = useCallback((isLow: boolean) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      let newX = isLow ? lowThumbX._value + gestureState.dx : highThumbX._value + gestureState.dx;
      newX = Math.max(0, Math.min(newX, sliderWidth));

      const newPrice = Math.round(min + (newX / sliderWidth) * (max - min));

      if (isLow && newPrice < highPriceRef.current) {
        lowPriceRef.current = newPrice;
        lowThumbX.setValue(newX);
      } else if (!isLow && newPrice > lowPriceRef.current) {
        highPriceRef.current = newPrice;
        highThumbX.setValue(newX);
      }
    },
    onPanResponderRelease: () => {
      updatePrices(lowPriceRef.current, highPriceRef.current);
    },
  }), [lowThumbX, highThumbX, min, max, sliderWidth, updatePrices]);

  const lowPanResponder = useRef(createPanResponder(true)).current;
  const highPanResponder = useRef(createPanResponder(false)).current;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>LKR {lowPriceRef.current}</Text>
        <Text style={styles.label}>LKR {highPriceRef.current}</Text>
      </View>
      <View
        style={styles.sliderContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setSliderWidth(width);
        }}
      >
        <View style={styles.track} />
        <Animated.View
          style={[
            styles.selectedTrack,
            {
              left: lowThumbX,
              right: Animated.subtract(sliderWidth, highThumbX),
            },
          ]}
        />
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX: lowThumbX }] }]}
          {...lowPanResponder.panHandlers}
        />
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX: highThumbX }] }]}
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
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#321919',
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
    height: 4,
    backgroundColor: '#DADADA',
  },
  selectedTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#F97C7C',
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F97C7C',
    top: 10,
    marginLeft: -10,
  },
});

export default PriceRangeSlider;
