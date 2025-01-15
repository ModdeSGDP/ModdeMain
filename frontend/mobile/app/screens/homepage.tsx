import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';

const HomePage = () => {
  const navigation = useNavigation();

  const handleTakePhoto = async () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };
    // Commented out for now as per original code
    // launchCamera(options, response => {
    //   if (response.didCancel) {
    //     Alert.alert('Action canceled', 'You canceled the photo capture.');
    //   } else if (response.errorCode) {
    //     Alert.alert('Error', `Camera error: ${response.errorMessage}`);
    //   } else {
    //     const photo = response.assets[0];
    //     console.log('Photo captured:', photo);
    //     // Navigate to another screen or use the photo
    //   }
    // });
  };

  return (
    <View style={styles.homePage}>
      <View style={[styles.headerParent, styles.headerPosition]}>
        <Text style={[styles.exploreModdeFashion, styles.exploreTypo]}>Explore Modde Fashion Studio</Text>
        <Pressable onPress={() => {}}>
          <Image style={styles.menuIcon} resizeMode="cover" source={require("../assets/bars-from-left.png")} />
        </Pressable>
        <Pressable onPress={() => {}}>
          <Image style={styles.bell} source={require("../assets/bell.png")} />
        </Pressable>
      </View>
      <Image style={styles.mainImage} resizeMode="cover" source={require("../assets/Rectangle23.png")} />
      
      <View style={[styles.mainButtons, styles.buttonPosition]}>
        <Pressable style={styles.uploadButton} onPress={() => {}}>
          <Image style={styles.buttonBg} resizeMode="cover" source={require("../assets/ellipse16.png")} />
          <Image style={styles.uploadIcon} resizeMode="cover" source={require("../assets/upload.png")} />
          <Text style={styles.uploadText}>Upload File</Text>
        </Pressable>
        <Pressable style={styles.photoButton} onPress={() => navigation.navigate("ImageSearch")}>
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
      <View style={styles.uploadingBar}>
        <View style={styles.uploadingBarBg} />
        <View style={styles.uploadingBarFill} />
        <Image style={styles.fileIcon} resizeMode="cover" source={require("../assets/image.png")} />
        <Text style={styles.uploadingText}>Uploading</Text>
        <Text style={styles.percentageText}>69%</Text>
      </View>
      
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
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/cameraplus.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Intro2")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/shopping_cart.png")} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../assets/user.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    flex: 1,
    width: "100%",
    height: 1,
    top: -20
  },
  headerPosition: {
    position: 'absolute',
    top: 59,
    left: 0,
    right: 0,
  },
  exploreTypo: {
    fontFamily: 'Rosario-Bold',
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonPosition: {
    position: 'absolute',
    left: 30,
  },
  headerParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  exploreModdeFashion: {
    fontSize: 25,
    lineHeight: 36,
    color: '#321919',
    flex: 1,
    left: 25,
  },
  menuIcon: {
    width: 30,
    height: 30,
    left: -310,
    top:-10,
  },
  mainImage: {
    marginLeft: -160,
    top: 140,
    left: '50%',
    width: 320,
    height: 295,
    borderRadius: 30,
    position: 'absolute',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainButtons: {
    top: 533,
    width: 316,
    height: 142,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButton: {
    position: 'absolute',
    left: 56,
    alignItems: 'center',
    shadowColor: "#000",
    
  },
  photoButton: {
    position: 'absolute',
    right: 56,
    alignItems: 'center',
    shadowColor: "#000",
    
  },
  buttonBg: {
    width: 50,
    height: 49,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 12,
  },
  cameraIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 12,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#321919',
  },
  photoText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#321919',
  },
  nextButton: {
    position: 'absolute',
    bottom: 0,
    left: -0,
    right: -15,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonBg: {
    position: 'absolute',
    top: 0,
    left: 5,
    right: 0,
    bottom: 0,
    backgroundColor: '#fba3a3',
    borderRadius: 10,
  },
  nextText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  arrowIcon: {
    width: 27,
    height: 27,
    position: 'absolute',
    right: 100,
  },
  uploadingBar: {
    position: 'absolute',
    top: 460,
    left: 38,
    width: 319,
    height: 52,
  },
  uploadingBarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffccd4',
    borderRadius: 100,
  },
  uploadingBarFill: {
    position: 'absolute',
    top: 3,
    left: 3,
    bottom: 3,
    width: '25%',
    backgroundColor: '#f97c7c',
    borderRadius: 100,
  },
  fileIcon: {
    position: 'absolute',
    top: 11,
    left: 11,
    width: 30,
    height: 30,
  },
  bell: {
    left: -6,
    width: 21,
    height: 23,
    top: -10
  },
  uploadingText: {
    position: 'absolute',
    top: 15,
    left: 97,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Inter-SemiBold',
    color: '#321919',
  },
  percentageText: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Inter-Medium',
    color: '#321919',
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
  activeIndicator: {
    position: 'absolute',
    left: 26,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fba3a3',
  },
});

export default HomePage;

