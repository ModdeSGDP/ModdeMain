"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  HomePage: undefined
  ShopPage: undefined
  CartPage: undefined
  ProfilePage: undefined
  OrderSettingsPage: undefined
}

type OrdersPageNavigationProp = StackNavigationProp<RootStackParamList, "HomePage">
type OrdersPageRouteProp = RouteProp<RootStackParamList, "HomePage">

const OrdersPage: React.FC = () => {
  const navigation = useNavigation<OrdersPageNavigationProp>()
  const route = useRoute<OrdersPageRouteProp>()
  const [orders, setOrders] = useState<number[]>([1, 2, 3])

  useEffect(() => {
    if (route.params?.deleteAll) {
      setOrders([])
    }
  }, [route.params?.deleteAll])

  const deleteAllMessages = () => {
    setOrders([])
  }

  return (
    <View style={styles.ordersPage}>
      {/* Status Bar */}
      <View style={styles.statusBar}>{/* Status bar content */}</View>

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Image source={require("../../assets/chevron_left.png")} style={styles.headerIcon} />
        </Pressable>
        <Text style={styles.title}>Orders</Text>
        <Pressable onPress={() => navigation.navigate("OrderSettingsPage")} style={styles.headerButton}>
          <Image source={require("../../assets/cog.png")} style={styles.headerIcon} />
        </Pressable>
      </View>

      {orders.length > 0 ? (
        <>
          {/* Order Details */}
          <ScrollView style={styles.orderList} showsVerticalScrollIndicator={false}>
            {orders.map((_, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderTitle}>Order about to finish</Text>
                  <Text style={styles.orderDate}>17/10</Text>
                </View>
                <View style={styles.orderContent}>
                  <Image source={require("../../assets/Rectangle55.png")} style={styles.orderImage} />
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderDescription}>
                      Your order is to reach On Time Delivery date and will be automatically finished in 1 day.
                    </Text>
                    <Text style={styles.seeDetails}>See details</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.noMoreMessages}>No More Messages</Text>
        </>
      ) : (
        <View style={styles.noOrdersContainer}>
          <Image source={require("../../assets/orderillu.png")} style={styles.noOrdersImage} />
          <Text style={styles.noOrdersText}>Once you receive a new message, you'll see it listed here</Text>
          <Pressable style={styles.shopButton} onPress={() => navigation.navigate("ShopPage")}>
            <Text style={styles.shopButtonText}>Go to Shop</Text>
          </Pressable>
        </View>
      )}

      {/* Navigation Bar */}
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
  )
}


const styles = StyleSheet.create({
  ordersPage: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Light pink background
  },
  statusBar: {
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    bottom:50,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0,
  },
  headerButton: {
    padding: 8,
  },
  navItem:{},
  headerIcon: {
    width: 24,
    height: 24,
    // tintColor: "#FF6B8A", // Soft pink color for icons
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    // color: "#FF4D6D", 
    // Vibrant pink for title
  },
  orderList: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  orderDate: {
    fontSize: 14,
    color: "#FF8FA3",
  },
  orderContent: {
    flexDirection: "row",
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  orderDetails: {
    flex: 1,
    
  },
  orderDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
    lineHeight: 20,
  },
  seeDetails: {
    fontSize: 14,
    color: "#0000FF",
    fontWeight: "600",
  },
  noMoreMessages: {
    textAlign: "center",
    color: "#FF8FA3",
    fontSize: 14,
    marginVertical: 16,
    fontStyle: "italic",
    bottom:200,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  noOrdersImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#FF4D6D",
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: "#FF4D6D",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
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
})
export default OrdersPage

