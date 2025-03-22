import * as React from "react";
import { Image, StyleSheet, View, Animated, Text, Easing } from "react-native";
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
  const titleScale = new Animated.Value(0.8);
  const subtitleOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const textSlide = new Animated.Value(50); // For sliding the text up
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    console.log("SplashScreen: Component mounted");

    // Logo animation (fade in and scale)
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(titleScale, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Text animation (fade in and slide up)
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(textSlide, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });

    const timer = setTimeout(() => {
      console.log("SplashScreen: Navigating to OnboardingPage now...");
      navigation.navigate("OnboardingPage");
    }, 3500);

    return () => clearTimeout(timer);
  }, [titleOpacity, titleScale, textOpacity, textSlide, navigation]);

  return (
    <View style={styles.splashScreen}>
      <Image
        style={styles.splashScreenChild}
        resizeMode="cover"
        source={require("../assets/Ellipse1.png")}
      />
      <Image
        style={styles.splashScreenItem}
        resizeMode="cover"
        source={require("../assets/Ellipse2.png")}
      />
      <Animated.Image
        style={[
          styles.splashScreenInner,
          styles.homeIndicator1Position,
          {
            opacity: titleOpacity,
            transform: [{ scale: titleScale }],
          },
        ]}
        source={require("../assets/logo5.png")}
      />
      <Animated.Text
        style={[
          styles.snapStyleSlayText,
          {
            opacity: textOpacity,
            transform: [{ translateY: textSlide }],
          },
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
    top: -50,
    left: -150,
    width: 500,
    height: 400,
    position: "absolute", // Kept subtle opacity for ellipses
  },
  splashScreenItem: {
    top: 450,
    left: -50,
    width: 600,
    height: 450,
    position: "absolute", // Kept subtle opacity for ellipses
  },
  splashScreenInner: {
    marginTop: -100,
    marginLeft: -120,
    top: "50%",
    width: 240,
    height: 170,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  snapStyleSlayText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FF6B6B",
    textAlign: "center",
    position: "absolute",
    bottom: 350,
    left: 85,
    transform: [{ translateX: -110 }],
    fontFamily: "Inter-Bold",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  splashScreen: {
    borderRadius: 0,
    backgroundColor: "#FFFFFF", // Changed to solid white
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;