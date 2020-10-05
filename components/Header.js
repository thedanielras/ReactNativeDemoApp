import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-ionicons";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { Switch } from "react-native-gesture-handler";

export default function Header(props) {
  let [fontsLoaded] = useFonts({
    Ionicons: require("../node_modules/react-native-ionicons/fonts/Ionicons.ttf"),
  });
  
  if (!fontsLoaded) return <AppLoading />;
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Icon name="menu" onPress={() => props.onMenuPress()}></Icon>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Icon name="more"></Icon>
          
        </View>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: getStatusBarHeight(),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#000",
  },
});
