import React from "react"
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useCartStore } from "../shopPage/cartState"

const Cart = () => {
  const navigation = useNavigation()
  const { items, removeItem, updateQuantity } = useCartStore()

  const renderCartItem = (item) => (
    <Pressable key={item.id} style={styles.cartItem} onPress={() => navigation.navigate("ItemDetails", { item })}>
      <View style={styles.dressCard}>
        <Image style={styles.itemImage} resizeMode="cover" source={item.image} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.quantitySelector}>
          <Pressable onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => removeItem(item.id)}>
          <Text style={styles.removeButton}>Remove</Text>
        </Pressable>
      </View>
    </Pressable>
  )

  const totalPrice = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("LKR ", "").replace(",", ""))
    return sum + price * item.quantity
  }, 0)

  return (
    <View style={styles.cart}>
      <View style={styles.top}></View>
      <Pressable onPress={() => navigation.navigate("ShopPage")}>
        <Image style={styles.backbutton} resizeMode="cover" source={require("../../assets/chevron_left.png")} />
      </Pressable>
      <View style={styles.cart1}>
        <Text style={styles.headerTitle}>Cart ({items.length})</Text>
        <View style={styles.groupParent}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image style={styles.bellIcon} resizeMode="cover" source={require("../../assets/bell.png")} />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.carangeCartClothParent}>{items.map(renderCartItem)}</ScrollView>

      <View style={styles.checkoutBar}>
        <View style={styles.checkptBar}>
          
          <Text style={styles.allText}>All</Text>
          <Text style={styles.totalPrice}>{`LKR ${totalPrice.toFixed(2)}`}</Text>
          <Pressable
                     style={styles.checkoutButton}
                     onPress={() => navigation.navigate("CheckoutPage")}
          >
          <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>

        </View>
      </View>

      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => {}}>
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
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dressCarddetails: {
    top: -60,
  },
  home: {
    width: 20,
    height: 20,
    left: 25,
    bottom: 5,
  },
  shopText: {
    fontSize: 20,
    fontWeight: 700,
    left: 50,
    top: -30,
  },
  radio: {
    width: 15,
    height: 15,
    top: 10,
  },
  backbutton: {
    width: 35,
    height: 35,
    top: -48,
    left: 30,
  },
  cart: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    height: 69,
    width: "100%",
  },
  statusbar: {
    height: 59,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sideFlexBox: {
    alignItems: "center",
  },
  leftSide: {
    flex: 1,
  },
  statusbarTime: {
    borderRadius: 24,
  },
  time: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  rightSide: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  signalWifiBattery: {
    flexDirection: "row",
    gap: 8,
  },
  cart1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fffff",
    top: -100,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#321919",
    left: 150,
  },
  groupParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    width: 22,
    height: 23,
    left: -20,
    top: 1,
  },
  carangeCartClothParent: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dressCard: {
    width: 79,
    height: 71,
    top: -60,
  },
  itemImage: {
    width: 78,
    height: 71,
    top:60,
    borderRadius: 10,
  },
  dressCardChild: {
    position: "absolute",
    bottom: -80,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: "#d9d9d9",
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: "400",
    color: "#321919",
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },
  leftText: {
    fontSize: 10,
    color: "#321919",
  },
  quantitySelector: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    color: "red",
    marginTop: 5,
  },
  checkoutBar: {
    backgroundColor: "#ffccd4",
    padding: 20,
    borderRadius: 15,
    bottom: 150,
  },
  checkptBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  allText: {
    fontSize: 10,
    color: "#321919",
  },
  totalPrice: {
    fontSize: 12,
    fontWeight: "500",
    color: "#321919",
  },
  checkoutButton: {
    backgroundColor: "#f97c7c",
    paddingHorizontal: 24,
    paddingVertical: 9,
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
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
})
export default Cart

