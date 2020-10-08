import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
} from 'react-native';
import { useFonts } from 'expo-font';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import HeaderWrapper from '../components/HeaderWrapper';
import { useTheme } from '../components/ThemeManager';

const initialState = [
  {
    id: 1,
    text: 'Read a book',
    isCompleted: true,
  },
  {
    id: 2,
    text: 'Take the trash out',
    isCompleted: false,
  },
];

const actionTypes = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  MARKCOMPLETE: 'MARKCOMPLETE',
};

const reducer = function (state, action) {
  LOG('Dispatch Action -> ' + action.type);

  let newState;
  switch (action.type) {
    case actionTypes.ADD:
      newState = [...state];
      let newItemId;
      if (state.length && state[state.length - 1].id)
        newItemId = state[state.length - 1].id + 1;
      else newItemId = 1;
      let newItem = { id: newItemId, text: action.value, isCompleted: false };
      newState.push(newItem);
      return newState;
    case actionTypes.REMOVE:
      newState = [...state];
      newState.splice(action.index, 1);
      return newState;
    case actionTypes.MARKCOMPLETE:
      newState = [...state];
      newState[action.index].isCompleted = action.value;
      return newState;
  }
};

export default function ToDoAppScreen({ route, navigation }) {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [newToDoValue, setNewToDoValue] = useState('New To Do');
  const { theme } = useTheme();

  const closeRow = function (rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = function (data, rowMap) {
    let itemId = data.item.id;
    let key = String(itemId);
    closeRow(rowMap, key);
    dispatch({
      type: 'REMOVE',
      index: todos.findIndex((item) => item.id == itemId),
    });
  };

  const markCompleteRow = function (data, rowMap) {
    let itemId = data.item.id;
    let key = String(itemId);
    closeRow(rowMap, key);
    dispatch({
      type: 'MARKCOMPLETE',
      index: todos.findIndex((item) => item.id == itemId),
      value: !data.item.isCompleted,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <HeaderWrapper
        title="To Do App"
        onMenuPress={() => navigation.openDrawer()}
      >
        <View style={styles.container}>
          <SwipeListView
            data={todos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => {
              return (
                <ToDoItem
                  item={item}
                  index={index}
                  isLast={todos.length - 1 === index}
                />
              );
            }}
            renderHiddenItem={(data, rowMap) => (
              <HiddenRow
                data={data}
                rowMap={rowMap}
                onDelete={() => deleteRow(data, rowMap)}
                onComplete={() => markCompleteRow(data, rowMap)}
              />
            )}
            // rightActivationValue={-Dimensions.get("window").width / 2}
            // onRightAction={(key, rowMap) => {
            //   deleteRow(key, rowMap);
            // }}
            leftOpenValue={100}
            rightOpenValue={-100}
          />
          <View
            style={{
              height: 55,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextInput
              style={{
                width: '60%',
                borderBottomWidth: 1,
                borderBottomColor: theme.onBackground,
                color: theme.onBackground,
                padding: 0,
                paddingLeft: 5,
                fontSize: 17,
                marginRight: 15,
              }}
              value={newToDoValue}
              onChangeText={(val) => setNewToDoValue(val)}
            />
            <Button
              mode="text"
              style={{
                backgroundColor: theme.secondary,
              }}
              color={theme.onSecondary}
              onPress={() => {
                dispatch({ type: 'ADD', value: newToDoValue });
                setNewToDoValue('');
              }}
            >
              Add
            </Button>
          </View>
        </View>
      </HeaderWrapper>
    </View>
  );
}

function ToDoItem(props) {
  const { item } = props;
  const { theme } = useTheme();
  const { isLast } = props;

  const styles = StyleSheet.create({
    todoItem: {
      backgroundColor: theme.surface,
      padding: 5,
      borderBottomWidth: !isLast ? 1 : 0,
      borderBottomColor: theme.isLight ? '#ddd' : '#ccc',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
    },
    todoText: {
      fontSize: 15,
      fontWeight: 'bold',
      fontStyle: 'italic',
      textDecorationLine: item.isCompleted ? 'line-through' : 'none',
      color: theme.onSurface,
    },
  });

  return (
    <Animated.View>
      <Pressable>
        <View
          style={{
            ...styles.todoItem,
            // backgroundColor: item.isCompleted ? '#cffaf7' : '#FFF',
          }}
        >
          <Text style={styles.todoText}>{item.text}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

function HiddenRow(props) {
  const { data, rowMap, onDelete, onComplete } = props;
  return (
    <View
      style={{
        height: 55,
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#2eabff',
        }}
      >
        <View
          style={{
            width: 100,
            height: '100%',
          }}
        >
          <Pressable
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onComplete}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14,
                padding: 5,
              }}
            >
              {data.item.isCompleted ? 'Uncomplete' : 'Complete'}
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center',
          backgroundColor: '#d6114c',
        }}
      >
        <View
          style={{
            width: 100,
            height: '100%',
          }}
        >
          <Pressable
            style={{
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onDelete}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 14,
                padding: 5,
              }}
            >
              {'Delete'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const LOG = function(message) {
  console.log(`To Do App => ${message}`)
}