"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAsyncStorage } from "../AsyncStorage/useAsyncStorage" // Adjust path as needed
import { LinearGradient } from "expo-linear-gradient"
import type { StackNavigationProp } from "@react-navigation/stack"
import { Ionicons } from "@expo/vector-icons" // Added Ionicons import

type RootStackParamList = {
  Login: undefined
  HomePage: undefined
  ShopPage: undefined
  CartPage: undefined
  ProfilePage: undefined
  NotificationPage: undefined
  Camera: undefined
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProfilePage">

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

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>()
  const { storeData, getData, isLoading } = useAsyncStorage()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  })

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getData("userData")
      console.log("Loaded userData:", userData) // Debug log
      if (userData) {
        setProfileData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          address: userData.address || "",
        })
      }
    }
    if (!isLoading) {
      loadUserData()
    }
  }, [getData, isLoading])

  const handleEdit = async () => {
    if (isEditing) {
      // Save changes to AsyncStorage
      await storeData("userData", profileData)
      console.log("Saving changes:", profileData)
    }
    setIsEditing(!isEditing)
  }

  const handleChange = (key: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value }))
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

  if (isLoading) {
    return (
      <View style={styles.profile}>
        <Text>Loading profile...</Text> {/* Wrapped in Text component */}
      </View>
    )
  }

  return (
    <View style={styles.profile}>
      <LinearGradient colors={["#fff8f8", "#fff"]} style={styles.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.profileTitle}>My Profile</Text>

        <TouchableOpacity
          style={styles.bellContainer}
          onPress={() => navigation.navigate("NotificationPage")}
          activeOpacity={0.7}
        >
          <Image style={styles.bell} source={require("../../assets/bell.png")} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.profileOptions} showsVerticalScrollIndicator={false}>
        <View style={styles.accountInfo}>
          <View style={styles.sectionHeader}>
            <Text style={styles.accountInformation}>Account Information</Text>
            <TouchableOpacity style={styles.editButtonContainer} onPress={handleEdit} activeOpacity={0.7}>
              <Text style={styles.editButton}>{isEditing ? "Save" : "Edit"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoLabelContainer}>
                <Image source={require("../../assets/user.png")} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>First Name</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={profileData.firstName}
                  onChangeText={(text) => handleChange("firstName", text)}
                  placeholder="Enter your first name"
                  placeholderTextColor="#aaa"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.firstName}</Text>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.infoLabelContainer}>
                <Image source={require("../../assets/user.png")} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Last Name</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={profileData.lastName}
                  onChangeText={(text) => handleChange("lastName", text)}
                  placeholder="Enter your last name"
                  placeholderTextColor="#aaa"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.lastName}</Text>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.infoLabelContainer}>
                <Image source={require("../../assets/bell.png")} style={[styles.infoIcon, { width: 18, height: 18 }]} />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={profileData.email}
                  onChangeText={(text) => handleChange("email", text)}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor="#aaa"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.email}</Text>
              )}
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <View style={styles.infoLabelContainer}>
                <Image source={require("../../assets/smart_home1.png")} style={styles.infoIcon} />
                <Text style={styles.infoLabel}>Address</Text>
              </View>
              {isEditing ? (
                <TextInput
                  style={[styles.input, styles.addressInput]}
                  value={profileData.address}
                  onChangeText={(text) => handleChange("address", text)}
                  multiline
                  placeholder="Enter your address"
                  placeholderTextColor="#aaa"
                />
              ) : (
                <Text style={styles.infoValue}>{profileData.address}</Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Login")} activeOpacity={0.8}>
          <LinearGradient
            colors={["#fba3a3", "#ff8a8a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutGradient}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home1.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shirt.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Camera")}>
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
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  backButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    width: 24,
    height: 24,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#321919",
    fontFamily: "Inter-Bold",
  },
  bellContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bell: {
    width: 22,
    height: 24,
  },
  profileOptions: {
    paddingHorizontal: 20,
  },
  accountInfo: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  accountInformation: {
    fontSize: 18,
    fontWeight: "700",
    color: "#321919",
    fontFamily: "Inter-Bold",
  },
  editButtonContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255, 226, 230, 0.5)",
  },
  editButton: {
    fontSize: 14,
    color: "#ff8a8a",
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#fba3a3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    tintColor: "#ff8a8a",
  },
  infoLabel: {
    fontSize: 15,
    color: "#321919",
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  infoValue: {
    fontSize: 15,
    color: "#898989",
    fontFamily: "Inter-Regular",
    maxWidth: 180,
    textAlign: "right",
  },
  input: {
    fontSize: 15,
    color: "#321919",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 180,
    textAlign: "right",
    backgroundColor: "#f9f9f9",
  },
  addressInput: {
    height: 60,
    textAlignVertical: "top",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 4,
  },
  logoutButton: {
    borderRadius: 16,
    marginBottom: 130,
    overflow: "hidden",
    shadowColor: "#fba3a3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
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
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
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
})

export default Profile