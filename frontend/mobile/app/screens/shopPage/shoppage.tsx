"use client"

import { useState, useCallback, useMemo } from "react"
import { StyleSheet, View, Text, Image, Pressable, TextInput, FlatList, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import FilterMenu from "./FilterMenu"
import { useCartStore } from "./cartState"
import type { Product } from "./types/product"

const { width } = Dimensions.get("window")

type RootStackParamList = {
  HomePage: undefined
  ShopPage: undefined
  ProductDetail: { product: Product }
  CartPage: undefined
  ProfilePage: undefined
  Camera:undefined
}

type ShopsPageNavigationProp = StackNavigationProp<RootStackParamList, "ShopPage">

const ShopsPageInfinityScroll = () => {
  const navigation = useNavigation<ShopsPageNavigationProp>()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false)
  const [selectedSort, setSelectedSort] = useState("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ low: 0, high: 25000 })
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Hooded Long Sleeve -Teen Girls",
      brand: "Incarnag",
      price: 4850,
      image: require("../../assets/Rectangle51.png"),
      tag: "popular",
      category: "Casual Wear",
      gender: "Women",
      sizes: ["S", "M", "L"],
      material: "Cotton",
    },
    {
      id: "2",
      name: "Another Product",
      brand: "Kelly Felder",
      price: 3500,
      image: require("../../assets/Rectangle52.png"),
      tag: "popular",
      category: "Party Wear",
      gender: "Women",
      sizes: ["M", "L", "XL"],
      material: "Silk",
    },
    {
      id: "3",
      name: "Third Product",
      brand: "Incarnage",
      price: 2750,
      image: require("../../assets/Rectangle52.png"),
      tag: "recommended",
      category: "Formal Wear",
      gender: "Men",
      sizes: ["M", "L", "XXL"],
      material: "Polyester",
    },
    {
      id: "4",
      name: "Fourth Product",
      brand: "Kelly Felder",
      price: 5200,
      image: require("../../assets/Rectangle51.png"),
      tag: "recommended",
      category: "Sportswear",
      gender: "Men",
      sizes: ["S", "M", "L", "XL"],
      material: "Nylon",
    },
    {
      id: "5",
      name: "Fifth Product",
      brand: "Kelly Felder",
      price: 5200,
      image: require("../../assets/Rectangle51.png"),
      category: "Plus Size",
      gender: "Women",
      sizes: ["XL", "XXL"],
      material: "Cotton",
    },
    {
      id: "6",
      name: "Sixth Product",
      brand: "Kelly Felder",
      price: 5200,
      image: require("../../assets/Rectangle51.png"),
      category: "Casual Wear",
      gender: "Men",
      sizes: ["M", "L", "XL"],
      material: "Denim",
    },
  ])

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category) ||
        selectedCategories.includes(product.gender)
      const sizeMatch = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size))
      const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material)
      const priceMatch = product.price >= priceRange.low && product.price <= priceRange.high
      return categoryMatch && sizeMatch && materialMatch && priceMatch
    })

    if (selectedSort === "popular") {
      filtered = filtered.filter((product) => product.tag === "popular")
    } else if (selectedSort === "recommended") {
      filtered = filtered.filter((product) => product.tag === "recommended")
    }
    return filtered
  }, [products, selectedSort, selectedCategories, selectedSizes, selectedMaterials, priceRange])

  const addItem = useCartStore((state) => state.addItem)

  const ProductCard = useCallback(
    ({ item }: { item: Product }) => {
      return (
        <Pressable style={styles.card} onPress={() => navigation.navigate("ProductDetail", { product: item })}>
          <Image style={styles.productImage} resizeMode="cover" source={item.image} />
          <View style={styles.inStockLabel}>
            <Text style={styles.inStockText}>In stock</Text>
          </View>
          {item.tag && (
            <View style={[styles.tagLabel, item.tag === "popular" ? styles.popularTag : styles.recommendedTag]}>
              <Text style={styles.tagText}>{item.tag === "popular" ? "Most Popular" : "Recommended"}</Text>
            </View>
          )}
          <View style={styles.description}>
            <Text style={styles.productName}>{item.name}</Text>
            <Image style={styles.brandLogo} resizeMode="cover" source={require("../../assets/Ellipse18.png")} />
            <Text style={styles.brandName}>{item.brand}</Text>
            <Text style={styles.price}>LKR {item.price}</Text>
          </View>
          <Pressable
            style={styles.addToCartButton}
            onPress={() =>
              addItem({ id: item.id, name: item.name, price: item.price.toString(), image: item.image, quantity: 1 })
            }
          >
            <Image style={styles.addToCartIcon} resizeMode="cover" source={require("../../assets/addcart.png")} />
          </Pressable>
        </Pressable>
      )
    },
    [addItem, navigation],
  )
  const renderItem = useCallback(({ item }: { item: Product }) => <ProductCard item={item} />, [ProductCard])

  const CartButton = () => {
    const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))
    return (
      <Pressable onPress={() => navigation.navigate("CartPage")}>
        <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shopping_cart.png")} />
        {itemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{itemCount}</Text>
          </View>
        )}
      </Pressable>
    )
  }

  const handleApplyFilters = useCallback(
    (filters: {
      categories: string[]
      sizes: string[]
      materials: string[]
      priceRange: { low: number; high: number }
    }) => {
      setSelectedCategories(filters.categories)
      setSelectedSizes(filters.sizes)
      setSelectedMaterials(filters.materials)
      setPriceRange(filters.priceRange)
      setIsFilterMenuVisible(false)
    },
    [],
  )

  return (
    <View style={styles.shopsPageInfinityScroll}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate("HomePage")}>
        <Image style={styles.backButtonIcon} resizeMode="cover" source={require("../../assets/chevron_left.png")} />
      </Pressable>
      <View style={styles.searchBar}>
        <Pressable
          onPress={() => {
            /* Handle camera press */
          }}
        >
          <Image style={styles.searchCamera} resizeMode="cover" source={require("../../assets/Vector1.png")} />
        </Pressable>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable
          onPress={() => {
            /* Handle search press */
          }}
        >
          <Image style={styles.searchIcon} resizeMode="cover" source={require("../../assets/vector.png")} />
        </Pressable>
      </View>
      <Image style={styles.bannerImage} resizeMode="cover" source={require("../../assets/Rectangle41.png")} />
      <View style={styles.filterBar}>
        <View style={styles.sortOptions}>
          <Pressable onPress={() => setSelectedSort("all")}>
            <Text style={[styles.sortOptionText, selectedSort === "all" && styles.selectedSortText]}>All</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedSort("recommended")}>
            <Text style={[styles.sortOptionText, selectedSort === "recommended" && styles.selectedSortText]}>
              Recommended
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelectedSort("popular")}>
            <View style={styles.popularOption}>
              <Text style={[styles.sortOptionText, selectedSort === "popular" && styles.selectedSortText]}>
                Most Popular
              </Text>
              {selectedSort === "popular" && (
                <Image
                  style={styles.angleDownIcon}
                  resizeMode="cover"
                  source={require("../../assets/angle-down.png")}
                />
              )}
            </View>
          </Pressable>
        </View>
        <Pressable style={styles.filterButton} onPress={() => setIsFilterMenuVisible(true)}>
          <Image style={styles.filterIcon} resizeMode="cover" source={require("../../assets/sliders.png")} />
          <Text style={styles.filterText}>Filters</Text>
        </Pressable>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.columnWrapper}
      />
      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => navigation.navigate("HomePage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home1.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shirt1.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Camera")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/cameraplus.png")} />
          </Pressable>
          <CartButton />
          <Pressable onPress={() => navigation.navigate("ProfilePage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
      <FilterMenu
        isVisible={isFilterMenuVisible}
        onClose={() => setIsFilterMenuVisible(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={{
          categories: selectedCategories,
          sizes: selectedSizes,
          materials: selectedMaterials,
          priceRange: priceRange,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  shopsPageInfinityScroll: {
    flex: 1,
    backgroundColor: "#fff",
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchCamera: {
    width: 20,
    height: 18,
    marginRight: 10,
  },
  searchIcon: {
    width: 16,
    height: 18,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#321919",
  },
  bannerImage: {
    width: "90%",
    height: 165,
    borderRadius: 10,
    left: 20,
    marginVertical: 10,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sortOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortOptionText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#979797",
    marginRight: 10,
  },
  selectedSortText: {
    color: "#F97C7C",
  },
  popularOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  angleDownIcon: {
    width: 12,
    height: 12,
    marginLeft: 5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  filterText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 13,
    color: "#F97C7C",
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  brandLogo: {
    width: 20,
    height: 20,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
})

export default ShopsPageInfinityScroll

