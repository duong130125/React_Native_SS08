import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@cart_items";

const PRODUCTS = [
  { id: "p1", name: "Laptop Pro" },
  { id: "p2", name: "Chuột không dây" },
  { id: "p3", name: "Bàn phím cơ" },
];

export default function BT07() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (e) {
        console.log("Lỗi load cart:", e);
      }
    };
    loadCart();
  }, []);

  const saveCart = async (newCart: any[]) => {
    try {
      setCart(newCart);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
    } catch (e) {
      console.log("Lỗi lưu cart:", e);
    }
  };

  const addToCart = async (product: any) => {
    try {
      const savedCart = await AsyncStorage.getItem(STORAGE_KEY);
      let currentCart = savedCart ? JSON.parse(savedCart) : [];

      const index = currentCart.findIndex(
        (item: any) => item.id === product.id
      );
      if (index !== -1) {
        currentCart[index].quantity += 1;
      } else {
        currentCart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentCart));
      setCart(currentCart);

      Alert.alert("Thành công", `Đã thêm "${product.name}" vào giỏ!`);
    } catch (e) {
      console.log("Lỗi thêm sản phẩm:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống</Text>
      ) : (
        cart.map((item) => (
          <Text key={item.id} style={styles.cartItem}>
            - {item.name} (Số lượng: {item.quantity})
          </Text>
        ))
      )}

      <View style={styles.productList}>
        <Text style={styles.subtitle}>Danh sách sản phẩm</Text>
        {PRODUCTS.map((product) => (
          <View key={product.id} style={styles.productRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <Button title="Thêm vào giỏ" onPress={() => addToCart(product)} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  empty: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  cartItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  productList: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  productName: {
    fontSize: 16,
  },
});
