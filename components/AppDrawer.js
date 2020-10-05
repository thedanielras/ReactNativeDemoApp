import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  Switch,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default function AppDrawer(props) {
  const windowHeight = useWindowDimensions().height;

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const toggleSwitch = () => setIsSwitchEnabled((prevState) => !prevState);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          height: Math.floor((windowHeight / 100) * 13),
          backgroundColor: "#000",
          flex: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 21, fontWeight: "bold" }}>
          Daniel's Demo App
        </Text>
      </View>
      <View
        style={{
          flex: 70,
          marginTop: 15,
          marginBottom: 15,
        }}
      >
        <DrawerItemList labelStyle={styles.label} {...props} />
      </View>
      <View
        style={{
          flex: 10,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{ width: "100%", borderTopColor: "#ccc", borderTopWidth: 1 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={{ ...styles.label, marginRight: 20 }}>
            {"Use Dark Theme"}
          </Text>
          <Switch onValueChange={toggleSwitch} value={isSwitchEnabled} />
        </View>
        <View>
          <Text>Version 0.1</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    alignSelf: "center",
    fontSize: 16,
  },
});
