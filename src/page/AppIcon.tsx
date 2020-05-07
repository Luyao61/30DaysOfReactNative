import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { colorPalette, getContrastColor } from "../data/mockData/Color";
import { useNavigation } from "@react-navigation/native";

export interface AppIconProps {
  id: string;
  name: string;
  route: string;
  color?: string;
}

export function AppIcon({ name, color, route }: AppIconProps) {
  const navigation = useNavigation();

  const [iconColor, textColor] = React.useMemo(() => {
    const iconColor = color || colorPalette();
    const textColor = getContrastColor(iconColor);
    return [iconColor, textColor];
  }, [color]);

  return (
    <TouchableHighlight
      activeOpacity={0.1}
      underlayColor="white"
      style={[styles.IconContainer, { backgroundColor: iconColor }]}
      onPress={() => navigation.navigate(route)}
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
