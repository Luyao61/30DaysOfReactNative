import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ReactNavigationScreenProps } from "../typing/ReactNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";

interface BlankPageProps extends ReactNavigationScreenProps {}

export function BlankPage({ navigation }: BlankPageProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableHighlights}
        onPress={() => navigation.push("BlankPage")}
      >
        <Text style={styles.text}>Coming soon!</Text>
        <Text style={styles.text}>This is a default page.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableHighlights: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "#00b2ca",
  },
});
