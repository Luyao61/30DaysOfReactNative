import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ReactNavigationScreenProps } from "../typing/ReactNavigation";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DetailsScreenProps extends ReactNavigationScreenProps {}

export function DetailsPage({ navigation }: ReactNavigationScreenProps) {
  return (
    <View>
      <Text>More Details</Text>
      <TouchableOpacity
        style={styles.touchableHighlights}
        onPress={() => navigation.push("Details")}
      >
        <Text style={styles.text}>Go to Details again!</Text>
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
    // opacity: 0.3,
  },
  text: {
    fontSize: 14,
    color: "#00b2ca",
  },
});
