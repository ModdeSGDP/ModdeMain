import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ShopsPageInfinityScroll = () => {
  const navigation = useNavigation();

  const ProductCard = () => (
    <View style={styles.card}>
      <Image
        style={styles.productImage}
        resizeMode="cover"
        source={require("../assets/Rectangle 51.png")}
      />
      <View style={styles.inStockLabel}>
        <Text style={styles.inStockText}>In stock</Text>
      </View>
      <View style={styles.description}>
        <Text style={styles.productName}>Hooded Long Sleeve -Teen Girls</Text>
        <Image
          style={styles.brandLogo}
          resizeMode="cover"
          source={require("../assets/Ellipse 18.png")}
        />
        <Text style={styles.brandName}>Incarnage</Text>
        <Text style={styles.price}>LKR 4,850</Text>
      </View>
      <Pressable style={styles.addToCartButton}>
        <Image
          style={styles.addToCartIcon}
          resizeMode="cover"
          source={require("../assets/addcart.png")}
        />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.shopsPageInfinityScroll}>
      {/* <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusBarIcons}>
          <Image
            style={styles.statusBarIcon}
            resizeMode="cover"
            source={require("../assets/mobile-signal.png")}
          />
          <Image
            style={styles.statusBarIcon}
            resizeMode="cover"
            source={require("../assets/wifi.png")}
          />
          <Image
            style={styles.statusBarIcon}
            resizeMode="cover"
            source={require("../assets/battery.png")}
          />
        </View> */}
      {/* </View> */}

      <View style={styles.searchBar}>
        <Image
          style={styles.searchIcon}
          resizeMode="cover"
          source={require("../assets/vector.png")}
        />
        <Text style={styles.searchText}>Teen Girls Sweatshirts</Text>
        {/* <Image
          style={styles.heartIcon}
          resizeMode="cover"
          source={require("../assets/cart.png")}
        /> */}
      </View>

      <Image
        style={styles.bannerImage}
        resizeMode="cover"
        source={require("../assets/Rectangle 41.png")}
      />

      <View style={styles.filterBar}>
        <View style={styles.sortOptions}>
          <Text style={styles.recommendText}>Recommend</Text>
          <Image
            style={styles.angleDownIcon}
            resizeMode="cover"
            source={require("../assets/angle -down.png")}
          />
          <Text style={styles.mostPopularText}>Most Popular</Text>
        </View>
        <Pressable style={styles.filterButton}>
          <Image
            style={styles.filterIcon}
            resizeMode="cover"
            source={require("../assets/sliders.png")}
          />
          <Text style={styles.filterText}>Filters</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.productGrid}>
        <View style={styles.row}>
          <ProductCard />
          <ProductCard />
        </View>
        <View style={styles.row}>
          <ProductCard />
          <ProductCard />
        </View>
        <View style={styles.row}>
          <ProductCard />
          <ProductCard />
        </View>
      </ScrollView>

      <View style={styles.navigationBar}>
        <Pressable style={styles.navItem}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require("../assets/smart-home.png")}
          />
        </Pressable>
        <Pressable style={styles.navItem}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require("../assets/shirt.png")}
          />
        </Pressable>
        <Pressable style={styles.navItem}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require("../assets/camera-plus.png")}
          />
        </Pressable>
        <Pressable style={styles.navItem}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require("../assets/shopping-cart.png")}
          />
        </Pressable>
        <Pressable style={styles.navItem}>
          <Image
            style={styles.navIcon}
            resizeMode="cover"
            source={require("../assets/user.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shopsPageInfinityScroll: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  time: {
    fontFamily: "SF Pro Text",
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  statusBarIcons: {
    flexDirection: "row",
  },
  statusBarIcon: {
    width: 17,
    height: 11,
    marginLeft: 5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  searchText: {
    flex: 1,
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#321919",
  },
  heartIcon: {
    width: 16,
    height: 16,
  },
  bannerImage: {
    width: "100%",
    height: 155,
    borderRadius: 10,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    padding: 10,
  },
  sortOptions: {
    flexDirection: "row",
    alignItems: "center",
  },
  recommendText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#F97C7C",
    marginRight: 5,
  },
  angleDownIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
  },
  mostPopularText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#979797",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  filterText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#F97C7C",
  },
  productGrid: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFE2E6",
    borderRadius: 10,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFE2E6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});

export default ShopsPageInfinityScroll;

