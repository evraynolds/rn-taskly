import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function CounterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Go to idea</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
});
