"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, Pressable, Dimensions, PanResponder, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { useNavigation, useRoute, type NavigationProp } from "@react-navigation/native"
import SideMenu from "./sideBars/homeSideBar"

type RootStackParamList = {
  Home: undefined
  Camera: undefined
  NotificationPage: undefined
  ShopPage: undefined
  CartPage: undefined
  ProfilePage: undefined
  Login: undefined
}

const { width } = Dimensions.get("window")

const HomePage = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute()
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [products, setProducts] = useState<any[]>([]) // State to hold products from response

  useEffect(() => {
    if (route.params?.capturedImage) {
      setUploadedImage(route.params.capturedImage)
      simulateUpload()
      uploadImage(route.params.capturedImage) // Upload captured image
    }
  }, [route.params?.capturedImage])

  useEffect(() => {
    if (route.params?.products) {
      console.log("Received products:", route.params.products)
      setProducts(route.params.products)
      setUploadedImage(null) // Reset image after successful upload
      setUploadProgress(0) // Reset progress
      // Optionally navigate elsewhere or update UI with products
    }
  }, [route.params?.products])

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        setIsSideMenuOpen(false)
      }
    },
  })

  const handleUploadImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      console.log("Permission result:", permissionResult)

      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Permission to access your photo library is required.", [{ text: "OK" }])
        console.error("Permission to access media library denied")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      })
      console.log("Image picker result:", result)

      if (result.canceled) {
        console.log("Image selection canceled by user")
        return
      }

      if (!result.assets || result.assets.length === 0) {
        throw new Error("No image selected")
      }

      const selectedImage = result.assets[0].uri
      setUploadedImage(selectedImage)
      simulateUpload()
      await uploadImage(selectedImage)
    } catch (error) {
      console.error("Image picker error:", error)
      Alert.alert("Error", "Failed to select image. Please try again.")
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
      setUploadProgress(10) // Start progress
      const response = await fetch("http://192.168.1.134:4000/product/search-similar", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Server response status:", response.status)
      const responseText = await response.text()
      console.log("Server response text:", responseText)

      if (!response.ok) {
        let errorMessage
        try {
          const errorData = JSON.parse(responseText)
          errorMessage = errorData.message || "Upload failed"
        } catch {
          errorMessage = `Upload failed with status: ${response.status}`
        }
        throw new Error(errorMessage)
      }
      setUploadProgress(100) // Complete progress
      const data = JSON.parse(responseText)
      console.log("Upload successful, server response:", data)
      navigation.navigate("HomePage", { products: data })
    } catch (error) {
      console.error("Upload error:", error)
      setUploadProgress(0)
      Alert.alert("Upload Failed", error.message || "Failed to upload image. Please try again.", [{ text: "OK" }])
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

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.homePage}>
        <View style={[styles.headerParent, styles.headerPosition]}>
          <Text style={[styles.exploreModdeFashion, styles.exploreTypo]}>Explore Modde Fashion Studio</Text>
          <Pressable onPress={() => setIsSideMenuOpen(!isSideMenuOpen)}>
            <Image style={styles.menuIcon} resizeMode="cover" source={require("../assets/bars-from-left.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("NotificationPage")}>
            <Image style={styles.bell} source={require("../assets/bell.png")} />
          </Pressable>
        </View>

        <Image style={styles.mainImage} resizeMode="cover" source={require("../assets/Rectangle23.png")} />

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

        {/* Display products if available */}
        {products.length > 0 && (
          <View style={styles.productsContainer}>
            <Text style={styles.productsTitle}>Similar Products Found:</Text>
            {products.map((product, index) => (
              <Text key={index} style={styles.productItem}>
                {product.name || `Product ${index + 1}`} {/* Adjust based on your API response */}
              </Text>
            ))}
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
        <View style={styles.sideMenuContainer}>
          <SideMenu />
          <Pressable style={styles.overlay} onPress={() => setIsSideMenuOpen(false)} />
        </View>
      )}
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
  sideMenuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.67,
    zIndex: 1000,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: width * 0.67,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  headerPosition: {
    position: "absolute",
    top: 59,
    left: 0,
    right: 0,
  },
  exploreTypo: {
    fontFamily: "Rosario-Bold",
    fontWeight: "800",
    textAlign: "center",
  },
  buttonPosition: {
    position: "absolute",
    left: 30,
  },
  headerParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  exploreModdeFashion: {
    fontSize: 25,
    lineHeight: 36,
    color: "#321919",
    flex: 1,
    left: 25,
    top: 0,
  },
  menuIcon: {
    width: 30,
    height: 20,
    right: 310,
    bottom: 15,
  },
  mainImage: {
    marginLeft: -160,
    top: 140,
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
    left: 11,
    width: 30,
    height: 30,
  },
  bell: {
    left: -2,
    width: 21,
    height: 23,
    bottom:20,
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
  productsContainer: {
    position: "absolute",
    top: 200,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productsTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#321919",
    marginBottom: 10,
  },
  productItem: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#321919",
    marginBottom: 5,
  },
})

export default HomePage