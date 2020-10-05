import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";
import { useFonts } from "expo-font";

import HeaderWrapper from "../components/HeaderWrapper";
import { AppLoading } from "expo";
import { Easing } from "react-native-reanimated";

export default function GreetingsScreen({ route, navigation }) {
  let [fontsLoaded] = useFonts({
    Roboto_900: require("../assets/fonts/Roboto/Roboto-Black.ttf"),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [fadeAnim]);

  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!fontsLoaded) return <AppLoading />;
  return (
    <View style={{ flex: 1 }}>
      <HeaderWrapper
        title="Greetings Screen"
        onMenuPress={() => navigation.openDrawer()}
      >
        <View style={styles.container}>
          <Animated.Image
            source={require("../assets/images/reactLogo.png")}
            style={{
              width: 100,
              height: 100,
              transform: [{ rotate: spin }],
            }}
          />
          <Text style={styles.title}>Good Morning Daniel</Text>
        </View>
      </HeaderWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto_900",
    fontSize: 27,
  },
});
