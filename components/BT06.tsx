import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_settings";

export default function BT06() {
  const [settings, setSettings] = useState({
    username: "Guest",
    email: "guest@gmail.com",
    notificationsEnabled: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (e) {
        console.log("Lỗi load settings:", e);
      }
    };
    loadSettings();
  }, []);

  const saveSettings = async (newSettings: any) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.log("Lỗi lưu settings:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Tên hiển thị</Text>
        <TextInput
          style={styles.input}
          value={settings.username}
          onChangeText={(text) => saveSettings({ ...settings, username: text })}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={settings.email}
          onChangeText={(text) => saveSettings({ ...settings, email: text })}
        />
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(value) =>
            saveSettings({ ...settings, notificationsEnabled: value })
          }
        />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  field: {
    marginBottom: 20,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
});
