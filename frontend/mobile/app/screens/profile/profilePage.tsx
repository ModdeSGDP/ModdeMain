"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput, ActivityIndicator, Modal } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { useAsyncStorage } from "../AsyncStorage/useAsyncStorage"

// Mock API function (in a real app, this would be in a separate file)
const deleteAccount = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.1
      if (success) {
        resolve()
      } else {
        reject(new Error("Failed to delete account"))
      }
    }, 2000)
  })
}

// ConfirmationModal component
const ConfirmationModal: React.FC<{
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.buttonCancel]} onPress={onCancel}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.buttonConfirm]} onPress={onConfirm}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const Profile = () => {
  const navigation = useNavigation<any>()
  const { storeData, getData } = useAsyncStorage()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  })

  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getData("userData")
      if (userData) {
        setProfileData({
          name: userData.username || "",
          email: userData.email || "",
          address: userData.address || "",
          password: userData.password || "",
        })
        if (userData.profilePicture) {
          setProfileImage(userData.profilePicture)
        }
      }
    }
    loadUserData()
  }, [getData])

  const handleEdit = async () => {
    if (isEditing) {
      // Save changes to AsyncStorage
      await storeData("userData", {
        username: profileData.name,
        email: profileData.email,
        address: profileData.address,
        password: profileData.password,
        profilePicture: profileImage,
      })
      console.log("Saving changes:", profileData)
    }
    setIsEditing(!isEditing)
  }

  const handleChange = (key: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value }))
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri
      setProfileImage(newImageUri)
      await storeData("userData", {
        ...profileData,
        profilePicture: newImageUri,
      })
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      await deleteAccount()
      setIsDeleting(false)
      alert("Account deleted successfully")
      navigation.navigate("Login")
    } catch (error) {
      setIsDeleting(false)
      alert("Error deleting account. Please try again.")
    }
  }

  return (
    <View style={styles.profile}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.backButton} source={require("../../assets/chevron_left.png")} />
      </Pressable>
      <Text style={styles.profileTitle}>Profile</Text>

      <Pressable onPress={() => navigation.navigate("NotificationPage")}>
        <Image style={styles.bell} source={require("../../assets/bell.png")} />
      </Pressable>

      <View style={styles.profilePhotoContainer}>
        <Image
          style={styles.profilePhoto}
          source={profileImage ? { uri: profileImage } : require("../../assets/ellipse-20.png")}
        />
        <Pressable style={styles.editPhotoButton} onPress={pickImage}>
          <Text style={styles.editPhotoText}>Edit Photo</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.profileOptions}>
        <View style={styles.accountInfo}>
          <View style={styles.sectionHeader}>
            <Text style={styles.accountInformation}>Account information</Text>
            <Pressable onPress={handleEdit}>
              <Text style={styles.editButton}>{isEditing ? "Save" : "Edit"}</Text>
            </Pressable>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.name}
                onChangeText={(text) => handleChange("name", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{profileData.name}</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email address</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoValue}>{profileData.email}</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Address</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.address}
                onChangeText={(text) => handleChange("address", text)}
                multiline
              />
            ) : (
              <Text style={styles.infoValue}>{profileData.address}</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Password</Text>
            <Pressable onPress={() => navigation.navigate("ChangePassword")}>
              <Text style={styles.changePassword}>change password</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.deleteAccount} onPress={() => setShowConfirmation(true)}>
          <Image source={require("../../assets/user.png")} style={styles.trashIcon} />
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </Pressable>
      </ScrollView>

      <Pressable style={styles.logoutButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>

      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
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
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user1.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>

      <ConfirmationModal
        visible={showConfirmation}
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowConfirmation(false)}
      />

      {isDeleting && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FBA3A3" />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },
  backButton: {
    width: 32,
    height: 32,
    position: "absolute",
    top: 20,
    left: 13,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#321919",
    textAlign: "center",
    marginTop: 50,
    top: -10,
  },
  bell: {
    width: 22,
    height: 24,
    position: "absolute",
    top: -50,
    right: 20,
  },
  profilePhotoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editPhotoButton: {
    marginTop: 10,
  },
  editPhotoText: {
    color: "#321919",
    textDecorationLine: "underline",
  },
  profileOptions: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  accountInfo: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  accountInformation: {
    fontSize: 18,
    fontWeight: "600",
    color: "#321919",
  },
  editButton: {
    fontSize: 14,
    color: "#321919",
    textDecorationLine: "underline",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  infoLabel: {
    fontSize: 13,
    color: "#321919",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 13,
    color: "#898989",
  },
  input: {
    fontSize: 13,
    color: "#898989",
    borderBottomWidth: 1,
    borderBottomColor: "#321919",
    minWidth: 150,
    textAlign: "right",
  },
  changePassword: {
    fontSize: 13,
    color: "#898989",
    textDecorationLine: "underline",
  },
  deleteAccount: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE2E2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 50,
  },
  trashIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    left: 100,
  },
  deleteAccountText: {
    fontSize: 14,
    left: 100,
    color: "#FF0000",
  },
  logoutButton: {
    backgroundColor: "#fba3a3",
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 130,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  navigationBar: {
    position: "absolute",
    bottom: 34,
    left: "50%",
    marginLeft: -158,
    width: 316,
    height: 69,
  },
  navBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffe2e6",
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
    left: 283,
    top: 55,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fba3a3",
  },
  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: "#FBA3A3",
  },
  buttonConfirm: {
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
})

export default Profile

