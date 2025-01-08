import * as React from "react";
import { Image, StyleSheet, View, Text, Animated } from "react-native";
// Update the import paths to match the exact filename and remove spaces
// Ensure the paths are correct
import Ellipse1 from '../assets/Ellipse1.png';
import Ellipse3 from '../assets/Ellipse3.png';  // Ensure this path is correct
import Rectangle17 from '../assets/Rectangle17.png';
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


const SplashScreen = () => {
    // Animated values for title opacity and scale
    const titleOpacity = new Animated.Value(0);
    const titleScale = new Animated.Value(0.5);

    // Animated value for subtitle opacity
    const subtitleOpacity = new Animated.Value(0);
    
    const navigation = useNavigation();

    useEffect(() => {
        // Animate title fade-in and scale-up
        Animated.parallel([
            Animated.timing(titleOpacity, {
                toValue: 1,
                duration: 2000, // Duration for title fade-in
                useNativeDriver: true,
            }),
            Animated.spring(titleScale, {
                toValue: 1,
                friction: 3, // Control bounce effect
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Animate subtitle fade-in after title animation
            Animated.timing(subtitleOpacity, {
                toValue: 1,
                duration: 2000, // Duration for subtitle fade-in
                useNativeDriver: true,
            }).start();
        });

        // Hide splash screen after 4 seconds
        const timer = setTimeout(() => {
            navigation.navigate('OnboardingPage');
        }, 4000);

        return () => clearTimeout(timer); // Cleanup timer
    }, []);


    return (
        <View style={styles.splashScreen}>
            <Image style={styles.splashScreenChild} resizeMode="cover" source={Ellipse1} />
            <Image style={styles.splashScreenItem} resizeMode="cover" source={Ellipse3} />
            <Animated.Image style={[styles.splashScreenInner, styles.homeIndicator1Position, { opacity: titleOpacity, transform: [{ scale: titleScale }] }]} resizeMode="cover" source={Rectangle17} />
        </View>
    );
};

const styles = StyleSheet.create({
    homeIndicator1Position: {
        left: "50%",
        position: "absolute"
    },
    timePosition: {
        left: 0,
        position: "absolute"
    },
    sideFlexBox: {
        alignItems: "center",
        alignSelf: "stretch"
    },
    splashScreenChild: {
        top: -6,
        left: -139,
        width: 449,
        height: 353,
        position: "absolute"
    },
    splashScreenItem: {
        top: 465,
        left: 10,
        width: 530,
        height: 381,
        position: "absolute"
    },
    splashScreenInner: {
        marginTop: -80,
        marginLeft: -112.5,
        top: "50%",
        width: 224,
        height: 160
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
    time: {
        top: 1,
        fontSize: 17,
        letterSpacing: 0,
        fontWeight: "600",
        fontFamily: "SF Pro Text",
        color: "#000",
        textAlign: "center",
        height: 20,
        width: 54
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
    statusbar: {
        width: 393,
        height: 59,
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "row"
    },
    top: {
        top: 0,
        left: -2,
        width: 377,
        position: "absolute"
    },
    splashScreen: {
        borderRadius: 30,
        backgroundColor: "#fff",
        width: "100%",
        height: 812,
        overflow: "hidden",
        flex: 1
    }
});

export default SplashScreen;
