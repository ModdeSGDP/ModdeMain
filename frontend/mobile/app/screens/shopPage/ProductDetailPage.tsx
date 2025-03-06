import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCartStore } from '../shopPage/cartState'; // Ensure this path is correct

const { width } = Dimensions.get('window');

type RootStackParamList = {
  ProductDetail: { product: Product };
  CartPage: undefined;
};

type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: any; // Can be a URI or local image
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
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showReviewInput, setShowReviewInput] = useState(false);

  const { addItem } = useCartStore();

  const colors = ['black', 'white', 'gray'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleSubmitReview = () => {
    console.log('Submitting review:', { rating: userRating, text: reviewText });
    setUserRating(0);
    setReviewText('');
    setShowReviewInput(false);
  };

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
    };
    addItem(item);
    Alert.alert('Success', 'Item added to cart!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={typeof product.image === 'string' ? { uri: product.image } : product.image} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <View style={styles.colorSelector}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, selectedColor === color && styles.selectedColor]}
              onPress={() => setSelectedColor(color)}
            >
              <View style={{ backgroundColor: color, width: 30, height: 30 }} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sizeSelector}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeOption, selectedSize === size && styles.selectedSize]}
              onPress={() => setSelectedSize(size)}
            >
              <Text>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.quantitySelector}>
          <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
            <Ionicons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rate this product:</Text>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity key={rating} onPress={() => setUserRating(rating)}>
              <Ionicons
                name={userRating >= rating ? 'star' : 'star-outline'}
                size={24}
                color={userRating >= rating ? 'gold' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>
        {showReviewInput && (
          <View>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write your review here..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.reviewButton} onPress={() => setShowReviewInput(!showReviewInput)}>
          <Text style={styles.reviewButtonText}>{showReviewInput ? 'Hide Review' : 'Write a Review'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: width,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productBrand: {
    fontSize: 18,
    marginBottom: 10,
    color: 'gray',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  colorSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorOption: {
    marginRight: 10,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'black',
  },
  sizeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sizeOption: {
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectedSize: {
    backgroundColor: 'lightgray',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    padding: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    marginRight: 10,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  reviewButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
  },
});

export default ProductDetailPage;