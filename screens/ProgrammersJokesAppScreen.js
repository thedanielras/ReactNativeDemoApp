import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextComponent,
  Button,
} from "react-native";
import { useFonts } from "expo-font";

import HeaderWrapper from "../components/HeaderWrapper";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const APIENDPOINT =
  "https://sv443.net/jokeapi/v2/joke/Programming?type=single&amount=10";
const loadJokesAsync = async function () {
  console.log("ProgrammersJokes App : Start Async Fetch Data");
  let response = await fetch(APIENDPOINT);
  let json = response.json();
  return json;
};

export default function ProgrammersJokesAppScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);

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
        console.log("ProgrammersJokes App : Data Fetched successfully");
        setJokes(jokes.jokes);
        // console.log("jokes", jokes);
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  else if (error)
    return (
      <View>
        <Text>{"There was an error fetching the data, sorry!"}</Text>
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
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >{`Joke ${index + 1}`}</Text>
                  </View>

                  <Text
                    style={{
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
                <View style={{ alignItems: "center" }}>
                  <Button
                    title="Load Another"
                    onPress={() => {
                      setIsLoading(true);
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </HeaderWrapper>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
