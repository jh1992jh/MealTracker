import {
  GET_MEALS,
  GET_SINGLE_MEAL,
  RESET_MEAL_SEARCH,
  FAVORITE_A_MEAL,
  GET_FAVORITES,
  SCHEDULE_MEAL,
  GET_SCHEDULED_MEALS,
  CANCEL_SCHEDULED_MEAL
} from "../actions/types";

const initialState = {
  meals: [],
  favorites: [],
  scheduledMeals: [],
  singleMeal: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload
      };
    case GET_SINGLE_MEAL:
      const currentMeal = state.meals.find(
        meal => meal.idMeal === action.payload
      );

      return {
        ...state,
        singleMeal: currentMeal
      };
    case RESET_MEAL_SEARCH:
      return {
        ...state,
        meals: []
      };
    case FAVORITE_A_MEAL:
      const isFavorite = state.favorites.some(
        favorite => favorite.idMeal === action.payload.idMeal
      );
      if (isFavorite) {
        return {
          ...state,
          favorites: state.favorites.filter(
            meal => meal.idMeal !== action.payload.idMeal
          )
        };
      } else {
        return {
          ...state,
          favorites: state.favorites.concat(action.payload)
        };
      }
    case GET_FAVORITES:
      const favorites = action.payload;
      //console.log(favorites);
      const transformedFavorites = favorites.map((favorite, i) => {
        const ingredientsArr = favorites[i].strIngredients.split(", ");
        const amountsArr = favorites[i].strAmounts.split(", ");

        delete favorites[i].strIngredients;
        delete favorites[i].strAmounts;

        const newFavorite = { ...favorite };

        ingredientsArr.forEach((ingredient, i) => {
          newFavorite[`strIngredient${i}`] = ingredient;
        });

        amountsArr.forEach((amount, i) => {
          newFavorite[`strMeasure${i}`] = amount;
        });

        return newFavorite;
      });
      return {
        ...state,
        favorites: transformedFavorites
      };
    case SCHEDULE_MEAL:
      return {
        ...state,
        scheduledMeals: state.scheduledMeals.concat(action.payload)
      };
    case GET_SCHEDULED_MEALS:
      const scheduledMeals = action.payload;

      const transformedScheduledMeals = scheduledMeals.map(
        (scheduledMeal, i) => {
          const ingredientsArr = scheduledMeals[i].strIngredients.split(", ");
          const amountsArr = scheduledMeals[i].strAmounts.split(", ");

          delete scheduledMeals[i].strIngredients;
          delete scheduledMeals[i].strAmounts;

          const newScheduledMeal = { ...scheduledMeal };

          ingredientsArr.forEach((ingredient, i) => {
            newScheduledMeal[`strIngredient${i}`] = ingredient;
          });

          amountsArr.forEach((amount, i) => {
            newScheduledMeal[`strMeasure${i}`] = amount;
          });

          return newScheduledMeal;
        }
      );

      return {
        ...state,
        scheduledMeals: transformedScheduledMeals
      };
    case CANCEL_SCHEDULED_MEAL:
      return {
        ...state,
        scheduledMeals: state.scheduledMeals.filter(
          meal => meal.notificationId !== action.payload
        )
      };
    default:
      return state;
  }
};
