import React, { useState } from "react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import store from "./store";

import AppContainer from "./AppContainer";

import { initFavorites, initScheduled } from "./helpers/db";

const fetchFonts = () => {
  return Font.loadAsync({
    "raleway-medium": require("./assets/fonts/Raleway-Medium.ttf"),
    "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf")
  });
};

initFavorites()
  .then(res => {
    console.log("Initialized Favorites");
  })
  .catch(err => {
    console.log("Initializing Favorites failed :(");
    console.log(err);
  });

initScheduled()
  .then(res => {
    console.log("Initialized Scheduled meals");
  })
  .catch(err => {
    console.log("Initializing Scheduled meals failed :(");
    console.log(err);
  });
export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setLoading(false);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
