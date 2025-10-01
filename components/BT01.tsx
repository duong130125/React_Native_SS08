import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BT01 = () => {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem("userName");
        if (storedName) {
          setSavedName(storedName);
        }
      } catch (error) {
        console.log("Lỗi khi lấy dữ liệu:", error);
      }
    };

    loadName();
  }, []);

  const saveName = async () => {
    try {
      await AsyncStorage.setItem("userName", name);
      setSavedName(name);
    } catch (error) {
      console.log("Lỗi khi lưu dữ liệu:", error);
    }
  };

  return (
    <View style={styles.container}>
      {savedName ? (
        <Text style={styles.welcomeText}>Chào mừng trở lại, {savedName}!</Text>
      ) : (
        <>
          <Text style={styles.label}>Nhập tên của bạn:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ví dụ: An Nguyễn"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.button} onPress={saveName}>
            <Text style={styles.buttonText}>LƯU</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: "100%",
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BT01;
