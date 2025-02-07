import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/introScreen1';
import IntroScreen1 from './screens/introScreen1';
import IntroScreen2 from './screens/introScreen2';
import IntroScreen3 from './screens/introScreen3';
import App from './index';
import OnboardingPage from './screens/onboardingpage';
import LoginPage from './screens/loginPage';
import RegistrationComplete from './screens/registration';
import HomePage from './screens/homepage';
import ShopPage from './screens/shopPage/shoppage';
import VisualSearch from './screens/camera/visualSearch';
import ProductDetailPage from './screens/shopPage/ProductDetailPage';
import Cart from './screens/orderPage/cart';
import CheckoutScreen from './screens/orderPage/checkout';
import Profile from './screens/profile/profilePage';
import AccountInfo from './screens/profile/accountInfo';
import SideMenu from './screens/sideBars/homeSideBar';


const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={App} />
      <Stack.Screen name="Home" component={SplashScreen} />
      <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
      <Stack.Screen name="Intro1" component={IntroScreen1} />
      <Stack.Screen name="Intro2" component={IntroScreen2} />
      <Stack.Screen name="Intro3" component={IntroScreen3} />
      <Stack.Screen name="Login" component={LoginPage}/>
      <Stack.Screen name="registration"component={RegistrationComplete}/>
      <Stack.Screen name="HomePage"component={HomePage}/>
      <Stack.Screen name="ShopPage"component={ShopPage}/>
      <Stack.Screen name="ProductDetail"component={ProductDetailPage}/>
      <Stack.Screen name="ImageSearch"component={VisualSearch}/>
      <Stack.Screen name="CartPage"component={Cart}/>
      <Stack.Screen name="CheckoutPage"component={CheckoutScreen}/>
      <Stack.Screen name="ProfilePage"component={Profile}/>
      <Stack.Screen name="AccountInfoPage"component={AccountInfo}/>
      <Stack.Screen name="HomeSideBar"component={SideMenu}/>


      
      
    </Stack.Navigator>
  );
}
//expo router main layout.tsx navigation bar (in every page)
///basics in the index.tsx (basics in them)
// creating the route structure and navigation - do by one
//see expo documentation about expo router
//Figma developer mode , in ui enable dev modde, extention figma to tsx , to retrtive ui , chatgpt or vercel buy and use figma 
//Create project folder initial Structure,
// use firebase for login
//divide the branches relatively in the main branch , at last finalise the changes merge into the main branch after testing
//watch expo tutorial
