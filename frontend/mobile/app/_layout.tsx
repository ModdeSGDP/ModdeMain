import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
// Importing screens
import SplashScreen from './screens/splashScreen';
import OrderComplete from './screens/orderComplete';
import OnboardingPage from './screens/onboardingpage';
import IntroScreen1 from './screens/introScreen1';
import IntroScreen2 from './screens/introScreen2';
import IntroScreen3 from './screens/introScreen3';
import LoginPage from './screens/loginPage';
import RegistrationComplete from './screens/registration';
import HomePage from './screens/homepage';
import ShopPage from './screens/shopPage/shoppage';
import ProductDetailPage from './screens/shopPage/ProductDetailPage';
import Cart from './screens/orderPage/cart';
import CheckoutScreen from './screens/orderPage/checkout';
import Profile from './screens/profile/profilePage';
import SideMenu from './screens/sideBars/homeSideBar';
import PromotionsPage from './screens/promotions/promotion';
import NotificationsPage from './screens/sideBars/notifications';
import OrdersPage from './screens/orderPage2/orderPage';
import OrderSettings from './screens/orderPage2/orderSettings';
import CameraScreen from './screens/cameraScreen';
import SignupPage from './screens/signUpPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🏠 Bottom Tab Navigator (Navigation Bar)
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#FFE2E6', height: 70, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="HomePage" 
        component={HomePage} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require("./assets/smart_home1.png")} style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} />
          )
        }}
      />
      <Tab.Screen 
        name="ShopPage" 
        component={ShopPage} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require("./assets/shirt1.png")} style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} />
          )
        }}
      />
      <Tab.Screen 
        name="CartPage" 
        component={Cart} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require("./assets/Cart.png")} style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} />
          )
        }}
      />
      <Tab.Screen 
        name="ProfilePage" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require("./assets/user.png")} style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

// 📱 Stack Navigator (Handles Screen Transitions)
export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnboardingPage" component={OnboardingPage} />
      <Stack.Screen name="Intro1" component={IntroScreen1} />
      <Stack.Screen name="Intro2" component={IntroScreen2} />
      <Stack.Screen name="Intro3" component={IntroScreen3} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="ShopPage" component={ShopPage} />
      <Stack.Screen name="orderComplete" component={OrderComplete} />
      <Stack.Screen name="CartPage" component={Cart} />
      <Stack.Screen name="ProfilePage" component={Profile} />
      <Stack.Screen name="Login" component={LoginPage}/>
      <Stack.Screen name="Registration" component={RegistrationComplete}/>
      <Stack.Screen name="SignUpPage" component={SignupPage} />
      <Stack.Screen name="ProductDetail" component={ProductDetailPage}/>
      <Stack.Screen name="CheckoutPage" component={CheckoutScreen}/>
      <Stack.Screen name="PromotionPage" component={PromotionsPage}/>
      <Stack.Screen name="NotificationPage" component={NotificationsPage}/>
      <Stack.Screen name="OrdersPage" component={OrdersPage}/>
      <Stack.Screen name="OrderSettingsPage" component={OrderSettings}/>
      <Stack.Screen name="Camera" component={CameraScreen} />
      

      {/*  Main Tab Navigator */}
      <Stack.Screen name="Main" component={BottomTabs} />
    </Stack.Navigator>
  );
}
