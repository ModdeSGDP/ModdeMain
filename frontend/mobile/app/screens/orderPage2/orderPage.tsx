"use client"

import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

const OnceYouReceive = () => {
  return <Text style={styles.onceYouReceive}>Once you receive a new message, you'll see it listed here</Text>
}

const OrdersPage = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [orders, setOrders] = useState([1, 2, 3])

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
          <OnceYouReceive />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.shopButton} onPress={() => navigation.navigate("ShopPage")}>
              <Text style={styles.shopButtonText}>Go to Shop</Text>
            </Pressable>
            <Pressable style={styles.navigateButton} onPress={() => navigation.navigate("HomePage")}>
              <Text style={styles.navigateButtonText}>Navigate</Text>
            </Pressable>
          </View>
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
    backgroundColor: "#FFF5F7", // Light pink background
  },
  statusBar: {
    height: 44,
    backgroundColor: "#FFF5F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#FFE2E6",
  },
  headerButton: {
    padding: 8,
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: "#FF6B8A", // Soft pink color for icons
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF4D6D", // Vibrant pink for title
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
    shadowColor: "#FFB3C1",
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
    color: "#FF4D6D",
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
    color: "#FF4D6D",
    fontWeight: "600",
  },
  noMoreMessages: {
    textAlign: "center",
    color: "#FF8FA3",
    fontSize: 14,
    marginVertical: 16,
    fontStyle: "italic",
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
  onceYouReceive: {
    alignSelf: "stretch",
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Rosario-Regular",
    textAlign: "center",
    color: "#FF4D6D",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
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
  navigateButton: {
    backgroundColor: "#FFB3C1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  navigateButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  navigationBar: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    height: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    shadowColor: "#FFB3C1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFF5F7",
    borderRadius: 32,
  },
  navIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: "#FF6B8A",
  },
  activeIndicator: {
    position: "absolute",
    left: 28,
    bottom: 8,
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF4D6D",
  },
  lineView: {
    position: "absolute",
    top: -20,
    left: -16,
    right: -16,
    height: 2,
    backgroundColor: "#FF4D6D",
  },
})

export default OrdersPage

