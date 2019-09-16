import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyMealsScreen = props => {
  return (
    <View>
      <Text>MyMeals</Text>
    </View>
  );
};

MyMealsScreen.navigationOptions = {
  headerTitle: "My Meals"
};

export default MyMealsScreen;
