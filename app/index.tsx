import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  LayoutAnimation,
} from "react-native";
import * as Haptics from "expo-haptics";

// For more animation, you can use animated (react-native), or reanimated lib
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { getFromStorage, saveToStorage } from "../utils/storage";

const storageKey = "shopping-list";

export type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  useEffect(() => {
    async function fetchInitial() {
      const data = await getFromStorage(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setShoppingList(data);
      }
    }
    fetchInitial();
  }, []);

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toTimeString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage(storageKey, shoppingList);
      setValue("");
    }
  };

  const handleDelete = (id: string) => {
    console.log("ID: ", id);
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        if (item.completedAtTimestamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      } else {
        return item;
      }
    });
    saveToStorage(storageKey, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      stickyHeaderIndices={[0]}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          placeholder="E.g. Coffee"
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({ item }) => {
        return (
          <ShoppingListItem
            name={item?.name}
            onDelete={() => handleDelete(item?.id)}
            onToggleComplete={() => handleToggleComplete(item?.id)}
            isCompleted={Boolean(item?.completedAtTimestamp)}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  contentContainer: {
    paddingTop: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    // backgroundColor:
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
