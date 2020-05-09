import React from "react";
import {
  Image,
  TouchableHighlight,
  Alert,
  ImageSourcePropType,
} from "react-native";

interface WidgetProps {
  height: number;
  width: number;
  borderRadius: number;
  backgroundColor: string;
  image: ImageSourcePropType;
}

export const Widget = ({
  image,
  ...styleProps
}: WidgetProps) => {
  return (
    <TouchableHighlight
      style={[
        styleProps,
      ]}
      onPress={onWidgetPressed}
    >
      <Image
        style={{ width: styleProps.width, height: styleProps.height }}
        source={image}
      />
    </TouchableHighlight>
  );
};

const onWidgetPressed = () => {
  Alert.alert("Draggable Widget", "Please drag me, do not press me.", [
    {
      text: "OK",
    },
  ]);
};
