import React from "react";
import { View, Text, Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Feather } from "@expo/vector-icons";

import StartScreen from "../Screens/StartScreen";
import SearchScreen from "../Screens/SearchScreen";
import MyMealsScreen from "../Screens/MyMealsScreen";
import SingleMealScreen from "../Screens/SingleMealScreen";
import FavoritesScreen from "../Screens/FavoritesScreen";
import ScheduleMealScreen from "../Screens/ScheduleMealScreen";
import ScheduledMealsScreen from "../Screens/ScheduledMealsScreen";
import ScheduledMealScreen from "../Screens/ScheduledMealScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "#37ccc9" : "white"
  },
  headerTitleStyle: {
    fontFamily: "poppins-medium"
  },
  headerBackTitleStyle: {
    fontFamily: "poppins-medium"
  },
  headerTintColor: Platform.OS === "android" ? "white" : "#37ccc9"
};

const MealNavigator = createStackNavigator(
  {
    home: StartScreen,
    search: SearchScreen,
    myMeals: MyMealsScreen,
    singleMeal: SingleMealScreen,
    scheduleMeal: ScheduleMealScreen,
    scheduledMeal: ScheduledMealScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MealNavigator,
    navigationOptions: {
      drawerIcon: () => <Feather name="home" size={23} color="#37ccc9" />
    }
  },
  Favorites: {
    screen: FavoritesScreen
  },
  ScheduledMeals: {
    screen: ScheduledMealsScreen,
    navigationOptions: {
      drawerIcon: () => <Feather name="calendar" size={23} color="#36ccc9" />,
      drawerLabel: "Scheduled Meals"
    }
  }
});

const MainNavigator = createSwitchNavigator(
  {
    Favorites: DrawerNavigator
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontFamily: "raleway-medium"
      },
      headerTintColor: "red"
    }
  }
);

export default createAppContainer(MainNavigator);
