import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera'; // Correct import

const VisualSearch = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [type, setType] = useState(CameraType.back);  // Use CameraType correctly as a value
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  const flipCamera = () => {
    setType((prevType) => (prevType === CameraType.back ? CameraType.front : CameraType.back)); // Correct way to use CameraType
  };

  if (hasPermission === null) {
    return (
      <View style={styles.visualSearch}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.visualSearch}>
      {cameraActive ? (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={type}  // Ensure type is passed correctly
            ref={cameraRef}
          >
            <View style={styles.cameraControls}>
              <Pressable onPress={toggleCamera} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
              <Pressable onPress={flipCamera} style={styles.flipButton}>
                <Text style={styles.flipButtonText}>Flip</Text>
              </Pressable>
            </View>
          </Camera>
        </View>
      ) : (
        <>
          <View style={[styles.headerParent, styles.headerPosition]}>
            <Text style={[styles.visualSearchTitle, styles.titleTypo]}>Visual Search</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                style={styles.closeIcon}
                resizeMode="cover"
                source={require('../../assets/close.png')}
              />
            </Pressable>
          </View>
          <View style={[styles.instructionContainer, styles.instructionPosition]}>
            <Text style={styles.instructionText}>
              Aim at the product to identify automatically
            </Text>
          </View>
          <Pressable style={styles.cameraButton} onPress={toggleCamera}>
            <Image
              style={styles.cameraIcon}
              resizeMode="cover"
              source={require('../../assets/cameraIcon.png')}
            />
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  visualSearch: {
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
    bottom: 50,
    color: '#321919',
  },
  closeIcon: {
    width: 24,
    bottom: 50,
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
  closeButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
  flipButton: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  flipButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default VisualSearch;

