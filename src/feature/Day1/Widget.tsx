import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from "react-native";

export function Widget() {
  return (
    <TouchableHighlight style={styles.widget} onPress={onWidgetPressed}>
      <Image
        style={styles.tinyLogo}
        source={require("../../../assets/react.png")}
      />
    </TouchableHighlight>
  );
}

const onWidgetPressed = () => {
  Alert.alert("Draggable Widget", "Please drag me, do not press me.", [
    {
      text: "OK",
    },
  ]);
};

const styles = StyleSheet.create({
  widget: {
    width: 80,
    height: 80,
    backgroundColor: "#000000",
    borderRadius: 40,
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
});
