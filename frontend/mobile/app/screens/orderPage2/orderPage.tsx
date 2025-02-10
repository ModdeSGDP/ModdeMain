import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

const OrdersPage = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.ordersPage}>
      Status Bar
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        {/* <View style={styles.statusIcons}>
          <Image source={require("../assets/icon-mobile-signal.png")} style={styles.statusIcon} />
          <Image source={require("../../assets/wifi.png")} style={styles.statusIcon} />
          <Image source={require("../assets/statusbar-battery.png")} style={styles.statusIcon} />
        </View> */}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/chevron-left.png")} style={styles.logo} />
        <Text style={styles.title}>Orders</Text>
        <Image source={require("../../assets/cog.png")} style={styles.settingsIcon} />
      </View>

      {/* Order Details */}
      <ScrollView style={styles.orderList}>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderTitle}>Order about to finish</Text>
              <Text style={styles.orderDate}>17/10</Text>
            </View>
            <View style={styles.orderContent}>
              <Image source={require("../../assets/Rectangle55.png")} style={styles.orderImage} />
              <View style={styles.orderDetails}>
                <Text style={styles.orderDescription}>
                  Your order is to reach On Time Delivery date and will be automatically finished in 1 day..
                </Text>
                <Text style={styles.seeDetails}>See details</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.noMoreMessages}>No More Messages</Text>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Image source={require("../../assets/smart-home.png")} style={styles.navIcon} />
        <Image source={require("../../assets/shirt.png")} style={styles.navIcon} />
        <Image source={require("../../assets/camera-plus.png")} style={styles.navIcon} />
        <Image source={require("../../assets/shopping-cart.png")} style={styles.navIcon} />
        <Image source={require("../../assets/user.png")} style={styles.navIcon} />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 44,
  },
  time: {
    fontSize: 15,
    fontWeight: "600",
  },
  statusIcons: {
    flexDirection: "row",
  },
  statusIcon: {
    width: 17,
    height: 11,
    marginLeft: 5,
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
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 69,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
})

export default OrdersPage

