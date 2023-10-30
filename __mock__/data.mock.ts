import FILTERS from "../constants/Filters";

let defaultTodoListState = {
    ongoingTasks: [],
    selectedOngoing: [],
    selectedCompleted: [],
    completedTasks: [],
    status: "idle",
    currentFilter: FILTERS.DATE,
    error: null,
    editingTodoIndex: null,
}

const MOCK_DATA = {
  getTodoListData: (mockState?:any) => {
    if(!mockState) return defaultTodoListState;
    let newState = {...defaultTodoListState};
    Object.keys(mockState).forEach(key => {newState[key] = mockState[key]})
    return newState;
  },
  defautLayoutData: {
    isAddModalOpen: false,
    isSelecting: false,
  },
};

export default MOCK_DATA;
