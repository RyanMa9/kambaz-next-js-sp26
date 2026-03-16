import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, action) => {
      const { userId, courseId } = action.payload;
      if (
        !state.enrollments.some(
          (e) => e.user === userId && e.course === courseId
        )
      ) {
        state.enrollments.push({
          user: userId,
          course: courseId,
          _id: crypto.randomUUID(),
        });
      }
    },
    unenroll: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
    clearEnrollments: (state) => {
      state.enrollments = [];
    },
  },
});

export const { setEnrollments, enroll, unenroll, clearEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
