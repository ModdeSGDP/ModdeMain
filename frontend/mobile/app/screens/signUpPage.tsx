"use client"
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAsyncStorage } from "./AsyncStorage/useAsyncStorage"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  Login: undefined
  ProfilePage: undefined
  Registration: undefined
  HomePage: undefined
}
type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">

const SignupPage: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>()
  const { storeData } = useAsyncStorage()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fadeAnim] = useState(new Animated.Value(0))
  const [slideAnim] = useState(new Animated.Value(50))

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, slideAnim])

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !address || !gender) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address")
      return
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long")
      return
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    const userData = {
      email,
      password,
      role: "Consumer",
      firstName,
      lastName,
      gender,
      address,
    }

    try {
      const response = await fetch("https://93ba-112-134-239-177.ngrok-free.app/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      const data = await response.json()

      if (response.ok) {
        console.log("Received token:", data.token)
        await storeData("userToken", data.token)
        await storeData("userData", userData)
        navigation.navigate("Registration")
      } else {
        Alert.alert("Error", data.message || "Signup failed. Please try again.")
      }
    } catch (error) {
      console.error("Signup error:", error)
      Alert.alert("Error", "Something went wrong. Please try again.")
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <LinearGradient colors={["#fff8f8", "#fff"]} style={styles.background} />
      <Image style={styles.backgroundDecoration1} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      <Image style={styles.backgroundDecoration2} resizeMode="cover" source={require("../assets/Ellipse2.png")} />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.headerContainer}>
            <Image style={styles.logoIcon} resizeMode="cover" source={require("../assets/logo2.png")} />
            <Text style={styles.welcomeText}>Create your account</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.nameRow}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>First Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#aaa"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="your.email@example.com"
                  placeholderTextColor="#aaa"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Male / Female / Other"
                  placeholderTextColor="#aaa"
                  value={gender}
                  onChangeText={setGender}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <View style={[styles.inputWrapper, styles.addressWrapper]}>
                <TextInput
                  style={styles.addressInput}
                  placeholder="Your full address"
                  placeholderTextColor="#aaa"
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
                  placeholder="Minimum 8 characters"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!showPassword} // Password hidden when showPassword is false
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconWrapper}>
                  <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"} // "eye" when visible, "eye-off" when hidden
                    size={24}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!showConfirmPassword} // Confirm password hidden when showConfirmPassword is false
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIconWrapper}
                >
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? "eye" : "eye-off"} // "eye" when visible, "eye-off" when hidden
                    size={24}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.signupButton} onPress={handleSignup} activeOpacity={0.8}>
              <LinearGradient
                colors={["#fba3a3", "#ff8a8a"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.signupButtonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.loginLinkContainer}>
              <Text style={styles.alreadyHaveAccount}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signIn}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
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
  backgroundDecoration1: {
    position: "absolute",
    top: -10,
    left: -100,
    width: 619,
    height: 350,
  },
  backgroundDecoration2: {
    position: "absolute",
    bottom: -100,
    right: -100,
    width: 450,
    height: 470,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    width: 150,
    height: 86,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
    fontFamily: "Inter-Bold",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    fontWeight: "600",
    fontFamily: "Rosario-Regular",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  addressWrapper: {
    height: 80,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#333",
    fontFamily: "Inter-Regular",
  },
  addressInput: {
    flex: 1,
    height: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
    textAlignVertical: "top",
    fontFamily: "Inter-Regular",
  },
  eyeIconWrapper: {
    padding: 12,
  },
  actionContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  signupButton: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#fba3a3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradientButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    letterSpacing: 0.5,
  },
  loginLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  alreadyHaveAccount: {
    color: "#666",
    fontSize: 14,
    marginRight: 6,
    fontFamily: "Inter-Medium",
  },
  signIn: {
    color: "#ff8a8a",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
})

export default SignupPage