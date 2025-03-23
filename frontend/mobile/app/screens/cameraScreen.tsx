"use client"

import { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, Dimensions, Animated } from "react-native"
import { CameraView, type CameraType, type CameraCapturedPicture, useCameraPermissions } from "expo-camera"
import * as ImageManipulator from "expo-image-manipulator"
import { useNavigation, type NavigationProp } from "@react-navigation/native"
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { GestureHandlerRootView } from "react-native-gesture-handler"

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

const { width, height } = Dimensions.get("window")

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back")
  const [permission, requestPermission] = useCameraPermissions()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const cameraRef = useRef<CameraView | null>(null)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const fadeAnim = useRef(new Animated.Value(0)).current

  // Animation values for loader
  const spinValue = useRef(new Animated.Value(0)).current
  const pulseValue = useRef(new Animated.Value(1)).current

  // Frame size - allow user to adjust
  const [frameSize, setFrameSize] = useState(width * 0.7)

  useEffect(() => {
    if (capturedImage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }
  }, [capturedImage, fadeAnim])

  // Start loader animations when processing
  useEffect(() => {
    if (isProcessing) {
      // Rotation animation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ).start()

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    } else {
      // Stop animations
      spinValue.setValue(0)
      pulseValue.setValue(1)
    }
  }, [isProcessing, spinValue, pulseValue])

  // Create the spin interpolation for rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  if (!permission) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container} />
      </GestureHandlerRootView>
    )
  }

  if (!permission.granted) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <LinearGradient colors={["#FFB6C1", "#FF69B4"]} style={styles.permissionContainer}>
          <View style={styles.permissionContent}>
            <FontAwesome5 name="camera" size={60} color="white" style={styles.permissionIcon} />
            <Text style={styles.permissionTitle}>Camera Access</Text>
            <Text style={styles.message}>We need your permission to use the camera for taking product photos</Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </GestureHandlerRootView>
    )
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsProcessing(true)

        // Take the full photo first
        const photo: CameraCapturedPicture | undefined = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: false,
        })

        if (!photo) {
          Alert.alert("Error", "Failed to capture photo. Please try again.")
          setIsProcessing(false)
          return
        }

        // Calculate the crop area based on the frame size
        const screenCenterX = width / 2
        const screenCenterY = height / 2

        // Get the image dimensions
        const { width: imgWidth, height: imgHeight } = await new Promise<{ width: number; height: number }>(
          (resolve, reject) => {
            Image.getSize(
              photo.uri,
              (width, height) => resolve({ width, height }),
              (error) => {
                console.error("Failed to get image size:", error)
                reject(error)
              },
            )
          },
        )

        // Calculate the scale factor from screen to image
        const screenAspect = width / height
        const imageAspect = imgWidth / imgHeight

        let displayWidth, displayHeight

        if (screenAspect > imageAspect) {
          // Image is taller than screen
          displayHeight = height
          displayWidth = imgWidth * (height / imgHeight)
        } else {
          // Image is wider than screen
          displayWidth = width
          displayHeight = imgHeight * (width / imgWidth)
        }

        // Calculate the scale factor from display size to actual image size
        const scaleX = imgWidth / displayWidth
        const scaleY = imgHeight / displayHeight

        // Calculate the crop dimensions in image coordinates
        const cropWidth = frameSize * scaleX
        const cropHeight = frameSize * scaleY

        // Calculate the top-left corner of the crop area
        const originX = (screenCenterX - frameSize / 2) * scaleX
        const originY = (screenCenterY - frameSize / 2) * scaleY

        // Ensure crop area is within image bounds
        const safeOriginX = Math.max(0, Math.min(originX, imgWidth - cropWidth))
        const safeOriginY = Math.max(0, Math.min(originY, imgHeight - cropHeight))
        const safeCropWidth = Math.min(cropWidth, imgWidth - safeOriginX)
        const safeCropHeight = Math.min(cropHeight, imgHeight - safeOriginY)

        // Crop the image to the frame area
        const croppedResult = await ImageManipulator.manipulateAsync(
          photo.uri,
          [
            {
              crop: {
                originX: safeOriginX,
                originY: safeOriginY,
                width: safeCropWidth,
                height: safeCropHeight,
              },
            },
          ],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
        )

        setCapturedImage(croppedResult.uri)
        setIsProcessing(false)
      } catch (error) {
        console.error("Error capturing and cropping image:", error)
        Alert.alert("Error", "Failed to process image. Please try again.")
        setIsProcessing(false)
      }
    } else {
      Alert.alert("Error", "Camera is not available.")
    }
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setUploadProgress(0)
    fadeAnim.setValue(0)
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
    return () => clearInterval(interval)
  }

  // Adjust frame size
  const adjustFrameSize = (increase: boolean) => {
    const newSize = increase ? Math.min(frameSize + 20, width * 0.95) : Math.max(frameSize - 20, width * 0.3)
    setFrameSize(newSize)
  }

  const uploadImage = async () => {
    if (!capturedImage) {
      Alert.alert("No image", "Please capture an image before uploading.")
      return
    }

    const formData = new FormData()
    formData.append("file", {
      uri: capturedImage,
      name: "image.jpg",
      type: "image/jpeg",
    } as any)

    try {
      setIsProcessing(true)
      const cleanup = simulateUpload()
      const response = await fetch("https://2a1a-124-43-246-34.ngrok-free.app/product/search-similar", {
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
      setIsProcessing(false)

      navigation.navigate("ShopPage", { products: productsData })
      retakePicture()
      cleanup()
    } catch (error) {
      console.error("Upload error:", error)
      setIsProcessing(false)
      setUploadProgress(0)
      Alert.alert(
        "Upload Failed",
        error instanceof Error ? error.message : "Failed to upload image. Please check your network and try again.",
        [{ text: "OK" }],
      )
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  if (capturedImage) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.container}>
          <Animated.View style={[styles.previewContainer, { opacity: fadeAnim }]}>
            <Image source={{ uri: capturedImage }} style={styles.preview} />
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent", "transparent", "rgba(0,0,0,0.7)"]}
              style={styles.previewGradient}
            />

            {/* Beautiful animated loader */}
            {isProcessing && (
              <View style={styles.loaderContainer}>
                <LinearGradient colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.85)"]} style={styles.loaderBackground} />
                <View style={styles.loaderContent}>
                  <Animated.View
                    style={[
                      styles.loaderImageContainer,
                      {
                        transform: [{ scale: pulseValue }],
                      },
                    ]}
                  >
                    <Image source={{ uri: capturedImage }} style={styles.loaderImage} />
                    <Animated.View
                      style={[
                        styles.loaderSpinner,
                        {
                          transform: [{ rotate: spin }],
                        },
                      ]}
                    >
                      <LinearGradient
                        colors={["#ff8a8a", "#ff5e5e"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.loaderSpinnerGradient}
                      />
                    </Animated.View>
                  </Animated.View>
                  <Text style={styles.loaderTitle}>Finding similar products</Text>
                  <Text style={styles.loaderSubtitle}>
                    {uploadProgress < 30
                      ? "Analyzing image..."
                      : uploadProgress < 60
                        ? "Searching catalog..."
                        : uploadProgress < 90
                          ? "Matching products..."
                          : "Almost done..."}
                  </Text>
                </View>
              </View>
            )}
          </Animated.View>

          {!isProcessing && (
            <View style={styles.previewButtonContainer}>
              <TouchableOpacity style={styles.previewButton} onPress={retakePicture}>
                <MaterialIcons name="replay" size={24} color="white" />
                <Text style={styles.buttonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.previewButton, styles.uploadButton]} onPress={uploadImage}>
                <MaterialIcons name="file-upload" size={24} color="white" />
                <Text style={styles.buttonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={goBack}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </GestureHandlerRootView>
    )
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={goBack}>
                <Ionicons name="close" size={28} color="white" />
              </TouchableOpacity>
              <View style={styles.placeholder} />
            </View>

            {/* Camera guide with frame */}
            <View style={styles.cameraGuide}>
              <View style={[styles.cameraGuideFrame, { width: frameSize, height: frameSize }]} />
              <Text style={styles.cameraGuideText}>Position your product in the frame</Text>
            </View>

            {/* Frame size controls */}
            <View style={styles.frameControls}>
              <TouchableOpacity style={styles.frameButton} onPress={() => adjustFrameSize(false)}>
                <MaterialIcons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.frameButton} onPress={() => adjustFrameSize(true)}>
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {/* Processing indicator */}
            {isProcessing && (
              <View style={styles.processingOverlay}>
                <View style={styles.processingContent}>
                  <Animated.View
                    style={[
                      styles.processingSpinner,
                      {
                        transform: [{ rotate: spin }],
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={["#ff8a8a", "#ff5e5e"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.processingSpinnerGradient}
                    />
                  </Animated.View>
                  <Text style={styles.processingText}>Processing...</Text>
                </View>
              </View>
            )}

            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
                <MaterialIcons name="flip-camera-ios" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.captureButton, isProcessing && styles.captureButtonDisabled]}
                onPress={takePicture}
                disabled={isProcessing}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              <View style={styles.placeholder} />
            </View>
          </View>
        </CameraView>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionContent: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 30,
    backdropFilter: "blur(10px)",
  },
  permissionIcon: {
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    marginBottom: 30,
    lineHeight: 24,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    padding: 20,
  },
  cameraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
  },
  cameraGuide: {
    alignItems: "center",
    justifyContent: "center",
  },
  cameraGuideFrame: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 15,
  },
  cameraGuideText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "white",
  },
  placeholder: {
    width: 50,
  },
  previewContainer: {
    flex: 1,
    position: "relative",
  },
  preview: {
    flex: 1,
    resizeMode: "contain",
  },
  previewGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  previewButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  previewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 120,
    gap: 8,
  },
  uploadButton: {
    backgroundColor: "#ff8a8a",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionButton: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  permissionButtonText: {
    color: "#FF69B4",
    fontSize: 16,
    fontWeight: "bold",
  },
  frameControls: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -50 }],
    flexDirection: "column",
    gap: 15,
  },
  frameButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  // Beautiful loader styles
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loaderContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loaderImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loaderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  loaderSpinner: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    top: 0,
    left: 0,
  },
  loaderSpinnerGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "transparent",
    borderTopColor: "#ff8a8a",
    borderRightColor: "rgba(255, 138, 138, 0.5)",
    borderBottomColor: "transparent",
    borderLeftColor: "rgba(255, 138, 138, 0.8)",
  },
  loaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  loaderSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 20,
  },
  // Processing overlay
  processingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  processingContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  processingSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  processingSpinnerGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "transparent",
    borderTopColor: "#ff8a8a",
    borderRightColor: "rgba(255, 138, 138, 0.5)",
    borderBottomColor: "transparent",
    borderLeftColor: "rgba(255, 138, 138, 0.8)",
  },
  processingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
})

export default CameraScreen

