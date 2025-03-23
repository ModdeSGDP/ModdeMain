import type React from "react"
import { View, Text, Image, StyleSheet, Pressable, ScrollView, SafeAreaView, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import type { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  HomePage: undefined
  ShopPage: undefined
  CartPage: undefined
  ProfilePage: undefined
  NotificationPage: undefined // Added NotificationPage
  Camera: undefined // Added Camera
}

type PromotionsPageNavigationProp = StackNavigationProp<RootStackParamList, "HomePage">

type PromotionCardProps = {
  image: any
  title: string
  description: string
}

const PromotionCard: React.FC<PromotionCardProps> = ({ image, title, description }) => (
  <LinearGradient
    colors={["#FFB6C1", "#FFC0CB"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.promotionCard}
  >
    <Image source={image} style={styles.promotionImage} />
    <View style={styles.promotionContent}>
      <Text style={styles.promotionTitle}>{title}</Text>
      <Text style={styles.promotionDescription}>{description}</Text>
    </View>
  </LinearGradient>
)

const PromotionsPage: React.FC = () => {
  const navigation = useNavigation<PromotionsPageNavigationProp>()
  const promotions: PromotionCardProps[] = [] // Replace with your actual promotions data
  const buttonScale = new Animated.Value(1)

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start()
  }

  const handleShopPress = () => {
    animateButton()
    setTimeout(() => navigation.navigate("ShopPage"), 200)
  }

  const handleCameraPress = () => {
    navigation.navigate("Camera")
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Promotions</Text>
        <Pressable onPress={() => navigation.navigate("NotificationPage")}>
          <Image source={require("../../assets/bell.png")} style={styles.bellIcon} />
        </Pressable>
      </View>

      {/* Scrollable Promotions or No Promotions Message */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {promotions.length > 0 ? (
          <>
            {promotions.map((promo, index) => (
              <PromotionCard key={index} image={promo.image} title={promo.title} description={promo.description} />
            ))}
            <Text style={styles.endMessage}>No More Promotions</Text>
          </>
        ) : (
          <View style={styles.noPromotionsContainer}>
            <Image source={require("../../assets/Illustration2.png")} style={styles.noPromotionsImage} />
            <Animated.View style={[styles.shopButtonContainer, { transform: [{ scale: buttonScale }] }]}>
              <LinearGradient
                colors={["#ff9a9e", "#fad0c4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.shopButton}
              >
                <Pressable onPress={handleShopPress} style={styles.shopButtonContent}>
                  <Text style={styles.shopButtonText}>Go to Shop</Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFF" style={styles.shopButtonIcon} />
                </Pressable>
              </LinearGradient>
            </Animated.View>
          </View>
        )}
      </ScrollView>

      {/* Custom Navigation Bar */}
      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shirt.png")} />
          </Pressable>
          <Pressable onPress={handleCameraPress}>
            <Image
              style={styles.navIcon}
              resizeMode="cover"
              source={require("../../assets/cameraplus.png")}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("CartPage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shopping_cart.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ProfilePage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  left: {
    width: 18,
    height: 16,
    left: 80,
    bottom: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  bellIcon: {
    width: 22,
    height: 24,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  activeIndicator: {
    position: "absolute",
    left: 26,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fba3a3",
  },
  lineView: {
    borderStyle: "solid",
    borderColor: "#f97c7c",
    borderTopWidth: 1,
    flex: 1,
    width: "100%",
    height: 1,
    top: -20,
  },
  promotionCard: {
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  promotionImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  promotionContent: {
    flex: 1,
    padding: 12,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 14,
    color: "#666",
  },
  endMessage: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    marginBottom: 40,
  },
  noPromotionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  noPromotionsImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
  noPromotionsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  shopButtonContainer: {
    overflow: "hidden",
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  shopButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  shopButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shopButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  shopButtonIcon: {
    marginLeft: 8,
  },
  /* Custom Navigation Bar */
  navigationBar: {
    position: "absolute",
    bottom: 34,
    left: "50%",
    marginLeft: -158,
    width: 316,
    height: 69,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffe2e6",
    borderRadius: 20,
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
})

export default PromotionsPage