
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {Image, StyleSheet, Text, Pressable, View} from "react-native";

const IntroScreen = () => {

    const navigation = useNavigation();
  	
  	return (
    		<View style={styles.introScreen1}>
      			<Image style={styles.introScreen1Child} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      			<Image style={[styles.introScreen1Item, styles.homeIndicator1Position]} resizeMode="cover" source={require("../assets/group5.png")} />
      			<Text style={styles.exploreFashion}>Explore Fashion</Text>
      			<Image style={styles.introScreen1Inner} resizeMode="cover" source={require("../assets/group10.png")} />
      			<Pressable style={styles.skip} onPress={()=>{}}>
        				<Text style={styles.skip1}>Skip</Text>
      			</Pressable>
      			
      			<Text style={[styles.exploreThe2025s, styles.xploreThe2024sClr]}>{"Explore the 2025's hottest fashion, just uploading a picture...."
        				}</Text>
            <Pressable style={styles.wrapper} onPress={()=>navigation.navigate("OnboardingPage")}>
                <Image style={styles.icon} resizeMode="cover" source={require("../assets/chevron_left.png")} />
            </Pressable>
            {/* <View style={[styles.top, styles.topPosition]}>
                <View style={styles.statusbar}>
                    <View style={[styles.leftSide, styles.sideFlexBox]}>
                        <View style={styles.statusbarTime}>
                            <Text style={styles.time}>9:41</Text>
                        </View>
                    </View>
                    <View style={[styles.dynamicIsland, styles.sideFlexBox]} />
                    <View style={[styles.rightSide, styles.sideFlexBox]}>
                        <View style={styles.signalWifiBattery}>
                            <Image style={styles.iconMobileSignal} resizeMode="cover" source={require("../assets/Icon / Mobile Signal.png")} />
                            <Image style={styles.wifiIcon} resizeMode="cover" source={require("../assets/Wifi.png")} />
                            <Image style={styles.statusbarBatteryIcon} resizeMode="cover" source={require("../assets/_StatusBar-battery.png")} />
                        </View>
                    </View>
                </View>
            </View> */}
            <Pressable style={styles.container} onPress={() => navigation.navigate("Intro2")}>
                <Image style={styles.icon} resizeMode="cover" source={require("../assets/group19.png")} />
            </Pressable>
            {/* <View style={[styles.homeIndicator, styles.topPosition]}>
                <View style={[styles.homeIndicator1, styles.homeIndicator1Position]} />
            </View> */}
        </View>);
};

const styles = StyleSheet.create({
    homeIndicator1Position: {
        left: "50%",
        position: "absolute",
        
    },
    xploreThe2024sClr: {
        color: "#5f6174",
        fontSize: 16,
        position: "absolute"
    },
    topPosition: {
        width: 375,
        left: 0,
        position: "absolute"
    },
    sideFlexBox: {
        alignItems: "center",
        alignSelf: "stretch"
    },
    introScreen1Child: {
        top: -6,
        left: -139,
        width: 449,
        height: 353,
        position: "absolute"
    },
    introScreen1Item: {
        marginTop: -179,
        marginLeft: -109.5,
        top: "50%",
        width: 218,
        height: 299
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
        left: 171,
        width: 34,
        height: 6,
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
    xploreThe2024s: {
        top: 627,
        left: 56,
        lineHeight: 19,
        textAlign: "left",
        width: 289,
        height: 60,
        display: "none",
        fontFamily: "JejuGothic"
    },
    exploreThe2025s: {
        top: 620,
        left: 55,
        lineHeight: 24,
        fontWeight: "500",
        fontFamily: "Rosario-Medium",
        width: 294,
        height: 43,
        textAlign: "center"
    },
    icon: {
        height: "100%",
        width: "100%",
        top:10,
        left:20
    },
    wrapper: {
        left: 24,
        top: 50,
        height: 27,
        width: 27,
        position: "absolute"
    },
    // time: {
    //     fontSize: 17,
    //     letterSpacing: 0,
    //     fontFamily: "SF Pro Text",
    //     height: 20,
    //     width: 54,
    //     left: 0,
    //     top: 1,
    //     textAlign: "center",
    //     color: "#000",
    //     fontWeight: "600",
    //     position: "absolute"
    // },
    // statusbarTime: {
    //     borderRadius: 24,
    //     height: 21,
    //     width: 54
    // },
    // leftSide: {
    //     justifyContent: "center",
    //     flex: 1
    // },
    // dynamicIsland: {
    //     width: 125
    // },
    // iconMobileSignal: {
    //     width: 18,
    //     height: 12
    // },
    // wifiIcon: {
    //     width: 17,
    //     height: 12
    // },
    // statusbarBatteryIcon: {
    //     height: 13,
    //     width: 27
    // },
    // signalWifiBattery: {
    //     gap: 8,
    //     flexDirection: "row"
    // },
    // rightSide: {
    //     justifyContent: "center",
    //     flexDirection: "row",
    //     flex: 1
    // },
    // statusbar: {
    //     width: 33,
    //     height: 59,
    //     alignItems: "flex-end",
    //     justifyContent: "center",
    //     flexDirection: "row"
    // },
    top: {
        top: 1,
        width: 375
    },
    container: {
        left: 152,
        top: 684,
        width: 67,
        height: 67,
        position: "absolute"
    },
    // homeIndicator1: {
    //     marginLeft: -66.5,
    //     bottom: 8,
    //     borderRadius: 100,
    //     backgroundColor: "#000",
    //     width: 1224,
    //     height: 5
    // },
    // homeIndicator: {
    //     top: 708,
    //     height: 34
    // },
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
