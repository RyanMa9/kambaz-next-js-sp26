import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload }) => {
      state.quizzes = payload;
    },
    addQuiz: (state, { payload }) => {
      state.quizzes = [...state.quizzes, payload];
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === payload._id ? payload : q
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
