import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tab from "./Tab";

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="Detail" />
      <Stack.Screen name="Login" />
    </Stack.Navigator>
  );
};
