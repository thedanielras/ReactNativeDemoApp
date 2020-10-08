import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Easing } from 'react-native-reanimated';

import HeaderWrapper from '../components/HeaderWrapper';
import { useTheme } from '../components/ThemeManager';
import { TextInput } from 'react-native-gesture-handler';
import { PAPERQUOTESAPIKEY } from '../ApiKeys';

const fetchQuoteOfTheDay = async () => {
  LOG("Start Fetching 'Quote of the day'");
  let quoteObj = null;
  let json = null;

  try {
    let response = await fetch(
      'https://api.paperquotes.com/apiv1/qod/?lang=en',
      {
        headers: {
          Authorization: `Token ${PAPERQUOTESAPIKEY}`,
        },
      }
    );
    json = await response.json();
  } catch (e) {
    LOG('There was an error while fetching');
  }

  try {
    if (json && json.quote) quoteObj = json;
  } catch (e) {
    LOG('There was an error while extracting quote from response');
  }

  return quoteObj;
};

export default function GreetingsScreen({ route, navigation }) {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [userName, setUserName] = useState();
  const [hasUserName, setHasUserName] = useState(false);
  const { theme } = useTheme();

  let [fontsLoaded] = useFonts({
    Roboto_Black: require('../assets/fonts/Roboto/Roboto-Black.ttf'),
    Roboto_Medium: require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
    Roboto_Regular: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let fetchQuote = async () => {
      let json = await fetchQuoteOfTheDay();
      if (json) setQuoteOfTheDay(json);
      LOG('Quote of the day fetched');
    };
    if (PAPERQUOTESAPIKEY) fetchQuote();
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    let animation = Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();
    return () => {
      animation.reset();
    };
  }, [fadeAnim]);

  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'Roboto_Black',
      fontSize: 27,
      color: theme.onBackground,
    },
  });

  if (!fontsLoaded || !isDataLoaded) return <AppLoading />;
  return (
    <View style={{ flex: 1 }}>
      <HeaderWrapper
        title="Greetings Screen"
        onMenuPress={() => navigation.openDrawer()}
      >
        <View style={styles.container}>
          <Animated.Image
            source={require('../assets/images/reactLogo.png')}
            style={{
              width: 100,
              height: 100,
              transform: [{ rotate: spin }],
            }}
          />
          <Text style={styles.title}>
            {!hasUserName ? 'Hi, please type in your name' : 'Hi there,'}
          </Text>
          <UserNameInput
            userName={userName}
            setUserName={setUserName}
            hasUserName={hasUserName}
            setHasUserName={setHasUserName}
          ></UserNameInput>
          <View
            style={{
              marginTop: 30,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Roboto_Medium',
                color: theme.onBackground,
              }}
            >
              Quote of the day:
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto_Regular',
                fontSize: 15,
                color: theme.onBackground,
                marginTop: 10,
              }}
            >
              {quoteOfTheDay ? quoteOfTheDay.quote : 'Quote not available!'}
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto_Regular',
                fontSize: 15,
                color: theme.onBackground,
                alignSelf: 'flex-end',
                marginTop: 10,
                opacity: 0.6,
              }}
            >
              {quoteOfTheDay ? quoteOfTheDay.author : 'Author not available!'}
            </Text>
          </View>
        </View>
      </HeaderWrapper>
    </View>
  );
}

function UserNameInput(props) {
  const { theme } = useTheme();
  const { userName, setUserName } = props;
  const { hasUserName, setHasUserName } = props;

  if (!hasUserName)
    return (
      <View
        style={{
          width: 150,
          alignItems: 'center',
        }}
      >
        <TextInput
          value={userName}
          onChangeText={setUserName}
          onSubmitEditing={() => setHasUserName(true)}
          textAlign="center"
          style={{
            width: 250,
            borderWidth: 0,
            borderBottomWidth: hasUserName ? 0 : 1,
            borderBottomColor: theme.onBackground,
            color: theme.onBackground,
            fontFamily: 'Roboto_Black',
            fontSize: 27,
            padding: 5,
          }}
        ></TextInput>
      </View>
    );
  else {
    return (
      <Text
        style={{
          color: theme.onBackground,
          fontFamily: 'Roboto_Black',
          fontSize: 27,
        }}
      >
        {userName}
      </Text>
    );
  }
}

const LOG = function (message) {
  console.log(`GreetingsScreen => ${message}`);
};
