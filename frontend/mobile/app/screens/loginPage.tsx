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
      const loginResponse = await fetch("http://192.168.1.42:4000/auth/login", {
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
      <Image style={styles.backgroundImage} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      <Image style={styles.logoIcon} resizeMode="cover" source={require("../assets/logo2.png")} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Welcome back, <Text style={styles.boldText}>{username || "User"}</Text>.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-mail address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email here"
            placeholderTextColor="#898989"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#898989"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconWrapper}>
              <MaterialCommunityIcons name={showPassword ? "eye" : "eye-off"} size={24} color="#898989" />
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
          <Pressable
            onPress={() => {
              /* Handle forgot password */
            }}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>
        </View>

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Text style={styles.signUpText}>
          Don't have an account?{" "}
          <Text style={styles.signUpLink} onPress={() => navigation.navigate("SignUpPage")}>
            Sign up
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
    width: "100%",
    height: "50%",
    top: 0,
  },
  logoIcon: {
    alignSelf: "center",
    width: 174,
    height: 100,
    marginTop: 60,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#321919",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#321919",
    textAlign: "center",
    marginBottom: 30,
  },
  boldText: {
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#321919",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#898989",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#898989",
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
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
    borderColor: "#898989",
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
    color: "#321919",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#fba3a3",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#fba3a3",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  signUpText: {
    textAlign: "center",
    fontSize: 14,
    color: "#321919",
  },
  signUpLink: {
    color: "#fba3a3",
    fontWeight: "600",
  },
})

export default LoginPage

