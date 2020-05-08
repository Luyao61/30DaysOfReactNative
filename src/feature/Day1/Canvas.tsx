import React from "react";
import {
  Draggable,
  calculatePresetCoordinates,
  coordinates,
} from "./Draggable";
import { Widget } from "./Widget";
import { Text, View, Dimensions } from "react-native";
import { ReactNavigationScreenProps } from "../../typing/ReactNavigation";
import { SafeAreaView, useSafeArea } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Day1Props extends ReactNavigationScreenProps {}
export function Day1({ navigation }: Day1Props) {
  const inserts = useSafeArea();

  const componentHeight = 80;
  const componentWidth = 80;
  const horizontalMarginFromEdge = 20;
  const verticalMarginFromEdge = 20;
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const presetCoordinates = React.useMemo(() => {
    return calculatePresetCoordinates(
      inserts,
      componentWidth,
      componentHeight,
      screenWidth,
      screenHeight,
      horizontalMarginFromEdge,
      verticalMarginFromEdge
    );
  }, [
    screenWidth,
    screenHeight,
    componentHeight,
    componentWidth,
    horizontalMarginFromEdge,
    verticalMarginFromEdge,
    inserts,
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Drag your component on this canvas</Text>
      <Draggable
        positionX={inserts.left + (inserts.right - inserts.left) / 2}
        positionY={inserts.top + (inserts.bottom - inserts.top) / 2}
        componentHeight={componentHeight}
        componentWidth={componentWidth}
        horizontalMarginFromEdge={horizontalMarginFromEdge}
        verticalMarginFromEdge={verticalMarginFromEdge}
      >
        <Widget
          positionX={inserts.left + (inserts.right - inserts.left) / 2}
          positionY={inserts.top + (inserts.bottom - inserts.top) / 2}
          height={componentHeight}
          width={componentWidth}
          backgroundColor={"black"}
          borderRadius={40}
          image={require("../../../assets/react.png")}
        />
      </Draggable>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Text style={{ color: "#00b2ca" }}>Go Back</Text>
      </TouchableOpacity>
      {canvasDebug(presetCoordinates)}
    </SafeAreaView>
  );
}

function canvasDebug(coordinates: coordinates) {
  const c = [
    coordinates.left,
    coordinates.right,
    coordinates.bottom,
    coordinates.mid,
    coordinates.top,
  ];
  return Array.from({ length: 20 }, (x, i) => i).map((index) => {
    return (
      <View
        style={{
          position: "absolute",
          width: 10,
          height: 10,
          borderRadius: 5,
          top: c[(index % 3) + 2] - 5,
          left: c[index % 2] - 5,
          backgroundColor: "red",
        }}
      />
    );
  });
}
