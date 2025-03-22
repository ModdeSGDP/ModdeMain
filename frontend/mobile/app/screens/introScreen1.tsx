import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack"; 

type RootStackParamList = {
  IntroScreen: undefined; // No parameters for IntroScreen
  Intro2: undefined; // No parameters for Intro2
  Login: undefined; // No parameters for Login
  OnboardingPage: undefined; // No parameters for OnboardingPage
};

// Define the navigation prop type for IntroScreen
type IntroScreenNavigationProp = StackNavigationProp<RootStackParamList, "IntroScreen">;

const IntroScreen = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();
  
  return (
    <View style={styles.introScreen1}>
      <Image 
        style={styles.introScreen1Child} 
        resizeMode="cover" 
        source={require("../assets/Ellipse1.png")} 
      />
      <Image 
        style={[styles.introScreen1Item, styles.homeIndicator1Position]} 
        resizeMode="cover" 
        source={require("../assets/group5.png")} 
      />
      <Text style={styles.exploreFashion}>Explore Fashion</Text>
      <Image 
        style={styles.introScreen1Inner} 
        resizeMode="cover" 
        source={require("../assets/group10.png")} 
      />
      <Pressable 
        style={styles.skip} 
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.skip1}>Skip</Text>
      </Pressable>
      <Text style={styles.exploreThe2025s}>
        {"Explore the 2025's hottest fashion, just uploading a picture...."}
      </Text>
      <Pressable 
        style={styles.wrapper} 
        onPress={() => navigation.navigate("OnboardingPage")}
      >
        <Image 
          style={styles.icon} 
          resizeMode="cover" 
          source={require("../assets/chevron_left.png")} 
        />
      </Pressable>
      <Pressable 
        style={styles.container} 
        onPress={() => navigation.navigate("Intro2")}
      >
        <Image 
          style={styles.icon} 
          resizeMode="cover" 
          source={require("../assets/group19.png")} 
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  homeIndicator1Position: {
    left: "50%",
    position: "absolute",
  },
  introScreen1Child: {
    top: 0,
    left: -139,
    width: 449,
    height: 353,
    position: "absolute"
  },
  introScreen1Item: {
    marginTop: -179,
    marginLeft: -109.5,
    width: 218,
    height: 299,
    top: "50%",
    left: 20,
  },
  exploreFashion: {
    marginLeft: -93.5,
    top: 579,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: "Inter-SemiBold",
    width: 187,
    height: 34,
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
    left: "50%",
    position: "absolute"
  },
  introScreen1Inner: {
    top: 559,
    left: 190,
    width: 24,
    height: 4,
    position: "absolute"
  },
  skip1: {
    fontSize: 15,
    lineHeight: 16,
    color: "#321919",
    fontFamily: "JejuGothic",
    textAlign: "center"
  },
  skip: {
    left: 321,
    top: 67,
    position: "absolute"
  },
  exploreThe2025s: {
    top: 620,
    left: 55,
    lineHeight: 20,
    fontWeight: "500",
    fontFamily: "Rosario-Medium",
    width: 294,
    height: 43,
    textAlign: "center",
    color: "#5f6174",
    fontSize: 16,
    position: "absolute"
  },
  icon: {
    height: "80%",
    width: "80%",
    top: 20,
    left: 27,
  },
  wrapper: {
    left: 24,
    top: 50,
    height: 27,
    width: 27,
    position: "absolute"
  },
  container: {
    left: 152,
    top: 684,
    width: 67,
    height: 67,
    position: "absolute"
  },
  introScreen1: {
    borderRadius: 0,
    backgroundColor: "#ffe2e6",
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1
  }
});

export default IntroScreen;