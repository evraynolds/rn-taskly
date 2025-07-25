import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
//https://icons.expo.fyi/Index/AntDesign/closecircleo
import AntDesign from "@expo/vector-icons/AntDesign";
// import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from "../theme";
import React from "react";

type Props = {
  name: string;
  isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}`,
      "It will be gone for good!",
      [
        {
          text: "Yes",
          onPress: () => console.log("OK, delete"),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };
  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {/* {" "}
        {PixelRatio.get()} */}
        {name}
      </Text>
      <TouchableOpacity hitSlop={20} onPress={handleDelete} activeOpacity={0.8}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorRed : theme.colorRed}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulian,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  itemText: { fontSize: 18, fontWeight: "200" },
  completedText: {
    textDecorationLine: "line-through",
    borderBottomColor: theme.colorGrey,
  },
});
