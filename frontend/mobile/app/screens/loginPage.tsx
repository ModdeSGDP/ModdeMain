import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const navigation = useNavigation<any>();
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.loginPage}>
      <Image style={styles.loginPageChild} resizeMode="cover" source={require("../assets/Ellipse1.png")} />
      <Image style={styles.loginPageItem} resizeMode="cover" source={require("../assets/Ellipse2.png")} />
      <Image style={[styles.logoIcon, styles.loginPosition]} resizeMode="cover" source={require("../assets/logo2.png")} />
      
      <View style={[styles.loginParent, styles.loginPosition]}>
        <Text style={[styles.login, styles.loginTypo]}>Login</Text>
        <Text style={styles.welcomeBackAnne}>Welcome back, <Text style={styles.boldText}>Anne</Text>.</Text>
      </View>
      <View style={[styles.entryFiled, styles.entryFiledPosition]}>
        <View style={styles.eMailAddressParent}>
          <Text style={[styles.eMailAddress, styles.eMailAddressTypo]}>E-mail address</Text>
          <View style={styles.emailEntry}>
            <TextInput
              style={[styles.emailEntryChild, styles.entryChildBorder]}
              placeholder="Enter your email here"
              placeholderTextColor="#898989"
            />
          </View>
        </View>
        <View style={styles.groupParent}>
          <View style={styles.passwordWrapper}>
            <Text style={[styles.password, styles.passwordPosition]}>Password</Text>
          </View>
          <View style={styles.emailEntry}>
            <TextInput
              style={[styles.passwordEntryChild, styles.entryChildBorder]}
              placeholder="Enter your password"
              placeholderTextColor="#898989"
              secureTextEntry={true}
            />
            <Image style={[styles.eyeIcon, styles.iconLayout]} resizeMode="cover" source={require("../assets/eye.png")} />
          </View>
          <Pressable 
            style={styles.rememberMeButton} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[
              styles.checkbox, 
              rememberMe && styles.checkboxChecked
            ]} />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </Pressable>
          <Text style={[styles.forgotPassword, styles.passwordPosition]}>Forgot Password</Text>
        </View>
      </View>
      
      <View style={[styles.loginButtonParent, styles.entryFiledPosition]}>
        <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Registration" as never)}>
          <View style={[styles.loginButtonChild, styles.entryChildLayout]} />
          <Text style={[styles.login1, styles.loginTypo]}>Login</Text>
        </Pressable>
        <View style={styles.loginButton}>
          <View style={[styles.signInButtonChild, styles.entryChildBorder]} />
          <View style={styles.signInGoo}>
            <Image style={[styles.googleIcon, styles.iconLayout]} resizeMode="cover" source={require("../assets/Google.png")} />
            <Text style={styles.signInWith}>Sign in with Google</Text>
          </View>
        </View>
        <Text style={styles.dontHaveAnContainer}>
          <Text style={[styles.dontHaveAn, styles.signInLayout]}>Don't have an account?</Text>
          <Text style={styles.text}> </Text>
          <Text style={[styles.signIn, styles.signInLayout]}>Sign in</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPosition: {
    left: "50%",
    position: "absolute"
  },
  loginTypo: {
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
    fontWeight: "600"
  },
  entryFiledPosition: {
    left: 35,
    position: "absolute"
  },
  eMailAddressTypo: {
    lineHeight: 24,
    fontSize: 12,
    fontFamily: "Rosario-Regular",
    textAlign: "left"
  },
  entryChildBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#898989",
    borderRadius: 10,
  },
  passwordPosition: {
    top: 0,
    lineHeight: 28,
    fontSize: 12,
    color: "#000",
    textAlign: "center",
    position: "absolute"
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden"
  },
  entryChildLayout: {
    borderRadius: 10,
    top: 0,
    height: 40
  },
  signInLayout: {
    lineHeight: 21,
    fontSize: 14
  },
  loginPageChild: {
    top: -10,
    left: -20,
    width: 619,
    height: 427,
    position: "absolute"
  },
  loginPageItem: {
    top: 503,
    left: -14,
    borderRadius: 150,
    width: 441,
    height: 406,
    position: "absolute"
  },
  logoIcon: {
    marginLeft: -86.5,
    top: 89,
    width: 174,
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  login: {
    fontSize: 32,
    lineHeight: 40,
    textAlign: "center",
    color: "#fff",
    alignSelf: "stretch"
  },
  welcomeBackAnne: {
    fontSize: 18,
    lineHeight: 33,
    color: "#321919",
    textAlign: "left",
    fontFamily: "Rosario-SemiBold",
    fontWeight: "600",
    alignSelf: "stretch"
  },
  loginParent: {
    marginLeft: -80.5,
    top: 176,
    width: 162,
    alignItems: "center"
  },
  eMailAddress: {
    color: "#000",
    alignSelf: "stretch"
  },
  emailEntryChild: {
    height: 40,
    width: 331,
    backgroundColor: "#fff"
  },
  emailEntry: {
    height: 40,
    width: 331
  },
  eMailAddressParent: {
    gap: 5,
    alignSelf: "stretch"
  },
  password: {
    fontFamily: "Rosario-Regular",
    left: -2
  },
  passwordWrapper: {
    width: 58,
    height: 18
  },
  passwordEntryChild: {
    height: 40,
    width: 331,
  },
  eyeIcon: {
    height: "60%",
    width: "7.26%",
    top: "20%",
    right: "5.99%",
    bottom: "20%",
    left: "86.76%"
  },
  rememberMeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#898989',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#fba3a3',
    borderColor: '#fba3a3',
  },
  rememberMeText: {
    fontFamily: "Rosario-Regular",
    fontSize: 12,
    color: '#000',
  },
  forgotPassword: {
    left: 234,
    fontFamily: "Rosario-SemiBold",
    fontWeight: "600"
  },
  groupParent: {
    gap: 7,
    alignSelf: "stretch"
  },
  entryFiled: {
    top: 312,
    width: 332,
    gap: 19
  },
  loginButtonChild: {
    backgroundColor: "#fba3a3",
    width: 327,
    left: 0,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  login1: {
    marginLeft: -24.5,
    top: 10,
    fontSize: 16,
    lineHeight: 20,
    color: "#fff8f2",
    width: 50,
    textAlign: "center",
    left: "50%",
    position: "absolute"
  },
  loginButton: {
    width: 327,
    height: 40
  },
  signInButtonChild: {
    marginLeft: -163.5,
    backgroundColor: "#ffe2e6",
    borderColor: "#fba3a3",
    width: 327,
    height: 40,
    left: "50%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    height: "100%",
    width: "15.27%",
    top: "0%",
    right: "84.73%",
    bottom: "0%",
    left: "0%",
    borderRadius: 30,
  },
  signInWith: {
    marginLeft: -48.5,
    top: 4,
    color: "#584b40",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    left: "50%",
    position: "absolute"
  },
  signInGoo: {
    height: "63%",
    width: "50.46%",
    top: "17.5%",
    right: "28.44%",
    bottom: "19.5%",
    left: "21.1%",
    position: "absolute"
  },
  dontHaveAn: {
    fontWeight: "500",
    fontFamily: "Inter-Medium"
  },
  text: {
    fontSize: 13,
    fontFamily: "JejuGothic"
  },
  signIn: {
    fontWeight: "700",
    fontFamily: "Inter-Bold"
  },
  dontHaveAnContainer: {
    color: "#000",
    textAlign: "center",
    alignSelf: "stretch"
  },
  loginButtonParent: {
    top: 558,
    gap: 22,
    width: 327,
    alignItems: "center"
  },
  loginPage: {
    width: "100%",
    height: 812,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#fff",
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default LoginPage;

