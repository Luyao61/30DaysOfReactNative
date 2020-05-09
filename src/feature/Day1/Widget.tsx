import React from "react";
import {
  Image,
  TouchableHighlight,
  Alert,
  ImageSourcePropType,
} from "react-native";

interface WidgetProps {
  positionX: number;
  positionY: number;
  height: number;
  width: number;
  borderRadius: number;
  backgroundColor: string;
  image: ImageSourcePropType;
}

export const Widget = ({
  positionX,
  positionY,
  image,
  ...styleProps
}: WidgetProps) => {
  return (
    <TouchableHighlight
      style={[
        styleProps,
        // {
        //   position: "absolute",
        //   top: positionY - styleProps.height / 2,
        //   left: positionX - styleProps.width / 2,
        // },
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
