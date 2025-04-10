"use client"
import React, { useState, useCallback, useEffect, useMemo  } from "react"
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
  SafeAreaView,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { StackNavigationProp, RouteProp } from "@react-navigation/stack"
import { useCartStore } from "./cartState"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const API_BASE_URL = "https://93ba-112-134-239-177.ngrok-free.app"
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2M3ZmJiOWYxMTg3ZmVkMDZmY2Q4YjQiLCJlbWFpbCI6ImFkbWluN0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJyZXRhaWxlcklkIjoiNjdjN2ZiYjhmMTE4N2ZlZDA2ZmNkOGIyIiwiaWF0IjoxNzQyNDg3MzM2LCJleHAiOjE3NDI5MTkzMzZ9.2AXnmkQIpTXRRuyQE9Q_d7VQEwBGgPU0HKgD3H2PVFk" // Replace with secure token retrieval logic

type RootStackParamList = {
  HomePage: undefined
  ShopPage: { products?: Product[] } | undefined
  ProductDetail: { product: Product }
  CartPage: undefined
  ProfilePage: undefined
  Camera: undefined
  NotificationPage: undefined
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
  const route = useRoute<RouteProp<RootStackParamList, "ShopPage">>()
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [authToken, setAuthToken] = useState<string | null>(AUTH_TOKEN)
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({})
  const [initialProductsLoaded, setInitialProductsLoaded] = useState(false)

  const { items, addItem } = useCartStore()
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.retailer?.name && product.retailer.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [products, searchQuery])
  useEffect(() => {
    if (route.params?.products && !initialProductsLoaded) {
      const mappedProducts = route.params.products.map((item: any) => ({
        id: item._id || item.id,
        productId: item.productId || "N/A",
        name: item.name || "Unnamed Product",
        description: item.description || "",
        category: item.category || "Uncategorized",
        color: item.color || "",
        image: fixS3ImageUrl(item.image_url || item.image),
        retailerId: item.retailerId || "",
        retailer: item.retailer || null,
        createdAt: item.createdAt || "",
        updatedAt: item.updatedAt || "",
        price: item.price || 0,
        sizes: item.sizes || [],
        brand: item.brand || "Unknown Brand",
        tag: item.tag || "none",
        gender: item.gender || "unisex",
        material: item.material || "unknown",
      }))
      setProducts(mappedProducts)
      setInitialProductsLoaded(true)
      setIsLoading(false)
    }
  }, [route.params?.products, initialProductsLoaded])

  useEffect(() => {
    if (!route.params?.products && !initialProductsLoaded && products.length === 0) {
      fetchProducts(1)
    }
  }, [route.params?.products, initialProductsLoaded, products.length])

  const fetchRetailerDetails = async (retailerId: string): Promise<Retailer | null> => {
    if (!retailerId || retailerId.trim() === "") return null
    try {
      if (!authToken) return null
      const response = await fetch(`${API_BASE_URL}/retailers/${retailerId}`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      })
      if (!response.ok) {
        if (response.status === 401) setAuthToken(null)
        return null
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

  const fetchProducts = async (pageNum: number, retryCount = 0): Promise<boolean> => {
    if (retryCount === 0) setIsLoading(true)
    setError(null)
    try {
      const API_ENDPOINT = `${API_BASE_URL}/product?page=${pageNum}&limit=10`
      const headers: Record<string, string> = {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`

      const response = await fetch(API_ENDPOINT, { headers })
      if (!response.ok) {
        if (response.status === 401) {
          setAuthToken(null)
          throw new Error("Authentication failed. Please log in again.")
        }
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("API Response:", result)
      const productsArray = Array.isArray(result) ? result : result.products || []
      setTotalPages(result.totalPages || 1)

      const mappedProducts = await Promise.all(
        productsArray.map(async (item: any) => {
          const retailer = item.retailerId ? await fetchRetailerDetails(item.retailerId) : null
          const fixedImageUrl = fixS3ImageUrl(item.image)

          return {
            id: item._id || item.id,
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
        await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)))
        return fetchProducts(pageNum, retryCount + 1)
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

  const handleRefresh = () => {
    setIsRefreshing(true)
    setPage(1)
    setSearchQuery("")
    setInitialProductsLoaded(false)
    fetchProducts(1)
  }

  const loadMoreProducts = () => {
    if (page < totalPages && !isLoading && !initialProductsLoaded && searchQuery.trim() === "") {
      setPage((prevPage) => prevPage + 1)
      fetchProducts(page + 1)
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
            onError={() => handleImageError(item.image)}
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

  if (isLoading && page === 1 && !initialProductsLoaded && searchQuery.trim() === "") {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F97C7C" />
        <Text>Loading products...</Text>
      </View>
    )
  }
  if (error && products.length === 0 && searchQuery.trim() === "") {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => fetchProducts(1)}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shopsPageInfinityScroll}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </Pressable>
          <Text style={styles.headerTitle}>Shop</Text>
          <Pressable onPress={() => navigation.navigate("NotificationPage")}>
            <Image
              style={styles.bellIcon}
              resizeMode="cover"
              source={require("../../assets/bell.png")}
            />
          </Pressable>
        </View>

        {/* <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products"
            placeholderTextColor="#999"  // Added for better visibility of placeholder
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View> */}
        {searchQuery.trim() === "" && (
          <Image
            style={styles.bannerImage}
            resizeMode="cover"
            source={require("../../assets/Rectangle41.png")}
          />
        )}
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          numColumns={2}
          contentContainerStyle={[
            styles.productGrid,
            searchQuery.trim() !== "" && styles.searchResultsGrid,
          ]}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={
            isLoading && page > 1 && !initialProductsLoaded && searchQuery.trim() === "" ? (
              <ActivityIndicator size="small" color="#F97C7C" style={styles.footerLoader} />
            ) : null
          }
          ListEmptyComponent={
            searchQuery.trim() !== "" ? (
              <View style={styles.emptyResultsContainer}>
                <Text style={styles.emptyResultsText}>No products found matching "{searchQuery}"</Text>
              </View>
            ) : products.length === 0 && !isLoading ? (
              <View style={styles.emptyResultsContainer}>
                <Text style={styles.emptyResultsText}>No products available</Text>
              </View>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shopsPageInfinityScroll: {
    flex: 1,
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: 290,
    left: 50,
    height: 50,
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    margin: 10,
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
    fontStyle: "italic", // Added to make input text italic
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
  searchResultsGrid: {
    paddingTop: 20,
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
  emptyResultsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyResultsText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#321919",
    textAlign: "center",
  },
})

export default ShopsPageInfinityScroll