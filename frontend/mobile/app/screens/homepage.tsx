"use client"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  PanResponder,
  Alert,
  Animated,
  Easing,
  Platform,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useNavigation, useRoute, type NavigationProp, type RouteProp } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useAsyncStorage } from "./AsyncStorage/useAsyncStorage"

// Define the navigation stack param list
type RootStackParamList = {
  Home: { products?: any[] } | undefined
  Camera: { capturedImage?: string } | undefined
  NotificationPage: undefined
  ShopPage: { products?: Product[] } | undefined
  CartPage: undefined
  ProfilePage: undefined
  Login: undefined
  OrdersPage: { newOrder?: any; deleteAll?: boolean } | undefined
}

interface Product {
  _id?: string
  name?: string
  image_url?: string
  [key: string]: any
}
interface RouteParams {
  products?: any[]
  capturedImage?: string
}
interface Order {
  id: string
  date: string
  items: any[]
  total: number
  status: string
  paymentMethod: string
}

const { width } = Dimensions.get("window")

// SideMenu Component (unchanged visuals, added animation)
interface SideMenuProps {
  orderCount: number
}
const SideMenu: React.FC<SideMenuProps> = ({ orderCount }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [animation] = useState(new Animated.Value(0))
  const [floatAnim] = useState(new Animated.Value(0)) // For floating effect

  useEffect(() => {
    // Initial slide-in animation
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()

    // Floating animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [animation, floatAnim])

  const menuItems = [
    { name: "OrdersPage", label: "My Orders", icon: require("../assets/truck.png") },
    { name: "Favorites", label: "Favorites", icon: require("../assets/heart.png") },
    { name: "History", label: "History", icon: require("../assets/shopping-bag.png") },
    { name: "PromotionPage", label: "Promotions", icon: require("../assets/fire.png") },
    { name: "Camera", label: "Camera", icon: require("../assets/camera-photo.png") },
  ]

  const NavigationItem: React.FC<{ name: string; label: string; icon: any; index: number }> = ({
    name,
    label,
    icon,
    index,
  }) => {
    const itemAnimation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    })
    return (
      <Animated.View
        style={{
          transform: [{ translateX: itemAnimation }],
          opacity: animation,
        }}
      >
        <Pressable
          style={[sideStyles.navigationItem, selectedItem === name && sideStyles.selectedItem]}
          onPress={() => {
            setSelectedItem(name)
            navigation.navigate(name as keyof RootStackParamList)
          }}
        >
          <LinearGradient
            colors={selectedItem === name ? ["#ffccd4", "#ffd5d5"] : ["#f8f8f8", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={sideStyles.navigationItemGradient}
          >
            <Image style={[sideStyles.icon, selectedItem === name && sideStyles.selectedIcon]} source={icon} />
            <Text style={[sideStyles.navText, selectedItem === name && sideStyles.selectedNavText]}>{label}</Text>
            {name === "OrdersPage" && orderCount > 0 && (
              <View style={sideStyles.orderBadge}>
                <Text style={sideStyles.orderBadgeText}>{orderCount}</Text>
              </View>
            )}
          </LinearGradient>
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <Animated.View
      style={[
        sideStyles.sideMenuContainer,
        {
          transform: [{ translateY: floatAnim }],
        },
      ]}
    >
      <LinearGradient colors={["#fff8f8", "#fff"]} style={sideStyles.sideMenu}>
        <Image style={sideStyles.background} source={require("../assets/Ellipse1.png")} />
        <Animated.Image
          style={[
            sideStyles.logoIcon,
            {
              opacity: animation,
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
          source={require("../assets/logo.png")}
        />
        <View style={sideStyles.navigationBar}>
          {menuItems.map((item, index) => (
            <NavigationItem key={item.name} {...item} index={index} />
          ))}
        </View>
        <Image style={sideStyles.background2} source={require("../assets/Ellipse2.png")} />
      </LinearGradient>
    </Animated.View>
  )
}

const sideStyles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  sideMenu: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    borderRadius: 15,
  },
  background: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
  },
  logoIcon: {
    width: 100,
    height: 60,
    marginTop: 5,
    marginBottom: 100,
  },
  navigationBar: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  navigationItem: {
    width: 220,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  navigationItemGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: "relative",
  },
  selectedItem: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: "#321919",
  },
  selectedIcon: {
    tintColor: "#ff8a8a",
  },
  navText: {
    fontSize: 16,
    color: "#321919",
    fontFamily: "Inter-SemiBold",
  },
  selectedNavText: {
    color: "#ff8a8a",
  },
  background2: {
    width: "100%",
    height: 150,
    position: "absolute",
    bottom: 0,
  },
  orderBadge: {
    position: "absolute",
    right: 10,
    top: 18,
    backgroundColor: "#ff4d4d",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  orderBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
})

const HomePage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute<RouteProp<RootStackParamList, "Home" | "Camera">>()
  const { storeData, getData, isLoading } = useAsyncStorage()
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [slideAnim] = useState(new Animated.Value(-width * 0.67))
  const [overlayOpacity] = useState(new Animated.Value(0))

  useEffect(() => {
    const loadOrders = async () => {
      const storedOrders = await getData("orders")
      if (storedOrders) {
        setOrders(storedOrders)
      }
    }
    if (!isLoading) {
      loadOrders()
    }
  }, [isLoading, getData])

  useEffect(() => {
    if (route.params?.capturedImage) {
      setUploadedImage(route.params.capturedImage)
      simulateUpload()
      uploadImage(route.params.capturedImage)
    }
  }, [route.params?.capturedImage])
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isSideMenuOpen ? 0 : -width * 0.67,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isSideMenuOpen ? 0.7 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start()
  }, [isSideMenuOpen, slideAnim, overlayOpacity])

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < -50 && isSideMenuOpen) {
        setIsSideMenuOpen(false)
      }
    },
  })

  const handleUploadImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Permission to access your photo library is required.", [{ text: "OK" }])
        return
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })

      if (result.canceled) return
      if (!result.assets || result.assets.length === 0) throw new Error("No image selected")

      const selectedImage = result.assets[0].uri
      setUploadedImage(selectedImage)
      simulateUpload()
      await uploadImage(selectedImage)
    } catch (error) {
      const err = error as Error
      console.error("Image picker error:", err)
      Alert.alert("Error", err.message || "Failed to select image. Please try again.")
    }
  }

  const uploadImage = async (imageUri: string) => {
    if (!imageUri) {
      Alert.alert("No image", "Please select an image first.")
      return
    }
    const formData = new FormData()
    formData.append("file", {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    } as any)
    try {
      setUploadProgress(10)
      const response = await fetch("https://93ba-112-134-239-177.ngrok-free.app/product/search-similar", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        const responseText = await response.text()
        let errorMessage = "Upload failed"
        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.message || `Upload failed with status: ${response.status}`
        } catch {
          errorMessage = `Server error: ${response.status}`
        }
        throw new Error(errorMessage)
      }
      setUploadProgress(100)
      const productsData = await response.json()
      navigation.navigate("ShopPage", { products: productsData })
      setUploadedImage(null)
      setUploadProgress(0)
    } catch (error) {
      const err = error as Error
      console.error("Upload error:", err)
      setUploadProgress(0)
      Alert.alert("Upload Failed", err.message || "Failed to upload image. Please check your network and try again.")
    }
  }

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval)
          return 90
        }
        return prevProgress + 5
      })
    }, 300)
    setTimeout(() => clearInterval(interval), 5000)
  }

  const handleTakePhoto = () => {
    navigation.navigate("Camera")
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.homePage}>
        <View style={styles.header}>
          <Pressable onPress={() => setIsSideMenuOpen(!isSideMenuOpen)}>
            <Ionicons name="menu" size={24} color="#333" />
            {orders.length > 0 && <View style={styles.menuBadge} />}
          </Pressable>
          <Text style={styles.headerTitle}>Modde Fashion Studio</Text>
          <Pressable onPress={() => navigation.navigate("NotificationPage")}>
            <Image style={styles.bell} source={require("../assets/bell.png")} />
          </Pressable>
        </View>

        <Image style={styles.mainImage} resizeMode="cover" source={require("../assets/intro.jpg")} />
        <View style={[styles.mainButtons, styles.buttonPosition]}>
          <Pressable style={styles.uploadButton} onPress={handleUploadImage}>
            <Image style={styles.buttonBg} resizeMode="cover" source={require("../assets/ellipse16.png")} />
            <Image style={styles.uploadIcon} resizeMode="cover" source={require("../assets/upload.png")} />
            <Text style={styles.uploadText}>Upload File</Text>
          </Pressable>
          <Pressable style={styles.photoButton} onPress={handleTakePhoto}>
            <Image style={styles.buttonBg} resizeMode="cover" source={require("../assets/ellipse17.png")} />
            <Image style={styles.cameraIcon} resizeMode="cover" source={require("../assets/camera.png")} />
            <Text style={styles.photoText}>Take Photo</Text>
          </Pressable>
          <Pressable style={styles.nextButton} onPress={() => {}}>
            <View style={styles.nextButtonBg} />
            <Text style={styles.nextText}>Next</Text>
            <Image style={styles.arrowIcon} resizeMode="cover" source={require("../assets/chevron-left1.png")} />
          </Pressable>
        </View>
        {uploadedImage && (
          <View style={styles.uploadingBar}>
            <View style={styles.uploadingBarBg} />
            <View style={[styles.uploadingBarFill, { width: `${uploadProgress}%` }]} />
            <Image style={styles.fileIcon} resizeMode="cover" source={{ uri: uploadedImage }} />
            <Text style={styles.uploadingText}>Uploading</Text>
            <Text style={styles.percentageText}>{`${uploadProgress}%`}</Text>
          </View>
        )}
        <View style={styles.navigationBar}>
          <View style={styles.navBarBg} />
          <View style={styles.navIcons}>
            <Pressable onPress={() => {}}>
              <View style={styles.lineView} />
              <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/smart_home.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ShopPage")}>
              <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/shirt.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Camera")}>
              <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/cameraplus.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("CartPage")}>
              <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/shopping_cart.png")} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ProfilePage")}>
              <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/user.png")} />
            </Pressable>
          </View>
          <View style={styles.activeIndicator} />
        </View>
      </View>
      {isSideMenuOpen && (
        <Animated.View
          style={[
            styles.sideMenuWrapper,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <SideMenu orderCount={orders.length} />
        </Animated.View>
      )}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
          },
        ]}
        pointerEvents={isSideMenuOpen ? "auto" : "none"}
      >
        <Pressable style={styles.overlayPressable} onPress={() => setIsSideMenuOpen(false)} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homePage: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 0,
    overflow: "hidden",
  },
  sideMenuWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.67,
    zIndex: 1000,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker overlay for shadow effect
    zIndex: 999,
  },
  overlayPressable: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Rosario-Bold",
    fontWeight: "800",
    color: "#333",
    top: 0,
    textAlign: "center",
    flex: 1,
  },
  menuBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 5,
  },
  bell: {
    width: 21,
    height: 23,
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
  buttonPosition: {
    position: "absolute",
    left: 30,
  },
  mainImage: {
    marginLeft: -160,
    top: 150,
    left: "50%",
    width: 320,
    height: 295,
    borderRadius: 30,
    position: "absolute",
  },
  mainButtons: {
    top: 533,
    width: 316,
    height: 142,
  },
  uploadButton: {
    position: "absolute",
    left: 70,
    alignItems: "center",
  },
  photoButton: {
    position: "absolute",
    right: 50,
    alignItems: "center",
  },
  buttonBg: {
    width: 50,
    height: 49,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 12,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 12,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
  },
  photoText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
  },
  nextButton: {
    position: "absolute",
    bottom: 0,
    left: -0,
    right: -15,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonBg: {
    position: "absolute",
    top: 0,
    left: 5,
    right: 0,
    bottom: 0,
    backgroundColor: "#fba3a3",
    borderRadius: 10,
  },
  nextText: {
    fontSize: 14,
    lineHeight: 19,
    right: 10,
    fontFamily: "Inter-SemiBold",
    color: "#fff",
  },
  arrowIcon: {
    width: 27,
    height: 27,
    position: "absolute",
    right: 120,
  },
  uploadingBar: {
    position: "absolute",
    top: 460,
    left: 38,
    width: 319,
    height: 52,
  },
  uploadingBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffccd4",
    borderRadius: 100,
  },
  uploadingBarFill: {
    position: "absolute",
    top: 3,
    left: 3,
    bottom: 3,
    backgroundColor: "#f97c7c",
    borderRadius: 100,
  },
  fileIcon: {
    position: "absolute",
    top: 11,
    left: 12,
    width: 30,
    height: 30,
  },
  uploadingText: {
    position: "absolute",
    top: 15,
    left: 97,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
  },
  percentageText: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: "Inter-Medium",
    color: "#321919",
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

export default HomePage