import React from "react"
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Profile = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.profile}>
      {/* <View style={styles.top}>
        <View style={styles.statusbar}>
          <View style={[styles.leftSide, styles.sideFlexBox]}>
            <View style={styles.statusbarTime}>
              <Text style={styles.time}>9:41</Text>
            </View>
          </View>
          <View style={[styles.rightSide, styles.sideFlexBox]}>
            <View style={styles.signalWifiBattery}>
              <Image source={require("../../assets/icon--mobile-signal.png")} style={styles.statusIcon} />
              <Image source={require("../../assets/wifi.png")} style={styles.statusIcon} />
              <Image source={require("../../assets/-statusbarbattery.png")} style={styles.statusIcon} />
            </View>
          </View>
        </View>
      </View> */}

      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.backButton} source={require("../../assets/chevron_left.png")} />
      </Pressable>
      <Text style={styles.profileTitle}>Profile</Text>
      <Image style={styles.profileImage} source={require("../../assets/ellipse-20.png")} />
      <Text style={styles.userName}>Anne Fernando</Text>

      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.bell} source={require("../../assets/bell.png")} />
      </Pressable>



      <ScrollView style={styles.profileOptions}>
        <ProfileOption title="Photo" />
        <ProfileOption
          title="Account information"
          onPress={() => {
            /* Handle navigation */
          }}
        />
        <ProfileOption title="Name" />
        <ProfileOption title="Gender" />
        <ProfileOption title="Birthday" />
        <ProfileOption title="Shipping address" />
        <ProfileOption title="Delete Account" />
      </ScrollView>

      <Pressable
        style={styles.logoutButton}
        onPress={() => {
          /* Handle logout */
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <NavIcon source={require("../../assets/smart_home1.png")} onPress={() => navigation.navigate("HomePage")} />
          <NavIcon source={require("../../assets/shirt.png")} onPress={() => navigation.navigate("ShopPage")} />
          <NavIcon source={require("../../assets/camera-plus.png")} onPress={() => {}} />
          <View style={styles.lineView} />
          <NavIcon source={require("../../assets/shopping-cart.png")} onPress={() => navigation.navigate("CartPage")} />
          <NavIcon source={require("../../assets/user1.png")} onPress={() => {}} isActive />
        </View>
      </View>
    </View>
  )
}

const ProfileOption = ({ title, onPress }) => (
  <Pressable style={styles.profileOption} onPress={onPress}>
    <Text style={styles.optionText}>{title}</Text>
    <Image source={require("../../assets/Vector4.png")} style={styles.arrowIcon} />
  </Pressable>
)

const NavIcon = ({ source, onPress, isActive }) => (
  <Pressable onPress={onPress}>
    {isActive && <View style={styles.activeIndicator} />}
    <Image source={source} style={styles.navIcon} />
  </Pressable>
)

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    position: "absolute",
    top: 2,
    width:23,
    left: 275,
    right: 0,
  },

  bell:{
    width: 22,
    height: 24,
    left: 360,
    top: -240,
  },
  top: {
    height: 59,
  },
  statusbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sideFlexBox: {
    alignItems: "center",
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  time: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  statusIcon: {
    width: 17,
    height: 11,
    marginLeft: 5,
  },
  backButton: {
    width: 27,
    height: 27,
    position: "absolute",
    top: 20,
    left: 13,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#321919",
    textAlign: "center",
    marginTop: 75,
  },
  profileImage: {
    width: 97,
    height: 98,
    borderRadius: 48.5,
    alignSelf: "center",
    marginTop: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#321919",
    textAlign: "center",
    marginTop: 15,
  },
  profileOptions: {
    marginTop: 30,
    top:-50,
    paddingHorizontal: 26,
  },
  profileOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 14,
    color: "#000",
  },
  arrowIcon: {
    width: 7,
    height: 13,
  },
  logoutButton: {
    backgroundColor: "#fba3a3",
    borderRadius: 10,
    paddingVertical: 12,
    top:-150,
    marginHorizontal: 27,
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  navigationBar: {
    position: "absolute",
    bottom: 34,
    left: "50%",
    marginLeft: -158,
    width: 316,
    height: 69,
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
    left: 6,
    top: 35,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fba3a3",
  },
})

export default Profile

