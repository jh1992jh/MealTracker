import React from "react";
import {
  ScrollView,
  FlatList,
  View,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
import { useSelector } from "react-redux";

import ScheduledMealItem from "../components/scheduledMealItem/ScheduledMealItem";

const ScheduledMealsScreen = props => {
  const scheduledMeals = useSelector(state => state.meals.scheduledMeals);

  return (
    <View style={styles.container}>
      <Text style={styles.boldLightHeadline}>Scheduled Meals</Text>

      {scheduledMeals.length > 0 ? (
        <ScrollView>
          <FlatList
            style={styles.scheduledMealsList}
            data={scheduledMeals}
            keyExtractor={scheduledMeal => scheduledMeal.notificationId}
            renderItem={itemData => (
              <ScheduledMealItem
                meal={itemData.item}
                navigation={props.navigation}
                fromFavorites={false}
              />
            )}
          />
        </ScrollView>
      ) : (
        <View style={styles.noScheduledMeals}>
          <Text>You have no scheduled meals</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    justifyContent: "center"
  },
  boldLightHeadline: {
    color: "#37ccc9",
    fontFamily: "poppins-medium",
    fontSize: 28,
    marginHorizontal: 10,
    marginBottom: 30,
    marginTop: 45
  },
  scheduledMealsList: {
    flex: 1
  },
  noScheduledMeals: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ScheduledMealsScreen;
