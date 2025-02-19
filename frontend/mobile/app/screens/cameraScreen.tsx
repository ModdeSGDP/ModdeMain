import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native"
import { CameraView, type CameraType, useCameraPermissions } from "expo-camera"
import { useNavigation } from "@react-navigation/native"
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back")
  const [permission, requestPermission] = useCameraPermissions()
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const cameraRef = useRef<CameraView | null>(null)
  const navigation = useNavigation()

  useEffect(() => {
    if (capturedImage) {
      setIsProcessing(true)
      // Simulating AI processing time
      const timer = setTimeout(() => {
        setIsProcessing(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [capturedImage])

  if (!permission) {
    return <View style={styles.container} />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      setCapturedImage(photo.uri)
    }
  }

  const retakePicture = () => {
    setCapturedImage(null)
  }

  const savePicture = () => {
    navigation.navigate("HomePage" as never, { capturedImage: capturedImage } as never)
  }

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedImage }} style={styles.preview} />
        {isProcessing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FF69B4" />
            <Text style={styles.loaderText}>Magic in progress... Your image is getting ready!</Text>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={retakePicture}>
              <MaterialIcons name="replay" size={30} color="white" />
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={savePicture}>
              <MaterialIcons name="file-upload" size={30} color="white" />
              <Text style={styles.buttonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-ios" size={30} color="white" />
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Ionicons name="camera" size={40} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#FFB6C1',
  },
  message: {
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 18,
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  iconButton: {
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF69B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  preview: {
    flex: 1,
    resizeMode: "cover",
  },
  permissionButton: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 25,
    marginHorizontal: 50,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FF69B4',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})

export default CameraScreen