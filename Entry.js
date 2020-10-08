import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import GreetingsScreen from './screens/GreetingsScreen';
import ToDoAppScreen from './screens/ToDoAppScreen';
import ProgrammersJokesAppScreen from './screens/ProgrammersJokesAppScreen';
import GiphyAppScreen from './screens/GiphyAppScreen';
import AppDrawer from './components/AppDrawer';
import { useTheme } from './components/ThemeManager';

const Drawer = createDrawerNavigator();

function Entry() {
  const { theme } = useTheme();

  return (
    <NavigationContainer style={{padding:0}}>
      <Drawer.Navigator
        drawerContent={(props) => <AppDrawer {...props} />}
        screenOptions={{ swipeEnabled: false }}
        initalRouteName="Greetings"
        drawerStyle={{padding:0}}
      >
        <Drawer.Screen
          name="Home"
          component={GreetingsScreen}
          options={{ title: 'Greetings' }}
        />
        <Drawer.Screen
          name="ToDoApp"
          component={ToDoAppScreen}
          options={{ title: 'To Do App' }}
        />
        <Drawer.Screen
          name="ProgrammersJokesApp"
          component={ProgrammersJokesAppScreen}
          options={{ title: 'Programmers Jokes App' }}
        />
        <Drawer.Screen
          name="GiphyApp"
          component={GiphyAppScreen}
          options={{ title: 'Giphy App' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Entry;
