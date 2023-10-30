import { generateTasks } from "../../__mock__/tasks.mock";
import { render } from "@testing-library/react-native";
import LIST from "../../constants/List";
import MOCK_DATA from "../../__mock__/data.mock";
import { setupMockStore } from "../../__mock__/store.mock";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../screens/HomeScreen";

const generateHomeScreen = (store: any) => (
  <Provider store={store}>
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  </Provider>
);

const generateTestCasesForCertainList = (listType: LIST) => {
  const isOngoing = listType === LIST.ONGOING;

  return describe(`When only ${listType} tasks exists`, () => {
    describe("There are less than 9 tasks", () => {
      const data = generateTasks(7, listType);
      const state = isOngoing
        ? {
            todoList: MOCK_DATA.getTodoListData({ ongoingTasks: data }),
            layout: MOCK_DATA.defautLayoutData,
          }
        : {
            todoList: MOCK_DATA.getTodoListData({ completedTasks: data }),
            layout: MOCK_DATA.defautLayoutData,
          };

      const store = setupMockStore(state);
      const component = generateHomeScreen(store);

      it("All tasks are displayed", () => {
        const { getByText } = render(component);
        data.forEach((task) => {
          expect(getByText(task.title)).toBeTruthy();
        });
      });
      it("Navigation to all tasks button doesn't exist", () => {
        const { queryByTestId } = render(component);
        expect(queryByTestId("navigation-to-all")).toBeNull();
      });
      it(`Section for ${
        isOngoing ? LIST.FINISHED : LIST.ONGOING
      } tasks isn't displayed`, () => {
        const { queryByText } = render(component);
        expect(
          queryByText(`${isOngoing ? LIST.FINISHED : LIST.ONGOING}`)
        ).toBeFalsy();
      });
    });
    describe("There are more than 8 tasks", () => {
      const data = generateTasks(10, listType);
      const state = isOngoing
        ? {
            todoList: MOCK_DATA.getTodoListData({ ongoingTasks: data }),
            layout: MOCK_DATA.defautLayoutData,
          }
        : {
            todoList: MOCK_DATA.getTodoListData({ completedTasks: data }),
            layout: MOCK_DATA.defautLayoutData,
          };

      const store = setupMockStore(state);
      const component = generateHomeScreen(store);
      it("Only 8 items are visible", () => {
        const { queryByText } = render(component);
        data.forEach((task, index) => {
          if (index > 7) expect(queryByText(task.title)).toBeFalsy();
        });
      });
      it("Navigation to all tasks button exists", () => {
        const { queryByTestId } = render(component);
        expect(queryByTestId("navigation-to-all")).toBeTruthy();
      });
      it("The number of unvisible tasks is displayed correctly", () => {
        const { getByText } = render(component);
        expect(getByText(`${data.length - 8} MORE`)).toBeTruthy();
      });
      it(`Section for ${
        isOngoing ? LIST.FINISHED : LIST.ONGOING
      } tasks isn't displayed`, () => {
        const { queryByText } = render(component);
        expect(
          queryByText(`${isOngoing ? LIST.FINISHED : LIST.ONGOING}`)
        ).toBeFalsy();
      });
    });
  });
};

describe("Testing of the HomeScreen", () => {
  generateTestCasesForCertainList(LIST.ONGOING);
  generateTestCasesForCertainList(LIST.FINISHED);

  describe("Both lists have tasks", () => {
    const ongoingTasks = generateTasks(10, LIST.ONGOING);
    const completedTasks = generateTasks(5, LIST.FINISHED);
    const state = {
      todoList: MOCK_DATA.getTodoListData({ completedTasks, ongoingTasks }),
      layout: MOCK_DATA.defautLayoutData,
    };

    const store = setupMockStore(state);
    const component = generateHomeScreen(store);

    it("Tasks are seperately displayed", () => {
      const { getByText } = render(component);

      ongoingTasks.forEach((task, index) => {
        if (index < 4) expect(getByText(task.title)).toBeTruthy();
      });
      completedTasks.forEach((task,index) => {
        if (index < 4) expect(getByText(task.title)).toBeTruthy();
      });
    });
  });
});
