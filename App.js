import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  return isLogged ? <Main></Main> : 
};

export default App;
