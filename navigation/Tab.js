import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Components/Home";
import Profile from "../Components/Profile";
import AboutUs from "../Components/AboutUs";
import Reward from "../Components/Reward";
import Icon from "react-native-vector-icons/Ionicons";
import Join from "../Components/Join";

const Tab = createBottomTabNavigator();

export default ({ user, loggedIn }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Reward") {
            iconName = focused ? "ice-cream" : "ice-cream-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else {
            iconName = focused ? "business" : "business-outline";
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "lightblue",
        inactiveTintColor: "gray",
      }}
    >

      <Tab.Screen name="Home">
        {() => <Home user={user} loggedIn={loggedIn} />}
      </Tab.Screen>
      <Tab.Screen name="Reward">{() => <Reward />}</Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <Profile user={user} loggedIn={loggedIn} />}
      </Tab.Screen>
      <Tab.Screen name="AboutUs">{() => <AboutUs />}</Tab.Screen>
    </Tab.Navigator>
  );
};
