import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

const RegistrationComplete = () => {
  const navigation = useNavigation();
  const confettiRef = useRef(null);
  return (
    <View style={styles.registrationComplete}>
      <Image
        style={styles.registrationCompleteChild}
        resizeMode="cover"
        source={require("../assets/Ellipse1.png")}
      />
      {/* Confetti animation */}
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: -10, y: 0 }}
        fadeOut={true}
        explosionSpeed={500}
        fallSpeed={2700}
      />
      <View style={[styles.contentParent, styles.contentPosition]}>
        <Text style={[styles.woohoo, styles.woohooTypo]}>Woohoo!</Text>
        <Text style={styles.registrationIsComplete}>
          Registration is complete! Get ready to have the best shopping experiences of your life!
        </Text>
      </View>
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Image
          style={styles.groupIcon}
          resizeMode="cover"
          source={require("../assets/chevron_left.png")}
        />
      </Pressable>
      <View style={[styles.buttonParent, styles.buttonPosition]}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("HomePage")}>
          <View style={[styles.buttonChild, styles.buttonChildLayout]} />
          <Text style={[styles.letsBegin, styles.buttonTypo]}>Let's begin</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registrationComplete: {
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  iconPosition: {
    left: "50%",
    position: "absolute",
  },
  contentPosition: {
    left: "50%",
    position: "absolute",
  },
  woohooTypo: {
    fontFamily: "Rosario-Bold",
    fontWeight: "700",
    textAlign: "center",
  },
  buttonPosition: {
    left: 35,
    position: "absolute",
  },
  buttonChildLayout: {
    borderRadius: 10,
    position: "absolute",
  },
  buttonTypo: {
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    textAlign: "center",
  },
  registrationCompleteChild: {
    top: -16,
    left: -119,
    width: 449,
    height: 353,
    position: "absolute",
  },
  woohoo: {
    fontSize: 27,
    lineHeight: 36,
    color: "#321919",
    width: 187,
    height: 34,
  },
  registrationIsComplete: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Rosario-Regular",
    color: "#707493",
    width: 294,
    textAlign: "center",
    marginTop: 10,
  },
  contentParent: {
    marginLeft: -147,
    top: 319,
    alignItems: "center",
  },
  groupIcon: {
    top: 53,
    left: 23,
    width: 27,
    height: 27,
    position: "absolute",
  },
  buttonChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: "#fba3a3",
  },
  letsBegin: {
    fontSize: 12,
    lineHeight: 15,
    color: "#fff",
    position: "absolute",
    width: "100%",
    top: "30%",
  },
  button: {
    width: 327,
    height: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonParent: {
    bottom: 59,
    alignItems: "center",
  },
});

export default RegistrationComplete;
