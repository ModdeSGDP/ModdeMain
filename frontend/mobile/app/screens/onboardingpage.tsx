import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

const OnboardingPage = () => {
  const navigation = useNavigation(); // Use the navigation hook

  return (
    <View style={styles.onboardingPage}>
      <Image
        style={styles.onboardingPageChild}
        resizeMode="cover"
        source={require("../assets/Ellipse1.png")}
      />
      <Image
        style={[styles.onboardingPageItem, styles.buttonPosition]}
        resizeMode="cover"
        source={require("../assets/chevron_left.png")}
      />
      <Text style={[styles.getStartedWith, styles.logoIconPosition]}>
        Get Started with Modde
      </Text>
      <Image
        style={[styles.logoIcon, styles.logoIconPosition]}
        resizeMode="cover"
        source={require("../assets/logo.png")}
      />
      <Pressable
        style={[styles.button, styles.buttonPosition]}
        onPress={() => navigation.navigate('Intro1')} // Navigate to the Intro1 screen
      >
        <Image
          style={[styles.buttonChild, styles.buttonLayout]}
          resizeMode="cover"
          source={require("../assets/rectangle16.png")}
        />
        <Text style={styles.continue}>Continue</Text>
        <Image
          style={[styles.buttonItem, styles.buttonLayout]}
          resizeMode="cover"
          source={require("../assets/chevron_left1.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonPosition: {
    left: 24,
    position: "absolute",
  },
  logoIconPosition: {
    left: "50%",
    position: "absolute",
  },
  buttonLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  onboardingPageChild: {
    top: -6,
    left: -139,
    width: 449,
    height: 353,
    position: "absolute",
  },
  onboardingPageItem: {
    top: 59,
    height: 27,
    width: 27,
  },
  getStartedWith: {
    marginLeft: -144.5,
    top: 628,
    fontSize: 18,
    lineHeight: 23,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
    width: 288,
    textAlign: "center",
    fontWeight: "600",
  },
  logoIcon: {
    marginTop: -80,
    marginLeft: -105.5,
    top: "50%",
    width: 224,
    height: 160,
  },
  buttonChild: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "4%",
    width: "100%",
    maxWidth: "100%",
  },
  continue: {
    height: "35%",
    width: "21.41%",
    top: "30%",
    left: "40%",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
  },
  buttonItem: {
    height: "66.5%",
    width: "8.13%",
    top: "17.5%",
    right: "26.42%",
    bottom: "16%",
    left: "64.44%",
  },
  button: {
    top: 667,
    width: 327,
    height: 40,
  },
  onboardingPage: {
    borderRadius: 0,
    backgroundColor: "#fff",
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default OnboardingPage;
