import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_data";

export default function BT08() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const migrateData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedData) {
          let parsedData = JSON.parse(storedData);

          if (!parsedData.version) {
            console.log("Đang ở version 1, cần migrate...");

            const [firstName, ...lastArr] = parsedData.name.split(" ");
            const lastName = lastArr.join(" ");

            const migratedData = {
              user: {
                firstName: firstName || "",
                lastName: lastName || "",
              },
              version: 2,
            };

            await AsyncStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(migratedData)
            );

            parsedData = migratedData;
          } else {
            console.log("Dữ liệu đã ở version mới:", parsedData.version);
          }

          setUserData(parsedData);
        } else {
          const defaultData = {
            user: { firstName: "Guest", lastName: "" },
            version: 2,
          };
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
          setUserData(defaultData);
        }
      } catch (e) {
        console.log("Lỗi migrate:", e);
      } finally {
        setLoading(false);
      }
    };

    migrateData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Đang kiểm tra và migrate dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      <Text>
        Họ: {userData?.user?.lastName} - Tên: {userData?.user?.firstName}
      </Text>
      <Text>Version: {userData?.version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
