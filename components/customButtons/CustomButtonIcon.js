import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const CustomButtonIcon = props => {
  return (
    <TouchableOpacity
      style={{ ...styles.customBtn, ...props.styles }}
      onPress={props.onPress}
    >
      <Feather
        name={props.iconName}
        size={props.iconSize}
        color={props.iconColor}
      />
      <Text style={styles.customBtnText}>{props.btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customBtn: {
    backgroundColor: "#37ccc9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "30%",
    marginHorizontal: 20,
    borderRadius: 5,
    elevation: 2
  },
  customBtnText: {
    marginHorizontal: 5,
    color: "white",
    fontFamily: "poppins-medium"
  }
});

export default CustomButtonIcon;
