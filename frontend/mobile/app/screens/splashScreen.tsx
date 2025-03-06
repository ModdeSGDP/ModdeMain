import * as React from "react";
import { Image, StyleSheet, View, Animated, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

// Define RootStackParamList directly within this file
type RootStackParamList = {
  SplashScreen: undefined;
  OnboardingPage: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "SplashScreen">;

const SplashScreen = () => {
  const titleOpacity = new Animated.Value(0);
  const titleScale = new Animated.Value(0.5);
  const subtitleOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0); // New animated value for the text
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    console.log("SplashScreen: Component mounted");

    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(titleScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();

      // Fade in the "Snap, Style & Slay" text after the logo animation
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });

    const timer = setTimeout(() => {
      console.log("SplashScreen: Navigating to OnboardingPage now...");
      navigation.navigate("OnboardingPage");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashScreen}>
      <Image style={styles.splashScreenChild} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      <Image style={styles.splashScreenItem} resizeMode="cover" source={require("../assets/Ellipse3.png")} />
      <Animated.Image
        style={[
          styles.splashScreenInner,
          styles.homeIndicator1Position,
          { opacity: titleOpacity, transform: [{ scale: titleScale }] },
        ]}
        resizeMode="cover"
        source={require("../assets/logo5.png")}
      />
      {/* Add the "Snap, Style & Slay" text with animation */}
      <Animated.Text
        style={[
          styles.snapStyleSlayText,
          { opacity: textOpacity }, // Apply the fade-in animation
        ]}
      >
        Snap, Style & Slay
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeIndicator1Position: {
    left: "50%",
    position: "absolute",
  },
  splashScreenChild: {
    top: -6,
    left: -139,
    width: 449,
    height: 353,
    position: "absolute",
  },
  splashScreenItem: {
    top: 465,
    left: 10,
    width: 530,
    height: 381,
    position: "absolute",
  },
  splashScreenInner: {
    marginTop: -80,
    marginLeft: -112.5,
    top: "50%",
    width: 224,
    height: 160,
  },
  snapStyleSlayText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20, // Adjust this value to position the text below the logo
    position: "absolute",
    top: "60%", // Adjust this value to position the text below the logo
    left: "50%",
    transform: [{ translateX: -100 }], // Center the text horizontally
  },
  splashScreen: {
    borderRadius: 0,
    backgroundColor: "#fff",
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
  },
});

export default SplashScreen;