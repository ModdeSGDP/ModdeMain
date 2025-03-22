"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from "react-native"
import { useNavigation, type NavigationProp } from "@react-navigation/native"
import ConfettiCannon from "react-native-confetti-cannon"

const { width, height } = Dimensions.get("window")

// Define the param list for the root stack
export type RootStackParamList = {
  Home: undefined
  HomePage: undefined
  Camera: undefined
  NotificationPage: undefined
  ShopPage: undefined
  CartPage: undefined
  ProfilePage: undefined
  Login: undefined
  RegistrationComplete: undefined
  OrderComplete: { order: any }
  OrdersPage: { newOrder?: any }
  OrderSettingsPage: undefined
}

const OrderComplete = ({ route }: { route: { params: { order: any } } }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const confettiRef = useRef(null)
  const order = route.params.order

  const handleViewOrders = () => {
    // Navigate to OrdersPage with the new order
    navigation.navigate("OrdersPage", { newOrder: order })
  }

  return (
    <View style={styles.orderComplete}>
      <Image style={styles.orderCompleteChild} resizeMode="cover" source={require("../assets/Ellipse1.png")} />

      {/* Confetti animation */}
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: width / 2, y: 0 }}
        fadeOut={true}
        explosionSpeed={500}
        fallSpeed={2700}
        colors={["#FBA3A3", "#FFB6C1", "#FF69B4", "#FFC0CB", "#FFFFFF"]}
      />

      <View style={[styles.contentParent, styles.contentPosition]}>
        <Text style={[styles.congratulations, styles.congratulationsTypo]}>Order Confirmed!</Text>
        <Text style={styles.orderIsComplete}>
          Your order has been placed successfully! We're preparing your items for shipping.
        </Text>
      </View>

      <Pressable onPress={() => navigation.navigate("HomePage")}>
        <Image style={styles.groupIcon} resizeMode="cover" source={require("../assets/chevron_left.png")} />
      </Pressable>

      <View style={[styles.orderInfoContainer, styles.contentPosition]}>
        <Text style={styles.orderNumberText}>Order #: {order.id}</Text>
        <Text style={styles.estimatedDeliveryText}>Order Date: {order.date}</Text>
        <Text style={styles.estimatedDeliveryText}>
          Payment Method: {order.paymentMethod === "card" ? "Credit/Debit Card" : "Cash"}
        </Text>
        <Text style={styles.estimatedDeliveryText}>Total Amount: LKR {order.total.toFixed(2)}</Text>
        <Text style={styles.estimatedDeliveryText}>Estimated Delivery: 3-5 business days</Text>
      </View>

      <View style={[styles.buttonParent, styles.buttonPosition]}>
        <Pressable style={styles.button} onPress={handleViewOrders}>
          <View style={[styles.buttonChild, styles.buttonChildLayout]} />
          <Text style={[styles.viewOrders, styles.buttonTypo]}>View My Orders</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  orderComplete: {
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  iconPosition: {
    left: "50%",
    position: "absolute",
  },
  contentPosition: {
    left: "50%",
    position: "absolute",
  },
  congratulationsTypo: {
    fontFamily: "Rosario-Bold",
    fontWeight: "700",
    textAlign: "center",
  },
  buttonPosition: {
    left: 35,
    position: "absolute",
  },
  buttonChildLayout: {
    borderRadius: 10,
    position: "absolute",
  },
  buttonTypo: {
    fontFamily: "Inter-Medium",
    fontWeight: "500",
    textAlign: "center",
  },
  orderCompleteChild: {
    top: -16,
    left: -119,
    width: 449,
    height: 353,
    position: "absolute",
  },
  congratulations: {
    fontSize: 27,
    lineHeight: 36,
    color: "#321919",
    width: 250,
    height: 34,
  },
  orderIsComplete: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Rosario-Regular",
    color: "#707493",
    width: 294,
    textAlign: "center",
    marginTop: 10,
  },
  contentParent: {
    marginLeft: -147,
    top: 250,
    alignItems: "center",
  },
  orderInfoContainer: {
    marginLeft: -147,
    top: 380,
    alignItems: "center",
    backgroundColor: "rgba(251, 163, 163, 0.1)",
    padding: 15,
    borderRadius: 10,
    width: 294,
  },
  orderNumberText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
    marginBottom: 8,
  },
  estimatedDeliveryText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#707493",
    marginBottom: 5,
  },
  groupIcon: {
    top: 53,
    left: 23,
    width: 27,
    height: 27,
    position: "absolute",
  },
  buttonChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: "#fba3a3",
  },
  viewOrders: {
    fontSize: 12,
    lineHeight: 15,
    color: "#fff",
    position: "absolute",
    width: "100%",
    top: "30%",
  },
  button: {
    width: 327,
    height: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonParent: {
    bottom: 59,
    alignItems: "center",
  },
})

export default OrderComplete