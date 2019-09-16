import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";

const ScheduledMealItem = props => {
  const isFavorite = useSelector(state =>
    state.meals.favorites.some(
      favorite => favorite.idMeal === props.meal.idMeal
    )
  );

  const meal = props.meal;
  const selectMeal = async () => {
    props.navigation.navigate("scheduledMeal", {
      isFavorite,
      meal,
      idMeal: props.meal.idMeal,
      fromFavorites: props.fromFavorites
    });
  };

  return (
    <TouchableOpacity style={styles.mealItem} onPress={selectMeal}>
      <View style={styles.mealImageContainer}>
        <Image
          style={styles.mealImage}
          source={{ uri: props.meal.strMealThumb }}
        />
      </View>
      <View style={styles.mealPreview}>
        <Text style={styles.previewText}>{props.meal.strMeal}</Text>

        <Text style={styles.previewText}>{props.meal.strCategory}</Text>
        <Text style={styles.boldHeadline}>Scheduled</Text>
        <Text style={styles.previewText}>
          {moment(new Date(props.meal.scheduledDate)).format(
            "MMMM Do YYYY, h:mm"
          )}
        </Text>
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
    alignItems: "flex-start",

    height: Dimensions.get("window").height / 4
  },
  mealImageContainer: {
    width: 100,
    height: "100%",
    marginHorizontal: 10,
    justifyContent: "center"
  },
  mealImage: {
    flex: 1,
    maxHeight: 100
  },
  mealPreview: {
    flex: 1,
    justifyContent: "center",
    height: "100%"
  },
  previewText: {
    margin: 10,
    fontFamily: "raleway-medium"
  },
  boldHeadline: {
    fontWeight: "600",
    marginHorizontal: 10
  }
});

export default ScheduledMealItem;
