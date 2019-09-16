import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import { useDispatch } from "react-redux";
import { Notifications } from "expo";
import moment from "moment";

import DatePicker from "react-native-datepicker";
import CustomButtonIcon from "../components/customButtons/CustomButtonIcon";
import { scheduleMeal } from "../actions/mealActions";

const ScheduleMealScreen = props => {
  const [scheduledTime, setScheduledTime] = useState();
  const meal = props.navigation.getParam("meal");
  const currentTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm");
  const dispatch = useDispatch();

  const setCurrentTime = useCallback(() => {
    setScheduledTime(currentTime);
  }, []);

  useEffect(() => {
    setScheduledTime(currentTime);
  }, [setCurrentTime]);

  const addNotification = async () => {
    const convertedDate = moment(scheduledTime, "").format();
    console.log(new Date(convertedDate));
    console.log("Scheduled: " + scheduledTime);
    const localNotifi = {
      title: "Daily Meal",
      body: `Hey your daily meal is ${meal.strMeal}`,
      channelId: "pushChannel",

      name: "very cool",

      priority: "high",
      vibrate: true,
      android: {
        icon: meal.strMealThumb,
        color: "red"
      }
    };

    const notifi = await Notifications.scheduleLocalNotificationAsync(
      localNotifi,
      {
        time: new Date(convertedDate)
      }
    );

    const newConvertedDate = new Date(convertedDate);

    const scheduledMeal = {
      ...meal,
      scheduledDate: newConvertedDate.toString(),
      notificationId: notifi.toString()
    };

    Notifications.addListener(() => {
      props.navigation.navigate("ScheduledMeals");
    });

    dispatch(scheduleMeal(scheduledMeal));
    props.navigation.navigate("ScheduledMeals");
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.boldText}>{meal.strMeal}</Text>
        <View style={styles.mealImgContainer}>
          <Image style={styles.mealImg} source={{ uri: meal.strMealThumb }} />
        </View>
        <View style={styles.datePickerContainer}>
          <Text style={styles.boldTextSM}>Pick a time</Text>
          <DatePicker
            style={styles.datePicker}
            date={scheduledTime}
            // TRY new Date().toLocaleString()
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm"
            minDate={currentTime}
            maxDate="3016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              setScheduledTime(date);
            }}
            fontFamily="poppins-medium"
          />
        </View>
        <View style={styles.btnContainer}>
          <CustomButtonIcon
            iconName="clock"
            iconSize={23}
            iconColor="white"
            btnText="Schedule"
            styles={{ width: "80%" }}
            onPress={() => {
              addNotification();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

ScheduleMealScreen.navigationOptions = navData => {
  return {
    headerTitle: "Schedule Meal"
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  boldText: {
    fontWeight: "600",
    fontSize: 28,
    marginVertical: 28,
    fontFamily: "poppins-medium",
    borderBottomWidth: 1
  },
  boldTextSM: {
    fontWeight: "600",
    fontSize: 14,
    marginVertical: 14,
    fontFamily: "raleway-medium"
  },

  mealImgContainer: {
    width: Dimensions.get("screen").width / 0.9,
    height: Dimensions.get("screen").width / 0.9
  },
  mealImg: {
    width: "100%",
    height: "100%"
  },
  datePickerContainer: {
    width: "100%",
    paddingHorizontal: 10
  },
  datePicker: {
    width: "100%",
    marginVertical: 28
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20
  }
});

export default ScheduleMealScreen;
