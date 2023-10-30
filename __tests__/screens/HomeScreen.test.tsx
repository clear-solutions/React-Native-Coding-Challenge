import React from "react";
import "react-native";
import { setupMockStore } from "../../__mock__/store.mock";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";
import HomeScreen from "../../screens/HomeScreen";
import MOCK_DATA from "../../__mock__/data.mock";
import { NavigationContainer } from "@react-navigation/native";

const generateHomeScreen = (store: any) => (
  <Provider store={store}>
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  </Provider>
);

describe("Testing of the HomeScreen", () => {
  describe("Test cases for EmptyListScreen", () => {
    const state = {
      todoList: MOCK_DATA.getTodoListData(),
      layout: MOCK_DATA.defautLayoutData,
    };
    const store = setupMockStore(state);
    const component = generateHomeScreen(store);

    it("Displays informative texts as expected", () => {
      const { getByText } = render(component);
      expect(getByText("Seems like")).toBeTruthy();
      expect(getByText("you have no todo")).toBeTruthy();
    });
    it("Displays appropriate image for empty list", () => {
      const { getByTestId } = render(component);
      expect(getByTestId("empty-list-image")).toBeTruthy();
    });
  });

  it("Displays loading screen when status is pending", () => {
    const state = {
      todoList: MOCK_DATA.getTodoListData({ status: "pending" }),
      layout: MOCK_DATA.defautLayoutData,
    };
    const store = setupMockStore(state);
    const component = generateHomeScreen(store);
    const { getByText } = render(component);

    expect(getByText("LOADING")).toBeTruthy();
  });

  describe("Test cases for ErrorScreen", () => {
    const state = {
      todoList: MOCK_DATA.getTodoListData({
        error: "Testing error",
      }),
      layout: MOCK_DATA.defautLayoutData,
    };

    const store = setupMockStore(state);
    const component = generateHomeScreen(store);

    it("Displays informative texts as expected", () => {
      const { getByText } = render(component);
      expect(getByText("Oops! Seems like there is an issue")).toBeTruthy;
    });
    it("Displays appropriate image for error screen", () => {
      const { getByTestId } = render(component);
      expect(getByTestId("error-image")).toBeTruthy;
    });
  });

});
