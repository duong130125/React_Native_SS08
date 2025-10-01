import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BT03 = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("counter");
        if (storedValue !== null) {
          setCount(Number(storedValue));
        }
      } catch (error) {
        console.log("Lỗi khi đọc bộ đếm:", error);
      }
    };

    loadCount();
  }, []);

  const saveCount = async (value: number) => {
    try {
      setCount(value);
      await AsyncStorage.setItem("counter", value.toString());
    } catch (error) {
      console.log("Lỗi khi lưu bộ đếm:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>Giá trị: {count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Giảm" onPress={() => saveCount(count - 1)} />
        <View style={{ width: 20 }} />
        <Button title="Tăng" onPress={() => saveCount(count + 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  countText: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
  },
});

export default BT03;
