import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Switch,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { useTheme } from './ThemeManager';

export default function AppDrawer(props) {
  const windowHeight = useWindowDimensions().height;

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const toggleSwitch = () => setIsSwitchEnabled((prevState) => !prevState);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isSwitchEnabled) toggleTheme('dark');
    else toggleTheme('light');
  }, [isSwitchEnabled]);

  const styles = StyleSheet.create({
    label: {
      alignSelf: 'center',
      fontSize: 16,
      color: theme.onBackground,
      fontWeight: 'bold',
    },
  });

  return (
    <DrawerContentScrollView
      style={{ backgroundColor: theme.background, padding: 0 }}
      contentContainerStyle={{ paddingTop: 0 }}
      {...props}
    >
      <View
        style={{
          height: Math.floor((windowHeight / 100) * 13),
          backgroundColor: theme.secondary,
          flex: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{ color: theme.onSecondary, fontSize: 21, fontWeight: 'bold' }}
        >
          React Native Demo App
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
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{ width: '100%', borderTopColor: '#ccc', borderTopWidth: 1 }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text style={{ ...styles.label, marginRight: 20 }}>
            {'Use Dark Theme'}
          </Text>
          <Switch
            trackColor={{
              false: theme.primaryVariant,
              true: theme.secondaryVariant,
            }}
            thumbColor={!isSwitchEnabled ? theme.primary : theme.secondary}
            onValueChange={toggleSwitch}
            value={isSwitchEnabled}
          />
        </View>
        <View>
          <Text style={{ color: theme.onBackground }}>Version 0.1</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
