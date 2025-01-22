import React, { useState } from "react"
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

const CheckoutScreen = ({ route }) => {
  const navigation = useNavigation()
  const { address } = route.params
  const [paymentMethod, setPaymentMethod] = useState("card")

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={styles.backButton} source={require("../../assets/chevron_left.png")} />
        </Pressable>
        <Text style={styles.pageTitle}>Checkout</Text>

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
            <Text style={styles.addressDetails}>{`${address.street}, ${address.city}, ${address.country}`}</Text>
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
            <Text style={styles.totalValue}>LKR 4,370</Text>
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
          <Pressable onPress={() => {}}>
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
    color: "#321919",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
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
    marginTop: 20,
  },
  payNowText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
  navigationBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 69,
  },
  navBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFE2E6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
})

export default CheckoutScreen

