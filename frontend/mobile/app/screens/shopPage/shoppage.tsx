"use client"

import React, { useState, useCallback, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { useCartStore } from "./cartState"

const { width } = Dimensions.get("window")

const API_BASE_URL = "https://2a1a-124-43-246-34.ngrok-free.app"
const AUTH_TOKEN = "usertoken" // Replace with secure token retrieval logic

type RootStackParamList = {
  HomePage: undefined
  ShopPage: undefined
  ProductDetail: { product: Product }
  CartPage: undefined
  ProfilePage: undefined
  Camera: undefined
}

type ShopsPageNavigationProp = StackNavigationProp<RootStackParamList, "ShopPage">

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
  retailer?: Retailer | null
  createdAt: string
  updatedAt: string
  price?: number
  sizes?: string[]
  brand?: string
  tag?: string
  gender?: string
  material?: string
}

const fixS3ImageUrl = (url: string | null): string | null => {
  if (!url) return null
  if (url.includes("modde.s3.undefined.amazonaws.com")) {
    return url.replace("modde.s3.undefined.amazonaws.com", "modde.s3.us-east-1.amazonaws.com")
  }
  return url
}

const ShopsPageInfinityScroll = () => {
  const navigation = useNavigation<ShopsPageNavigationProp>()
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(AUTH_TOKEN)
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({})

  const { items, addItem } = useCartStore()
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)

  const fetchRetailerDetails = async (retailerId: string): Promise<Retailer | null> => {
    if (!retailerId || retailerId.trim() === "") {
      return null
    }
    try {
      if (!authToken) {
        console.log("No auth token available for retailer fetch")
        return null
      }
      const response = await fetch(`${API_BASE_URL}/retailers/${retailerId}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      })
      if (!response.ok) {
        if (response.status === 401) {
          console.log(`Authentication failed for retailer ${retailerId}`)
          setAuthToken(null)
          return null
        } else if (response.status === 404) {
          console.log(`Retailer ${retailerId} not found`)
          return null
        }
        throw new Error(`Failed to fetch retailer details: ${response.status}`)
      }
      const retailerData = await response.json()
      return {
        id: retailerData._id || retailerId,
        name: retailerData.name || "Retailer Not Specified",
        logo: retailerData.logo || null,
        location: retailerData.location || null,
      }
    } catch (error) {
      console.error(`Error fetching retailer ${retailerId}:`, error)
      return null
    }
  }

  const fetchProducts = async (pageNum: number, retryCount = 0) => {
    if (retryCount === 0) setIsLoading(true)
    setError(null)
    try {
      const API_ENDPOINT = `${API_BASE_URL}/product?page=${pageNum}&limit=10`
      console.log("Fetching products from:", API_ENDPOINT)
      const headers: Record<string, string> = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`

      const response = await fetch(API_ENDPOINT, { headers })
      if (!response.ok) {
        if (response.status === 401) {
          console.log("Authentication failed for product fetch")
          setAuthToken(null)
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("API Response received:", result)

      const productsArray = result.products || []
      setTotalPages(result.totalPages || 1)

      const mappedProducts = await Promise.all(
        productsArray.map(async (item: any) => {
          const retailer = item.retailerId ? await fetchRetailerDetails(item.retailerId) : null
          const fixedImageUrl = fixS3ImageUrl(item.image)

          return {
            id: item._id,
            productId: item.productId || "N/A",
            name: item.name || "Unnamed Product",
            description: item.description || "",
            category: item.category || "Uncategorized",
            color: item.color || "",
            image: fixedImageUrl,
            retailerId: item.retailerId || "",
            retailer,
            createdAt: item.createdAt || "",
            updatedAt: item.updatedAt || "",
            price: item.price || 0,
            sizes: item.sizes || [],
            brand: item.brand || "Unknown Brand",
            tag: item.tag || "none",
            gender: item.gender || "unisex",
            material: item.material || "unknown",
          }
        })
      )

      if (pageNum === 1) {
        setProducts(mappedProducts)
      } else {
        setProducts((prevProducts) => [...prevProducts, ...mappedProducts])
      }
      return true
    } catch (error) {
      console.error("Fetch error:", error)
      if (retryCount < 3) {
        console.log(`Retrying fetch (attempt ${retryCount + 1})...`)
        setTimeout(() => fetchProducts(pageNum, retryCount + 1), 1000 * (retryCount + 1))
        return false
      }
      setError(error instanceof Error ? error.message : "Failed to fetch products")
      return false
    } finally {
      if (retryCount === 0) {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    }
  }

  useEffect(() => {
    fetchProducts(page)
  }, [page])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setPage(1)
    fetchProducts(1)
  }

  const loadMoreProducts = () => {
    if (page < totalPages && !isLoading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleImageError = (imageUrl: string | null) => {
    if (imageUrl) {
      setImageLoadErrors((prev) => ({ ...prev, [imageUrl]: true }))
    }
  }

  const ProductCard = useCallback(
    ({ item }: { item: Product }) => {
      const hasError = item.image ? imageLoadErrors[item.image] : true
      const imageSource = hasError || !item.image || !item.image.startsWith("http")
        ? require("../../assets/user.png")
        : { uri: item.image }

      const retailerName = item.retailer?.name || "Retailer Not Specified"

      return (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate("ProductDetail", { product: item })}
        >
          <Image
            style={styles.productImage}
            resizeMode="cover"
            source={imageSource}
            defaultSource={require("../../assets/user.png")}
            onError={(e) => {
              console.log("Image load error:", e.nativeEvent.error, "URL:", item.image)
              handleImageError(item.image)
            }}
          />
          <View style={styles.inStockLabel}>
            <Text style={styles.inStockText}>In stock</Text>
          </View>
          {item.tag && item.tag !== "none" && (
            <View style={[styles.tagLabel, item.tag === "popular" ? styles.popularTag : styles.recommendedTag]}>
              <Text style={styles.tagText}>
                {item.tag === "popular" ? "Most Popular" : "Recommended"}
              </Text>
            </View>
          )}
          <View style={styles.description}>
            <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text style={styles.brandName} numberOfLines={1} ellipsizeMode="tail">
              {retailerName}
            </Text>
            <Text style={styles.price}>LKR {item.price?.toFixed(2) || "N/A"}</Text>
          </View>
          <Pressable
            style={styles.addToCartButton}
            onPress={() => {
              addItem({
                id: item.id,
                name: item.name,
                price: item.price?.toString() || "0",
                image: item.image,
                quantity: 1,
                color: item.color,
                size: item.sizes?.[0] || "",
                brand: item.brand || retailerName,
                shop: retailerName,
              })
            }}
          >
            <Image
              style={styles.addToCartIcon}
              resizeMode="cover"
              source={require("../../assets/addcart.png")}
            />
          </Pressable>
        </Pressable>
      )
    },
    [navigation, addItem, imageLoadErrors]
  )

  const renderItem = useCallback(({ item }: { item: Product }) => <ProductCard item={item} />, [ProductCard])

  if (isLoading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F97C7C" />
        <Text>Loading products...</Text>
      </View>
    )
  }

  if (error && products.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => fetchProducts(1)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    )
  }

  if (products.length === 0 && !isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No products found.</Text>
        <Pressable style={styles.retryButton} onPress={() => fetchProducts(1)}>
          <Text style={styles.retryButtonText}>Refresh</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.shopsPageInfinityScroll}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate("HomePage")}>
        <Image
          style={styles.backButtonIcon}
          resizeMode="cover"
          source={require("../../assets/chevron_left.png")}
        />
      </Pressable>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <Image
        style={styles.bannerImage}
        resizeMode="cover"
        source={require("../../assets/Rectangle41.png")}
      />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          isLoading && page > 1 ? (
            <ActivityIndicator size="small" color="#F97C7C" style={styles.footerLoader} />
          ) : null
        }
      />
      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <Image
              style={styles.navIcon}
              resizeMode="cover"
              source={require("../../assets/smart_home1.png")}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <View style={styles.lineView} />
            <Image
              style={styles.navIcon}
              resizeMode="cover"
              source={require("../../assets/shirt1.png")}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Camera")}>
            <Image
              style={styles.navIcon}
              resizeMode="cover"
              source={require("../../assets/cameraplus.png")}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("CartPage")}>
            <View style={styles.cartBadgeContainer}>
              <Image
                style={styles.navIcon}
                resizeMode="cover"
                source={require("../../assets/shopping_cart.png")}
              />
              {totalQuantity > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalQuantity}</Text>
                </View>
              )}
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ProfilePage")}>
            <Image
              style={styles.navIcon}
              resizeMode="cover"
              source={require("../../assets/user.png")}
            />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shopsPageInfinityScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  retryButton: {
    backgroundColor: "#F97C7C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 1,
  },
  backButtonIcon: {
    width: 37,
    height: 27,
    top: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: 290,
    left: 50,
    height: 50,
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    margin: 10,
    marginTop: 5,
    top: 10,
    padding: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#321919",
  },
  bannerImage: {
    width: "80%",
    height: 155,
    borderRadius: 10,
    left: 35,
    marginVertical: 10,
  },
  productGrid: {
    paddingHorizontal: 10,
    paddingBottom: 120,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: (width - 30) / 2,
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 180,
    aspectRatio: 1,
  },
  inStockLabel: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFE2E6",
    borderRadius: 2,
    padding: 5,
  },
  inStockText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#F97C7C",
  },
  description: {
    padding: 10,
  },
  productName: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#321919",
    marginBottom: 5,
  },
  brandName: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    color: "#000",
    marginBottom: 5,
  },
  price: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#321919",
  },
  addToCartButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  addToCartIcon: {
    width: 24,
    height: 24,
  },
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
  activeIndicator: {
    position: "absolute",
    left: 89,
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
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
  },
  cartBadgeContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  tagLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: 2,
    padding: 5,
  },
  popularTag: {
    backgroundColor: "#FFD700",
  },
  recommendedTag: {
    backgroundColor: "#90EE90",
  },
  tagText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
    color: "#000",
  },
  footerLoader: {
    marginVertical: 20,
  },
})

export default ShopsPageInfinityScroll