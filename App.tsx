import { StatusBar } from "expo-status-bar";
import { theme } from "../taskly/theme";
import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "./components/ShoppingListItem";
export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name={"Coffee"} />
      <ShoppingListItem name={"Tea"} isCompleted />
      <ShoppingListItem name={"Chips"} isCompleted />
      <ShoppingListItem name={"Juice"} isCompleted />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
