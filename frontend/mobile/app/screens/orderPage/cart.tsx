import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();

  const renderCartItem = (item,index) => (
  <Pressable
    key={index}
    style={styles.cartItem}
    onPress={() => navigation.navigate('ItemDetails', { item })}
  >
    <View style={styles.dressCard}>
    <Image 
              style={styles.home} 
              resizeMode="cover" 
              source={require("../../assets/home.png")} 
            />
      <Image 
        style={styles.itemImage} 
        resizeMode="cover" 
        source={require("../../assets/Rectangle51.png")} 
      />
      <View style={styles.dressCardChild} />
    </View>
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Text style={styles.leftText}>5 left</Text>
      <View style={styles.quantitySelector}>
        <View style={styles.component1}>
          <View style={styles.component1Child} />
          <View style={[styles.component1Item, styles.component1Position]} />
          <Text style={styles.quantityText}>1</Text>
          <View style={[styles.component1Inner, styles.component1Position]} />
          <Text style={styles.quantityText}>1</Text>
          <View style={[styles.rectangleView, styles.component1Position]} />
          <Text style={styles.plusText}>+</Text>
          <View style={[styles.lineView, styles.lineViewPosition]} />
          <View style={[styles.component1Child1, styles.lineViewPosition]} />
        </View>
      </View>
    </View>
  </Pressable>
);
  return (
    <View style={styles.cart}>
      <View style={styles.top}>
      </View>
      <Pressable onPress={() => navigation.navigate('HomePage')}>
        <Image 
          style={styles.backbutton} 
          resizeMode="cover" 
          source={require("../../assets/chevron_left.png")} 
        />
        </Pressable>
      <View style={styles.cart1}>
        <Text style={styles.headerTitle}>Cart (4)</Text>
        <View style={styles.groupParent}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image 
              style={styles.bellIcon} 
              resizeMode="cover" 
              source={require("../../assets/bell.png")} 
            />
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.carangeCartClothParent}>
        {[1, 2, 3, 4].map((item, index) => renderCartItem({ name: 'Hooded Long Sleeve - New York', price: 'LKR.4370' }, index))}
      </ScrollView>

      <Pressable style={styles.checkoutBar} onPress={() => {}}>
        <View style={styles.checkptBar}>
          <Text style={styles.allText}>All</Text>
          <Text style={styles.totalPrice}>LKR.4370</Text>
          <View style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </View>
        </View>
      </Pressable>

      <View style={styles.navigationBar}>
        <View style={styles.navBarBg} />
        <View style={styles.navIcons}>
          <Pressable onPress={() => {}}>
            <View style={styles.lineView} />
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/smart_home.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("ShopPage")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shirt.png")} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/cameraplus.png")} />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Intro2")}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/shopping_cart.png")} />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image style={styles.navIcon} resizeMode="cover" source={require("../../assets/user.png")} />
          </Pressable>
        </View>
        <View style={styles.activeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home:{
    width:20,
    height:20,

  },
  backbutton:{
    width:35,
    height:35,
    top:-48,
    left:30,
  },
  cart: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    height: 59,
    width: '100%',
  },
  statusbar: {
    height: 59,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sideFlexBox: {
    alignItems: 'center',
  },
  leftSide: {
    flex: 1,
  },
  statusbarTime: {
    borderRadius: 24,
  },
  time: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signalWifiBattery: {
    flexDirection: 'row',
    gap: 8,
  },
  cart1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fffff',
    top:-100,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#321919',
    left:150,
  },
  groupParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    width: 22,
    height: 23,
    left:-20,
    top:1
  },
  carangeCartClothParent: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dressCard: {
    width: 78,
    height: 71,
  },
  itemImage: {
    width: 78,
    height: 71,
    borderRadius: 10,
  },
  dressCardChild: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#d9d9d9',
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '400',
    color: '#321919',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  leftText: {
    fontSize: 10,
    color: '#321919',
  },
  quantitySelector: {
    marginTop: 10,
  },
  component1: {
    width: 62,
    height: 22,
    borderWidth: 1,
    borderColor: '#898989',
    flexDirection: 'row',
    alignItems: 'center',
  },
  component1Child: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
  component1Position: {
    position: 'absolute',
    top: '4.55%',
    bottom: '4.55%',
    width: '32.26%',
    backgroundColor: '#fff',
  },
  component1Item: {
    left: '1.61%',
  },
  component1Inner: {
    left: '33.87%',
  },
  rectangleView: {
    right: '1.61%',
  },
  quantityText: {
    position: 'absolute',
    left: '43.55%',
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  plusText: {
    position: 'absolute',
    left: '75.81%',
    fontSize: 16,
    color: '#1e1e1e',
  },
  lineViewPosition: {
    position: 'absolute',
    top: '2.27%',
    bottom: '2.27%',
    width: 1,
    backgroundColor: '#898989',
  },
  lineView: {
    left: '31.45%',
  },
  component1Child1: {
    right: '34.68%',
  },
  checkoutBar: {
    backgroundColor: '#ffccd4',
    padding: 20,
    borderRadius: 15,
    bottom:130,
  },
  checkptBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allText: {
    fontSize: 10,
    color: '#321919',
  },
  totalPrice: {
    fontSize: 12,
    fontWeight: '500',
    color: '#321919',
  },
  checkoutButton: {
    backgroundColor: '#f97c7c',
    paddingHorizontal: 24,
    paddingVertical: 9,
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  navigationBar: {
    position: 'absolute',
    bottom: 34,
    left: '50%',
    marginLeft: -158,
    width: 316,
    height: 69,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navBarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffe2e6',
    borderRadius: 20,
  },
  navIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  navIcon: {
    width: 23,
    height: 24,
  },
  activeIndicator: {
    position: 'absolute',
    left: 26,
    bottom: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fba3a3',
  },
});
export default Cart;

