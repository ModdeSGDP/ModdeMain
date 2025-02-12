"use client"

import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

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
      <View style={styles.statusBar}>
        {/* <Image source={require("../assets/statusbar-battery.png")} style={styles.statusIcon} /> */}
      </View>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={require("../../assets/chevron_left.png")} style={styles.logo} />
        </Pressable>
        <Text style={styles.title}>Orders</Text>
        <Pressable onPress={() => navigation.navigate("OrderSettingsPage")}>
          <Image source={require("../../assets/cog.png")} style={styles.settingsIcon} />
        </Pressable>
      </View>
      {orders.length > 0 ? (
        <>
          
          {/* Order Details */}
          <ScrollView style={styles.orderList}>
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
          <Text style={styles.noOrdersText}>Once you receive a new message, you’ll see it listed here</Text>
          <Pressable style={styles.shopButton} onPress={() => navigation.navigate("ShopPage")}>
            <Text style={styles.shopButtonText}>Go to Shop</Text>
          </Pressable>
        </View>
      )}
      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shirt.png")} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/cameraplus.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("CartPage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shopping_cart.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ProfilePage")}>
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
    backgroundColor: "#FFFFFF",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  statusIcon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  logo: {
    width: 27,
    height: 27,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  orderList: {
    flex: 1,
  },
  orderItem: {
    backgroundColor: "#FFCCD4",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  orderDate: {
    fontSize: 12,
    color: "#321919",
  },
  orderContent: {
    flexDirection: "row",
  },
  orderImage: {
    width: 41,
    height: 45,
    borderRadius: 5,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  orderDescription: {
    fontSize: 12,
    color: "#898989",
    marginBottom: 5,
  },
  seeDetails: {
    fontSize: 12,
    color: "#1A69EC",
    fontWeight: "600",
  },
  noMoreMessages: {
    textAlign: "center",
    color: "#898989",
    fontSize: 12,
    marginVertical: 15,
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
    left: 25,
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
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },
  deleteAllButton: {
    backgroundColor: "#FF5148",
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteAllText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noOrdersImage: {
    width: 250,
    height: 200,
    marginBottom: 50,
    bottom:60,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: "#FBA3A3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  shopButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
})

export default OrdersPage

