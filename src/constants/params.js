import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default {
  rem: height / 720
};
