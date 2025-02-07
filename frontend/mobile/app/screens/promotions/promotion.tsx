import { Image, StyleSheet, Text, View, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"


const PromotionsPage = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.promotionsPage}>
      <View style={[styles.promotionsPageChild, styles.promotionsShadowBox]} />
      <View style={[styles.promotionsPageItem, styles.promotionsShadowBox]} />
      
      <Image 
        style={[styles.promotionsPageInner, styles.rectangleIconLayout]} 
        resizeMode="cover" 
        source={require("../../assets/Rectangle56.png")} 
      />
      <Image 
        style={[styles.rectangleIcon, styles.rectangleIconLayout]} 
        resizeMode="cover" 
        source={require("../../assets/Rectangle59.png")} 
      />

      <Text style={[styles.stayAheadFashion, styles.stayTypo]}>Stay Ahead Fashion!</Text>
      <Text style={[styles.stayAheadFashion1, styles.stayTypo]}>Stay Ahead Fashion!</Text>
      <Text style={[styles.bestPricesOnly, styles.bestTypo]}>Best prices only for you with up to 30% OFF!</Text>
      <Text style={[styles.bestPricesOnly1, styles.bestTypo]}>Best prices only for you with up to 30% OFF!</Text>
      <Text style={[styles.noMoreMessages, styles.timeFlexBox]}>No More Messages.</Text>

      {/* <Pressable style={styles.top} onPress={() => navigation.navigate("Top")}>
        <View style={styles.statusbar}>
          <View style={[styles.leftSide, styles.sideFlexBox]}>
            <View style={styles.statusbarTime}>
              <Text style={[styles.time, styles.timeFlexBox]}>9:41</Text>
            </View>
          </View>
          <View style={[styles.dynamicIsland, styles.sideFlexBox]} />
          <View style={[styles.rightSide, styles.sideFlexBox]}>
            <View style={styles.signalWifiBattery}>
              <Image 
                style={styles.iconMobileSignal} 
                resizeMode="cover"
                source={require("../../assets/icon--mobile-signal.png")}
                width={18} 
                height={12} 
              />
              <Image 
                style={styles.wifiIcon} 
                resizeMode="cover"
                source={require("../../assets/wifi.png")}
                width={17} 
                height={12} 
              />
              <Image 
                style={styles.statusbarBatteryIcon} 
                resizeMode="cover"
                source={require("../../assets/-statusbarbattery.png")}
                width={27} 
                height={13} 
              />
            </View>
          </View>
        </View>
      </Pressable> */}

      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicator1} />
      </View>
      <View style={[styles.naviBar, styles.barLayout]}>
        <View style={[styles.homeNavigationBar, styles.barLayout]}>
          <View style={styles.homeNavigationBarChild} />
          <View style={styles.naviIcons}>
            <Pressable onPress={() => navigation.navigate("HomePage")}>
              <Image 
                style={styles.smartHome} 
                resizeMode="cover"
                source={require("../../assets/smart-home.png")}
                width={8} 
                height={92} 
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ShopPage")}>
              <Image 
                style={[styles.shirtIcon, styles.iconLayout]} 
                resizeMode="cover"
                source={require("../../assets/shirt.png")}
                width={8} 
                height={92} 
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("CameraPage")}>
              <Image 
                style={[styles.cameraPlusIcon, styles.iconLayout]} 
                resizeMode="cover" 
                source={require("../../assets/camera-plus.png")} 
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("CartPage")}>
              <Image 
                style={[styles.shoppingCartIcon, styles.iconLayout]} 
                resizeMode="cover"
                source={require("../../assets/shopping_cart.png")}
                width={8} 
                height={92} 
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ProfilePage")}>
              <Image 
                style={[styles.userIcon, styles.iconLayout]} 
                resizeMode="cover"
                source={require("../../assets/user.png")}
                width={8} 
                height={92} 
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.frameParent}>
        <View style={styles.groupParent}>
          <Image 
            style={styles.frameChild} 
            resizeMode="cover"
            source={require("../../assets/Rectangle42.png")}
            width={20} 
            height={20} 
          />
          <Text style={[styles.promotions, styles.stayTypo]}>Promotions</Text>
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.text}>􀝖</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    promotionsShadowBox: {
    height: 227,
    backgroundColor: "#ffccd4",
    borderRadius: 10,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
    width: 0,
    height: 4
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute"
    },
    stayTypo1: {
    fontFamily: "JejuGothic",
    position: "absolute"
    },
    topPosition: {
    top: 1,
    left: 0
    },
    sideFlexBox: {
    alignSelf: "stretch",
    alignItems: "center"
    },
    timeFlexBox: {
    textAlign: "center",
    position: "absolute"
    },
    rectangleIconLayout: {
    height: 25,
    width: 25,
    borderRadius: 2,
    position: "absolute"
    },
    stayTypo: {
    color: "#321919",
    fontSize: 18,
    textAlign: "center"
    },
    bestTypo: {
    color: "#898989",
    lineHeight: 12,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "JejuGothic",
    position: "absolute"
    },
    barLayout: {
    height: 69,
    width: 316,
    left: "50%",
    position: "absolute"
    },
    iconLayout: {
    top: "7.69%",
    maxHeight: "100%",
    maxWidth: "100%",
    height: "92.31%",
    width: "8.21%",
    bottom: "0%",
    position: "absolute",
    overflow: "hidden"
    },
    promotionsPageChild: {
    marginLeft: -167.5,
    top: 125,
    width: 335,
    left: "50%"
    },
    promotionsPageItem: {
    top: 371,
    left: 24,
    width: 328
    },
    xploreThe2024s: {
    top: 627,
    left: 56,
    lineHeight: 19,
    color: "#5f6174",
    textAlign: "left",
    width: 289,
    height: 60,
    display: "none",
    fontSize: 16
    },
    time: {
    fontSize: 17,
    letterSpacing: 0,
    fontFamily: "SF Pro Text",
    color: "#000",
    height: 20,
    fontWeight: "600",
    width: 54,
    left: 0,
    top: 1
    },
    statusbarTime: {
    borderRadius: 24,
    height: 21,
    width: 54
    },
    leftSide: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    alignSelf: "stretch"
    },
    dynamicIsland: {
    width: 125,
    alignItems: "center"
    },
    iconMobileSignal: {},
    wifiIcon: {},
    statusbarBatteryIcon: {},
    signalWifiBattery: {
    gap: 8,
    flexDirection: "row"
    },
    rightSide: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    alignSelf: "stretch"
    },
    statusbar: {
    height: 59,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    width: 375
    },
    top: {
    width: 375,
    left: 0,
    position: "absolute"
    },
    homeIndicator1: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: 100,
    backgroundColor: "#000",
    width: 134,
    height: 5,
    left: "50%",
    position: "absolute"
    },
    homeIndicator: {
    top: 778,
    height: 34,
    width: 375,
    left: 0,
    position: "absolute"
    },
    promotionsPageInner: {
    top: 135,
    left: 37
    },
    rectangleIcon: {
    top: 381,
    left: 35
    },
    stayAheadFashion: {
    top: 138,
    left: 68,
    letterSpacing: -0.7,
    fontFamily: "JejuGothic",
    position: "absolute"
    },
    stayAheadFashion1: {
    top: 384,
    left: 66,
    letterSpacing: -0.7,
    fontFamily: "JejuGothic",
    position: "absolute"
    },
    bestPricesOnly: {
    top: 331,
    left: 42
    },
    bestPricesOnly1: {
    top: 577,
    left: 40
    },
    noMoreMessages: {
    marginLeft: -65.5,
    top: 626,
    lineHeight: 24,
    fontFamily: "Rosario-Regular",
    color: "#707493",
    fontSize: 16,
    left: "50%"
    },
    homeNavigationBarChild: {
    borderRadius: 20,
    backgroundColor: "#ffe2e6",
    left: "0%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    right: "0%",
    position: "absolute",
    width: "100%"
    },
    icon: {
    maxHeight: "100%",
    maxWidth: "100%",
    height: "100%",
    overflow: "hidden",
    width: "100%"
    },
    smartHome: {
    right: "91.79%",
    bottom: "7.69%",
    left: "0%",
    top: "0%",
    position: "absolute"
    },
    shirtIcon: {
    right: "68.57%",
    left: "23.21%"
    },
    cameraPlusIcon: {
    right: "45.71%",
    left: "46.07%"
    },
    shoppingCartIcon: {
    right: "22.86%",
    left: "68.93%"
    },
    userIcon: {
    left: "91.79%",
    right: "0%",
    top: "7.69%"
    },
    naviIcons: {
    height: "37.68%",
    width: "88.61%",
    top: "31.88%",
    right: "5.7%",
    bottom: "30.43%",
    left: "5.7%",
    position: "absolute"
    },
    homeNavigationBar: {
    marginLeft: -158,
    top: 0
    },
    naviBar: {
    marginLeft: -157.5,
    top: 693
    },
    frameChild: {
        width:20,
        height:30,
    
    },
    promotions: {
    lineHeight: 23,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600"
    },
    groupParent: {
    gap: 88,
    alignItems: "center",
    flexDirection: "row"
    },
    text: {
    fontWeight: "500",
    fontFamily: "SF Pro",
    color: "#040502",
    letterSpacing: -0.7,
    fontSize: 18,
    textAlign: "center"
    },
    frameParent: {
    top: 60,
    left: 14,
    gap: 100,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute"
    },
    promotionsPage: {
    borderRadius: 30,
    backgroundColor: "#fff",
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1
    }
    });

export default PromotionsPage