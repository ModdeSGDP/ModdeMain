"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

const SideMenu = () => {
  const navigation = useNavigation()
  const [selectedItem, setSelectedItem] = useState(null)

  const menuItems = [
    { name: "OrdersPage", label: "My Orders", icon: require("../../assets/truck.png") },
    { name: "Favorites", label: "Favorites", icon: require("../../assets/heart.png") },
    { name: "History", label: "History", icon: require("../../assets/shopping-bag.png") },
    { name: "PromotionPage", label: "Promotions", icon: require("../../assets/fire.png") },
    { name: "Camera", label: "Camera", icon: require("../../assets/camera-photo.png") },
  ]

  const NavigationItem = ({ name, label, icon }) => (
    <Pressable
      style={[styles.navigationItem, selectedItem === name && styles.selectedItem]}
      onPress={() => {
        setSelectedItem(name)
        navigation.navigate(name)
      }}
    >
      <Image style={styles.icon} resizeMode="cover" source={icon} />
      <Text style={styles.navText}>{label}</Text>
    </Pressable>
  )

  return (
    <View style={styles.sideMenu}>
      <Image style={styles.background} resizeMode="cover" source={require("../../assets/Ellipse1.png")} />
      <Pressable style={styles.closeButton} onPress={() => navigation.navigate("HomePage")}>
        <Image style={styles.closeIcon} source={require("../../assets/close.png")} />
      </Pressable>

      <Image style={styles.logoIcon} resizeMode="cover" source={require("../../assets/logo.png")} />

      <Pressable style={styles.profileWrapper}>
        <Image style={styles.profileImage} resizeMode="cover" source={require("../../assets/ellipse-20.png")} />
        <Text style={styles.username}>Anne Fernando</Text>
      </Pressable>

      <View style={styles.navigationBar}>
        {menuItems.map((item) => (
          <NavigationItem key={item.name} {...item} />
        ))}
      </View>
      <Image style={styles.background2} resizeMode="cover" source={require("../../assets/Ellipse2.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  sideMenu: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
    width: 280,
  },
  background: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  logoIcon: {
    width: 66,
    height: 44,
    top: -60,
    marginTop: 70,
    marginBottom: 20,
  },
  profileWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 97,
    height: 98,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 14,
    color: "#321919",
    fontWeight: "bold",
  },
  navigationBar: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
    width: 220,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
  },
  selectedItem: {
    backgroundColor: "#ffccd4",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  navText: {
    fontSize: 14,
    color: "#321919",
    fontFamily: "Inter-Regular",
  },
  background2: {
    width: "100%",
    height: 150,
    position: "absolute",
    bottom: 0,
  },
  closeIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
})

export default SideMenu

