import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Header from "./Header";

export default function HeaderWrapper(props) {
  return (
    <View style={{flex:1}}>
      <View style={{flex:10}}>
        <Header title={props.title} onMenuPress={props.onMenuPress} />
      </View>
      <View style={{flex:90}}>
          {props.children}
      </View>
    </View>
  );
}

