"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  SafeAreaView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useCartStore } from "../shopPage/cartState"

const { width } = Dimensions.get("window")

const API_BASE_URL = "https://2a1a-124-43-246-34.ngrok-free.app"
const AUTH_TOKEN = "usertoken" // Replace with secure token retrieval logic

type RootStackParamList = {
  ProductDetail: { product: Product }
}

type Retailer = {
  id: string
  name: string
  logo?: string | null
  location?: string | null
}

type Product = {
  id: string
  productId: string
  name: string
  description: string
  category: string
  color: string
  image: string | null
  retailerId: string
  image_id: string
  createdAt: string
  updatedAt: string
  price?: string
  sizes?: string[]
  brand?: string
}

type ProductDetailRouteProp = RouteProp<RootStackParamList, "ProductDetail">
type ProductDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, "ProductDetail">
type Props = {
  route: ProductDetailRouteProp
  navigation: ProductDetailNavigationProp
}

const ProductDetailPage: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params
  const [selectedColor, setSelectedColor] = useState(product.color || "black")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M")
  const [quantity, setQuantity] = useState(1)
  const [userRating, setUserRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [showReviewInput, setShowReviewInput] = useState(false)
  const [retailer, setRetailer] = useState<Retailer | null>(null)
  const [loadingRetailer, setLoadingRetailer] = useState(true)

  const { addItem } = useCartStore()

  const colors = ["black", "white", "gray"]
  const sizes = product.sizes?.length > 0 ? product.sizes : ["XS", "S", "M", "L", "XL", "XXL"]

  useEffect(() => {
    const fetchRetailerDetails = async () => {
      if (!product.retailerId) {
        setRetailer(null)
        setLoadingRetailer(false)
        return
      }
      try {
        const response = await fetch(`${API_BASE_URL}/retailers/${product.retailerId}`, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${AUTH_TOKEN}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch retailer: ${response.status}`)
        }
        const retailerData = await response.json()
        setRetailer({
          id: retailerData._id || product.retailerId,
          name: retailerData.name || "Retailer Not Specified",
          logo: retailerData.logo || null,
          location: retailerData.location || null,
        })
      } catch (error) {
        console.error("Error fetching retailer:", error)
        setRetailer(null)
      } finally {
        setLoadingRetailer(false)
      }
    }
    fetchRetailerDetails()
  }, [product.retailerId])

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleSubmitReview = () => {
    console.log("Submitting review:", { rating: userRating, text: reviewText })
    setUserRating(0)
    setReviewText("")
    setShowReviewInput(false)
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price || "N/A",
      image: product.image,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      brand: retailer?.name || "Unknown Brand",
      shop: retailer?.name || "Unknown Shop",
    }
    addItem(cartItem)
    alert(`Added ${quantity} ${product.name} to your cart!`)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{product.name}</Text>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {[product.image].map((img, index) => (
            <Image
              key={index}
              source={img && img.startsWith("http") ? { uri: img } : require("../../assets/user.png")}
              style={styles.productImage}
              onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
            />
          ))}
        </ScrollView>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.retailerText}>
            {loadingRetailer ? "Loading retailer..." : retailer?.name || "Retailer Not Specified"}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price || "LKR N/A"}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color={star <= 4 ? "#FFD700" : "#D3D3D3"} />
              ))}
            </View>
            <Text style={styles.reviewCount}>(1000+)</Text>
          </View>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorOptions}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorOption,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeOption, selectedSize === size && styles.selectedSizeOption]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[styles.sizeOptionText, selectedSize === size && styles.selectedSizeOptionText]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.sectionTitle}>Category</Text>
          <Text style={styles.description}>{product.category}</Text>
          <Text style={styles.sectionTitle}>Added On</Text>
          <Text style={styles.description}>{new Date(product.createdAt).toLocaleDateString()}</Text>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewsContainer}>
            <View style={styles.overallRating}>
              <Text style={styles.overallRatingText}>4.5</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={16} color={star <= 4 ? "#FFD700" : "#D3D3D3"} />
                ))}
              </View>
              <Text style={styles.reviewCount}>Based on 1000+ reviews</Text>
            </View>
            <TouchableOpacity style={styles.addReviewButton} onPress={() => setShowReviewInput(!showReviewInput)}>
              <Text style={styles.addReviewButtonText}>{showReviewInput ? "Cancel Review" : "Add Review"}</Text>
            </TouchableOpacity>
            {showReviewInput && (
              <View style={styles.reviewInputContainer}>
                <Text style={styles.userRatingText}>Your Rating:</Text>
                <View style={styles.userStarsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
                      <Ionicons name="star" size={32} color={star <= userRating ? "#FFD700" : "#D3D3D3"} />
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={styles.reviewInput}
                  multiline
                  numberOfLines={4}
                  placeholder="Write your review here..."
                  value={reviewText}
                  onChangeText={setReviewText}
                />
                <TouchableOpacity style={styles.submitReviewButton} onPress={handleSubmitReview}>
                  <Text style={styles.submitReviewButtonText}>Submit Review</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.reviewList}>
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>John Doe</Text>
                  <View style={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={14} color={star <= 4 ? "#FFD700" : "#D3D3D3"} />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewText}>Great product! Very comfortable and stylish. Highly recommended.</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#FFF0F5", // Match safe area background
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productImage: {
    width: width,
    height: width,
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  retailerText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: "#FFE2E6",
    borderRadius: 4,
    padding: 4,
  },
  discountText: {
    color: "#F97C7C",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  reviewCount: {
    color: "#888",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: "row",
    marginBottom: 16,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#000",
  },
  sizeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSizeOption: {
    backgroundColor: "#F97C7C",
    borderColor: "#F97C7C",
  },
  sizeOptionText: {
    fontSize: 16,
  },
  selectedSizeOptionText: {
    color: "#fff",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
  reviewsContainer: {
    marginBottom: 16,
  },
  overallRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  overallRatingText: {
    fontSize: 36,
    fontWeight: "bold",
    marginRight: 16,
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  addReviewButton: {
    backgroundColor: "#F97C7C",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  addReviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewInputContainer: {
    marginBottom: 16,
  },
  userRatingText: {
    fontSize: 16,
    marginBottom: 8,
  },
  userStarsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  submitReviewButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  submitReviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewList: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 16,
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerName: {
    fontWeight: "bold",
  },
  reviewStars: {
    flexDirection: "row",
  },
  reviewText: {
    color: "#333",
    fontSize: 14,
    lineHeight: 20,
  },
  addToCartButton: {
    backgroundColor: "#F97C7C",
    borderRadius: 10,
    padding: 15,
    bottom: 15,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default ProductDetailPage