interface authType {
  username?: string | null;
  becomeInstructor?: any;
  error?: string | null;
}

interface globalType {
  items?: string[];
  length?: number;
  isOpen?: boolean;
  content?: string;
  orderId?: string;
  setCourses?: MODEL.COURSE[];
  setNewestCourses?: MODEL.COURSE[];
  setCategory?: MODEL.CATEGORY[];
  listSections?: any[];
  courseDetail?: any;
  AnalyticInsDashboard?: IInstructor.Dashboard | Objects;
  popularInstructors: MODEL.USER[];
  limitReviews: MODEL.REVIEW[];
  reviewSummary?: ReviewSummary;
  filteredReviews?: FilteredReview[];
  isReviewsLoading?: boolean;
  users: MODEL.USER[];
  courses: ICourse.Course[];
  pendingCourses: ICourse.Course[];
  monthlyUserCounts: number[];
  revenueData: number[];
  weeklyRevenueData: number[];
  activeUsersCount: number;
  totalReviewsCount: number;
  pendingUsers: MODEL.USER[];
  courseOfInstructor: ICourse.Course[];
  courseOfPurchased: ICourse.Course[];
  settingUser: MODEL.USER | null;
  profileInstructer: MODEL.USER | null;
  progressCourseOfUser: MODEL.PROCESSCOURSEOFUSER[];
  instructorCourse: IINSTRUCTOR.COURSES[];
  instructorPurchase: IINSTRUCTOR.PURCHASES[];
  instructorPendingCourse: IINSTRUCTOR.PENDING_COURSES[];
  setSubscribeChannels?: [];
  completionRate?: number;
  averageProgress?: number;
  feedback?: FEEDBACK[];
  feedbackError?: string | null;
  setSubscribeChannels?: [];
}

interface course {
  levels: string[];
  languages: string[];
  Categories: ICourse.Category[];
  sections: ICourse.Section[];
  questions: ICourse.Question[];
  quiz: ICourse.Quiz;
  lectures: ICourse.Lecture[];
  quizes: ICourse.Quiz[];
  assignments: ICourse.Assignment[];
  lecture: ICourse.Lecture | null;
  quizResult: ICourse.QUIZRESULT | null;
  course: ICourse.Course | null;
  myCourse: ICourse.Course[];

}
interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  ratingCounts: number[];
  ratingPercentages: number[];
}

interface FilteredReview {
  _id: string;
  userId: { _id: string; fullname: string; image: string };
  createdAt: string;
  rating: number;
  comment: string;
}
interface FEEDBACK {
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
}