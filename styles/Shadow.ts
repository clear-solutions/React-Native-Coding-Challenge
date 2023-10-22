import { StyleSheet } from "react-native";

const Shadow = StyleSheet.create({
  box: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
  },
  top: {
    shadowColor: "black",
    shadowOffset: { width: 5, height: -4 },
    shadowOpacity: 0.1,
  }
});

export default Shadow;