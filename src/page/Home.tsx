import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ReactNavigationScreenProps } from "../typing/ReactNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";

interface HomeScreenProps extends ReactNavigationScreenProps {}

export function HomePage({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <TouchableOpacity
        style={styles.touchableHighlights}
        onPress={() => navigation.navigate("Details")}
      >
        <Text style={styles.text}>Go to Details</Text>
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
    height: 30,
  },
  text: {
    fontSize: 14,
    color: "#00b2ca",
  },
});
