import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomButtonIcon from "../components/customButtons/CustomButtonIcon";
import CustomHeaderButton from "../components/headerButton/HeaderButton";
import Logo from "../components/logo/Logo";

const StartScreen = props => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.actionsContainer}>
        <CustomButtonIcon
          onPress={() => props.navigation.navigate("search")}
          iconSize={30}
          iconName="search"
          iconColor="white"
          btnText="Search"
          styles={{ width: "50%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});

StartScreen.navigationOptions = navData => {
  return {
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
          color={Platform.OS === "android" ? "white" : "#37ccc9"}
        />
      </HeaderButtons>
    )
  };
};

export default StartScreen;
