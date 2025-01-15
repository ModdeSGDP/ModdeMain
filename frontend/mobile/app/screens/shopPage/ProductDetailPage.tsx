import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  ProductDetail: { product: Product };
};

type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: any;
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

type Props = {
  route: ProductDetailRouteProp;
  navigation: ProductDetailNavigationProp;
};

const ProductDetailPage: React.FC<Props> = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const colors = ['black', 'white', 'gray'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
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
        {[1, 2, 3, 4].map((img) => (
          <Image
            key={img}
            source={product.image}
            style={styles.productImage}
          />
        ))}
      </ScrollView>

      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.originalPrice}>LKR 4850</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>10%</Text>
          </View>
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
              style={[
                styles.sizeOption,
                selectedSize === size && styles.selectedSizeOption,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[
                styles.sizeOptionText,
                selectedSize === size && styles.selectedSizeOptionText,
              ]}>
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
        <Text style={styles.description}>
          Shop {product.brand} for trendy sportswear for ladies in Sri Lanka. Stay stylish and comfortable during your workouts with our premium women's sportswear collection.
        </Text>

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:40,
    paddingBottom:80
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: '#FFE2E6',
    borderRadius: 4,
    padding: 4,
  },
  discountText: {
    color: '#F97C7C',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviewCount: {
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#000',
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSizeOption: {
    backgroundColor: '#F97C7C',
    borderColor: '#F97C7C',
  },
  sizeOptionText: {
    fontSize: 16,
  },
  selectedSizeOptionText: {
    color: '#fff',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#F97C7C',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailPage;
