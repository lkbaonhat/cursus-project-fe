import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./state";

const editorSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.Categories = action.payload;
    },
    //  SECTION
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    addSection: (state, action) => {
      state.sections.push(action.payload);
    },
    deleteSection: (state, action) => {
      state.sections = state.sections.filter(
        (item) => item._id !== action.payload
      );
    },

    addLecture: (state, action) => {
      state.lectures.push(action.payload);
    },
    deleteLecture: (state, action) => {
      state.lectures = state.lectures.filter((item) => item._id !== action.payload);
    },

    addQuiz: (state, action) => {
      state.quizes.push(action.payload);
    },
    deleteQuiz: (state, action) => {
      state.quizes = state.quizes.filter((item) => item._id !== action.payload);
    },
    
    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter((item) => item._id !== action.payload);
    },

    getQuizzes: (state, action) => {
      state.quiz = action.payload;
    },
    setLecture: (state, action) => {
      state.lecture = action.payload;
    },
    setQuizResult: (state, action) => {
      state.quizResult = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setMyCourse: (state, action) => {
      state.myCourse = action.payload;
    },
    clearState: (state) => {
      return {
        ...initialState,
        course: state.course,
      };
    },
  },
});

export const {
  setCourse,
  clearState,
  setQuizResult,
  setLecture,
  getCategories,
  setSections,
  addSection,
  deleteSection,
  addLecture,
  deleteLecture,
  addQuiz,
  deleteQuiz,
  addAssignment,
  deleteAssignment,
  getQuizzes,
  setMyCourse,
} = editorSlice.actions;
export default editorSlice.reducer;
