import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ParametersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is parameters screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 38,
  },
});