import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

/**
 * Routes and Parameters
 */
export type RootStackParamList = {
  Home: undefined;
  BlankPage: undefined;
  Day1: undefined;
  // Feed: { sort: "latest" | "top" } | undefined;
};

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList
>;

export type ReactNavigationScreenProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
