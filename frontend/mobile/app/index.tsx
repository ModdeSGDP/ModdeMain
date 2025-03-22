// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Animated } from 'react-native';

// export default function App() {
//   // State to control splash screen visibility
//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   // Animated values for title opacity and scale
//   const titleOpacity = new Animated.Value(0);
//   const titleScale = new Animated.Value(0.5);

//   // Animated value for subtitle opacity
//   const subtitleOpacity = new Animated.Value(0);

//   const navigation = useNavigation();

//   useEffect(() => {
//     // Animate title fade-in and scale-up
//     Animated.parallel([
//       Animated.timing(titleOpacity, {
//         toValue: 1,
//         duration: 2000, // Duration for title fade-in
//         useNativeDriver: true,
//       }),
//       Animated.spring(titleScale, {
//         toValue: 1,
//         friction: 3, // Control bounce effect
//         useNativeDriver: true,
//       }),
//     ]).start(() => {
//       // Animate subtitle fade-in after title animation
//       Animated.timing(subtitleOpacity, {
//         toValue: 1,
//         duration: 2000, // Duration for subtitle fade-in
//         useNativeDriver: true,
//       }).start();
//     });

//     // Hide splash screen after 4 seconds
//     // const timer = setTimeout(() => {
//     //   setIsSplashVisible(false);
//     //   navigation.navigate('Home');
//     // }, 4000);

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   return (
//     <View style={styles.container}>
//       {isSplashVisible ? (
//         // Splash Screen with animation
//         <View style={styles.splashContainer}>
//           <Animated.Text
//             style={[
//               styles.splashText,
//               {
//                 opacity: titleOpacity, // Apply fade-in effect for title
//                 transform: [{ scale: titleScale }], // Apply scale effect for title
//               },
//             ]}
//           >
//             MODDE
//           </Animated.Text>
//           <Animated.Text
//             style={[
//               styles.subtitle,
//               {
//                 opacity: subtitleOpacity, // Apply fade-in effect for subtitle
//               },
//             ]}
//           >
//             Where Fashion meets modernity
//           </Animated.Text>
//         </View>
//       ) : (
//         // Main content after splash screen
//         <View style={styles.mainContent}>
//           <Text style={styles.title}>MODDE</Text>
//           <Text style={styles.subtitle}>Where Fashion meets modernity</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   splashContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFC0CB', // Pink background
//     height: '100%',
//     width: '100%',
//   },
//   splashText: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: 'white',
//     marginTop: 10,
//     opacity: 1, // Initially hidden
//   },
//   mainContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFB6C1', // Light Pink background
//     height: '100%',
//     width: '100%',
//   },
//   title: {
//     fontSize: 60,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });