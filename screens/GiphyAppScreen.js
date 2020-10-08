import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Searchbar } from 'react-native-paper';
import { Video } from 'expo-av';

import HeaderWrapper from '../components/HeaderWrapper';
import { useTheme } from '../components/ThemeManager';
import { GIPHYAPIKEY } from '../ApiKeys';

const GIPHYENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const GIPHY_PARAM_LIMIT = '14';
const GIPHY_PARAM_LANG = 'lang';

const initialPagination = {
  total_count: GIPHY_PARAM_LIMIT,
  count: GIPHY_PARAM_LIMIT,
  offset: 0,
};

let searchGif = async function (query, offset = 0) {
  let endpoint = `${GIPHYENDPOINT}?api_key=${GIPHYAPIKEY}&q=${query}&limit=${GIPHY_PARAM_LIMIT}&offset=${offset}&lang=${GIPHY_PARAM_LANG}`;
  let result, json;

  try {
    LOG('Fetching data');
    result = await fetch(endpoint);
    json = await result.json();
    LOG('Data fetched successfully!');
  } catch (e) {
    LOG('Error fetching data');
  }

  return json;
};

function GiphyAppScreen({ route, navigation }) {
  const { theme } = useTheme();
  let [fontsLoaded] = useFonts({
    Roboto_900: require('../assets/fonts/Roboto/Roboto-Black.ttf'),
  });

  const [searchQuery, setSearchQuery] = useState();
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(initialPagination);
  const [
    isNewRequestDataUnprocessed,
    setIsNewRequestDataUnprocessed,
  ] = useState(true);

  useEffect(() => {
    if (!isNewRequestDataUnprocessed) return;

    let fetchData = async (pag) => {
      let json = await searchGif(searchQuery, pag.offset);
      let data = json.data;
      let pagination = json.pagination;
      setIsNewRequestDataUnprocessed(false);
      if (data && data.length) setGifs([...gifs, ...data]);
      if (pagination) setPagination(pagination);
      if (isLoading) setIsLoading(false);
    };
    fetchData(pagination);
  }, [isNewRequestDataUnprocessed, pagination]);

  let onEndReached = function () {
    if (isNewRequestDataUnprocessed) return;

    LOG('End of list reached');
    let { count, offset, total_count } = pagination;
    let totalRendered = count + offset;
    let remainingElements = total_count - totalRendered;

    if (total_count <= 0) {
      LOG('API returned total_count 0, end of results');
      return;
    }

    offset += count;
    count =
      remainingElements > GIPHY_PARAM_LIMIT
        ? GIPHY_PARAM_LIMIT
        : remainingElements;

    if (count <= 0) {
      LOG('No more remaining elements!');
      return;
    } else {
      LOG(`${remainingElements} remaining elements, loading another ${count}`);
    }

    setPagination({ ...pagination, offset, count });
    setIsNewRequestDataUnprocessed(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      backgroundColor: theme.background,
    },
  });

  if (!fontsLoaded || isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator
          size="large"
          color={theme.isLight ? theme.primary : theme.secondary}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderWrapper
        title="Giphy App"
        onMenuPress={() => navigation.openDrawer()}
      >
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              padding: 5,
              paddingBottom: 0,
            }}
          >
            <Searchbar
              placeholder="Search GIF"
              onChangeText={(query) => setSearchQuery(query)}
              onSubmitEditing={() => {
                setPagination(initialPagination);
                setGifs([]);
                setIsNewRequestDataUnprocessed(true);
                setIsLoading(true);
              }}
              value={searchQuery}
              style={{
                backgroundColor: theme.surface,
                color: theme.onSurface,
              }}
              inputStyle={{
                color: theme.onSurface,
              }}
              iconColor={theme.onSurface}
              theme={{ colors: { placeholder: theme.onSurface } }}
            ></Searchbar>
          </View>
          <View
            style={{
              flex: 9,
            }}
          >
            <FlatList
              data={gifs}
              renderItem={mapGifs}
              keyExtractor={(item) => item.id}
              numColumns={2}
              onEndReached={onEndReached}
              style={{ width: '100%', flex: 1 }}
            />
          </View>
        </View>
      </HeaderWrapper>
    </View>
  );
}

function mapGifs({ item }) {
  let width, height, src;

  width = parseInt(item.images.fixed_width.width, 10);
  height = parseInt(item.images.fixed_width.height, 10);
  src = item.images.fixed_width.url;

  return (
    <View
      style={{
        paddingLeft: 5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* <Video
        source={{
          uri: item.images.fixed_width.mp4,
        }}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{
          width: parseInt(item.images.fixed_width.width, 10),
          height: parseInt(item.images.fixed_width.height, 10),
        }}
      ></Video> */}
      <Image
        style={{
          width,
          height,
          resizeMode: 'contain',
        }}
        source={{
          uri: src,
        }}
      ></Image>
    </View>
  );
}

const LOG = function (message) {
  if (typeof message === 'string') console.log(`Giphy App => ${message}`);
  else console.log(`Giphy App =>`, message);
};

export default GiphyAppScreen;
