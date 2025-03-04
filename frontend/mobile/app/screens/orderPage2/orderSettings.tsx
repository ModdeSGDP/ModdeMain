import type { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { Text, StyleSheet, View, Image, Pressable, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Define RootStackParamList for type safety
type RootStackParamList = {
  HomePage: undefined;
  ShopPage: undefined;
  CartPage: undefined;
  ProfilePage: undefined;
  OrderSettingsPage: undefined;
  NotificationPage: undefined;
  OrdersPage: { deleteAll: boolean };
};

type OrderSettingsNavigationProp = StackNavigationProp<RootStackParamList, "OrderSettingsPage">;

const OrderSettings = () => {
  const navigation = useNavigation<OrderSettingsNavigationProp>();
  const [allowNotifications, setAllowNotifications] = useState(true);

  const toggleNotifications = () => {
    setAllowNotifications((prevState) => !prevState);
    // TODO: Implement API call to update notification settings
    // updateNotificationSettings(allowNotifications);
  };

  const deleteAllMessages = () => {
    // TODO: Implement API call to delete all messages
    // deleteAllOrderMessages();
    navigation.navigate("OrdersPage", { deleteAll: true });
  };

  return (
    <View style={styles.orderSettings}>
      <View style={[styles.top, styles.topPosition]}>
        <View style={styles.statusbar}>
          <View style={[styles.leftSide, styles.sideFlexBox]}></View>
          <View style={[styles.dynamicIsland, styles.sideFlexBox]} />
          <View style={[styles.rightSide, styles.sideFlexBox]}></View>
        </View>
      </View>
      <View style={styles.groupParent}>
        <Pressable style={styles.pressable} onPress={() => navigation.goBack()}>
          <Image style={styles.backButton} resizeMode="cover" source={require("../../assets/chevron_left.png")} />
        </Pressable>
        <Text style={styles.orderSettings1}>Order Settings</Text>
      </View>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate("NotificationPage")}>
        <Image style={styles.bell} resizeMode="cover" source={require("../../assets/bell.png")} />
      </Pressable>
      <View style={[styles.orderSettingsChild, styles.orderLayout]} />
      <Text style={[styles.allowOrdersNotifications, styles.deleteAllMessagesTypo]}>Allow Orders notifications</Text>
      <Switch
        style={styles.notificationSwitch}
        value={allowNotifications}
        onValueChange={toggleNotifications}
        trackColor={{ false: "#767577", true: "#2ecc71" }}
        thumbColor={allowNotifications ? "#f4f3f4" : "#f4f3f4"}
      />
      <Text style={[styles.ifTurnedOff, styles.ifTurnedOffPosition]}>
        If turned off, you will no longer see how many unread Orders messages you have
      </Text>
      <View style={[styles.orderSettingsItem, styles.orderLayout]} />
      <Pressable onPress={deleteAllMessages} style={styles.deleteAllMessagesButton}>
        <Text style={[styles.deleteAllMessages, styles.ifTurnedOffPosition]}>Delete all messages</Text>
        <Image style={styles.trashBinIcon} resizeMode="cover" source={require("../../assets/trash-bin.png")} />
      </Pressable>

      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")} style={styles.navItem}>
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")} style={styles.navItem}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shirt.png")} />
          </Pressable>
          <Pressable onPress={() => {}} style={styles.navItem}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/cameraplus.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("CartPage")} style={styles.navItem}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shopping_cart.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ProfilePage")} style={styles.navItem}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topPosition: {
    left: 0,
    width: 375,
  },
  navItem: {},
  headerIcon: {
    width: 24,
    height: 24,
  },
  backButton: {
    width: 32,
    height: 32,
    position: "absolute",
    bottom: 80,
    right: 290,
  },
  bell: {
    width: 22,
    height: 24,
    position: "absolute",
    top: -50,
    right: -50,
  },
  sideFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  timeLayout: {
    height: 20,
    position: "absolute",
  },
  orderLayout: {
    height: 60,
    backgroundColor: "#ffccd8",
    position: "absolute",
    width: 500,
  },
  deleteAllMessagesTypo: {
    fontFamily: "Inter-Medium",
    lineHeight: 19,
    fontSize: 16,
    fontWeight: "500",
  },
  ifTurnedOffPosition: {
    textAlign: "left",
    left: 20,
    position: "absolute",
  },
  barLayout: {
    height: 69,
    width: 316,
    left: "50%",
    position: "absolute",
  },
  time: {
    fontSize: 17,
    letterSpacing: 0,
    fontFamily: "SF Pro Text",
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
    height: 20,
    width: 54,
    left: 0,
    top: 1,
  },
  statusbarTime: {
    borderRadius: 24,
    height: 21,
    width: 54,
  },
  leftSide: {
    justifyContent: "center",
    flex: 1,
  },
  dynamicIsland: {
    width: 125,
  },
  signalWifiBattery: {
    flexDirection: "row",
    gap: 8,
  },
  rightSide: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  statusbar: {
    height: 59,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    width: 375,
  },
  top: {
    top: 1,
    position: "absolute",
  },
  homeIndicator1: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: 100,
    backgroundColor: "#000",
    width: 134,
    height: 5,
    left: "50%",
    position: "absolute",
  },
  homeIndicator: {
    top: 778,
    height: 34,
    position: "absolute",
  },
  orderSettings1: {
    fontFamily: "Inter-SemiBold",
    width: 140,
    left: 120,
    bottom: 40,
    letterSpacing: -0.7,
    fontSize: 18,
    textAlign: "center",
    color: "#000",
    fontWeight: "600",
  },
  groupParent: {
    top: 60,
    left: 12,
    gap: 61,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  orderSettingsChild: {
    top: 103,
    width: 375,
    left: 0,
  },
  orderSettingsItem: {
    top: 222,
    left: -4,
    width: 379,
  },
  allowOrdersNotifications: {
    top: 123,
    left: 20,
    textAlign: "center",
    color: "#000",
    position: "absolute",
  },
  orderSettingsInner: {
    top: 118,
    left: 313,
    borderRadius: 60,
    backgroundColor: "#2ecc71",
    width: 40,
  },
  ellipseIcon: {
    top: 120,
    left: 334,
    position: "absolute",
    width: 17,
    height: 16,
  },
  deleteAllMessages: {
    top: 0,
    color: "#ff5148",
  },
  trashBinIcon: {
    width: 25,
    height: 25,
    left: 325,
    top: 0,
    position: "absolute",
  },
  ifTurnedOff: {
    top: 171,
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "Inter-Regular",
    color: "#979797",
    width: 333,
  },
  navigationBar: {
    position: "absolute",
    bottom: 34,
    left: "50%",
    marginLeft: -158,
    width: 316,
    height: 69,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffe2e6",
    borderRadius: 20,
  },
  navIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  navIcon: {
    width: 23,
    height: 24,
  },
  activeIndicator: {
    position: "absolute",
    left: 26,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fba3a3",
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    flex: 1,
    width: "100%",
    height: 1,
    top: -20,
  },
  text: {
    fontFamily: "SF Pro",
    color: "#040502",
    fontWeight: "500",
    letterSpacing: -0.7,
    fontSize: 18,
    textAlign: "center",
  },
  pressable: {
    left: 329,
    top: 69,
    position: "absolute",
  },
  orderSettings: {
    borderRadius: 0,
    backgroundColor: "#fff",
    height: 812,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
  notificationSwitch: {
    position: "absolute",
    top: 118,
    right: 20,
  },
  deleteAllMessagesButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 240,
    left: 20,
    right: 20,
  },
});

export default OrderSettings;