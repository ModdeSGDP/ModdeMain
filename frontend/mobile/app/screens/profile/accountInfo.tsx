import { useNavigation } from "@react-navigation/native"
import { Image, StyleSheet, Text, Pressable, View } from "react-native"

const AccountInfo = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.accountInfo}>
      <Image style={styles.accountInfoChild} resizeMode="cover" source={require("../../assets/Ellipse1.png")} />
      <Text style={styles.accountInformation}>Account information</Text>
      <View style={styles.frameParent}>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={[styles.memberId, styles.memberIdTypo]}>Member ID</Text>
          <Text style={[styles.text, styles.textTypo]}>12345678</Text>
        </View>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={[styles.memberId, styles.memberIdTypo]}>Email address</Text>
          <Text style={[styles.text, styles.textTypo]}>anne@gmail.com</Text>
        </View>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={[styles.memberId, styles.memberIdTypo]}>Phone number</Text>
          <Text style={[styles.text, styles.textTypo]}>+94- 771234567</Text>
        </View>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={[styles.memberIdParent, styles.memberIdTypo]}>Address</Text>
          <Text style={[styles.text, styles.textTypo]}>No:123 Milepost Avenue,Colombo,Sri Lanka</Text>
        </View>
        <View style={[styles.memberIdParent, styles.sideFlexBox]}>
          <Text style={styles.memberIdTypo}>
            <Text style={styles.password1}>Password</Text>
          </Text>
          <Text style={[styles.changePassword, styles.textTypo]}>change password</Text>
        </View>
      </View>
      <Pressable
        style={styles.checkoutButton}
        onPress={() => {
          navigation.navigate("CheckoutPage", {
            address: {
              name: "Anne", // You might want to replace this with actual user data
              phone: "+94- 771234567",
              fullAddress: "No:123 Milepost Avenue, Colombo, Sri Lanka",
            },
          })
        }}
      >
        <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
      </Pressable>
      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => {}}>
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home1.png")} />
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
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user1.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image style={styles.icon} resizeMode="cover" source={require("../../assets/chevron_left.png")} />
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    position: "absolute",
    top: -19,
    width: 23,
    left: 256,
    right: 0,
  },
  accountInfo: {
    borderRadius: 0,
    backgroundColor: "#fff",
    flex: 1,
    height: 812,
    overflow: "hidden",
  },
  accountInfoChild: {
    top: -6,
    left: -139,
    width: 449,
    height: 353,
    position: "absolute",
  },
  accountInformation: {
    marginLeft: -88.5,
    top: 45,
    fontSize: 18,
    lineHeight: 23,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
    textAlign: "center",
    fontWeight: "600",
    position: "absolute",
    left: "45%",
  },
  sideFlexBox: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  activeIndicator: {
    position: "absolute",
    left: 282,
    top: 56,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fba3a3",
  },
  memberIdTypo: {
    textAlign: "left",
    fontFamily: "Inter-Medium",
    lineHeight: 16,
    fontSize: 13,
    top: 28,
    fontWeight: "500",
  },
  textTypo: {
    color: "#898989",
    fontFamily: "Inter-Regular",
    textAlign: "left",
    lineHeight: 16,
    top: 28,
    fontSize: 13,
  },
  memberId: {
    color: "#321919",
  },
  text: {
    width: 108,
  },
  memberIdParent: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  password1: {
    color: "#321919",
  },
  changePassword: {
    width: 120,
  },
  frameParent: {
    top: 124,
    left: 24,
    width: 329,
    gap: 14,
    position: "absolute",
  },
  homeNavigationBarChild: {
    borderRadius: 20,
    backgroundColor: "#ffe2e6",
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  smartHome: {
    right: "91.79%",
    bottom: "7.69%",
    maxHeight: "100%",
    maxWidth: "100%",
    left: 6,
    top: 1,
    width: 20,
    height: 30,
  },
  shirt: {
    top: "7.69%",
    right: "68.57%",
    bottom: "0%",
    left: "23.21%",
    width: "8.21%",
    height: "92.31%",
  },
  cameraPlusIcon: {
    top: "7.69%",
    right: "45.71%",
    bottom: "0%",
    left: "46.07%",
    width: "8.21%",
    height: "92.31%",
  },
  shoppingCart: {
    top: "7.69%",
    right: "22.86%",
    bottom: "0%",
    left: "68.93%",
    width: "8.21%",
    height: "92.31%",
  },
  user: {
    right: "0%",
    bottom: "7.69%",
    left: 250,
    top: 1,
    width: 20,
    height: 30,
  },
  navigationBar: {
    position: 'absolute',
    bottom: 34,
    left: '50%',
    marginLeft: -158,
    width: 316,
    height: 69,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navBarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffe2e6',
    borderRadius: 20,
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  navIcon: {
    width: 23,
    height: 24,
  },
  naviIcons: {
    height: "37.68%",
    width: "88.61%",
    top: "31.88%",
    right: "5.7%",
    bottom: "30.43%",
    left: "5.7%",
    position: "absolute",
  },
  homeNavigationBar: {
    height: 69,
    width: 316,
    left: "50%",
    marginLeft: -158,
    top: 0,
    position: "absolute",
  },
  naviBar: {
    marginLeft: -157.5,
    top: 693,
    height: 69,
    width: 316,
    left: "50%",
    position: "absolute",
  },
  icon: {
    height: "80%",
    width: "80%",
    top: 20,
    left: 17,
  },
  backButton: {
    left: 10,
    top: 20,
    height: 37,
    width: 37,
    position: "absolute",
  },
  checkoutButton: {
    backgroundColor: "#FBA3A3",
    borderRadius: 10,
    padding: 15,
    top:400,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 24,
  },
  checkoutButtonText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
})

export default AccountInfo

