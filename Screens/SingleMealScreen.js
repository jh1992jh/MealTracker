import React, { useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { favoriteAMeal } from "../actions/mealActions";

import CustomHeaderButton from "../components/headerButton/HeaderButton";
import CustomButtonIcon from "../components/customButtons/CustomButtonIcon";

const SingleMealScreen = props => {
  const fromFavorites = props.navigation.getParam("fromFavorites");
  const mealId = props.navigation.getParam("idMeal");

  let meal;

  if (!fromFavorites) {
    meal = useSelector(state => state.meals.singleMeal);
  } else {
    meal = useSelector(state =>
      state.meals.favorites.find(meal => meal.idMeal === mealId)
    );
  }

  const isFavorite = useSelector(state =>
    state.meals.favorites.some(favorite => favorite.idMeal === mealId)
  );

  const dispatch = useDispatch();

  const toggleFavorite = useCallback(() => {
    if (isFavorite && !fromFavorites) {
      props.navigation.goBack();
    }

    if (isFavorite && fromFavorites) {
      props.navigation.navigate("Favorites");
    }
    dispatch(favoriteAMeal(meal));
  }, [meal]);

  useEffect(() => {
    props.navigation.setParams({ toggleFavorite });
  }, [toggleFavorite]);

  useEffect(() => {
    props.navigation.setParams({ isFavorite });
  }, [isFavorite]);

  let ingredientsAndAmounts;
  let ingredients;
  let amounts;
  let instructions;
  if (meal) {
    ingredients = [];
    amounts = [];
    instructions = [];

    for (const ingredient in meal) {
      if (ingredient.includes("strIngredient")) {
        meal[ingredient] !== null &&
          meal[ingredient].length > 1 &&
          ingredients.push(meal[ingredient]);
      }
    }

    for (const amount in meal) {
      if (amount.includes("strMeasure")) {
        meal[amount] !== null &&
          meal[amount].length > 0 &&
          amounts.push(meal[amount]);
      }
    }

    ingredientsAndAmounts = ingredients.map((ingredient, i) => {
      return `${ingredient} - ${amounts[i]}`;
    });

    const splitInstructions = meal.strInstructions.split("\r\n");
    const splitInsStr = splitInstructions.join(" ");
    const splitInsArr = splitInsStr.split(".");

    splitInsArr.forEach(
      instruction =>
        instruction.length > 1 && instructions.push(instruction.trim())
    );
  }

  return (
    <ScrollView style={styles.container}>
      {meal && (
        <>
          <Image style={styles.mealImage} source={{ uri: meal.strMealThumb }} />
          <Text style={styles.boldLightHeadline}>Ingredients</Text>
          <FlatList
            style={styles.mealDetailList}
            data={ingredientsAndAmounts}
            keyExtractor={(item, i) => i.toString()}
            renderItem={itemData => (
              <View style={styles.ingredient}>
                <Text style={styles.text}>{itemData.item}</Text>
              </View>
            )}
          />

          <Text style={styles.boldLightHeadline}>Instructions</Text>

          <FlatList
            data={instructions}
            style={styles.mealDetailList}
            keyExtractor={(item, i) => i.toString()}
            renderItem={itemData => (
              <View style={styles.instruction}>
                <Text style={styles.text}>{itemData.item}.</Text>
              </View>
            )}
          />
        </>
      )}
      <View style={styles.btnContainer}>
        <CustomButtonIcon
          iconName="calendar"
          iconSize={23}
          iconColor="white"
          btnText="Schedule Meal"
          styles={{ width: "80%" }}
          onPress={() => {
            props.navigation.navigate("scheduleMeal", { meal });
          }}
        />
      </View>
    </ScrollView>
  );
};

SingleMealScreen.navigationOptions = navData => {
  const toggleFavorite = navData.navigation.getParam("toggleFavorite");
  const isFavorite = navData.navigation.getParam("isFavorite");
  return {
    headerTitle: navData.navigation.getParam("mealTitle"),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "md-star" : "md-star-outline"}
          color="yellow"
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mealImage: {
    width: "100%",
    height: Dimensions.get("screen").width
  },
  boldLightHeadline: {
    color: "#ccc",
    fontFamily: "poppins-medium",
    fontSize: 28,
    marginHorizontal: 10,
    marginTop: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  mealDetailList: {
    marginVertical: 20,
    paddingHorizontal: 20
  },
  ingredient: {
    width: "100%",
    marginVertical: 5
  },
  instructions: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  instruction: {
    width: "100%",
    marginVertical: 5
  },
  text: {
    fontFamily: "raleway-medium"
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20
  }
});

export default SingleMealScreen;
