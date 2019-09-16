import React from "react";
import { useDispatch } from "react-redux";

import { getFavorites, getScheduledMeals } from "./actions/mealActions";

import MealNavigator from "./navigation/mealNavigator";

const AppContainer = props => {
  const dispatch = useDispatch();

  dispatch(getFavorites());
  dispatch(getScheduledMeals());
  return <MealNavigator />;
};

export default AppContainer;
