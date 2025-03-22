"use client"

import { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, Dimensions, Animated } from "react-native"
import { CameraView, type CameraType, type CameraCapturedPicture, useCameraPermissions } from "expo-camera"
import * as ImageManipulator from "expo-image-manipulator"
import { useNavigation, type NavigationProp } from "@react-navigation/native"
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { PanGestureHandler, PinchGestureHandler, State, GestureHandlerRootView } from "react-native-gesture-handler"

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

// Define Product interface
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
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isCropping, setIsCropping] = useState(false)
  const cameraRef = useRef<CameraView | null>(null)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const fadeAnim = useRef(new Animated.Value(0)).current

  // Crop state
  const pinchScale = useRef(new Animated.Value(1)).current
  const translateX = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current
  const [cropScale, setCropScale] = useState(1)
  const [cropTranslateX, setCropTranslateX] = useState(0)
  const [cropTranslateY, setCropTranslateY] = useState(0)

  useEffect(() => {
    if (capturedImage) {
      setIsCropping(true) // Automatically enter cropping mode after capture
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()
    }
  }, [capturedImage, fadeAnim])

  if (!permission) {
    return <View style={styles.container} />
  }

  if (!permission.granted) {
    return (
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
    )
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo: CameraCapturedPicture | undefined = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      })
      if (photo) {
        setCapturedImage(photo.uri)
      } else {
        Alert.alert("Error", "Failed to capture photo. Please try again.")
      }
    } else {
      Alert.alert("Error", "Camera is not available.")
    }
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setCroppedImage(null)
    setUploadProgress(0)
    setIsCropping(false)
    fadeAnim.setValue(0)
    setCropScale(1)
    setCropTranslateX(0)
    setCropTranslateY(0)
    pinchScale.setValue(1)
    translateX.setValue(0)
    translateY.setValue(0)
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

  const confirmCrop = async () => {
    if (!capturedImage) return

    try {
      const cropWidth = width * 0.8 // Fixed crop frame size
      const cropHeight = width * 0.8
      const originX = (width - cropWidth) / 2 - (cropTranslateX / cropScale)
      const originY = (height - cropHeight) / 2 - (cropTranslateY / cropScale)

      const manipResult = await ImageManipulator.manipulateAsync(
        capturedImage,
        [
          {
            crop: {
              originX: Math.max(0, Math.min(originX, width - cropWidth)),
              originY: Math.max(0, Math.min(originY, height - cropHeight)),
              width: cropWidth,
              height: cropHeight,
            },
          },
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
      )

      setCroppedImage(manipResult.uri)
      setIsCropping(false)
    } catch (error) {
      console.error("Error cropping image:", error)
      Alert.alert("Error", "Failed to crop image. Please try again.")
    }
  }

  const uploadImage = async () => {
    if (!croppedImage) {
      Alert.alert("No cropped image", "Please crop the image before uploading.")
      return
    }

    const formData = new FormData()
    formData.append("file", {
      uri: croppedImage,
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
      retakePicture() // Reset after successful upload
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

  // Remove useNativeDriver to avoid nesting issues
  const onPinchGestureEvent = Animated.event([{ nativeEvent: { scale: pinchScale } }], { useNativeDriver: false })

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const newScale = Math.max(1, Math.min(event.nativeEvent.scale * cropScale, 3)) // Limit scale between 1x and 3x
      setCropScale(newScale)
      pinchScale.setValue(1)
    }
  }

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: false },
  )

  const onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setCropTranslateX(cropTranslateX + event.nativeEvent.translationX)
      setCropTranslateY(cropTranslateY + event.nativeEvent.translationY)
      translateX.setValue(0)
      translateY.setValue(0)
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  // Cropping UI
  if (isCropping && capturedImage) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.cropContainer}>
          <Text style={styles.cropTitle}>Crop your image</Text>

          <View style={styles.cropImageContainer}>
            <PinchGestureHandler onGestureEvent={onPinchGestureEvent} onHandlerStateChange={onPinchHandlerStateChange}>
              <Animated.View>
                <PanGestureHandler onGestureEvent={onPanGestureEvent} onHandlerStateChange={onPanHandlerStateChange}>
                  <Animated.Image
                    source={{ uri: capturedImage }}
                    style={[
                      styles.cropImage,
                      {
                        transform: [
                          { scale: Animated.multiply(pinchScale, cropScale) },
                          { translateX: Animated.add(translateX, cropTranslateX) },
                          { translateY: Animated.add(translateY, cropTranslateY) },
                        ],
                      },
                    ]}
                  />
                </PanGestureHandler>
              </Animated.View>
            </PinchGestureHandler>

            <View style={styles.cropOverlay}>
              <View style={styles.cropFrame} />
            </View>
          </View>

          <View style={styles.cropInstructions}>
            <Text style={styles.cropInstructionsText}>Pinch to zoom • Drag to position</Text>
          </View>

          <View style={styles.cropButtonsContainer}>
            <TouchableOpacity style={styles.cropButton} onPress={retakePicture}>
              <Text style={styles.cropButtonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.cropButton, styles.confirmCropButton]} onPress={confirmCrop}>
              <Text style={styles.confirmCropButtonText}>Confirm Crop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GestureHandlerRootView>
    )
  }

  // Preview UI (after cropping)
  if (croppedImage && !isCropping) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.previewContainer, { opacity: fadeAnim }]}>
          <Image source={{ uri: croppedImage }} style={styles.preview} />
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent", "transparent", "rgba(0,0,0,0.7)"]}
            style={styles.previewGradient}
          />

          {isProcessing && (
            <View style={styles.uploadingBar}>
              <View style={styles.uploadingBarBg} />
              <View style={[styles.uploadingBarFill, { width: `${uploadProgress}%` }]} />
              <Image style={styles.fileIcon} source={{ uri: croppedImage }} />
              <Text style={styles.uploadingText}>Uploading</Text>
              <Text style={styles.percentageText}>{`${uploadProgress}%`}</Text>
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
    )
  }

  // Camera UI
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.cameraOverlay}>
          <View style={styles.cameraHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={goBack}>
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.cameraGuide}>
            <View style={styles.cameraGuideFrame} />
            <Text style={styles.cameraGuideText}>Position your product in the frame</Text>
          </View>

          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <View style={styles.placeholder} />
          </View>
        </View>
      </CameraView>
    </View>
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
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
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
    resizeMode: "cover",
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
  uploadingBar: {
    position: "absolute",
    top: height * 0.65,
    left: 38,
    width: width - 76,
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
    borderRadius: 15,
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
  // Crop styles
  cropContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    padding: 20,
  },
  cropTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  cropImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cropImage: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
  cropOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cropFrame: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  cropInstructions: {
    marginBottom: 20,
    alignItems: "center",
  },
  cropInstructionsText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  cropButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  cropButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 120,
    alignItems: "center",
  },
  cropButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmCropButton: {
    backgroundColor: "#ff8a8a",
  },
  confirmCropButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default CameraScreen