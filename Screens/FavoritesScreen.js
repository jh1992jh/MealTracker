import React from "react";
import { View, ScrollView, FlatList, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import MealItem from "../components/mealItem/MealItem";

const FavoritesScreen = props => {
  const favorites = useSelector(state => state.meals.favorites);

  return (
    <View style={styles.container}>
      <Text style={styles.boldLightHeadline}>Favorites</Text>
      {favorites.length > 0 ? (
        <ScrollView>
          <FlatList
            style={styles.favoritesList}
            data={favorites}
            keyExtractor={item => item.idMeal}
            renderItem={itemData => {
              return (
                <MealItem
                  meal={itemData.item}
                  navigation={props.navigation}
                  fromFavorites={true}
                />
              );
            }}
          />
        </ScrollView>
      ) : (
        <View style={styles.noFavorites}>
          <Text>You haven't favorited any meals yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%"
  },
  boldLightHeadline: {
    color: "#37ccc9",
    fontFamily: "poppins-medium",
    fontSize: 28,
    marginHorizontal: 10,
    marginBottom: 30,
    marginTop: 45
  },
  favoritesList: {
    flex: 1
  },
  noFavorites: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

FavoritesScreen.navigationOptions = {
  headerTitle: "Favorites",
  drawerIcon: () => <Feather name="list" size={23} color="#37ccc9" />
};

export default FavoritesScreen;
