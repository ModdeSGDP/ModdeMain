import { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

type Address = {
  name: string
  phone: string
  fullAddress: string
}

type CartItem = {
  id: string
  name: string
  shop: string
  price: string
  image: any
  quantity: number
}

const CheckoutScreen = ({
  route,
}: { route: { params?: { address?: Address; selectedItems?: CartItem[]; total?: number } } }) => {
  const navigation = useNavigation()
  const address = route.params?.address || {
    name: "Default Name",
    phone: "Default Phone",
    fullAddress: "Default Address",
  }

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [selectedItems, setSelectedItems] = useState<CartItem[]>(route.params?.selectedItems || [])
  const [total, setTotal] = useState(route.params?.total || 0)

  useEffect(() => {
    if (route.params?.selectedItems) {
      setSelectedItems(route.params.selectedItems)
    }
    if (route.params?.total) {
      setTotal(route.params.total)
    }
  }, [route.params])

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <Image style={styles.itemImage} resizeMode="cover" source={item.image} />
      <View style={styles.itemDetails}>
        <View style={styles.shopContainer}>
          <Image style={styles.shopIcon} source={require("../../assets/home.png")} />
          <Text style={styles.shopName}>{item.shop}</Text>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>LKR {item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={styles.backButton} source={require("../../assets/chevron_left.png")} />
        </Pressable>
        <Text style={styles.pageTitle}>Checkout</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={styles.bell} source={require("../../assets/bell.png")} />
        </Pressable>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Pressable
              onPress={() => {
                /* Handle edit address */
              }}
            >
              <Text style={styles.editButton}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressName}>{address.name}</Text>
            <Text style={styles.addressDetails}>{address.phone}</Text>
            <Text style={styles.addressDetails}>{address.fullAddress}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment method</Text>
            <Pressable
              onPress={() => {
                /* Handle edit payment */
              }}
            >
              <Text style={styles.editButton}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.paymentOptions}>
            <Pressable style={styles.paymentOption} onPress={() => setPaymentMethod("card")}>
              <Image style={styles.paymentIcon} source={require("../../assets/credit-card.png")} />
              <Text style={styles.paymentText}>Credit/Debit card</Text>
              <View style={[styles.radioButton, paymentMethod === "card" && styles.radioButtonSelected]} />
            </Pressable>
            <Pressable style={styles.paymentOption} onPress={() => setPaymentMethod("cash")}>
              <Image style={styles.paymentIcon} source={require("../../assets/cash.png")} />
              <Text style={styles.paymentText}>Cash</Text>
              <View style={[styles.radioButton, paymentMethod === "cash" && styles.radioButtonSelected]} />
            </Pressable>
          </View>
        </View>

        

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promotions</Text>
            <Pressable
              onPress={() => {
                /* Handle view promotions */
              }}
            >
              <Text style={styles.viewButton}>View</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery</Text>
            <Text style={styles.totalValue}>Free</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>LKR {total.toFixed(2)}</Text>
          </View>
        </View>
        <Pressable
          style={styles.payNowButton}
          onPress={() => {
            /* Handle pay now */
          }}
        >
          <Text style={styles.payNowText}>Pay now</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <Image style={styles.navIcon} source={require("../../assets/smart_home1.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <Image style={styles.navIcon} source={require("../../assets/shirt1.png")} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} source={require("../../assets/cameraplus.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("CartPage")}>
            <Image style={styles.navIcon} source={require("../../assets/shopping_cart.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ProfilePage")}>
            <Image style={styles.navIcon} source={require("../../assets/user.png")} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bell: {
    left: 340,
    width: 21,
    height: 23,
    top: -100
  },
  scrollContent: {
    padding: 20,
  },
  backButton: {
    width: 27,
    height: 27,
    marginBottom: 20,
  },
  pageTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    left:130,
    top:-50,
    color: "#321919",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    top:-50,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#321919",
  },
  editButton: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "#321919",
  },
  viewButton: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "#321919",
  },
  addressInfo: {
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    padding: 15,
  },
  addressName: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#321919",
    marginBottom: 5,
  },
  addressDetails: {
    fontFamily: "Inter-Regular",
    fontSize: 13,
    color: "#898989",
  },
  paymentOptions: {
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    padding: 15,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  paymentIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  paymentText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#321919",
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F97C7C",
  },
  radioButtonSelected: {
    backgroundColor: "#F97C7C",
  },
  totalSection: {
    marginTop: 20,
    top:-90,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#321919",
  },
  totalValue: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#321919",
  },
  payNowButton: {
    backgroundColor: "#FBA3A3",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: -50,
  },
  payNowText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#FFFFFF",
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
  cartItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  shopContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  shopIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  shopName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#321919",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#555",
  },
})

export default CheckoutScreen

