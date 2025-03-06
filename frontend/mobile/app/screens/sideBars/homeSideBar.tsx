"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, Pressable, Animated, Easing, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { LinearGradient } from "expo-linear-gradient"

type RootStackParamList = {
  HomePage: undefined
  OrdersPage: undefined
  Favorites: undefined
  History: undefined
  PromotionPage: undefined
  Camera: undefined
}

type SideMenuNavigationProp = StackNavigationProp<RootStackParamList, "HomePage">

const SideMenu: React.FC = () => {
  const navigation = useNavigation<SideMenuNavigationProp>()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [animation])

  const menuItems = [
    { name: "OrdersPage", label: "My Orders", icon: require("../../assets/truck.png") },
    { name: "Favorites", label: "Favorites", icon: require("../../assets/heart.png") },
    { name: "History", label: "History", icon: require("../../assets/shopping-bag.png") },
    { name: "PromotionPage", label: "Promotions", icon: require("../../assets/fire.png") },
    { name: "Camera", label: "Camera", icon: require("../../assets/camera-photo.png") },
  ]

  const NavigationItem: React.FC<{ name: string; label: string; icon: any; index: number }> = ({
    name,
    label,
    icon,
    index,
  }) => {
    const itemAnimation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    })

    return (
      <Animated.View
        style={{
          transform: [{ translateX: itemAnimation }],
          opacity: animation,
        }}
      >
        <Pressable
          style={[styles.navigationItem, selectedItem === name && styles.selectedItem]}
          onPress={() => {
            setSelectedItem(name)
            navigation.navigate(name as keyof RootStackParamList)
          }}
        >
          <LinearGradient
            colors={selectedItem === name ? ["#ffccd4", "#ffd5d5"] : ["#f8f8f8", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.navigationItemGradient}
          >
            <Image style={[styles.icon, selectedItem === name && styles.selectedIcon]} source={icon} />
            <Text style={[styles.navText, selectedItem === name && styles.selectedNavText]}>{label}</Text>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <LinearGradient colors={["#fff8f8", "#fff"]} style={styles.sideMenu}>
      <Image style={styles.background} source={require("../../assets/Ellipse1.png")} />
      {/* <Pressable style={styles.closeButton} onPress={() => navigation.navigate("HomePage")}>
        <Image style={styles.closeIcon} source={require("../../assets/close.png")} />
      </Pressable> */}

      <Animated.Image
        style={[
          styles.logoIcon,
          {
            opacity: animation,
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
        source={require("../../assets/logo.png")}
      />

      <View style={styles.navigationBar}>
        {menuItems.map((item, index) => (
          <NavigationItem key={item.name} {...item} index={index} />
        ))}
      </View>
      <Image style={styles.background2} source={require("../../assets/Ellipse2.png")} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  sideMenu: {
    flex: 1,
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
    opacity: 0.5,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  logoIcon: {
    width: 150,
    height: 80,
    marginTop: -10,
    marginBottom: 100,
  },
  navigationBar: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  navigationItem: {
    width: 220,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  navigationItemGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  selectedItem: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: "#321919",
  },
  selectedIcon: {
    tintColor: "#ff8a8a",
  },
  navText: {
    fontSize: 16,
    color: "#321919",
    fontFamily: "Inter-SemiBold",
  },
  selectedNavText: {
    color: "#ff8a8a",
  },
  background2: {
    width: "100%",
    height: 150,
    position: "absolute",
    bottom: 0,
    opacity: 0.5,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
})

export default SideMenu

