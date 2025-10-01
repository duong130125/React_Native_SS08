import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BT02 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("darkMode");
        if (storedValue !== null) {
          setIsDarkMode(JSON.parse(storedValue));
        }
      } catch (error) {
        console.log("Lỗi khi đọc trạng thái:", error);
      }
    };

    loadSwitchState();
  }, []);

  const toggleSwitch = async (value: boolean) => {
    try {
      setIsDarkMode(value);
      await AsyncStorage.setItem("darkMode", JSON.stringify(value));
    } catch (error) {
      console.log("Lỗi khi lưu trạng thái:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#fff" },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.text, { color: isDarkMode ? "#fff" : "#000" }]}>
          Chế độ ban đêm
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
          thumbColor={isDarkMode ? "#fff" : "#000"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default BT02;
