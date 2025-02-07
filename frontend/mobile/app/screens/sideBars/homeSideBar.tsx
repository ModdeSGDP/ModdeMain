import { Image, StyleSheet, Text, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const SideMenu = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.sideMenu}>
      <Image style={styles.sideMenuChild} resizeMode="cover" source={require("../../assets/Ellipse1.png")} />
      <Image style={styles.logoIcon} resizeMode="cover" source={require("../../assets/logo.png")} />
      <Pressable style={styles.top} onPress={() => navigation.navigate("SideMenu")}>
        <View style={styles.statusbar}>
          <View style={[styles.leftSide, styles.sideFlexBox]}>
            <View style={styles.statusbarTime}>
              <Text style={styles.time}>9:41</Text>
            </View>
          </View>
          <View style={[styles.dynamicIsland, styles.sideFlexBox]} />
          <View style={[styles.rightSide, styles.sideFlexBox]}>
            {/* <View style={styles.signalWifiBattery}>
              <Image
                style={styles.iconMobileSignal}
                resizeMode="cover"
                source={require("../assets/icon--mobile-signal.png")}
              />
              <Image style={styles.wifiIcon} resizeMode="cover" source={require("../../assets/wifi.png")} />
              <Image
                style={styles.statusbarBatteryIcon}
                resizeMode="cover"
                source={require("../assets/-statusbarbattery.png")}
              />
            </View> */}
          </View>
        </View>
      </Pressable>
      <Pressable style={styles.wrapper} onPress={() => {}}>
        <Image style={styles.iconLayout1} resizeMode="cover" source={require("../../assets/ellipse-20.png")} />
      </Pressable>
      <Pressable style={styles.sideMenuItem} onPress={() => {}} />
      <View style={[styles.navigationBarDeatis, styles.navigationLayout]}>
        <Image
          style={[styles.navigationBarDeatisChild, styles.navigationLayout]}
          resizeMode="cover"
          source={require("../../assets/Ellipse2.png")}
        />
        <Image
          style={[styles.truckIcon, styles.fireLayout]}
          resizeMode="cover"
          source={require("../../assets/truck.png")}
        />
        <Text style={[styles.myOrders, styles.helpLayout1]}>My Orders</Text>
        <Image
          style={[styles.heartIcon, styles.helpLayout]}
          resizeMode="cover"
          source={require("../../assets/heart.png")}
        />
        <Text style={[styles.favorites, styles.helpClr]}>
          <Text style={styles.favorites1}>Favorites</Text>
          <Text style={styles.text}>{` `}</Text>
        </Text>
        <Image style={styles.shoppingBagIcon} resizeMode="cover" source={require("../../assets/shopping-bag.png")} />
        <Text style={[styles.history, styles.historyTypo]}>History</Text>
        <Image style={[styles.fire, styles.fireLayout]} resizeMode="cover" source={require("../../assets/fire.png")} />
        <Pressable style={styles.promotions} onPress={() => {}}>
          <Text style={[styles.promotions1, styles.helpClr]}>Promotions</Text>
        </Pressable>
        <Image
          style={[styles.cameraPhoto, styles.fireLayout]}
          resizeMode="cover"
          source={require("../../assets/camera-photo.png")}
        />
        <Pressable style={styles.camera} onPress={() => {}}>
          <Text style={[styles.camera1, styles.helpClr]}>Camera</Text>
        </Pressable>
        <Text style={[styles.settings, styles.historyTypo]}>Settings</Text>
        <Text style={[styles.help, styles.helpClr]}>Help</Text>
        <Image style={[styles.cogIcon, styles.iconLayout]} resizeMode="cover" source={require("../../assets/cog.png")} />
        <Image
          style={[styles.questionCircleIcon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../../assets/question-circle.png")}
        />
      </View>
      <Text style={[styles.anneFernando, styles.helpClr]}>{`Anne Fernando `}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sideFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  navigationLayout: {
    width: 530,
    position: "absolute",
  },
  fireLayout: {
    height: 24,
    width: 24,
    left: 62,
    position: "absolute",
  },
  helpLayout1: {
    lineHeight: 12,
    fontSize: 10,
    height: 12,
  },
  helpLayout: {
    width: 22,
    position: "absolute",
  },
  helpClr: {
    color: "#321919",
    textAlign: "center",
  },
  historyTypo: {
    height: 11,
    color: "#321919",
    fontFamily: "Inter-Regular",
    lineHeight: 12,
    fontSize: 10,
    textAlign: "center",
    position: "absolute",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    left: "11.2%",
    right: "84.27%",
    width: "4.53%",
    position: "absolute",
    overflow: "hidden",
  },
  sideMenuChild: {
    top: -106,
    left: -139,
    width: 449,
    height: 353,
    position: "absolute",
  },
  logoIcon: {
    left: 104,
    width: 66,
    height: 44,
    top: 53,
    position: "absolute",
  },
  time: {
    top: 1,
    fontSize: 17,
    letterSpacing: 0,
    fontWeight: "600",
    fontFamily: "SF Pro Text",
    color: "#000",
    height: 20,
    textAlign: "center",
    left: 0,
    width: 54,
    position: "absolute",
  },
  statusbarTime: {
    borderRadius: 24,
    height: 21,
    width: 54,
  },
  leftSide: {
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch",
  },
  dynamicIsland: {
    width: 125,
  },
  iconMobileSignal: {
    width: 18,
    height: 12,
  },
  wifiIcon: {
    width: 17,
    height: 12,
  },
  statusbarBatteryIcon: {
    width: 27,
    height: 13,
  },
  signalWifiBattery: {
    gap: 8,
    flexDirection: "row",
  },
  rightSide: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    alignSelf: "stretch",
  },
  statusbar: {
    width: 393,
    height: 59,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },
  top: {
    left: -2,
    width: 377,
    top: 0,
    position: "absolute",
  },
  wrapper: {
    left: 88,
    top: 121,
    width: 97,
    height: 98,
    position: "absolute",
  },
  sideMenuItem: {
    top: 305,
    left: -9,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 10,
    backgroundColor: "#ffccd4",
    width: 284,
    height: 52,
    position: "absolute",
  },
  navigationBarDeatisChild: {
    top: 203,
    left: 0,
  },
  truckIcon: {
    top: 0,
  },
  myOrders: {
    top: 6,
    color: "#954a4a",
    width: 50,
    fontFamily: "Inter-Regular",
    left: 98,
    fontSize: 10,
    position: "absolute",
    textAlign: "center",
  },
  heartIcon: {
    left: 62,
    top: 53,
    height:20,
    width:20,
    overflow: "hidden",
  },
  favorites1: {
    fontFamily: "Inter-Regular",
  },
  text: {
    fontFamily: "JejuGothic",
  },
  favorites: {
    top: 58,
    width: 45,
    lineHeight: 12,
    fontSize: 10,
    height: 12,
    left: 98,
    position: "absolute",
  },
  shoppingBagIcon: {
    top: 104,
    left: 62,
    width: 24,
    height: 23,
    position: "absolute",
    overflow: "hidden",
  },
  history: {
    top: 112,
    width: 37,
    left: 100,
  },
  fire: {
    top: 157,
  },
  promotions1: {
    width: 55,
    fontFamily: "Inter-Regular",
    lineHeight: 12,
    fontSize: 10,
    height: 12,
  },
  promotions: {
    top: 166,
    left: 100,
    position: "absolute",
  },
  cameraPhoto: {
    top: 210,
  },
  camera1: {
    width: 37,
    fontFamily: "Inter-Regular",
    lineHeight: 12,
    fontSize: 10,
    height: 12,
  },
  camera: {
    top: 218,
    left: 100,
    position: "absolute",
  },
  settings: {
    top: 268,
    left: 96,
    width: 41,
  },
  help: {
    left: 101,
    height:20,
    width:21,
    position: "absolute",
    fontFamily: "Inter-Regular",
    lineHeight: 12,
    fontSize: 10,

    top: 319,
  },
  cogIcon: {
    top: "45.27%",
    bottom: "50.75%",
    width:20,
    height:20,
  },
  questionCircleIcon: {
    top: "54.09%",
    bottom: "41.77%",
    width:20,
    height:20,
  },
  navigationBarDeatis: {
    left: -32,
    height: 579,
    top: 319,
  },
  anneFernando: {
    top: 236,
    left: 60,
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "700",
    fontFamily: "Rosario-Bold",
    position: "absolute",
  },
  sideMenu: {
    borderRadius: 30,
    backgroundColor: "#fff",
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
})

export default SideMenu

