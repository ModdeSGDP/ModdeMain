"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

type RootStackParamList = {
  HomePage: undefined
  SignUpPage: undefined
}

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "HomePage">

interface LoginResponse {
  success: boolean
  message: string
  accessToken?: string
}

const LoginPage: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>()
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")

  const handleLogin = async () => {
    if (!email || !password) {
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

    try {
      const loginResponse = await fetch("https://2a1a-124-43-246-34.ngrok-free.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const loginData: LoginResponse = await loginResponse.json()

      if (loginData.accessToken) {
        setUsername(email.split("@")[0])
        Alert.alert("Login Successful", `Welcome back, ${username}!`, [
          { text: "OK", onPress: () => navigation.navigate("HomePage") },
        ])
      } else {
        Alert.alert("Login Failed", loginData.message || "Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      Alert.alert("Error", "Something went wrong. Please try again.")
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      {/* Enhanced Background */}
      <Image 
        style={styles.backgroundImage} 
        resizeMode="cover" 
        source={require("../assets/Ellipse1.png")} 
      />
      <LinearGradient
        colors={["#fff8f8", "#fff"]}
        style={styles.backgroundGradient}
      />
      <Image 
        style={styles.backgroundBottomImage} 
        resizeMode="cover" 
        source={require("../assets/Ellipse2.png")} 
      />

      <Image style={styles.logoIcon} resizeMode="cover" source={require("../assets/logo2.png")} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign into your account</Text>
        <Text style={styles.subtitle}>
          Welcome back, <Text style={styles.boldText}>{username || "User"}</Text>
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Address</Text>
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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Minimum 8 characters"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconWrapper}>
              <MaterialCommunityIcons name={showPassword ? "eye" : "eye-off"} size={24} color="#aaa" />
            </Pressable>
          </View>
        </View>

        <View style={styles.rememberForgotContainer}>
          <Pressable style={styles.rememberMeButton} onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <MaterialCommunityIcons name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </Pressable>
        </View>

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={["#fba3a3", "#ff8a8a"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </LinearGradient>
        </Pressable>

        <Text style={styles.signUpText}>
          Don’t have an account?{" "}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate("SignUpPage")}>
            Create Account
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: 619,
    height: 450,
    top: -20,
    left: -100,
  },
  backgroundGradient: {
  },
  backgroundBottomImage: {
    position: "absolute",
    width: 450,
    height: 770,
    bottom: -100,
    right: -100,
  },
  logoIcon: {
    alignSelf: "center",
    width: 150,
    height: 86,
    marginTop: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Inter-Regular",
  },
  boldText: {
    fontWeight: "700",
    color: "#333",
    fontFamily: "Inter-Bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    fontWeight: "600",
    fontFamily: "Rosario-Regular",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: "#333",
    fontFamily: "Inter-Regular",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: "#333",
    fontFamily: "Inter-Regular",
  },
  eyeIconWrapper: {
    padding: 10,
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#fba3a3",
    borderColor: "#fba3a3",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Inter-Medium",
  },
  loginButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#fba3a3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradientButton: {
    padding: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    letterSpacing: 0.5,
  },
  signUpText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginTop: 20,
    fontFamily: "Inter-Medium",
  },
  signUpLink: {
    color: "#ff8a8a",
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
})

export default LoginPage