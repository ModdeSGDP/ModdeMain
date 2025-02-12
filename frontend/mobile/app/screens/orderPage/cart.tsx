import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useCartStore } from "../shopPage/cartState"

const Cart = () => {
  const navigation = useNavigation()
  const { items, removeItem, updateQuantity } = useCartStore()
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [displayTotal, setDisplayTotal] = useState(0)

  useEffect(() => {
    calculateDisplayTotal()
  }, [selectedItems, items])

  const calculateDisplayTotal = () => {
    if (selectedItems.size === 0) {
      setDisplayTotal(calculateTotalPrice(items))
    } else {
      const selectedItemsArray = items.filter((item) => selectedItems.has(item.id))
      setDisplayTotal(calculateTotalPrice(selectedItemsArray))
    }
  }

  const calculateTotalPrice = (itemsToCalculate) => {
    return itemsToCalculate.reduce((sum,item) => {
      const price = Number.parseFloat(item.price.replace("LKR ", "").replace(",", ""))
      return sum + price * item.quantity
    }, 0)
  }

  const toggleItemSelection = (itemId) => {
    const newSelectedItems = new Set(selectedItems)
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId)
    } else {
      newSelectedItems.add(itemId)
    }
    setSelectedItems(newSelectedItems)
  }

  const selectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(items.map((item) => item.id)))
    }
  }

  const renderCartItem = (item) => (
    <Pressable key={item.id} style={styles.cartItem} onPress={() => navigation.navigate("ItemDetails", { item })}>
      <Pressable onPress={() => toggleItemSelection(item.id)} style={styles.radioButton}>
        <View style={[styles.radio, selectedItems.has(item.id) && styles.radioSelected]} />
      </Pressable>
      <View style={styles.dressCard}>
        <Image style={styles.itemImage} resizeMode="cover" source={item.image} />
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.shopContainer}>
          <Image style={styles.shopIcon} source={require("../../assets/home.png")} />
          <Text style={styles.shopName}>{item.shop}</Text>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>LKR {item.price}</Text>
        <View style={styles.quantitySelector}>
          <Pressable onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </Pressable>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <Pressable onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => removeItem(item.id)}>
          <Image style={styles.removeButton} resizeMode="cover" source={require("../../assets/delete.png")} />
        </Pressable>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.cart}>
      <View style={styles.top}></View>
      <Pressable onPress={() => navigation.navigate("ShopPage")}>
        <Image style={styles.backbutton} resizeMode="cover" source={require("../../assets/chevron_left.png")} />
      </Pressable>
      <View style={styles.cart1}>
        <Text style={styles.headerTitle}>Cart {items.length > 0 ? `(${items.length})` : ""}</Text>
        <View style={styles.groupParent}>
          <Pressable onPress={() => navigation.navigate("NotificationPage")}>
            <Image style={styles.bellIcon} resizeMode="cover" source={require("../../assets/bell.png")} />
          </Pressable>
        </View>
      </View>
      {items.length > 0 ? (
        <ScrollView style={styles.carangeCartClothParent}>{items.map(renderCartItem)}</ScrollView>
      ) : (
        <View style={styles.oops}>
          <Image style={styles.empty} resizeMode="cover" source={require("../../assets/empty.png")} />
          <Text style={[styles.ooops, styles.ooopsLayout]}>Ooops!</Text>
          <Text style={[styles.onceYouAdd, styles.ooopsLayout]}>Once you add items, your items will appear here.</Text>
          <Pressable style={styles.shopButton} onPress={() => navigation.navigate("ShopPage")}>
            <Text style={styles.shopButtonText}>Shop Now</Text>
            <Image style={styles.angleRight} resizeMode="contain" source={require("../../assets/angle-right.png")} />
          </Pressable>
        </View>
      )}
      {items.length > 0 && (
        <View style={styles.checkoutBar}>
          <View style={styles.checkptBar}>
            <Pressable onPress={selectAll} style={styles.radioButton}>
              <View style={[styles.radio, selectedItems.size === items.length && styles.radioSelected]} />
            </Pressable>
            <Text style={styles.allText}>All</Text>
            <Image style={styles.tag} resizeMode="cover" source={require("../../assets/tag.png")} />
            <Text style={styles.totalPrice}>{`LKR ${displayTotal.toFixed(2)}`}</Text>
            <Pressable
              style={styles.checkoutButton}
              onPress={() => {
                navigation.navigate("CheckoutPage", {
                  selectedItems: items.filter((item) => selectedItems.has(item.id)),
                  total: displayTotal,
                })
              }}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </Pressable>
          </View>
        </View>
      )}
      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home1.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shirt.png")} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/cameraplus.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("CartPage")}>
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/cart2.png")} />
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
  dressCarddetails: {
    top: 80,
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 16,
    minWidth: 20,
    textAlign: "center",
  },
  tag: {
    width: 24,
    height: 24,
    left: 15,
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
  activeIndicator: {
    position: "absolute",
    left: 217,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fba3a3",
  },
  empty: {
    width: 250,
    height: 250,
    top: -150,
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
    width: 20,
    height: 20,
    top: 0,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f97c7c",
  },
  radioSelected: {
    backgroundColor: "#f97c7c",
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
    top: 40,
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
    top: -40,
    backgroundColor: "#fffff",
    marginTop: -60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#321919",
    left: 170,
  },
  groupParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    width: 22,
    height: 24,
    left: -20,
  },
  carangeCartClothParent: {
    flex: 1,
    paddingTop: 10,
  },
  cartItem: {
    flexDirection: "row",
    padding: 10,
    top: -20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dressCard: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemImage: {
    width: 88,
    height: 81,
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
    marginTop: -20,
    width: 12,
    height: 15,
    left: 200,
  },
  radioButton: {
    marginRight: 10,
  },
  checkoutBar: {
    backgroundColor: "#ffccd4",
    padding: 20,
    width: 400,
    height: 80,
    left: 5,
    borderRadius: 15,
    bottom: 150,
  },
  checkptBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  allText: {
    fontSize: 13,
    color: "#321919",
  },
  totalPrice: {
    fontSize: 14,
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
  oops: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  ooopsLayout: {
    textAlign: "center",
    marginBottom: 20,
    top: -150,
  },
  ooops: {
    fontSize: 24,
    fontWeight: "bold",
  },
  onceYouAdd: {
    fontSize: 14,
  },
  shopButton: {
    backgroundColor: "#f97c7c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    top: -150,
    flexDirection: "row",
    alignItems: "center",
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  angleRight: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
})
export default Cart

