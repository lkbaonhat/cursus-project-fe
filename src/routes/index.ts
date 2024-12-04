export enum ROUTES {
  // Common
  HOME = "/",
  EXPLORE = "/explore",
  HELP = "/help",
  ABOUT_US = "/aboutus",
  CATEGORY = "/category/:slug",
  // Auth
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  VERIFY_OTP = "/auth/verify-otp",
  RESET_PASSWORD = "/auth/reset-password",
  NEW_PASSWORD = "/auth/new-password",
  // Pages
  PAIDMEMBERSHIP = "/pages/paid-membership",
  SEARCHRESULT = "/pages/search-result",
  COMINGSOON = "/pages/coming-soon",
  THANKYOU = "/thank-you",
  CONTACT = "/contact",
  ALL_INSTRUCTOR = "/all-instructor",
  COMPANY_DETAIL = "/companydetail",
  REPORT = "/report",
  CAREERS = "/careers",
  PRESS = "/press",
  // ...
  FAQ_DETAIL = "/certificate/faq-detail",
  FAQ_DETAIL_2 = "/certificate/faq-detail-2",
  BLOG_DETAIL = "/certificate/blog-detail",
  TERMSOFUSE = "/certificate/term-of-use",
  // is decentralized
  COURSE_DETAIL = "/course-detail/:slug",
  CHECKOUT = "/pages/checkout",

  PROFILE = "/profile/:slug",
  SHOPPING_CART = "shoppingcart",

}

export const INSTRUCTOR = {
  DASHBOARD: "dashboard",
  SETTINGS: "settings",
  COURSES: "courses",
  CERTIFICATE: "certificate",
  ANALYICS: "analyics",
  NOTIFICATION: "notification",
  CREATE_COURSE: "create-course",

  LEARNING_ASSIGNMENT: "learning/course/:courseSlug/assignment/:assignmentId",
  LEARNING_VIDEO: "learning/course/:courseSlug/lecture/:lectureId",
  LEARNING_DOC: "learning/course=:slug/doc=:slug",
  LEARNING_QUIZ: "learning/course/:courseSlug/quiz/:quizId",
  COURSE_CONTENT: "learning/course/:courseSlug",

  FEEDBACK: "feedback",

  INVOICE: "invoice",
  CERTIFICATE_CENTER: "certificate/certificate-center",
  CERTIFICATION_FORM: "certificate/certification-form",
  CERTIFICATION_TEST: "learning/course/quiz/:quizId",
  CERTIFICATION_RESULTS: "certificate/results",
};

export const STUDENT = {
  DASHBOARD: "dashboard",
  CERTIFICATE: "certificate",
  SETTINGS: "settings",
  PURCHASED_COURSES: "courses",
  APPLY_JOB: "apply-job",
  INSTRUCTOR_SIGNUP: "instructor-signup",

  LEARNING_ASSIGNMENT: "learning/course/:courseSlug/assignment/:assignmentId",
  LEARNING_VIDEO: "learning/course/:courseSlug/lecture/:lectureId",
  LEARNING_DOC: "learning/course=:slug/doc=:slug",
  LEARNING_QUIZ: "learning/course/:courseSlug/quiz/:quizId",
  COURSE_CONTENT: "learning/course/:courseSlug",

  FEEDBACK: "feedback",
  PROFILE: "profile",
  INVOICE: "invoice",
  CERTIFICATE_CENTER: "certificate/certificate-center",
  CERTIFICATION_FORM: "certificate/certification-form",
  CERTIFICATION_TEST: "learning/course/quiz/:quizId",
  CERTIFICATION_RESULTS: "certificate/results",
};

export const ADMIN = {
  DASHBOARD: "dashboard",
  SETTINGS: "settings",
  ACCOUNTS_MANAGEMENT: "accounts-management",
  ACCOUNT_APPROVAL: "account-approval",
  COURSES_MANAGEMENT: "courses-management",
  COURSES_APPROVAL: "courses-approval",
  INSTRUCTORS_MANAGEMENT: "instructors-management",
  CATEGORY_MANAGEMENT: "category-management",
  PROFILE: "profile",
};

export const ROLE = {
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  STUDENT: "student",
};
