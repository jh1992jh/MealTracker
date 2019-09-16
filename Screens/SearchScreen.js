import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButtonIcon from "../components/customButtons/CustomButtonIcon";
import MealItem from "../components/mealItem/MealItem";
import { getMeals, resetMealSearch } from "../actions/mealActions";

const SearchScreen = props => {
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const meals = useSelector(state => state.meals.meals);

  const changeText = text => {
    if (meals === null) {
      dispatch(resetMealSearch());
    }

    setSearchInput(text);
  };

  const searchMeals = async () => {
    if (searchInput.length < 3) {
      return;
    }

    dispatch(getMeals(searchInput));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={changeText}
          placeholder="Search for a meal"
        />
        <CustomButtonIcon
          onPress={searchMeals}
          iconName="search"
          iconColor="white"
          iconSize={30}
          styles={{
            maxWidth: "20%",
            flex: 2,
            marginHorizontal: 0,
            borderRadius: 0,
            elevation: 0
          }}
        />
      </View>

      {meals === null ? (
        <Text style={styles.noMealsText}>
          No Meals found with the search term{" "}
          <Text style={styles.searchTerm}>{searchInput}</Text>
        </Text>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={meals}
            renderItem={itemData => (
              <MealItem
                meal={itemData.item}
                navigation={props.navigation}
                fromFavorites={false}
              />
            )}
            keyExtractor={item => item.idMeal}
          />
        </View>
      )}
    </View>
  );
};

SearchScreen.navigationOptions = {
  headerTitle: "Meal search"
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    width: "90%",
    borderColor: "#ccc",
    borderWidth: 1,
    alignSelf: "center"
  },
  input: {
    flex: 8,
    borderWidth: 1,
    paddingHorizontal: 5,
    fontFamily: "poppins-medium",
    borderColor: "#ccc"
  },
  noMealsText: {
    marginVertical: 10,
    fontFamily: "raleway-medium",
    alignSelf: "center"
  },
  searchTerm: {
    fontWeight: "bold",
    fontFamily: "raleway-medium"
  },
  mealList: {
    flex: 1,
    width: "100%"
  }
});

export default SearchScreen;
