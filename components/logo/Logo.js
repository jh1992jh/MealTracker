import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.topLevel}>
        <View style={styles.circle} />
        <View style={styles.line} />
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={100}
          color="#37ccc9"
          style={styles.icon}
        />
        <View style={styles.line} />
        <View style={styles.circle} />
      </View>
      <View style={styles.bottomLevel}>
        <Text style={styles.logoText}>MealTrack</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: "100%",
    height: "50%",
    paddingHorizontal: 20,
    marginBottom: 40,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#ccc"
  },
  logoText: {
    fontSize: 50,
    marginHorizontal: 20,
    fontFamily: "raleway-medium",
    color: "#ccc",
    borderColor: "#37ccc9",
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  topLevel: {
    height: "60%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  bottomLevel: {
    alignItems: "center"
  },
  circle: {
    backgroundColor: "#37ccc9",
    height: 15,
    width: 15,
    borderRadius: 7.5
  },
  line: {
    backgroundColor: "#37ccc9",
    height: 15,
    width: 40,
    borderRadius: 7.5
  }
});

export default Logo;
