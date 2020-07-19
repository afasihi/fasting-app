/** @format */

import { createAppContainer, createStackNavigator } from "react-navigation";
import { HomeScreen, FastsScreen, FastDetailsScreen } from "screens";

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  FastsScreen: { screen: FastsScreen },
  FastDetails: { screen: FastDetailsScreen }
});

export default createAppContainer(AppNavigator);
