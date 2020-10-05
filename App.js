import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import GreetingsScreen from "./screens/GreetingsScreen";
import ToDoAppScreen from "./screens/ToDoAppScreen";
import ProgrammersJokesAppScreen from "./screens/ProgrammersJokesAppScreen";
import AppDrawer from "./components/AppDrawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <AppDrawer {...props} />}
        screenOptions={{ swipeEnabled: false }}
        initalRouteName="Greetings"
      >
        <Drawer.Screen
          name="Home"
          component={GreetingsScreen}
          options={{ title: "Greetings" }}
        />
        <Drawer.Screen
          name="ToDoApp"
          component={ToDoAppScreen}
          options={{ title: "To Do App" }}
        />
        <Drawer.Screen
          name="ProgrammersJokesApp"
          component={ProgrammersJokesAppScreen}
          options={{ title: "Programmers Jokes App" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
