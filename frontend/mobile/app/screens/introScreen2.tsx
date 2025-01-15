import * as React from "react";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const IntroScreen2 = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.introScreen2}>
            <Image style={styles.introScreen2Child} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
            <Text style={[styles.selectWhatYou, styles.timeTypo]}>Select what you love</Text>
            <Image style={styles.introScreen2Item} resizeMode="cover" source={require("../assets/group10_2.png")} />
            <Pressable style={styles.skip} onPress={() => navigation.navigate("Intro1")}>
                <Text style={styles.skip1}>Skip</Text>
            </Pressable>
            <Text style={[styles.xploreThe2024s, styles.xploreThe2024sClr]}>{`Explore the 2024’s hottest fashion,
`}</Text>
            <Text style={[styles.exclusivelyCuratedSelection, styles.xploreThe2024sClr]}>Exclusively curated selection of brands in the palm of your hand...</Text>
            <Pressable style={styles.wrapper} onPress={() => navigation.navigate("Intro1")}>
                <Image style={styles.icon} resizeMode="cover" source={require("../assets/chevron_left.png")} />
            </Pressable>
            <Pressable style={styles.container} onPress={() => navigation.navigate("Intro3")}>
                <Image style={styles.icon} resizeMode="cover" source={require("../assets/group19_2.png")} />
            </Pressable>
            <Image style={[styles.introScreen2Inner, styles.selectWhatYouPosition]} resizeMode="cover" source={require("../assets/group5_2.png")} />
            {/* <View style={[styles.homeIndicator, styles.topPosition]}>
                <View style={[styles.homeIndicator1, styles.selectWhatYouPosition]} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    timeTypo: {
        color: "#000",
        fontWeight: "600",
        textAlign: "center",
    },
    xploreThe2024sClr: {
        color: "#5f6174",
        fontSize: 16,
        position: "absolute",
    },
    topPosition: {
        left: 0,
        position: "absolute",
    },
    selectWhatYouPosition: {
        left: "50%",
        position: "absolute",
    },
    introScreen2Child: {
        top: -6,
        left: -139,
        width: 449,
        height: 353,
        position: "absolute",
    },
    selectWhatYou: {
        marginTop: 160,
        marginLeft: -140.5,
        fontSize: 24,
        lineHeight: 30,
        fontFamily: "Inter-SemiBold",
        width: 284,
        height: 34,
        textAlign: "center",
        left: "50%",
        position: "absolute",
        top: "50%",
    },
    introScreen2Item: {
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
        fontFamily: "JejuGothic",
    },
    exclusivelyCuratedSelection: {
        top: 616,
        left: 52,
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
        top:20,
        left:17
    },
    wrapper: {
        left: 23,
        top: 57,
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
    introScreen2Inner: {
        marginTop: -179,
        marginLeft: -109.5,
        width: 218,
        height: 299,
        top: "50%",
        left: "50%",
    },
    homeIndicator1: {
        marginLeft: -66.5,
        bottom: 8,
        borderRadius: 100,
        backgroundColor: "#000",
        width: 134,
        height: 5,
    },
    homeIndicator: {
        top: 778,
        width: 375,
        height: 34,
    },
    introScreen2: {
        borderRadius: 0,
        backgroundColor: "#ffe2e6",
        height: 812,
        overflow: "hidden",
        width: "100%",
        flex: 1,
    },
});

export default IntroScreen2;
