import { navigate } from "expo-router/build/global-state/routing";
import * as React from "react";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IntroScreen3 = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.introScreen3}>
            <Image style={styles.introScreen3Child} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
            <Text style={[styles.beTheReal, styles.timeTypo]}>Be the real you</Text>
            <Image style={styles.introScreen3Item} resizeMode="cover" source={require("../assets/group10_3.png")}/>
            <Pressable style={styles.skip} onPress={() => { }}>
                <Text style={styles.skip1}>Skip</Text>
            </Pressable>
            <Text style={[styles.xploreThe2024s, styles.itBringsYouClr]}>{`xplore the 2024’s hottest fashion,
`}</Text>
            <Text style={[styles.itBringsYou, styles.itBringsYouClr]}>{`It brings you the latest trends and products from all island...`}</Text>
            <Pressable style={styles.wrapper} onPress={() => navigation.navigate("Intro2")}>
                <Image style={styles.icon} resizeMode="cover" source= {require("../assets/chevron_left.png")} />
            </Pressable>
            {/* <View style={[styles.top, styles.topPosition]}>
                <View style={styles.statusbar}>
                    <View style={[styles.leftSide, styles.sideFlexBox]}>
                        <View style={styles.statusbarTime}>
                            <Text style={[styles.time, styles.topPosition]}>9:41</Text>
                        </View>
                    </View>
                    <View style={[styles.dynamicIsland, styles.sideFlexBox]} />
                    <View style={[styles.rightSide, styles.sideFlexBox]}>
                        <View style={styles.signalWifiBattery}>
                            <Image style={styles.iconMobileSignal} resizeMode="cover" source="Icon / Mobile Signal.png" />
                            <Image style={styles.wifiIcon} resizeMode="cover" source="Wifi.png" />
                            <Image style={styles.statusbarBatteryIcon} resizeMode="cover" source="_StatusBar-battery.png" />
                        </View>
                    </View>
                </View>
            </View> */}
            <Pressable style={styles.container} onPress={() => navigation.navigate("Login")}>
                <Image style={styles.icon} resizeMode="cover" source={require("../assets/group19_3.png")} />
            </Pressable>
            <Image style={styles.introScreen3Inner} resizeMode="cover" source={require("../assets/group5_3.png")} />
            {/* <View style={[styles.homeIndicator, styles.topPosition]}>
                <View style={[styles.homeIndicator1, styles.beTheRealPosition]} />
            </View> */}
        </View>);
};

const styles = StyleSheet.create({
    timeTypo: {
        color: "#000",
        fontWeight: "600",
        textAlign: "center"
    },
    itBringsYouClr: {
        color: "#5f6174",
        fontSize: 16,
        position: "absolute"
    },
    topPosition: {
        left: 0,
        position: "absolute"
    },
    sideFlexBox: {
        alignItems: "center",
        alignSelf: "stretch"
    },
    beTheRealPosition: {
        left: "50%",
        position: "absolute"
    },
    introScreen3Child: {
        top: -6,
        left: -139,
        width: 449,
        height: 353,
        position: "absolute"
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
        position: "absolute"
    },
    introScreen3Item: {
        top: 559,
        left: 180,
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
    itBringsYou: {
        top: 613,
        left: 61,
        lineHeight: 24,
        fontWeight: "500",
        fontFamily: "Rosario-Medium",
        width: 294,
        height: 43,
        textAlign: "center"
    },
    icon: {
        height: "80%",
        width: "80%",
        top:20,
        left:17
    },
    wrapper: {
        left: 23,
        top: 53,
        height: 27,
        width: 27,
        position: "absolute"
    },
    time: {
        fontSize: 17,
        letterSpacing: 0,
        fontFamily: "SF Pro Text",
        height: 20,
        width: 54,
        top: 1,
        left: 0,
        textAlign: "center",
        color: "#000",
        fontWeight: "600"
    },
    statusbarTime: {
        borderRadius: 24,
        height: 21,
        width: 54
    },
    leftSide: {
        justifyContent: "center",
        flex: 1
    },
    dynamicIsland: {
        width: 125
    },
    iconMobileSignal: {
        width: 18,
        height: 12
    },
    wifiIcon: {
        width: 17,
        height: 12
    },
    statusbarBatteryIcon: {
        height: 13,
        width: 27
    },
    signalWifiBattery: {
        gap: 8,
        flexDirection: "row"
    },
    rightSide: {
        justifyContent: "center",
        flexDirection: "row",
        flex: 1
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
        top: 1,
        left: 0
    },
    container: {
        left: 152,
        top: 684,
        width: 67,
        height: 67,
        position: "absolute"
    },
    introScreen3Inner: {
        height: "36.82%",
        width: "58.24%",
        top: "28.57%",
        right: "22.29%",
        bottom: "34.61%",
        left: "19.47%",
        maxWidth: "100%",
        maxHeight: "100%",
        position: "absolute",
        overflow: "hidden"
    },
    homeIndicator1: {
        marginLeft: -66.5,
        bottom: 8,
        borderRadius: 100,
        backgroundColor: "#000",
        width: 134,
        height: 5
    },
    homeIndicator: {
        top: 778,
        width: 375,
        height: 34
    },
    introScreen3: {
        borderRadius: 0,
        backgroundColor: "#ffe2e6",
        height: 812,
        overflow: "hidden",
        width: "100%",
        flex: 1
    }
});

export default IntroScreen3;
