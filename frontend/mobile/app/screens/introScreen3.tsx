import { Image, StyleSheet, Text, Pressable, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  IntroScreen: undefined
  Intro2: undefined
  Intro3: undefined
  Login: undefined
}

type Intro3NavigationProp = StackNavigationProp<RootStackParamList, "Intro3">

const IntroScreen3 = () => {
  const navigation = useNavigation<Intro3NavigationProp>()

  return (
    <View style={styles.introScreen3}>
      <Image style={styles.introScreen3Child} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      <Text style={[styles.beTheReal, styles.timeTypo]}>Be the real you</Text>
      <Image style={styles.introScreen3Item} resizeMode="cover" source={require("../assets/group10_3.png")} />
      <Pressable style={styles.skip} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.skip1}>Skip</Text>
      </Pressable>
      <Text style={[styles.itBringsYou, styles.itBringsYouClr]}>
        It brings you the latest trends and products from all island...
      </Text>
      <Pressable style={styles.wrapper} onPress={() => navigation.navigate("Intro2")}>
        <Image style={styles.icon} resizeMode="cover" source={require("../assets/chevron_left.png")} />
      </Pressable>
      <Pressable style={styles.container} onPress={() => navigation.navigate("Login")}>
        <Image style={styles.icon} resizeMode="cover" source={require("../assets/group19_3.png")} />
      </Pressable>
      <Image style={styles.introScreen3Inner} resizeMode="cover" source={require("../assets/group5_3.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  timeTypo: {
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
  itBringsYouClr: {
    color: "#5f6174",
    fontSize: 16,
    position: "absolute",
  },
  beTheRealPosition: {
    left: "50%",
    position: "absolute",
  },
  introScreen3Child: {
    top: -6,
    left: -139,
    width: 449,
    height: 353,
    position: "absolute",
  },
  beTheReal: {
    marginLeft: -93.5,
    top: 579,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: "Inter-SemiBold",
    width: 187,
    height: 34,
    textAlign: "center",
    left: "52%",
    position: "absolute",
  },
  introScreen3Item: {
    top: 559,
    left: 180,
    width: 24,
    height: 4,
    position: "absolute",
  },
  skip1: {
    fontSize: 15,
    lineHeight: 16,
    color: "#321919",
    fontFamily: "JejuGothic",
    textAlign: "center",
  },
  skip: {
    left: 321,
    top: 67,
    position: "absolute",
  },
  itBringsYou: {
    top: 613,
    left: 61,
    lineHeight: 24,
    fontWeight: "500",
    fontFamily: "Rosario-Medium",
    width: 294,
    height: 43,
    textAlign: "center",
  },
  icon: {
    height: "80%",
    width: "80%",
    top: 20,
    left: 17,
  },
  wrapper: {
    left: 23,
    top: 53,
    height: 27,
    width: 27,
    position: "absolute",
  },
  container: {
    left: 152,
    top: 684,
    width: 67,
    height: 67,
    position: "absolute",
  },
  introScreen3Inner: {
    height: 300,
    width: 220,
    top: "28.57%",
    right: "25.29%",
    bottom: "34.61%",
    left: "19.47%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  introScreen3: {
    borderRadius: 0,
    backgroundColor: "#ffe2e6",
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
})

export default IntroScreen3

