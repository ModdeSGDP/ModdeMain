import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, StyleSheet, Text, Pressable, View } from "react-native";

const AccountInfo = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.accountInfo}>
      <Image style={styles.accountInfoChild} resizeMode="cover" source={require("../../assets/Ellipse1.png")} />
      <Text style={styles.accountInformation}>Account information</Text>
      <View style={styles.frameParent}>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={[styles.memberId, styles.memberIdTypo]}>Member ID</Text>
          <Text style={[styles.text, styles.textTypo]}>12345678</Text>
        </View>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={[styles.memberId, styles.memberIdTypo]}>Email address</Text>
          <Text style={[styles.text, styles.textTypo]}>anne@gmail.com</Text>
        </View>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={[styles.memberId, styles.memberIdTypo]}>Phone number</Text>
          <Text style={[styles.text, styles.textTypo]}>+94- 771234567</Text>
        </View>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={styles.memberIdTypo}>
            <Text style={styles.password1}>Password</Text>
          </Text>
          <Text style={[styles.changePassword, styles.textTypo]}>change password</Text>
        </View>
      </View>
      <View style={styles.naviBar}>
        <View style={styles.homeNavigationBar}>
          <View style={styles.homeNavigationBarChild} />
          <View style={styles.naviIcons}>
            <Image style={[styles.smartHome, styles.iconLayout]} resizeMode="cover" source={require("../../assets/smart-home.png")} />
            <Image style={[styles.shirt, styles.iconLayout]} resizeMode="cover" source={require("../../assets/shirt.png")} />
            <Image style={[styles.cameraPlusIcon, styles.iconLayout]} resizeMode="cover" source={require("../../assets/camera-plus.png")} />
            <Image style={[styles.shoppingCart, styles.iconLayout]} resizeMode="cover" source={require("../../assets/shopping-cart.png")} />
            <Image style={[styles.user, styles.iconLayout]} resizeMode="cover" source={require("../../assets/user.png")} />
          </View>
        </View>
      </View>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image style={styles.icon} resizeMode="cover" source={require("../../assets/chevron_left.png")} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  accountInfo: {
    borderRadius: 30,
    backgroundColor: "#fff",
    flex: 1,
    height: 812,
    overflow: "hidden",
  },
  accountInfoChild: {
    top: -6,
    left: -139,
    width: 449,
    height: 353,
    position: "absolute",
  },
  accountInformation: {
    marginLeft: -88.5,
    top: 75,
    fontSize: 18,
    lineHeight: 23,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
    textAlign: "center",
    fontWeight: "600",
    position: "absolute",
    left: "50%",
  },
  sideFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  memberIdTypo: {
    textAlign: "left",
    fontFamily: "Inter-Medium",
    lineHeight: 16,
    fontSize: 13,
    fontWeight: "500",
  },
  textTypo: {
    color: "#898989",
    fontFamily: "Inter-Regular",
    textAlign: "left",
    lineHeight: 16,
    fontSize: 13,
  },
  memberId: {
    color: "#321919",
  },
  text: {
    width: 108,
  },
  memberIdParent: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  password1: {
    color: "#321919",
  },
  changePassword: {
    width: 120,
  },
  frameParent: {
    top: 124,
    left: 24,
    width: 329,
    gap: 14,
    position: "absolute",
  },
  homeNavigationBarChild: {
    borderRadius: 20,
    backgroundColor: "#ffe2e6",
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  smartHome: {
    right: "91.79%",
    bottom: "7.69%",
    left: "0%",
    top: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  shirt: {
    top: "7.69%",
    right: "68.57%",
    bottom: "0%",
    left: "23.21%",
    width: "8.21%",
    height: "92.31%",
  },
  cameraPlusIcon: {
    top: "7.69%",
    right: "45.71%",
    bottom: "0%",
    left: "46.07%",
    width: "8.21%",
    height: "92.31%",
  },
  shoppingCart: {
    top: "7.69%",
    right: "22.86%",
    bottom: "0%",
    left: "68.93%",
    width: "8.21%",
    height: "92.31%",
  },
  user: {
    right: "0%",
    bottom: "7.69%",
    left: "91.79%",
    top: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  naviIcons: {
    height: "37.68%",
    width: "88.61%",
    top: "31.88%",
    right: "5.7%",
    bottom: "30.43%",
    left: "5.7%",
    position: "absolute",
  },
  homeNavigationBar: {
    height: 69,
    width: 316,
    left: "50%",
    marginLeft: -158,
    top: 0,
    position: "absolute",
  },
  naviBar: {
    marginLeft: -157.5,
    top: 693,
    height: 69,
    width: 316,
    left: "50%",
    position: "absolute",
  },
  icon: {
    height: "80%",
    width: "80%",
    top: 20,
    left: 17,
  },
  backButton: {
    left: 24,
    top: 50,
    height: 27,
    width: 27,
    position: "absolute",
  },
});

export default AccountInfo;