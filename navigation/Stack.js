import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tab from "./Tab";
import Detail from "../Components/Detail";
import Login from "../Components/Login";
import Join from "../Components/Join";

const Stack = createStackNavigator();

export default ({ user, loggedIn }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="D-Day 4" options={{ headerShown: false }}>
        {() => <Tab user={user} loggedIn={loggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Join" component={Join} />
    </Stack.Navigator>
  );
};
