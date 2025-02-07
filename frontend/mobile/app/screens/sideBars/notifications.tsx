import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NotificationsPage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.notificationsPage}>
            <Text style={styles.xploreThe2024s}>
                {`xplore the 2024's hottest fashion,`}
            </Text>
            
            {/* Top Status Bar */}
            <View style={styles.top}>
                <View style={[styles.statusbar, styles.statusbarFlexBox]}>
                    <View style={[styles.leftSide, styles.sideFlexBox]}>
                        <View style={styles.statusbarTime}>
                            <Text style={[styles.time, styles.timeClr]}>9:41</Text>
                        </View>
                    </View>
                    <View style={[styles.dynamicIsland, styles.sideFlexBox]} />
                    <View style={[styles.rightSide, styles.sideFlexBox]}>
                        <View style={styles.signalWifiBattery}>
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/icon--mobile-signal.png")} 
                            />
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/wifi.png")} 
                            />
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/-statusbarbattery.png")} 
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* Messages Header */}
            <View style={styles.groupParent}>
                <Image 
                    style={styles.frameChild} 
                    resizeMode="cover" 
                    source={require("../assets/group-14.png")} 
                />
                <Text style={styles.messages}>Messages</Text>
            </View>

            {/* Orders and Promotions Section */}
            <View style={[styles.ordersParent, styles.ordersParentPosition]}>
                <Pressable style={[styles.orders, styles.sideFlexBox]} onPress={() => {}}>
                    <Image 
                        style={styles.orderIcon} 
                        resizeMode="cover" 
                        source={require("../assets/-order-icon.png")} 
                    />
                    <View style={styles.orders1}>
                        <Text style={[styles.orders2, styles.orders2Typo]}>Orders</Text>
                        <Text style={[styles.orderStatusOrder, styles.orderTypo]}>
                            Order status, order updates, dispute progress..
                        </Text>
                    </View>
                </Pressable>
                
                <Pressable style={[styles.orders, styles.sideFlexBox]} onPress={() => {}}>
                    <Image 
                        style={styles.icon} 
                        resizeMode="cover" 
                        source={require("../assets/-promotion-icon.png")} 
                    />
                    <View style={styles.promotions}>
                        <Text style={[styles.discountsSalesAnnouncement, styles.orderTypo]}>
                            Discounts, sales announcement, price alerts..
                        </Text>
                        <Text style={[styles.promotions1, styles.orders2Position]}>
                            <Text style={styles.orders2Typo}>Promotions</Text>
                        </Text>
                    </View>
                </Pressable>
            </View>

            {/* Past Messages Section */}
            <Text style={[styles.pastMessages, styles.offerTypo]}>Past messages</Text>
            <View style={styles.promo2Parent}>
                {/* Promo Message Items */}
                <View style={styles.promo2}>
                    <View style={[styles.ellipseParent, styles.statusbarFlexBox]}>
                        <Image 
                            style={styles.frameItem} 
                            resizeMode="cover" 
                            source={require("../assets/Ellipse-18.png")} 
                        />
                        <Text style={[styles.offerAbove10000, styles.offerTypo]}>
                            20% offer above 10000 and free shipping
                        </Text>
                    </View>
                </View>

                {/* More Promo Items */}
                {/* ... Similar structure for other promo items ... */}
            </View>

            <Text style={[styles.noMoreMessages, styles.ordersParentPosition]}>
                No More Messages
            </Text>

            {/* Navigation Bar */}
            <View style={[styles.naviBar, styles.barLayout]}>
                <View style={[styles.homeNavigationBar, styles.barLayout]}>
                    <View style={styles.homeNavigationBarChild} />
                    <View style={styles.naviIcons}>
                        <Pressable style={styles.smartHome}>
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/smarthome.png")} 
                            />
                        </Pressable>
                        <Pressable style={[styles.shirt, styles.userPosition]}>
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/shirt.png")} 
                            />
                        </Pressable>
                        <Pressable style={[styles.cameraPlus, styles.userPosition]}>
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/camera-plus.png")} 
                            />
                        </Pressable>
                        <Pressable style={[styles.shoppingCart, styles.userPosition]}>
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/shopping-cart.png")} 
                            />
                        </Pressable>
                        <Pressable style={[styles.user, styles.userPosition]}>
                            <Image 
                                style={styles.icon} 
                                resizeMode="cover" 
                                source={require("../assets/user.png")} 
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusbarFlexBox: {
        alignItems: "flex-end",
        flexDirection: "row"
        },
        sideFlexBox: {
        alignSelf: "stretch",
        alignItems: "center"
        },
        timeClr: {
        color: "#000",
        position: "absolute"
        },
        ordersParentPosition: {
        left: "50%",
        position: "absolute"
        },
        orders2Typo: {
        fontFamily: "Inter-Medium",
        fontWeight: "500"
        },
        orderTypo: {
        fontFamily: "Poppins-Regular",
        top: 25,
        color: "#898989",
        lineHeight: 12,
        fontSize: 10,
        left: 0,
        textAlign: "left",
        position: "absolute"
        },
        orders2Position: {
        letterSpacing: -0.7,
        top: 0,
        fontSize: 18,
        color: "#000",
        left: 0,
        position: "absolute"
        },
        offerTypo: {
        fontFamily: "Inter-Regular",
        lineHeight: 12,
        fontSize: 10,
        textAlign: "left"
        },
        promo3Layout: {
        width: 236,
        height: 29
        },
        kellyTypo1: {
        lineHeight: 12,
        fontSize: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        top: 0,
        color: "#321919",
        textAlign: "left",
        position: "absolute"
        },
        frameViewFlexBox: {
        gap: 11,
        alignItems: "flex-end",
        flexDirection: "row",
        left: 0,
        position: "absolute"
        },
        kellyTypo: {
        left: 41,
        lineHeight: 12,
        fontSize: 10,
        fontFamily: "Inter-Medium",
        fontWeight: "500",
        top: 0,
        color: "#321919",
        textAlign: "left",
        position: "absolute"
        },
        barLayout: {
        height: 69,
        width: 316,
        left: "50%",
        position: "absolute"
        },
        userPosition: {
        top: "7.69%",
        height: "92.31%",
        width: "8.21%",
        bottom: "0%",
        position: "absolute"
        },
        xploreThe2024s: {
        top: 627,
        left: 56,
        lineHeight: 19,
        color: "#5f6174",
        width: 289,
        height: 60,
        display: "none",
        textAlign: "left",
        fontFamily: "JejuGothic",
        fontSize: 16,
        position: "absolute"
        },
        time: {
        fontSize: 17,
        letterSpacing: 0,
        fontFamily: "SF Pro Text",
        height: 20,
        textAlign: "center",
        fontWeight: "600",
        color: "#000",
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
        justifyContent: "center",
        width: 375
        },
        top: {
        width: 375,
        left: 0,
        top: 1,
        position: "absolute"
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
        height: 34,
        width: 375,
        left: 0,
        position: "absolute"
        },
        frameChild: {},
        messages: {
        lineHeight: 23,
        fontFamily: "Inter-SemiBold",
        width: 89,
        color: "#321919",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "left"
        },
        groupParent: {
        top: 60,
        left: 15,
        width: 217,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute"
        },
        orderIcon: {},
        orders2: {
        letterSpacing: -0.7,
        top: 0,
        fontSize: 18,
        color: "#000",
        left: 0,
        position: "absolute",
        width: 232,
        textAlign: "left"
        },
        orderStatusOrder: {
        height: 11,
        color: "#898989",
        width: 232
        },
        orders1: {
        height: 36,
        width: 232
        },
        orders: {
        gap: 15,
        alignItems: "center",
        flexDirection: "row"
        },
        discountsSalesAnnouncement: {
        color: "#898989"
        },
        text: {
        fontFamily: "JejuGothic"
        },
        promotions1: {
        textAlign: "center"
        },
        promotions: {
        width: 225,
        height: 37
        },
        ordersParent: {
        marginLeft: -143.5,
        top: 128,
        width: 287,
        gap: 18
        },
        pastMessages: {
        top: 276,
        left: 52,
        color: "#000",
        position: "absolute"
        },
        frameItem: {
        width: 31,
        height: 29
        },
        offerAbove10000: {
        color: "#898989"
        },
        ellipseParent: {
        gap: 12,
        top: 0,
        left: 0,
        position: "absolute"
        },
        promo2: {
        zIndex: 0,
        height: 29,
        width: 238
        },
        kellyFelder: {
        left: 0
        },
        offerAbove100001: {
        top: 17,
        color: "#898989",
        left: 0,
        position: "absolute"
        },
        kellyFelderParent: {
        width: 195,
        height: 29
        },
        ellipseGroup: {
        gap: 10,
        top: 0,
        alignItems: "center",
        flexDirection: "row",
        left: 0,
        position: "absolute"
        },
        kellyFleder: {
        top: 0,
        left: 0,
        position: "absolute"
        },
        promo3: {
        zIndex: 1
        },
        ellipseContainer: {
        top: 1
        },
        promo4: {
        height: 30,
        zIndex: 2,
        width: 237
        },
        kellyFelder2: {
        left: 40
        },
        frameView: {
        top: 0
        },
        promo: {
        top: 3,
        width: 237,
        height: 29,
        left: 0,
        position: "absolute"
        },
        promo5: {
        height: 32,
        zIndex: 3,
        width: 237
        },
        kellyFelder3: {
        width: 56,
        zIndex: 4,
        height: 12
        },
        promo2Parent: {
        top: 306,
        left: 60,
        gap: 30,
        width: 238,
        position: "absolute"
        },
        noMoreMessages: {
        marginLeft: -64.5,
        top: 575,
        lineHeight: 24,
        fontFamily: "Rosario-Regular",
        color: "#707493",
        textAlign: "center",
        fontSize: 16
        },
        homeNavigationBarChild: {
        borderRadius: 20,
        backgroundColor: "#ffe2e6",
        left: "0%",
        bottom: "0%",
        top: "0%",
        right: "0%",
        height: "100%",
        position: "absolute",
        width: "100%"
        },
        icon: {
        maxWidth: "100%",
        maxHeight: "100%",
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
        shirt: {
        left: "23.21%",
        right: "68.57%"
        },
        cameraPlus: {
        left: "46.07%",
        right: "45.71%"
        },
        shoppingCart: {
        left: "68.93%",
        right: "22.86%"
        },
        user: {
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
        top: 694
        },
        notificationsPage: {
        borderRadius: 30,
        backgroundColor: "#fff",
        height: 812,
        overflow: "hidden",
        width: "100%",
        flex: 1
        }
        });
    // ... rest of the styles remain the same as in your original code

export default NotificationsPage;