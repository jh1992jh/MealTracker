import { Notifications } from "expo";
import {
  GET_MEALS,
  GET_SINGLE_MEAL,
  RESET_MEAL_SEARCH,
  FAVORITE_A_MEAL,
  GET_FAVORITES,
  SCHEDULE_MEAL,
  GET_SCHEDULED_MEALS,
  CANCEL_SCHEDULED_MEAL
} from "./types";
import { processMeal } from "../helpers/processMeal";
import {
  insertFavorite,
  fetchFavorites,
  deleteFavorite,
  scheduleAMeal,
  fetchScheduledMeals,
  insertScheduledMeal,
  deleteScheduledMeal
} from "../helpers/db";

export const getMeals = searchTerm => {
  return async dispatch => {
    try {
      const meals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm.toLowerCase()}`
      );
      const mealData = await meals.json();

      dispatch({
        type: GET_MEALS,
        payload: mealData.meals
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getSingleMeal = mealId => {
  return dispatch => dispatch({ type: GET_SINGLE_MEAL, payload: mealId });
};

export const resetMealSearch = () => {
  return dispatch => dispatch({ type: RESET_MEAL_SEARCH });
};

export const favoriteAMeal = meal => {
  const processedMeal = processMeal(meal);
  return async (dispatch, getState) => {
    const favorites = getState().meals.favorites;
    const isFavorite = favorites.find(
      favorite => favorite.idMeal === meal.idMeal
    );
    try {
      if (isFavorite) {
        await deleteFavorite(meal.idMeal);
      } else {
        await insertFavorite(processedMeal);
      }

      dispatch({ type: FAVORITE_A_MEAL, payload: meal });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getFavorites = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchFavorites();

      dispatch({ type: GET_FAVORITES, payload: dbResult.rows._array });
    } catch (err) {
      console.log(err);
    }
  };
};

export const scheduleMeal = meal => {
  const processedMeal = processMeal(meal);

  return async dispatch => {
    try {
      const result = await insertScheduledMeal(processedMeal);

      dispatch({ type: SCHEDULE_MEAL, payload: meal });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getScheduledMeals = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchScheduledMeals();

      dispatch({ type: GET_SCHEDULED_MEALS, payload: dbResult.rows._array });
    } catch (err) {
      console.log(err);
    }
  };
};

export const cancelScheduledMeal = notificationId => {
  return async dispatch => {
    try {
      await Notifications.cancelScheduledNotificationAsync(
        Number(notificationId)
      );
      await deleteScheduledMeal(notificationId);

      dispatch({ type: CANCEL_SCHEDULED_MEAL, payload: notificationId });
    } catch (err) {
      console.log(err);
    }
  };
};
