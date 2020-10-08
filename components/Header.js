import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-ionicons';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Switch } from 'react-native-gesture-handler';

import { useTheme } from './ThemeManager';

export default function Header(props) {
  let [fontsLoaded] = useFonts({
    Ionicons: require('../node_modules/react-native-ionicons/fonts/Ionicons.ttf'),
  });

  const { theme } = useTheme();

  let styles = StyleSheet.create({
    container: {
      backgroundColor: theme.isLight? theme.primary : theme.topSurface,
      padding: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 21,
      fontWeight: 'bold',
      color: theme.onPrimary,
    },
  });

  if (!fontsLoaded) return <AppLoading />;
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.isLight? theme.primaryVariant : "#000000"}
        barStyle={'light-content'}
      />
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Icon
            color={theme.onPrimary}
            name="menu"
            onPress={() => props.onMenuPress()}
          ></Icon>
        </View>
      </View>
      <View style={{ flex: 5 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Icon color={theme.onPrimary} name="more"></Icon>
        </View>
      </View>
    </View>
  );
}
