import React from "react";
import { Draggable } from "./Draggable";
import { Widget } from "./Widget";
import { Text } from "react-native";
import { ReactNavigationScreenProps } from "../../typing/ReactNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

interface Day1Props extends ReactNavigationScreenProps {}
export function Day1({}: Day1Props) {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Drag your component on this canvas</Text>
      <Draggable>
        <Widget />
      </Draggable>
    </SafeAreaView>
  );
}
