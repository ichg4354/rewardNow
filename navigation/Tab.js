import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Components/Home";

const Tab = createBottomTabNavigator();

export default ({ user, loggedIn }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        user={user}
        loggedIn={loggedIn}
      />
    </Tab.Navigator>
  );
};
