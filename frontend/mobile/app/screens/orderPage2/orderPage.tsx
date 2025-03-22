"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, ScrollView, Pressable, SafeAreaView } from "react-native"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useAsyncStorage } from "../AsyncStorage/useAsyncStorage" // Adjust the import path as needed
import { Ionicons } from "@expo/vector-icons" // For chevron-back

type RootStackParamList = {
  HomePage: undefined
  ShopPage: undefined
  CartPage: undefined
  ProfilePage: undefined
  OrderSettingsPage: undefined
  OrdersPage: { newOrder?: any; deleteAll?: boolean }
}

type OrdersPageNavigationProp = StackNavigationProp<RootStackParamList, "OrdersPage">
type OrdersPageRouteProp = RouteProp<RootStackParamList, "OrdersPage">

type Order = {
  id: string
  date: string
  items: any[]
  total: number
  status: string
  paymentMethod: string
}

const OrdersPage: React.FC = () => {
  const navigation = useNavigation<OrdersPageNavigationProp>()
  const route = useRoute<OrdersPageRouteProp>()
  const [orders, setOrders] = useState<Order[]>([])
  const { storeData, getData, removeData, isLoading } = useAsyncStorage()

  useEffect(() => {
    const loadOrders = async () => {
      const storedOrders = await getData("orders")
      console.log("Loaded orders from AsyncStorage:", storedOrders)
      if (storedOrders) {
        setOrders(storedOrders)
      }
    }
    if (!isLoading) {
      loadOrders()
    }
  }, [isLoading, getData])

  useEffect(() => {
    const saveOrders = async () => {
      console.log("Saving orders to AsyncStorage:", orders)
      await storeData("orders", orders)
    }
    if (!isLoading && orders.length > 0) {
      saveOrders()
    }
  }, [orders, storeData, isLoading])

  useEffect(() => {
    const { deleteAll, newOrder } = route.params || {}
    console.log("Route params received:", { deleteAll, newOrder })

    if (deleteAll) {
      console.log("Deleting all orders")
      setOrders([])
      removeData("orders")
      return
    }

    if (newOrder) {
      console.log("Adding new order:", newOrder)
      setOrders(prevOrders => {
        if (!prevOrders.some(order => order.id === newOrder.id)) {
          const updatedOrders = [newOrder, ...prevOrders]
          console.log("Updated orders after adding new order:", updatedOrders)
          return updatedOrders
        }
        console.log("Order already exists, not adding duplicate")
        return prevOrders
      })
    }
  }, [route.params, removeData])

  const deleteAllOrders = () => {
    console.log("Deleting all orders via button")
    setOrders([])
    removeData("orders")
  }

  const formatDate = (dateString: string) => {
    return dateString.split('/').slice(0, 2).join('/')
  }

  const renderOrderItem = (item: any) => (
    <View key={item.id} style={styles.orderProductItem}>
      <Image
        style={styles.orderProductImage}
        resizeMode="cover"
        source={item.image ? item.image : require("../../assets/user.png")}
      />
      <View style={styles.orderProductDetails}>
        <Text style={styles.orderProductName}>{item.name}</Text>
        <Text style={styles.orderProductPrice}>LKR {item.price}</Text>
        <Text style={styles.orderProductQuantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  )

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
        {/* Updated Header with Cog Icon */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </Pressable>
          <Text style={styles.title}>Orders</Text>
          <Pressable onPress={() => navigation.navigate("OrderSettingsPage")}>
            <Image
              source={require("../../assets/cog.png")}
              style={styles.headerIcon}
            />
          </Pressable>
        </View>

        {orders.length > 0 ? (
          <>
            <ScrollView style={styles.orderList} showsVerticalScrollIndicator={false}>
              {orders.map((order, index) => (
                <View key={order.id} style={styles.orderItem}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderTitle}>
                      Order: {index + 1} -{" "}
                      {order.status === "Processing" ? "Order about to finish" : 
                       order.status === "Shipped" ? "Order shipped" : "Order delivered"}
                    </Text>
                    <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
                  </View>
                  <View style={styles.orderSummary}>
                    <Text style={styles.orderInfo}>
                      Order #{order.id.split('-')[1]} • {order.paymentMethod === "card" ? "Card" : "Cash"} • LKR {order.total.toFixed(2)}
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
            {orders.length > 5 && <Text style={styles.noMoreMessages}>No More Orders</Text>}
          </>
        ) : (
          <View style={styles.noOrdersContainer}>
            <Image source={require("../../assets/orderillu.png")} style={styles.noOrdersImage} />
            <Text style={styles.noOrdersText}>Once you place an order, you'll see it listed here</Text>
            <Pressable style={styles.shopButton} onPress={() => navigation.navigate("ShopPage")}>
              <Text style={styles.shopButtonText}>Go to Shop</Text>
            </Pressable>
          </View>
        )}

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
  headerButton: {
    padding: 8,
  },
  navItem: {},
  headerIcon: {
    width: 24,  // Matches original size
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
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
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  orderDate: {
    fontSize: 14,
    color: "#FF8FA3",
  },
  orderSummary: {
    marginBottom: 12,
  },
  orderInfo: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 8,
  },
  orderDescription: {
    fontSize: 14,
    color: "#666666",
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
    fontWeight: "500",
    color: "#321919",
    marginBottom: 4,
  },
  orderProductPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  orderProductQuantity: {
    fontSize: 14,
    color: "#555",
  },
  noMoreMessages: {
    textAlign: "center",
    color: "#FF8FA3",
    fontSize: 14,
    marginVertical: 16,
    fontStyle: "italic",
    bottom: 200,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  noOrdersImage: {
    width: 250,
    height: 200,
    marginBottom: 80,
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