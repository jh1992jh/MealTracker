import React from "react";
import {
  View,
  ScrollView,
  Image,
  FlatList,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { cancelScheduledMeal } from "../actions/mealActions";

import CustomHeaderButton from "../components/headerButton/HeaderButton";
import CustomButtonIcon from "../components/customButtons/CustomButtonIcon";

const ScheduledMealScreen = props => {
  const dispatch = useDispatch();
  const meal = props.navigation.getParam("meal");
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
          iconName="bell-off"
          iconSize={23}
          iconColor="white"
          btnText="Unschedule"
          styles={{ width: "80%" }}
          onPress={() => {
            dispatch(cancelScheduledMeal(meal.notificationId));
            props.navigation.navigate("ScheduledMeals");
          }}
        />
      </View>
    </ScrollView>
  );
};

ScheduledMealScreen.navigationOptions = navData => {
  const toggleFavorite = navData.navigation.getParam("toggleFavorite");
  const isFavorite = navData.navigation.getParam("isFavorite");
  return {
    headerTitle: navData.navigation.getParam("meal").strMeal,
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

export default ScheduledMealScreen;
