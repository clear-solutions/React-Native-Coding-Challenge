import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

export function setupMockStore(state: any) {
  const store = mockStore(state);
  return store;
}
