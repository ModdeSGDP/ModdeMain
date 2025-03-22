import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCartStore } from "../shopPage/cartState";
import { Ionicons } from "@expo/vector-icons";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  HomePage: undefined;
  ShopPage: undefined;
  CartPage: undefined;
  ProfilePage: undefined;
  Camera: undefined;
  NotificationPage: undefined;
  CheckoutPage: { selectedItems: any[]; total: number };
};

type CartNavigationProp = StackNavigationProp<RootStackParamList, "CartPage">;

const Cart = () => {
  const navigation = useNavigation<CartNavigationProp>();
  const { items, removeItem, updateQuantity } = useCartStore();
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [displayTotal, setDisplayTotal] = useState(0);

  useEffect(() => {
    calculateDisplayTotal();
  }, [selectedItems, items]);

  const calculateDisplayTotal = () => {
    if (selectedItems.size === 0) {
      setDisplayTotal(calculateTotalPrice(items));
    } else {
      const selectedItemsArray = items.filter((item) => selectedItems.has(item.id));
      setDisplayTotal(calculateTotalPrice(selectedItemsArray));
    }
  };

  const calculateTotalPrice = (itemsToCalculate: any[]) => {
    return itemsToCalculate.reduce((sum, item) => {
      const price = Number.parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0);
  };

  const toggleItemSelection = (itemId: unknown) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const selectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((item) => item.id)));
    }
  };

  const renderCartItem = (item: any) => (
    <Pressable key={item.id} style={styles.cartItem}>
      <Pressable onPress={() => toggleItemSelection(item.id)} style={styles.radioButton}>
        <View style={[styles.radio, selectedItems.has(item.id) && styles.radioSelected]} />
      </Pressable>
      <View style={styles.dressCard}>
        <Image
          style={styles.itemImage}
          resizeMode="cover"
          source={item.image ? { uri: item.image } : require("../../assets/user.png")}
        />
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cart}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </Pressable>
          <Text style={styles.headerTitle}>
            Cart {items.length > 0 ? `(${items.length})` : ""}
          </Text>
          <Pressable onPress={() => navigation.navigate("NotificationPage")}>
            <Image
              style={styles.bellIcon}
              resizeMode="cover"
              source={require("../../assets/bell.png")}
            />
          </Pressable>
        </View>

        <ScrollView 
          style={styles.contentContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {items.length > 0 ? (
            <View style={styles.cartItemsContainer}>
              {items.map(renderCartItem)}
            </View>
          ) : (
            <View style={styles.oops}>
              <Image
                style={styles.empty}
                resizeMode="cover"
                source={require("../../assets/empty.png")}
              />
              <Text style={[styles.ooops, styles.ooopsLayout]}>Ooops!</Text>
              <Text style={[styles.onceYouAdd, styles.ooopsLayout]}>
                Once you add items, your items will appear here.
              </Text>
              <Pressable
                style={styles.shopButton}
                onPress={() => navigation.navigate("ShopPage")}
              >
                <Text style={styles.shopButtonText}>Shop Now</Text>
                <Image
                  style={styles.angleRight}
                  resizeMode="contain"
                  source={require("../../assets/angle-right.png")}
                />
              </Pressable>
            </View>
          )}

          {items.length > 0 && (
            <View style={styles.checkoutBar}>
              <View style={styles.checkptBar}>
                <Pressable onPress={selectAll} style={styles.radioButton}>
                  <View
                    style={[
                      styles.radio,
                      selectedItems.size === items.length && styles.radioSelected,
                    ]}
                  />
                </Pressable>
                <Text style={styles.allText}>All</Text>
                <Image
                  style={styles.tag}
                  resizeMode="cover"
                  source={require("../../assets/tag.png")}
                />
                <Text style={styles.totalPrice}>{`LKR ${displayTotal.toFixed(2)}`}</Text>
                <Pressable
                  style={[
                    styles.checkoutButton,
                    selectedItems.size === 0 && styles.checkoutButtonDisabled,
                  ]}
                  disabled={selectedItems.size === 0}
                  onPress={() => {
                    navigation.navigate("CheckoutPage", {
                      selectedItems: items.filter((item) => selectedItems.has(item.id)),
                      total: displayTotal,
                    });
                  }}
                >
                  <Text style={styles.checkoutText}>Checkout</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.navigationBar}>
          <View style={styles.navBarBg} />
          <View style={styles.navIcons}>
            <Pressable onPress={() => navigation.navigate("HomePage")}>
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/smart_home1.png")}
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
              <View style={styles.lineView} />
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/cart2.png")}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cart: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  bellIcon: {
    width: 22,
    height: 24,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Ensures content clears the navigation bar
  },
  cartItemsContainer: {
    paddingTop: 10,
  },
  cartItem: {
    flexDirection: "row",
    paddingVertical: 10,
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
  itemDetails: {
    marginLeft: 10,
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
    fontSize: 13,
    fontWeight: "400",
    color: "#321919",
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
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
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 16,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    width: 12,
    height: 15,
    position: "absolute",
    right: 0,
    top: 0,
  },
  radioButton: {
    marginRight: 10,
    justifyContent: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f97c7c",
  },
  radioSelected: {
    backgroundColor: "#f97c7c",
  },
  checkoutBar: {
    backgroundColor: "#ffccd4",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20, // Added space below checkout bar
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
  tag: {
    width: 24,
    height: 24,
    marginLeft: 15,
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
  checkoutButtonDisabled: {
    backgroundColor: "#d3d3d3",
    opacity: 0.6,
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
    left: 217,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fba3a3",
  },
  oops: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    top:80,
  },
  empty: {
    width: 260,
    height: 256,
  },
  ooopsLayout: {
    textAlign: "center",
    marginBottom: 20,
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
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },
});

export default Cart;