import React, { useState } from "react"
import { StyleSheet, View, Text, Image, Pressable, ScrollView, TextInput, FlatList, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import FilterMenu from "./FilterMenu"
import { useCartStore } from "./cartState"

const { width } = Dimensions.get("window")
const ShopsPageInfinityScroll = () => {
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false)
  const [selectedSort, setSelectedSort] = useState("recommend")
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Hooded Long Sleeve -Teen Girls",
      brand: "Incarnag",
      price: "LKR 4,850",
      image: require("../../assets/Rectangle51.png"),
    },
    {
      id: "2",
      name: "Another Product",
      brand: "Kelly Felder",
      price: "LKR 3,500",
      image: require("../../assets/Rectangle52.png"),
    },
    {
      id: "3",
      name: "Third Product",
      brand: "Incarnage",
      price: "LKR 2,750",
      image: require("../../assets/Rectangle52.png"),
    },
    {
      id: "4",
      name: "Fourth Product",
      brand: "Kelly Felder",
      price: "LKR 5,200",
      image: require("../../assets/Rectangle51.png"),
    },
    {
      id: "4",
      name: "Fourth Product",
      brand: "Kelly Felder",
      price: "LKR 5,200",
      image: require("../../assets/Rectangle51.png"),
    },
    {
      id: "4",
      name: "Fourth Product",
      brand: "Kelly Felder",
      price: "LKR 5,200",
      image: require("../../assets/Rectangle51.png"),
    },
  ])
  const ProductCard = ({item}) => {
    const addItem = useCartStore((state) => state.addItem)
    return (
      <Pressable style={styles.card} onPress={() => navigation.navigate("ProductDetail", { product: item })}>
        <Image style={styles.productImage} resizeMode="cover" source={item.image} />
        <View style={styles.inStockLabel}>
          <Text style={styles.inStockText}>In stock</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.productName}>{item.name}</Text>
          <Image style={styles.brandLogo} resizeMode="cover" source={require("../../assets/Ellipse18.png")} />
          <Text style={styles.brandName}>{item.brand}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Pressable
          style={styles.addToCartButton}
          onPress={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 })}
        >
          <Image style={styles.addToCartIcon} resizeMode="cover" source={require("../../assets/addcart.png")} />
        </Pressable>
      </Pressable>
    )
  }
  const renderItem = ({ item }) => <ProductCard item={item} />
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

  return (
    <View style={styles.shopsPageInfinityScroll}>
      <Pressable onPress={() => navigation.navigate("HomePage")}>
        <Image style={styles.backbutton} resizeMode="cover" source={require("../../assets/chevron_left.png")} />
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
          <Pressable onPress={() => setSelectedSort("recommend")}>
            <Text style={[styles.sortOptionText, selectedSort === "recommend" && styles.selectedSortText]}>
              Recommend
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
        data={products}
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
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/cameraplus.png")} />
          </Pressable>
          <CartButton />
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>

      <FilterMenu isVisible={isFilterMenuVisible} onClose={() => setIsFilterMenuVisible(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  shopsPageInfinityScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    margin: 50,
    marginTop: 3,
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
  backbutton: {
    top: 15,
    left: 10,
    width: 27,
    height: 27,
    position: "absolute",
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#321919",
  },
  bannerImage: {
    width: "80%",
    height: 145,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
    marginTop: -40,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    padding: 10,
    marginBottom: 0,
    bottom: 0,
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
  mostPopularText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 15,
    color: "#979797",
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
    gap: 10,
    bottom:100,
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
})

export default ShopsPageInfinityScroll
