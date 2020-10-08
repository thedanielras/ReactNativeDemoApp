import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextComponent,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Button } from 'react-native-paper';

import HeaderWrapper from '../components/HeaderWrapper';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../components/ThemeManager';

const APIENDPOINT =
  'https://sv443.net/jokeapi/v2/joke/Programming?type=single&amount=10';
const loadJokesAsync = async function () {
  LOG('Start Async Fetching Jokes Data');
  let response = await fetch(APIENDPOINT);
  let json = response.json();
  return json;
};

export default function ProgrammersJokesAppScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      paddingBottom: 10,
      paddingTop: 10,
    },
  });

  // load jokes
  useEffect(() => {
    if (error || !isLoading) return;
    const fetchData = async () => {
      let jokes = [];
      try {
        jokes = await loadJokesAsync();
      } catch (e) {
        setIsLoading(false);
        setError(e);
      }

      if (jokes && jokes.jokes && jokes.jokes.length) {
        LOG('Jokes data fetched successfully');
        setJokes(jokes.jokes);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [error, isLoading]);

  useEffect(() => {});

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator
          size="large"
          color={theme.isLight ? theme.primary : theme.secondary}
        />
      </View>
    );
  else if (error)
    return (
      <View>
        <Text>{'There was an error fetching the data, sorry!'}</Text>
      </View>
    );
  return (
    <View style={{ flex: 1 }}>
      <HeaderWrapper
        title="Programmer Jokes App"
        onMenuPress={() => navigation.openDrawer()}
      >
        <View style={styles.container}>
          <FlatList
            data={jokes}
            keyExtractor={(joke) => String(joke.id)}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      paddingBottom: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: theme.onSurface,
                      }}
                    >{`Joke ${index + 1}`}</Text>
                  </View>

                  <Text
                    style={{
                      color: theme.onSurface,
                      fontSize: 14,
                    }}
                  >
                    {item.joke}
                  </Text>
                </View>
              );
            }}
            ListFooterComponent={() => {
              return (
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                  <Button
                    mode="text"
                    style={{
                      backgroundColor: theme.secondary,
                    }}
                    color={theme.onSecondary}
                    onPress={() => {
                      setIsLoading(true);
                    }}
                  >
                    Load Another
                  </Button>
                </View>
              );
            }}
          />
        </View>
      </HeaderWrapper>
    </View>
  );
}

const LOG = function(message) {
  console.log(`ProgrammersJokes App => ${message}`);
}