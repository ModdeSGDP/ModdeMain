
import { useState } from "react"
import { View, Text, StyleSheet, Image, Pressable, ScrollView, TextInput } from "react-native"
import { useNavigation } from "@react-navigation/native"

const Profile = () => {
  const navigation = useNavigation()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Anne Smith",
    email: "anne@gmail.com",
    address: "No:123 Milepost Avenue, Colombo, Sri Lanka",
    gender: "Female",
  })
  const handleEdit = () => {
    if (isEditing) {
      // Here you would typically save the changes to a backend
      console.log("Saving changes:", profileData)
    }
    setIsEditing(!isEditing)
  }
  const handleChange = (key, value) => {
    setProfileData((prev) => ({ ...prev, [key]: value }))
  }
  return (
    <View style={styles.profile}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.backButton} source={require("../../assets/chevron_left.png")} />
      </Pressable>
      <Text style={styles.profileTitle}>Profile</Text>

      <Pressable onPress={() => navigation.goBack()}>
        <Image style={styles.bell} source={require("../../assets/bell.png")} />
      </Pressable>

      <View style={styles.profilePhotoContainer}>
        <Image style={styles.profilePhoto} source={require("../../assets/ellipse-20.png")} />
        <Pressable style={styles.editPhotoButton}>
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
              />
            ) : (
              <Text style={styles.infoValue}>{profileData.address}</Text>
            )}
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Gender</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profileData.gender}
                onChangeText={(text) => handleChange("gender", text)}
              />
            ) : (
              <Text style={styles.infoValue}>{profileData.gender}</Text>
            )}
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Password</Text>
            <Text style={styles.changePassword}>change password</Text>
          </View>
        </View>
        <Pressable style={styles.deleteAccount} onPress={() => console.log("Delete account pressed")}>
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
    width: 27,
    height: 27,
    position: "absolute",
    top: 20,
    left: 13,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#321919",
    textAlign: "center",
    marginTop: 45,
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
    left: 100
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
    // Add shadow effect
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
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
})

export default Profile
