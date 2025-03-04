"use client"

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Pressable, Alert, Animated, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAsyncStorage } from "./AsyncStorage/useAsyncStorage";
import * as ImagePicker from "expo-image-picker";
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Define navigation param list
type RootStackParamList = {
  ProfilePage: undefined;
  Login: undefined;
};

// Define navigation prop type
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProfilePage">;

// Define user data interface based on provided JSON
interface UserData {
  email: string;
  password: string;
  role: "Admin" | "User";
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  address: string;
  profilePicture?: string | null;
}

// Define API response interface
interface ApiResponse {
  success: boolean;
  message: string;
}

const SignupPage: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const { storeData } = useAsyncStorage();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role] = useState<"Admin" | "User">("Admin");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other" | "Prefer not to say">("Male");
  const [address, setAddress] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
  const [image, setImage] = useState<string | null>(null);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const pickImage = async (): Promise<void> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignup = async (): Promise<void> => {
    if (!email || !password || !firstName || !lastName || !address || !gender || !role) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const userData: UserData = {
      email,
      password,
      role,
      firstName,
      lastName,
      gender,
      address,
      profilePicture: image,
    };

    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        await storeData("userData", userData);
        
        Alert.alert("Success", data.message || "Signup successful", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ProfilePage"),
          },
        ]);
      } else {
        Alert.alert("Signup Failed", data.message || "Something went wrong during signup");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.signUpPage}>
      <Image style={styles.signUpPageChild} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      <Image style={styles.signUpPageItem} resizeMode="cover" source={require("../assets/Ellipse2.png")} />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true}
      >
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          <Image style={styles.logoIcon} resizeMode="cover" source={require("../assets/logo2.png")} />
          {/* <Pressable style={styles.profileImageContainer} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.cameraIconContainer}>
                <Image source={require("../assets/camera.png")} style={styles.cameraIcon} resizeMode="contain" />
              </View>
            )}
          </Pressable> */}
          <View style={styles.entryField}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your First Name"
                  placeholderTextColor="#898989"
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Last Name"
                  placeholderTextColor="#898989"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-mail address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email here"
                  placeholderTextColor="#898989"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue as "Male" | "Female" | "Other" | "Prefer not to say")}
                  style={styles.picker}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                  <Picker.Item label="Prefer not to say" value="Prefer not to say" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.addressInput, { height: 100 }]}
                  placeholder="Enter your address"
                  placeholderTextColor="#898989"
                  value={address}
                  onChangeText={setAddress}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#898989"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconWrapper}>
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#000"
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  placeholderTextColor="#898989"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIconWrapper}>
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#000"
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.signUpButtonParent}>
            <Pressable style={styles.signUpButton} onPress={handleSignup}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </Pressable>
            {/* <Pressable style={styles.googleSignUpButton}>
              <Image style={styles.googleIcon} resizeMode="contain" source={require("../assets/Google.png")} />
              <Text style={styles.googleSignUpText}>Sign up with Google</Text>
            </Pressable> */}
            <Text style={styles.alreadyHaveAnContainer}>
              <Text style={styles.alreadyHaveAn}>Already have an account? </Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signIn}>Sign in</Text>
              </Pressable>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpPage: {
    flex: 1,
    backgroundColor: "#fff",
  },
  signUpPageChild: {
    position: "absolute",
    top: -10,
    left: -20,
    width: 619,
    height: 350,
    zIndex: 0,
  },
  signUpPageItem: {
    position: "absolute",
    top: 503,
    left: -14,
    width: 450,
    height: 470,
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  contentContainer: {
    alignItems: "center",
    padding: 20,
    zIndex: 1,
  },
  logoIcon: {
    width: 150,
    height: 86,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  cameraIconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fba3a3",
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  entryField: {
    width: "100%",
    maxWidth: 300,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 12,
    color: "#000",
    marginBottom: 4,
    fontFamily: "Rosario-Regular",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#898989",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#898989",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    fontSize: 10, // Reduced from 12
    width: "100%",
    color: "#000",
},

  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#000",
  },
  addressInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#000",
    textAlignVertical: "top",
  },
  eyeIconWrapper: {
    padding: 8,
  },
  signUpButtonParent: {
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
  },
  signUpButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#fba3a3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButtonText: {
    color: "#fff8f2",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  googleSignUpButton: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    backgroundColor: "#ffe2e6",
    borderWidth: 1,
    borderColor: "#fba3a3",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleSignUpText: {
    color: "#584b40",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  alreadyHaveAnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  alreadyHaveAn: {
    color: "#000",
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  signIn: {
    color: "#000",
    fontSize: 12,
    top: 4.5,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});

export default SignupPage;