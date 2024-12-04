import { call, put, takeLatest } from "redux-saga/effects";
import {
  setLengthCart,
  setOrderId,
  setCourses,
  setNewestCourses,
  setCategory,
  setListSections,
  setCourseDetail,
  setListInsDashboard,
  setPopularInstructors,
  setLimitReviews,
  setReviewsLoading,
  setReviewSummary,
  setFilteredReviews,
  updateCategory,
  addCategory,
  setCategories,
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
  setProgressCourseOfUser,
  setSubscribeChannels,
  setInstructorPendingCourse,
  setInstructorPurchase,
  setInstructorCourse,
  setAverageProgress,
  setCompletionRate,
  addFeedback,
  setFeedbackError,
  setProfileIntructer,
} from "./slice";
import { toast } from "react-toastify";
import { ROUTES } from "@/routes";
import { cursusAPI } from "@/services";

function* getLengthCart(): Generator<any, void, any> {
  try {
    const storedCartItems = localStorage.getItem("cartItems");
    const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    const lengthCart = cartItems.length;

    yield put(setLengthCart(lengthCart));
  } catch (error) {
    console.error("Error getting cart:", error);
  }
}

function* createOder(action: any): Generator<any, void, any> {
  const { orderData, setIsLoading, navigate } = action.payload;

  try {
    const res = yield call(cursusAPI.orderService.createOrder, orderData);

    toast.success("Order created successfully");
    if (res.data.statusCode === 201) {
      localStorage.removeItem("cartItems");
      yield put(setOrderId(res.data.data._id));
      setIsLoading(false);
      navigate(ROUTES.THANKYOU);
    }
  } catch (error) {
    console.error("Error creating order:", error);
  }
}

function* getCourses(action: any): Generator<any, void, any> {
  const { payload } = action;
  try {
    const res = yield call(cursusAPI.courseService.getAllCourse, payload);
    yield put(setCourses(res.data.data));
  } catch (error) {
    console.error("Error setting courses", error);
  }
}

function* getNewestCourses(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.courseService.getAllNewsestCourse);
    yield put(setNewestCourses(res.data.data));
  } catch (error) {
    console.error("Error setting newest courses", error);
  }
}

function* getListSections(action: any): Generator<any, void, any> {
  const { payload } = action;
  try {
    const res = yield call(
      cursusAPI.sectionService.getSectionByCourseId,
      payload
    );
    yield put(setListSections(res.data.data));
  } catch (error) {
    console.error("Error setting list sections", error);
  }
}

function* getCourseDetail(action: any): Generator<any, void, any> {
  const { payload } = action;
  try {
    const res = yield call(cursusAPI.courseService.getCourseDetail, payload);
    yield put(setCourseDetail(res.data.data));
  } catch (error) {
    console.error("Error getting course detail", error);
  }
}

function* getCategories(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.categoryService.getCategory);
    yield put(setCategory(res.data.data));
  } catch (error) {
    console.error("Error setting categories", error);
  }
}

function* getInforCourseDashboard(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.courseService.getInforCourseDashboard);
    yield put(setListInsDashboard(res.data.data));
  } catch (error) {
    console.error("Error getting infor dashboard", error);
  }
}

function* getPopularInstructors(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.userService.getPopularInstructors);
    yield put(setPopularInstructors(res.data.data));
  } catch (error) {
    console.error("Error getting popular instructors", error);
  }
}

function* getLimitReviews(action: any): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.reviewService.getLimitReviews,
      action.payload
    );
    yield put(setLimitReviews(res.data.data));
  } catch (error) {
    console.error("Error getting limit reviews", error);
  }
}
function* fetchReviewSummary(action: any): Generator<any, void, any> {
  try {
    const { courseId } = action.payload;

    yield put(setReviewsLoading(true));
    const response = yield call(
      cursusAPI.reviewService.getReviewSummaryByCourseId,
      courseId
    );
    if (response?.data.data) {
      yield put(setReviewSummary(response.data.data));
    } else {
      yield put(
        setReviewSummary({
          totalReviews: 0,
          averageRating: 0,
          ratingCounts: [0, 0, 0, 0, 0],
          ratingPercentages: [0, 0, 0, 0, 0],
        })
      );
    }
  } catch (error) {
    console.error("Error fetching review summary:", error);
    yield put(
      setReviewSummary({
        totalReviews: 0,
        averageRating: 0,
        ratingCounts: [0, 0, 0, 0, 0],
        ratingPercentages: [0, 0, 0, 0, 0],
      })
    );
  } finally {
    yield put(setReviewsLoading(false));
  }
}

function* fetchFilteredReviews(action: any): Generator<any, void, any> {
  try {
    const { courseId, ratingFilter } = action.payload;
    yield put(setReviewsLoading(true));
    const response = yield call(
      cursusAPI.reviewService.getFilteredReviews,
      courseId,
      ratingFilter || undefined
    );

    if (response?.data.data && Array.isArray(response.data.data)) {
      yield put(setFilteredReviews(response.data.data));
    } else {
      yield put(setFilteredReviews([]));
    }
  } catch (error) {
    console.error("Error fetching filtered reviews:", error);
    yield put(setFilteredReviews([]));
  } finally {
    yield put(setReviewsLoading(false));
  }
}
function* createSubcategory(action: any): Generator<any, void, any> {
  try {
    const { categoryId, subcategories } = action.payload;
    yield call(
      cursusAPI.subcategoryService.createSubcategory,
      categoryId,
      subcategories.map((name: string) => ({ name }))
    );
    yield call(fetchCategories);
    toast.success("Subcategories created successfully!");
  } catch (error) {
    console.error("Error creating subcategory:", error);
    toast.error("Failed to create subcategories. Please try again.");
  }
}
function* createCategory(action: any): Generator<any, void, any> {
  try {
    const { categoryName } = action.payload;
    const response = yield call(cursusAPI.categoryService.createCategory, {
      name: categoryName,
    });
    const newCategory = response.data.data;

    yield put(addCategory(newCategory));
    toast.success("Category created successfully!");
  } catch (error) {
    console.error("Error creating category:", error);
    toast.error("Failed to create category. Please try again.");
  }
}
function* fetchCategories(): Generator<any, void, any> {
  try {
    const response = yield call(cursusAPI.categoryService.getCategory);
    const categories = response.data.data.map((category: MODEL.CATEGORY) => ({
      ...category,
      subcategories: category.subcategories || [],
    }));
    yield put(setCategories(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function* getUserById(action: any): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.userService.getUserById, action.payload);

    yield put(setUserInfo(res.data.data));
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

function* getProfile(action: any): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.userService.getUserById, action.payload);

    yield put(setProfileIntructer(res.data.data));
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

function* updateUserById(action: any): Generator<any, void, any> {
  const {
    userId,
    fullname,
    image,
    description,
    categoryId,
    facebook,
    twitter,
    linkedin,
    youtube,
  } = action.payload;
  try {
    const res = yield call(cursusAPI.userService.updateUserById, userId, {
      fullname,
      image,
      description,
      categoryId,
      facebook,
      twitter,
      linkedin,
      youtube,
    });
    if (res.status === 201) {
      toast.success("User updated successfully!");
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

function* fetchUsers(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.userService.getUser);
    yield put(setUsers(res.data.data));
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users.");
  }
}

function* deleteUser(action: any): Generator<any, void, any> {
  const { userId } = action.payload;
  try {
    yield call(cursusAPI.userService.deleteUser, userId);
    yield put(removeUser(userId));
    yield call(fetchUsers);
    toast.success("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user.");
  }
}
function* fetchCourses(): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.courseService.getCourseApprovedAndRejected
    );
    const filteredCourses = res.data.data;
    yield put(setCoursesManage(filteredCourses));
  } catch (error) {
    console.error("Error fetching courses:", error);
    toast.error("Error fetching courses. Please try again.");
  }
}
function* fetchPendingCourses(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.courseService.getAllCourse, "pending");
    yield put(setPendingCourses(res.data.data));
  } catch (error) {
    console.error("Error fetching pending courses:", error);
    toast.error("Error fetching pending courses. Please try again.");
  }
}
function* approveCourse(action: any): Generator<any, void, any> {
  const { courseId } = action.payload;
  try {
    yield call(
      cursusAPI.courseService.updateStatusCourse,
      courseId,
      "approved"
    );
    toast.success("Course approved successfully!");
    yield call(fetchPendingCourses);
  } catch (error) {
    console.error("Error approving course:", error);
    toast.error("Failed to approve course.");
  }
}

function* rejectCourse(action: any): Generator<any, void, any> {
  const { courseId, rejectionReason } = action.payload;
  try {
    yield call(
      cursusAPI.courseService.updateStatusCourse,
      courseId,
      "rejected",
      rejectionReason
    );
    toast.success("Course rejected successfully!");
    yield call(fetchPendingCourses);
  } catch (error) {
    console.error("Error rejecting course:", error);
    toast.error("Failed to reject course.");
  }
}
function* fetchMonthlyUserCounts(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.userService.getUser);
    const users = res.data.data;

    const monthlyCounts = Array(12).fill(0);
    users.forEach((user: { createdAt: string }) => {
      const createdAt = new Date(user.createdAt);
      const monthIndex = createdAt.getMonth(); // Lấy chỉ số tháng (0-11)
      monthlyCounts[monthIndex]++;
    });

    yield put(setMonthlyUserCounts(monthlyCounts));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
function* fetchRevenueData(action: any): Generator<any, void, any> {
  const { year } = action.payload;
  try {
    const response = yield call(
      cursusAPI.dashboardService.getRevenueData,
      year
    );
    const revenueData = response.data.data;

    const updatedSalesData = Array(12).fill(0);
    revenueData.forEach((item: { month: number; totalRevenue: number }) => {
      updatedSalesData[item.month - 1] = item.totalRevenue;
    });

    yield put(setRevenueData(updatedSalesData));
  } catch (error) {
    console.error("Error fetching revenue data:", error);
  }
}
function* fetchWeeklyRevenueData(): Generator<any, void, any> {
  try {
    const response = yield call(
      cursusAPI.dashboardService.getWeeklyRevenueData
    );
    const { data }: { data: MODEL.WeeklyRevenueItem[] } = response.data;

    const weeklyData = Array(7).fill(0);
    data.forEach((item: MODEL.WeeklyRevenueItem) => {
      const dayIndex = item.dayOfWeek - 1;
      weeklyData[dayIndex] = item.totalRevenue;
    });

    yield put(setWeeklyRevenueData(weeklyData));
  } catch (error) {
    console.error("Error fetching weekly revenue:", error);
  }
}
function* fetchActiveUsersCount(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.userService.getCountUserActive);
    const activeUsersCount = res.data.data.activeUserCount;
    yield put(setActiveUsersCount(activeUsersCount));
  } catch (error) {
    console.error("Error fetching active users count:", error);
  }
}

function* fetchTotalReviewsCount(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.reviewService.getCountAllReviews);
    const totalReviewsCount = res.data.data;
    yield put(setTotalReviewsCount(totalReviewsCount));
  } catch (error) {
    console.error("Error fetching total reviews count:", error);
  }
}
function* fetchPendingUsers(): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.userService.getUserByStatus, "pending");
    yield put(setPendingUsers(res.data.data));
  } catch (error) {
    console.error("Error fetching pending users:", error);
    toast.error("Failed to fetch data.");
  }
}

function* approveUser(action: any): Generator<any, void, any> {
  const { userId } = action.payload;
  try {
    yield call(
      cursusAPI.userService.approveAndRejectBecomeInstructor,
      userId,
      "approved"
    );
    yield put(removePendingUser(userId));
    toast.success("User approved successfully!");
  } catch (error) {
    console.error("Error approving user:", error);
    toast.error("Failed to approve user.");
  }
}

function* rejectUser(action: any): Generator<any, void, any> {
  const { userId, rejectionReason } = action.payload;
  try {
    yield call(
      cursusAPI.userService.approveAndRejectBecomeInstructor,
      userId,
      "rejected",
      rejectionReason
    );
    yield put(removePendingUser(userId));
    toast.success("User rejected successfully!");
  } catch (error) {
    console.error("Error rejecting user:", error);
    toast.error("Failed to reject user.");
  }
}

function* getCourseOfInstructor(action: any): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.courseService.getMyCourse, action.payload);
    yield put(setCourseOfInstructor(res.data.data));
  } catch (error) {
    console.error("Error fetching course of instructor:", error);
    // toast.error("Failed to fetch course of instructor.");
  }
}

function* getCourseOfPurchase(action: any): Generator<any, void, any> {
  try {
    const res = yield call(
      cursusAPI.courseService.getCoursePurchasedByUserId,
      action.payload
    );
    yield put(setCourseOfPurchase(res.data.data));
  } catch (error) {
    console.error("Error fetching course of purchase:", error);
    // toast.error("Failed to fetch course of purchase.");
  }
}

function* getProcessCourseOfUser(action: any): Generator<any, void, any> {
  try {
    const res = yield call(cursusAPI.courseService.getProcessCourseOfUser, {
      userId: action.payload.userId,
      courseId: action.payload.courseId,
    });

    yield put(setProgressCourseOfUser(res.data.data));
  } catch (error) {
    console.error("Error fetching progress course:", error);
    toast.error("Failed to fetch progress course.");
  }
}

function* updateStatusProcessCourseOfUser(
  action: any
): Generator<any, void, any> {
  const { userId, courseId, lectureId, quizId, assignmentId } = action.payload;

  try {
    const res = yield call(
      cursusAPI.courseService.updateStatusProcessCourseOfUser,
      {
        userId,
        courseId,
        lectureId,
        quizId,
        assignmentId
      }
    );
  } catch (error) {
    console.error("Error update course progress:", error);
    toast.error("Failed to update course progress.");
  }
}

function* instructorCourse(action: any): Generator<any, void, any> {
  const { instructorId } = action.payload;
  try {
    const res = yield call(
      cursusAPI.courseService.getInstructorCourse,
      instructorId
    );
    yield put(setInstructorCourse(res.data.data));
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users.");
  }
}

function* instructorPurchase(action: any): Generator<any, void, any> {
  const { userId } = action.payload;
  try {
    const res = yield call(cursusAPI.courseService.getPurchaseCourse, userId);
    yield put(setInstructorPurchase(res.data.data));
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users.");
  }
}

function* instructorPendingCourse(action: any): Generator<any, void, any> {
  const { instructorId } = action.payload;
  try {
    const res = yield call(
      cursusAPI.courseService.getInstructorPendingCourse,
      instructorId
    );
    if (res.status === 200) {
      yield put(setInstructorPendingCourse(res.data.data));
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.error("Failed to fetch users.");
  }
}

function* getSubscribeChannels(action: any): Generator<any, void, any> {
  const { payload } = action;
  try {
    const res = yield call(
      cursusAPI.userService.getSubscribedInstructors,
      payload
    );
    yield put(setSubscribeChannels(res.data.data.subscribedInstructors));
  } catch (error) {
    console.error("Error setting Subscribe Channels", error);
  }
}
function* editCategorySaga(action: any): Generator<any, void, any> {
  try {
    const { categoryId, name, subcategories, removedSubcategories } =
      action.payload;

    yield call(cursusAPI.categoryService.updateCategory, categoryId, { name });

    for (const subcategoryId of removedSubcategories) {
      yield call(cursusAPI.subcategoryService.removeSubcategory, subcategoryId);
    }

    const updatedCategory = {
      _id: categoryId,
      name,
      subcategories,
    };
    yield put(updateCategory(updatedCategory));
    toast.success("Category updated successfully!");
  } catch (error) {
    console.error("Error updating category:", error);
    toast.error("Failed to update category. Please try again.");
  }
}
function* fetchCompletionRate(): Generator<any, void, any> {
  try {
    const response = yield call(cursusAPI.dashboardService.getCompletionRate);
    if (response?.data?.data?.completionRate !== undefined) {
      yield put(setCompletionRate(response.data.data.completionRate));
    } else {
      yield put(setCompletionRate(0));
    }
  } catch (error) {
    console.error("Error fetching completion rate:", error);
    yield put({ type: "setCompletionRate", payload: 0 });
  }
}

function* fetchAverageProgress(): Generator<any, void, any> {
  try {
    const response = yield call(cursusAPI.dashboardService.getAverageProgress);
    if (response?.data?.data?.averageProgress !== undefined) {
      yield put(setAverageProgress(response.data.data.averageProgress));
    } else {
      yield put(setAverageProgress(0));
    }
  } catch (error) {
    console.error("Error fetching average progress:", error);
    yield put({ type: "setAverageProgress", payload: 0 });
  }
}
function* postFeedbackSaga(action: any): Generator<any, void, any> {
  const { payload } = action;
  try {
    const existingReview = yield call(
      cursusAPI.reviewService.checkReview,
      payload.courseId,
      payload.userId
    );
    if (existingReview?.data?.data?.hasReviewed) {
      toast.error("You have already submitted feedback for this course.");
      return;
    }
    const response = yield call(cursusAPI.reviewService.postReview, payload);
    if (response.status === 201) {
      yield put(addFeedback(payload));
      yield call(fetchFilteredReviews, {
        payload: { courseId: payload.courseId },
      });
      yield call(fetchReviewSummary, {
        payload: { courseId: payload.courseId },
      });
      toast.success("Feedback submitted successfully!");
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    yield put(setFeedbackError("Failed to submit feedback."));
    toast.error("Failed to submit feedback.");
  }
}

export function* watchEditorGlobalSaga() {
  yield takeLatest("getLengthCart", getLengthCart);
  yield takeLatest("createOder", createOder);
  yield takeLatest("setCourses", getCourses);
  yield takeLatest("setNewestCourses", getNewestCourses);
  yield takeLatest("setListSections", getListSections);
  yield takeLatest("setCourseDetail", getCourseDetail);
  yield takeLatest("setCategory", getCategories);
  yield takeLatest("getInforCourseDashboard", getInforCourseDashboard);
  yield takeLatest("setPopularInstructors", getPopularInstructors);
  yield takeLatest("setLimitReviews", getLimitReviews);
  yield takeLatest("fetchReviewSummary", fetchReviewSummary);
  yield takeLatest("fetchFilteredReviews", fetchFilteredReviews);
  yield takeLatest("createSubcategory", createSubcategory);
  yield takeLatest("createCategory", createCategory);
  yield takeLatest("fetchCategories", fetchCategories);
  yield takeLatest("getUserById", getUserById);
  yield takeLatest("getProfile", getProfile);
  yield takeLatest("updateUserById", updateUserById);
  yield takeLatest("fetchUsers", fetchUsers);
  yield takeLatest("deleteUser", deleteUser);
  yield takeLatest("fetchCourses", fetchCourses);
  yield takeLatest("fetchPendingCourses", fetchPendingCourses);
  yield takeLatest("approveCourse", approveCourse);
  yield takeLatest("rejectCourse", rejectCourse);
  yield takeLatest("fetchMonthlyUserCounts", fetchMonthlyUserCounts);
  yield takeLatest("fetchRevenueData", fetchRevenueData);
  yield takeLatest("fetchWeeklyRevenueData", fetchWeeklyRevenueData);
  yield takeLatest("fetchActiveUsersCount", fetchActiveUsersCount);
  yield takeLatest("fetchTotalReviewsCount", fetchTotalReviewsCount);
  yield takeLatest("fetchPendingUsers", fetchPendingUsers);
  yield takeLatest("approveUser", approveUser);
  yield takeLatest("rejectUser", rejectUser);
  yield takeLatest("getCourseOfInstructor", getCourseOfInstructor);
  yield takeLatest("getCourseOfPurchase", getCourseOfPurchase);
  yield takeLatest("getProcessCourseOfUser", getProcessCourseOfUser);
  yield takeLatest(
    "updateStatusProgressCourse",
    updateStatusProcessCourseOfUser
  );
  yield takeLatest("instructorCourse", instructorCourse);
  yield takeLatest("instructorPurchase", instructorPurchase);
  yield takeLatest("instructorPendingCourse", instructorPendingCourse);
  yield takeLatest("setSubscribeChannels", getSubscribeChannels);
  yield takeLatest("editCategory", editCategorySaga);
  yield takeLatest("fetchCompletionRate", fetchCompletionRate);
  yield takeLatest("fetchAverageProgress", fetchAverageProgress);
  yield takeLatest("postFeedback", postFeedbackSaga);
}
