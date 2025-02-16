"use client"

import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet, Image, Pressable, Alert, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"

const SignupPage = () => {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fadeAnim] = useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
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
    // Implement actual signup logic here
    Alert.alert("Success", "Signup successful")
  }

  return (
    <View style={styles.signupPage}>
      <Image style={styles.signupPageChild} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      <Image style={styles.signupPageItem} resizeMode="cover" source={require("../assets/Ellipse2.png")} />
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <Image style={styles.logoIcon} resizeMode="cover" source={require("../assets/logo2.png")} />

        <View style={styles.signupParent}>
          <Text style={styles.signup}>Sign Up</Text>
          <Text style={styles.createYourAccount}>Create your account</Text>
        </View>

        <View style={styles.entryFiled}>
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
                <Image
                  style={styles.eyeIcon}
                  resizeMode="contain"
                  source={showPassword ? require("../assets/eye-off.png") : require("../assets/eye.png")}
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
                <Image
                  style={styles.eyeIcon}
                  resizeMode="contain"
                  source={showConfirmPassword ? require("../assets/eye-off.png") : require("../assets/eye.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.signupButtonParent}>
          <Pressable style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </Pressable>
          <Pressable style={styles.googleSignupButton}>
            <Image style={styles.googleIcon} resizeMode="contain" source={require("../assets/Google.png")} />
            <Text style={styles.googleSignupText}>Sign up with Google</Text>
          </Pressable>
          <Text style={styles.alreadyHaveAnContainer}>
            <Text style={styles.alreadyHaveAn}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signIn}>Sign in</Text>
            </Pressable>
          </Text>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  signupPage: {
    flex: 1,
    backgroundColor: "#fff",
  },
  signupPageChild: {
    position: "absolute",
    top: -10,
    left: -20,
    width: 619,
    height: 427,
  },
  signupPageItem: {
    position: "absolute",
    top: 503,
    left: -14,
    width: 441,
    height: 406,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoIcon: {
    width: 150,
    height: 86,
    bottom:50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signupParent: {
    alignItems: "center",
    marginBottom: 25,
  },
  signup: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fba3a3",
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
  },
  createYourAccount: {
    fontSize: 16,
    color: "#321919",
    textAlign: "center",
    fontFamily: "Rosario-SemiBold",
    marginTop: 5,
  },
  entryFiled: {
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
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#000",
  },
  eyeIconWrapper: {
    padding: 8,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  signupButtonParent: {
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
  },
  signupButton: {
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
  signupButtonText: {
    color: "#fff8f2",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  googleSignupButton: {
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
  googleSignupText: {
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
    color: "#fba3a3",
    fontSize: 12,
    top:4.5,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
})

export default SignupPage

