import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const getTodos = () => {
  const todos = localStorage.getItem("todos");
  if (todos) return JSON.parse(todos);
  else return [];
};

const initialState = {
  todoList: getTodos(),
  isModalOpen: false,
  isUpdating: false,
  selectedTodo: {},
  filterBy: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    addTodo: (state, { payload }) => {
      state.todoList = [
        ...state.todoList,
        {
          title: payload.title,
          completed: payload.status == "incomplete" ? false : true,
          time: format(new Date(), "p, MM/dd/yyyy"),
          id: crypto.randomUUID(),
        },
      ];
      localStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    deleteTodo: (state, { payload }) => {
      state.todoList = state.todoList.filter((todo) => todo.id !== payload.id);
      localStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    updateStatus: (state, { payload }) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo.id == payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    setUpdatingTrue: (state) => {
      state.isUpdating = true;
    },
    setUpdatingFalse: (state) => {
      state.isUpdating = false;
      state.selectedTodo = {};
    },
    getTodo: (state, { payload }) => {
      state.selectedTodo = state.todoList.find(
        (todo) => todo.id === payload.id
      );
    },
    updateTitle: (state, { payload }) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo.id == payload.id) {
          return {
            ...todo,
            title: payload.title,
            completed: payload.status == "incomplete" ? false : true,
          };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(state.todoList));
    },
    setFilter: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

export const {
  showModal,
  closeModal,
  addTodo,
  deleteTodo,
  updateStatus,
  isUpdating,
  getTodo,
  setUpdatingTrue,
  setUpdatingFalse,
  updateTitle,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
