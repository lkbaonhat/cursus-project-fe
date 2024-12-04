// store/slices/editorSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./state";
import { update } from "lodash";

const editorSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toogleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
    resetContent(state) {
      state.content = "";
    },
    setLengthCart(state, action: PayloadAction<any>) {
      state.length = action.payload;
    },
    addToCart(state, action: PayloadAction<any>) {
      state?.items?.push(action.payload);
      state.length = state?.items?.length;
    },
    setOrderId(state, action: PayloadAction<any>) {
      state.orderId = action.payload;
    },
    resetOrderId(state) {
      state.orderId = "";
    },
    setCourses(state, action: PayloadAction<any>) {
      state.setCourses = action.payload;
    },
    setNewestCourses(state, action: PayloadAction<any>) {
      state.setNewestCourses = action.payload;
    },
    setCategory(state, action: PayloadAction<any>) {
      state.setCategory = action.payload;
    },
    setListSections(state, action: PayloadAction<any>) {
      state.listSections = action.payload;
    },
    setCourseDetail(state, action: PayloadAction<any>) {
      state.courseDetail = action.payload;
    },
    setListInsDashboard(state, action: PayloadAction<any>) {
      state.AnalyticInsDashboard = action.payload
    },
    setPopularInstructors(state, action: PayloadAction<any>) {
      state.popularInstructors = action.payload;
    },
    setLimitReviews(state, action: PayloadAction<any>) {
      state.limitReviews = action.payload;
    },
    setReviewSummary(state, action: PayloadAction<any>) {
      state.reviewSummary = action.payload || {
        totalReviews: 0,
        averageRating: 0,
        ratingCounts: [0, 0, 0, 0, 0],
        ratingPercentages: [0, 0, 0, 0, 0],
      };
    },
    setFilteredReviews(state, action: PayloadAction<any[]>) {
      state.filteredReviews = action.payload || [];
    },
    setReviewsLoading(state, action: PayloadAction<boolean>) {
      state.isReviewsLoading = action.payload;
    },
    setSubcategories(state, action: PayloadAction<any>) {
      const { categoryId, subcategories } = action.payload;
      if (state.setCategory && Array.isArray(state.setCategory)) {
        const categoryIndex = state.setCategory.findIndex(cat => cat._id === categoryId);
        if (categoryIndex !== -1) {
          state.setCategory[categoryIndex].subcategories = [
            ...(state.setCategory[categoryIndex].subcategories || []),
            ...subcategories,
          ];
        }
      }
    },
    addCategory(state, action: PayloadAction<any>) {
      state.setCategory = [...(state.setCategory || []), action.payload];
    },
    setCategories(state, action: PayloadAction<MODEL.CATEGORY[]>) {
      state.setCategory = action.payload;
    },
    updateCategory(state, action: PayloadAction<MODEL.CATEGORY>) {
      const { _id, name, subcategories } = action.payload;
      if (!state.setCategory) {
        state.setCategory = [];
      }
      const index = state.setCategory.findIndex(cat => cat._id === _id);
      if (index !== -1) {
        state.setCategory[index] = {
          ...state.setCategory[index],
          name,
          subcategories,
        };
      }
    },
    setUsers(state, action: PayloadAction<MODEL.USER[]>) {
      state.users = action.payload;
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    setCoursesManage(state, action: PayloadAction<ICourse.Course[]>) {
      state.courses = action.payload;
    },
    setPendingCourses(state, action: PayloadAction<ICourse.Course[]>) {
      state.pendingCourses = action.payload;
    },
    setMonthlyUserCounts(state, action: PayloadAction<number[]>) {
      state.monthlyUserCounts = action.payload;
    },
    setRevenueData(state, action: PayloadAction<number[]>) {
      state.revenueData = action.payload;
    },
    setWeeklyRevenueData(state, action: PayloadAction<number[]>) {
      state.weeklyRevenueData = action.payload;
    },
    setActiveUsersCount(state, action: PayloadAction<number>) {
      state.activeUsersCount = action.payload;
    },
    setTotalReviewsCount(state, action: PayloadAction<number>) {
      state.totalReviewsCount = action.payload;
    },
    setPendingUsers(state, action: PayloadAction<MODEL.USER[]>) {
      state.pendingUsers = action.payload;
    },
    removePendingUser(state, action: PayloadAction<string>) {
      state.pendingUsers = state.pendingUsers.filter(user => user._id !== action.payload);
    },
    setCourseOfInstructor(state, action: PayloadAction<ICourse.Course[]>) {
      state.courseOfInstructor = action.payload
    },
    setCourseOfPurchase(state, action: PayloadAction<ICourse.Course[]>) {
      state.courseOfPurchased = action.payload
    },
    setUserInfo(state, action: PayloadAction<MODEL.USER>) {
      state.settingUser = action.payload
    },
    setProgressCourseOfUser: (state, action) => {
      state.progressCourseOfUser = action.payload;
    },
    setInstructorCourse(state, action: PayloadAction<IINSTRUCTOR.COURSES[]>) {
      state.instructorCourse = action.payload;
    },
    setInstructorPurchase(state, action: PayloadAction<IINSTRUCTOR.PURCHASES[]>) {
      state.instructorPurchase = action.payload;
    },
    setInstructorPendingCourse(state, action: PayloadAction<IINSTRUCTOR.COURSES[]>) {
      state.instructorPendingCourse = action.payload;
    },
    setSubscribeChannels(state, action: PayloadAction<any>) {
      state.setSubscribeChannels = action.payload;
    },
    setCompletionRate(state, action: PayloadAction<number>) {
      state.completionRate = action.payload;
    },

    setAverageProgress(state, action: PayloadAction<number>) {
      state.averageProgress = action.payload;
    },
    addFeedback(state, action: PayloadAction<any>) {
      state.feedback = [...(state.feedback || []), action.payload];
    },
    setFeedbackError(state, action: PayloadAction<string>) {
      state.feedbackError = action.payload;
    },
    setProfileIntructer(state, action: PayloadAction<any>) {
      state.profileInstructer = action.payload
    },
    clearFeedback(state) {
      state.feedback = [];
      state.feedbackError = null;
    },
  },
});

export const { setLimitReviews, setPopularInstructors, setCategory, setNewestCourses, setCourses, resetContent, toogleSidebar, setOrderId, resetOrderId, addToCart, setLengthCart, setListSections, setCourseDetail, setListInsDashboard, setReviewSummary,
  setFilteredReviews,
  setReviewsLoading,
  setSubcategories,
  addCategory,
  setCategories,
  updateCategory,
  setUsers,
  removeUser,
  setCoursesManage,
  setPendingCourses,
  setMonthlyUserCounts,
  setRevenueData,
  setWeeklyRevenueData,
  setActiveUsersCount,
  setTotalReviewsCount,
  setPendingUsers,
  removePendingUser,
  setCourseOfInstructor,
  setCourseOfPurchase,
  setUserInfo,
  setProfileIntructer,
  setProgressCourseOfUser,
  setInstructorCourse,
  setInstructorPurchase,
  setInstructorPendingCourse,
  setSubscribeChannels,
  setCompletionRate,
  setAverageProgress,
  addFeedback,
  setFeedbackError,
  clearFeedback
} = editorSlice.actions;

export default editorSlice.reducer;
