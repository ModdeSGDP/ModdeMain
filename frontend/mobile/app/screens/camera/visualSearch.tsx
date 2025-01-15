import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

type VisualSearchProps = {
  // Add any props if needed
};

const VisualSearch: React.FC<VisualSearchProps> = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const cameraRef = useRef<CameraType | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCamera = useCallback(() => {
    setCameraActive((prev) => !prev);
  }, []);

  const flipCamera = useCallback(() => {
    setType((prevType) => 
      prevType === CameraType.back ? CameraType.front : CameraType.back
    );
  }, []);

  const CameraUI = () => (
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
      >
        <View style={styles.cameraControls}>
          <Pressable onPress={toggleCamera} style={styles.button} accessibilityLabel="Close camera">
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
          <Pressable onPress={flipCamera} style={styles.button} accessibilityLabel="Flip camera">
            <Text style={styles.buttonText}>Flip</Text>
          </Pressable>
        </View>
      </Camera>
    </View>
  );

  const SearchUI = () => (
    <>
      <View style={[styles.headerParent, styles.headerPosition]}>
        <Text style={[styles.visualSearchTitle, styles.titleTypo]}>Visual Search</Text>
        <Pressable onPress={() => navigation.goBack()} accessibilityLabel="Go back">
          <Image
            style={styles.closeIcon}
            resizeMode="cover"
            source={require('../../assets/close.png')}
            accessibilityLabel="Close icon"
          />
        </Pressable>
      </View>
      <View style={[styles.instructionContainer, styles.instructionPosition]}>
        <Text style={styles.instructionText}>
          Aim at the product to identify automatically
        </Text>
      </View>
      <Pressable style={styles.cameraButton} onPress={toggleCamera} accessibilityLabel="Open camera">
        <Image
          style={styles.cameraIcon}
          resizeMode="cover"
          source={require('../../assets/cameraIcon.png')}
          accessibilityLabel="Camera icon"
        />
      </Pressable>
    </>
  );

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera. Please grant permission in your device settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {cameraActive ? <CameraUI /> : <SearchUI />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
  },
  headerPosition: {
    position: 'absolute',
    top: 59,
    left: 0,
    right: 0,
  },
  headerParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleTypo: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  visualSearchTitle: {
    fontSize: 18,
    color: '#321919',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  instructionPosition: {
    position: 'absolute',
    left: 30,
  },
  instructionContainer: {
    top: '50%',
    marginTop: -38,
    width: '80%',
  },
  instructionText: {
    textAlign: 'center',
    color: '#321919',
    fontSize: 16,
    fontFamily: 'Rosario-Regular',
  },
  cameraButton: {
    position: 'absolute',
    left: '50%',
    marginLeft: -35,
    bottom: 101,
  },
  cameraIcon: {
    width: 70,
    height: 70,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default VisualSearch;

