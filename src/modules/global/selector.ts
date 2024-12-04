import { RootState } from "@/redux/store";

// Selector to get the counter value from the state
export const selectState = (state: RootState) => state.global;
export const selectStateIsOpen = (state: RootState) => state.global.isOpen;
export const selectStateOrderId = (state: RootState) => state.global.orderId;
export const selectStateCartLength = (state: RootState) => state.global.length;
export const selectStateCourses = (state: RootState) => state.global.setCourses;
export const selectStateCoursesNewest = (state: RootState) => state.global.setNewestCourses;
export const selectStateCategory = (state: RootState) => state.global.setCategory;
export const selectStateListSections = (state: RootState) =>
  state.global.listSections;
export const selectStateAnalyticInsDashboard = (state: RootState) =>
  state.global.AnalyticInsDashboard;
export const selectStatePopularInstructors = (state: RootState) => state.global.popularInstructors;
export const selectStateLimitReviews = (state: RootState) => state.global.limitReviews;
export const selectReviewSummary = (state: RootState) => state.global.reviewSummary;
export const selectFilteredReviews = (state: RootState) => state.global.filteredReviews;
export const selectReviewsLoading = (state: RootState) => state.global.isReviewsLoading;
export const selectStateUsers = (state: RootState) => state.global.users;
export const selectStateCoursesManage = (state: RootState) => state.global.courses;
export const selectPendingCourses = (state: RootState) => state.global.pendingCourses;
export const selectMonthlyUserCounts = (state: RootState) => state.global.monthlyUserCounts;
export const selectRevenueData = (state: RootState) => state.global.revenueData;
export const selectWeeklyRevenueData = (state: RootState) => state.global.weeklyRevenueData;
export const selectActiveUsersCount = (state: RootState) => state.global.activeUsersCount;
export const selectTotalReviewsCount = (state: RootState) => state.global.totalReviewsCount;
export const selectPendingUsers = (state: RootState) => state.global.pendingUsers;
export const selectCourseOfInstructor = (state: RootState) => state.global.courseOfInstructor;
export const selectCourseOfPurchase = (state: RootState) => state.global.courseOfPurchased;
export const selectStateUserInfo = (state: RootState) => state.global.settingUser;
export const selectIntructerProfile = (state: RootState) => state.global.profileInstructer;

export const selectProgressCourseOfUser = (state: RootState) => state.global.progressCourseOfUser;
export const selectInstructorCourse = (state: RootState) => state.global.instructorCourse;
export const selectInstructorPurchase = (state: RootState) => state.global.instructorPurchase;
export const selectPendingCourse = (state: RootState) => state.global.instructorPendingCourse;
export const selectStateSubscribeChannels = (state: RootState) => state.global.setSubscribeChannels;
export const selectCompletionRate = (state: RootState) => state.global.completionRate;
export const selectAverageProgress = (state: RootState) => state.global.averageProgress;
export const selectFeedback = (state: RootState) => state.global.feedback;
export const selectFeedbackError = (state: RootState) => state.global.feedbackError;
