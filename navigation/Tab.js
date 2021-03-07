import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name=""/>
      {/* <Tab.Screen /> */}
    </Tab.Navigator>
  );
};
