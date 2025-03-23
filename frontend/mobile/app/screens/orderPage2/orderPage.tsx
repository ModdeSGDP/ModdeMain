"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  Animated,
} from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useAsyncStorage } from "../AsyncStorage/useAsyncStorage" // Adjust the import path as needed
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

type RootStackParamList = {
  HomePage: undefined
  ShopPage: undefined
  CartPage: undefined
  ProfilePage: undefined
  Camera: undefined
  OrderSettingsPage: undefined
  OrdersPage: { newOrder?: any; deleteAll?: boolean }
}

type OrdersPageNavigationProp = StackNavigationProp<RootStackParamList, "OrdersPage">
type OrdersPageRouteProp = RouteProp<RootStackParamList, "OrdersPage">

type OrderItem = {
  id: string
  name: string
  shop: string
  price: string
  image: string | null
  quantity: number
}

type Order = {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: string
  paymentMethod: string
}

const OrdersPage: React.FC = () => {
  const navigation = useNavigation<OrdersPageNavigationProp>()
  const route = useRoute<OrdersPageRouteProp>()
  const [orders, setOrders] = useState<Order[]>([])
  const { storeData, getData, removeData, isLoading } = useAsyncStorage()
  const buttonScale = new Animated.Value(1)

  useEffect(() => {
    const updateOrders = async () => {
      const { deleteAll, newOrder } = route.params || {}
      console.log("Route params received:", { deleteAll, newOrder })

      // Load existing orders from AsyncStorage
      const storedOrders = await getData("orders")
      console.log("Loaded orders from AsyncStorage:", storedOrders)
      let currentOrders = storedOrders || []

      if (deleteAll) {
        console.log("Deleting all orders")
        setOrders([])
        await removeData("orders")
        return
      }

      if (newOrder) {
        console.log("Processing new order:", newOrder)
        if (!currentOrders.some((order: Order) => order.id === newOrder.id)) {
          currentOrders = [newOrder, ...currentOrders] // Newest order goes to the top
          console.log("Updated orders with new order:", currentOrders)
        } else {
          console.log("Order already exists, skipping duplicate")
        }
      }

      // Update state and save to AsyncStorage
      setOrders(currentOrders)
      if (currentOrders.length > 0) {
        console.log("Saving updated orders to AsyncStorage:", currentOrders)
        await storeData("orders", currentOrders)
      }
    }

    if (!isLoading) {
      updateOrders()
    }
  }, [isLoading, route.params, getData, storeData, removeData])

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handleShopPress = () => {
    animateButton()
    setTimeout(() => navigation.navigate("ShopPage"), 200)
  }

  const formatDate = (dateString: string) => {
    return dateString.split("/").slice(0, 2).join("/")
  }

  const renderOrderItem = (item: OrderItem) => {
    const imageSource =
      item.image && typeof item.image === "string" && item.image.startsWith("http")
        ? { uri: item.image }
        : require("../../assets/user.png")

    return (
      <View key={item.id} style={styles.orderProductItem}>
        <Image
          style={styles.orderProductImage}
          resizeMode="cover"
          source={imageSource}
          defaultSource={require("../../assets/user.png")}
          onError={(e) =>
            console.log(`Image load error for ${item.name}:`, e.nativeEvent.error)
          }
        />
        <View style={styles.orderProductDetails}>
          <Text style={styles.orderProductName}>{item.name}</Text>
          <Text style={styles.orderProductPrice}>LKR {item.price}</Text>
          <Text style={styles.orderProductQuantity}>Quantity: {item.quantity}</Text>
        </View>
      </View>
    )
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.ordersPage}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ordersPage}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </Pressable>
          <Text style={styles.title}>Orders</Text>
          <Pressable onPress={() => navigation.navigate("OrderSettingsPage")}>
            <Image source={require("../../assets/cog.png")} style={styles.headerIcon} />
          </Pressable>
        </View>

        {orders.length > 0 ? (
          <>
            <ScrollView style={styles.orderList} showsVerticalScrollIndicator={false}>
              {orders
                .slice() // Create a copy to avoid mutating original array
                .reverse() // Reverse to show oldest order first
                .map((order, index) => (
                  <View key={order.id} style={styles.orderItem}>
                    <View style={styles.orderHeader}>
                      <Text style={styles.orderTitle}>
                        Order: {index + 1} -{" "}
                        {order.status === "Processing"
                          ? "Order about to finish"
                          : order.status === "Shipped"
                          ? "Order shipped"
                          : "Order delivered"}
                      </Text>
                      <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                    </View>
                    <View style={styles.orderSummary}>
                      <Text style={styles.orderInfo}>
                        Order #{order.id.split("-")[1]} •{" "}
                        {order.paymentMethod === "card" ? "Card" : "Cash"} • LKR{" "}
                        {order.total.toFixed(2)}
                      </Text>
                      <Text style={styles.orderDescription}>
                        {order.status === "Processing"
                          ? "Your order is to reach On Time Delivery date and will be automatically finished in 1 day."
                          : order.status === "Shipped"
                          ? "Your order has been shipped and is on its way to you."
                          : "Your order has been delivered. Enjoy your purchase!"}
                      </Text>
                    </View>
                    <View style={styles.orderProductsContainer}>
                      {order.items.map(renderOrderItem)}
                    </View>
                  </View>
                ))}
            </ScrollView>
            {orders.length > 5 && (
              <Text style={styles.noMoreMessages}>No More Orders</Text>
            )}
          </>
        ) : (
          <View style={styles.noOrdersContainer}>
            <Image
              source={require("../../assets/orderillu.png")}
              style={styles.noOrdersImage}
            />
            <Text style={styles.noOrdersText}>
              Once you place an order, you'll see it listed here
            </Text>
            <Animated.View
              style={[styles.shopButtonContainer, { transform: [{ scale: buttonScale }] }]}
            >
              <LinearGradient
                colors={["#ff9a9e", "#fad0c4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.shopButton}
              >
                <Pressable onPress={handleShopPress} style={styles.shopButtonContent}>
                  <Text style={styles.shopButtonText}>Go to Shop</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#FFF"
                    style={styles.shopButtonIcon}
                  />
                </Pressable>
              </LinearGradient>
            </Animated.View>
          </View>
        )}
        <View style={styles.navigationBar}>
          <View style={styles.navBarBg} />
          <View style={styles.navIcons}>
            <Pressable onPress={() => navigation.navigate("HomePage")}>
              <View style={styles.lineView} />
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/smart_home.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ShopPage")}>
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/shirt.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Camera")}>
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/cameraplus.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("CartPage")}>
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/shopping_cart.png")}
              />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ProfilePage")}>
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/user.png")}
              />
            </Pressable>
          </View>
          <View style={styles.activeIndicator} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  ordersPage: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
  },
  orderSummary: {
    marginBottom: 12,
  },
  orderInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  orderDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  orderProductsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  orderProductItem: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderProductImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  orderProductDetails: {
    flex: 1,
  },
  orderProductName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  orderProductPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  orderProductQuantity: {
    fontSize: 14,
    color: "#666",
  },
  noMoreMessages: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    marginVertical: 16,
    bottom: 200,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  noOrdersImage: {
    width: 260,
    height: 210,
    marginBottom: 30,
  },
  noOrdersText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  shopButtonContainer: {
    overflow: "hidden",
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shopButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  shopButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shopButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  shopButtonIcon: {
    marginLeft: 8,
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
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },
})

export default OrdersPage