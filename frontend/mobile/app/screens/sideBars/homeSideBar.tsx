"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, Pressable, Animated, Easing, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { LinearGradient } from "expo-linear-gradient"

// Define the navigation stack param list
type RootStackParamList = {
  HomePage: undefined
  OrdersPage: undefined
  Favorites: undefined
  History: undefined
  PromotionPage: undefined
  Camera: undefined
  HomeSideBar: undefined // Add this if not already present
}

type SideMenuNavigationProp = StackNavigationProp<RootStackParamList, "HomeSideBar">

// Props interface for the SideMenu component
interface SideMenuProps {
  orderCount: number
  navigation?: SideMenuNavigationProp // Optional navigation prop for screen compatibility
}

// Make SideMenu compatible with React Navigation's ScreenComponentType
const SideMenu: React.FC<SideMenuProps> = ({ orderCount, navigation: navigationProp }) => {
  // Use navigation prop if provided, otherwise fallback to useNavigation
  const navigation = navigationProp || useNavigation<SideMenuNavigationProp>()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      easing: Easing.ease,
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
      outputRange: [50 * (index + 1), 0],
    })

    const scaleAnimation = selectedItem === name ? 1.05 : 1

    return (
      <Animated.View
        style={{
          transform: [{ translateX: itemAnimation }, { scale: scaleAnimation }],
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
            colors={selectedItem === name ? ["#FBA3A3", "#FFD5D5"] : ["#F8F8F8", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.navigationItemGradient}
          >
            <Image style={[styles.icon, selectedItem === name && styles.selectedIcon]} source={icon} />
            <Text style={[styles.navText, selectedItem === name && styles.selectedNavText]}>{label}</Text>
            {name === "OrdersPage" && orderCount > 0 && (
              <View style={styles.orderBadge}>
                <Text style={styles.orderBadgeText}>{orderCount}</Text>
              </View>
            )}
          </LinearGradient>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <LinearGradient colors={["#FFF5F5", "#FFFFFF"]} style={styles.sideMenu}>
      <Image style={styles.background} source={require("../../assets/Ellipse1.png")} resizeMode="cover" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: animation,
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
          colors={["#FBA3A3", "#FFE6E6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoGradient}
        >
          <Image style={styles.logoIcon} source={require("../../assets/logo.png")} resizeMode="contain" />
        </LinearGradient>
      </Animated.View>

      <View style={styles.navigationBar}>
        {menuItems.map((item, index) => (
          <NavigationItem key={item.name} {...item} index={index} />
        ))}
      </View>
      <Image style={styles.background2} source={require("../../assets/Ellipse2.png")} resizeMode="cover" />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  sideMenu: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    width: 280,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  background: {
    width: "120%",
    height: 300,
    position: "absolute",
    top: -50,
    left: -20,
    opacity: 0.3,
  },
  logoContainer: {
    marginBottom: 60,
    borderRadius: 20,
    overflow: "hidden",
  },
  logoGradient: {
    padding: 15,
    borderRadius: 20,
  },
  logoIcon: {
    width: 160,
    height: 90,
  },
  navigationBar: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  navigationItem: {
    width: "100%",
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  navigationItemGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  selectedItem: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 15,
    tintColor: "#321919",
  },
  selectedIcon: {
    tintColor: "#FF6B6B",
  },
  navText: {
    fontSize: 17,
    color: "#321919",
    fontFamily: "Inter-SemiBold",
    letterSpacing: 0.5,
  },
  selectedNavText: {
    color: "#FF6B6B",
    fontWeight: "700",
  },
  background2: {
    width: "120%",
    height: 200,
    position: "absolute",
    bottom: -50,
    opacity: 0.3,
  },
  orderBadge: {
    position: "absolute",
    right: 15,
    top: 10,
    backgroundColor: "#FF4D4D",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  orderBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default SideMenu