import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getSingleMeal } from "../../actions/mealActions";

const MealItem = props => {
  const dispatch = useDispatch();

  const isFavorite = useSelector(state =>
    state.meals.favorites.some(
      favorite => favorite.idMeal === props.meal.idMeal
    )
  );

  const selectMeal = async () => {
    await dispatch(getSingleMeal(props.meal.idMeal));
    props.navigation.navigate("singleMeal", {
      mealTitle: props.meal.strMeal,
      isFavorite,
      idMeal: props.meal.idMeal,
      fromFavorites: props.fromFavorites
    });
  };

  return (
    <TouchableOpacity style={styles.mealItem} onPress={selectMeal}>
      <Image
        style={styles.mealImage}
        source={{ uri: props.meal.strMealThumb }}
      />
      <View style={styles.mealPreview}>
        <Text style={styles.previewText}>{props.meal.strMeal}</Text>
        <Text style={styles.previewText}>{props.meal.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    paddingLeft: 0,
    marginVertical: 10,
    borderColor: "#37ccc9",
    borderBottomWidth: 2,
    width: "90%",
    alignSelf: "center",
    alignItems: "flex-start"
  },
  mealImage: {
    width: 100,
    height: 100,
    marginHorizontal: 10
  },
  mealPreview: {
    flex: 1,
    justifyContent: "center"
  },
  previewText: {
    margin: 10,
    fontFamily: "raleway-medium"
  }
});

export default MealItem;
