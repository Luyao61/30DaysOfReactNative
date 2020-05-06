import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { colorPalette, getContrastColor } from "../data/mockData/Color";

export interface AppIconProps {
  id: string;
  name: string;
  color?: string;
}
export function AppIcon({ name, color }: AppIconProps) {
  const [iconColor, textColor] = React.useMemo(() => {
    const iconColor = color || colorPalette();
    const textColor = getContrastColor(iconColor);
    return [iconColor, textColor];
  }, [color]);

  return (
    <TouchableHighlight
      style={[styles.IconContainer, { backgroundColor: iconColor }]}
    >
      <Text style={{ color: textColor }}>{name}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
