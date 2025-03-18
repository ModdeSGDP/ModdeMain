"use client"

import { useState, useRef, useEffect } from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  Animated,
} from "react-native"
import { CameraView, type CameraType, useCameraPermissions } from "expo-camera"
import { useNavigation } from "@react-navigation/native"
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back")
  const [permission, requestPermission] = useCameraPermissions()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const cameraRef = useRef<CameraView | null>(null)
  const navigation = useNavigation()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (capturedImage) {
      setIsProcessing(true)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start()

      const timer = setTimeout(() => {
        setIsProcessing(false)
      }, 3000)
      return () => clearTimeout(timer)
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
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 })
      setCapturedImage(photo.uri)
    }
  }

  const retakePicture = () => {
    setCapturedImage(null)
    fadeAnim.setValue(0)
  }

  const uploadImage = async () => {
    if (!capturedImage) {
      Alert.alert("No image", "Please capture an image first.")
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
      const response = await fetch("http://192.168.1.134:4000/product/search-similar", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Upload failed")
      }
      const data = await response.json()
      navigation.navigate("HomePage", { products: data })
    } catch (error) {
      console.error("Upload error:", error)
      setIsProcessing(false)
      Alert.alert("Upload Failed", "There was a problem uploading your image. Please try again.", [{ text: "OK" }])
    }
  }

  const goBack = () => {
    navigation.goBack()
  }

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.previewContainer, { opacity: fadeAnim }]}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent", "transparent", "rgba(0,0,0,0.7)"]}
            style={styles.previewGradient}
          />
        </Animated.View>

        {isProcessing ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderCard}>
              <ActivityIndicator size="large" color="#FF69B4" />
              <Text style={styles.loaderText}>Processing your image...</Text>
              <Text style={styles.loaderSubtext}>Might take some time</Text>
            </View>
          </View>
        ) : (
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
    backgroundColor: "#FF69B4",
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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  loaderCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loaderText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  loaderSubtext: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
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
})

export default CameraScreen