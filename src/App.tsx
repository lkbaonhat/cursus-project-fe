import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import LayoutAuth from "./containers/LayoutAuth";
import LayoutCertificate from "./layouts/layout.certificate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { lazy, Suspense } from "react";
import { ADMIN, INSTRUCTOR, ROLE, ROUTES, STUDENT } from "./routes";
import LayoutMain from "./layouts/layout.main";
import LayoutAdminPage from "./layouts/layout.admin";

import UnauthorizedPage from "./components/Auth/UnauthorizedPage";
import RequireAuth from "./components/Auth/RequireAuth";
import LayoutCourse from "./layouts/layout.course";
import TermsofUsePage from "./pages/TermOfUsePage";
import Loading from "./assest/Loading";
import LayoutCart from "./layouts/layout.cart";
import { AudioProvider } from "@/contexts/MusicContext";


const CourseContent = lazy(() => import("./containers/CouseContent"));
const FaqDetailViewPage = lazy(() => import("./pages/FaqDetailViewPage"));
const FaqDetailView2Page = lazy(() => import("./pages/FaqDetailView2Page"));
const BlogPage = lazy(() => import("./pages/BlogDetailPage"));
const CertificateCenterPage = lazy(
  () => import("./pages/CertificateCenterPage")
);
const SettingPage = lazy(() => import("./pages/SettingPage"));
const InstructorPage = lazy(() => import("./pages/InstructorPage"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CoursesDetailPage = lazy(() => import("./pages/CoursesDetailPage"));
const CertificationFormPage = lazy(() => import("./pages/CertificationForm"));
const CertificationTestPage = lazy(
  () => import("./pages/CertificationTestPage")
);
const ResultPage = lazy(() => import("./pages/ResultPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const InvoicePage = lazy(() => import("./pages/InvoicePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ThankyouPage = lazy(() => import("./pages/ThankyouPage"));
const NewCoursePage = lazy(() => import("./pages/NewCoursePage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const VerifyOTPPage = lazy(() => import("./pages/VerifyOTPPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const NewPasswordPage = lazy(() => import("./pages/NewPasswordPage"));
const HelpPage = lazy(() => import("./pages/HelpPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const InstructorSignUpPage = lazy(() => import("./pages/InstructorSignUpPage"));
const PurchasedCoursesPage = lazy(() => import("./pages/PurchasedCoursesPage"));
const InstructorCoursePage = lazy(() => import("./pages/InstructorCoursePage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboard"));
const AccountManagementPage = lazy(
  () => import("./pages/AccountManagementPage")
);
const AccountApprovalPage = lazy(() => import("./pages/AccountApprovalPage"));
const CourseManagementPage = lazy(() => import("./pages/CourseManagementPage"));
const CoursesApprovalPage = lazy(() => import("./pages/CoursesApprovalPage"));
const CategoryManagementPage = lazy(
  () => import("./pages/CategoryManagementPage")
);
const InstructorCertificatePage = lazy(
  () => import("./pages/InstructorCertificatePage")
);
const StudentCertificatePage = lazy(
  () => import("./pages/StudentCertificatePage")
);
const InstructorDashboardPage = lazy(
  () => import("./pages/InstructorDashboardPage")
);
const InstructorAnalyicsPage = lazy(
  () => import("./pages/InstructorAnalyicsPage")
);
const CompanyDetail = lazy(() => import("./pages/CompanyDetailPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const PaidMembershipPage = lazy(() => import("./pages/PaidMembershipPage"));
const InstructorNotificationPage = lazy(
  () => import("./pages/InstructorNotificatePage")
);
const ApplyJobPage = lazy(() => import("./pages/ApplyJobPage"));
const CourseVideoPage = lazy(() => import("./pages/CourseVideoPage"));
const CourseDocPage = lazy(() => import("./pages/CourseDocPage"));
const CourseQuizPage = lazy(() => import("./pages/CourseQuizPage"));
const CourseAssignmentPage = lazy(() => import("./pages/CourseAssignmentPage"))

const SearchResultPage = lazy(() => import("./pages/SearchResultPage"));
const StudentDashboardPage = lazy(() => import("./pages/StudentDashboardPage"));
const PressPage = lazy(() => import("./pages/PressPage"));

const router = createBrowserRouter([
  /////////// PUBLIC ROUTES ///////////
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: ROUTES.HOME,
    element: <LayoutMain Component={HomePage} />,
  },
  {
    path: ROUTES.CONTACT,
    element: <ContactPage />,
  },
  {
    path: ROUTES.THANKYOU,
    element: <ThankyouPage />,
  },
  {
    path: ROUTES.COMINGSOON,
    element: <ComingSoonPage />,
  },
  {
    path: ROUTES.EXPLORE,
    element: <LayoutMain Component={ExplorePage} />,
  },
  {
    path: ROUTES.CATEGORY,
    element: <LayoutMain Component={CategoryPage} />,
  },
  {
    path: ROUTES.COURSE_DETAIL,
    element: <LayoutMain Component={CoursesDetailPage} />,
  },
  {
    path: ROUTES.HELP,
    element: <LayoutMain Component={HelpPage} />,
  },
  {
    path: ROUTES.REPORT,
    element: <LayoutMain Component={ReportPage} />,
  },
  {
    path: ROUTES.ALL_INSTRUCTOR,
    element: <LayoutMain Component={InstructorPage} />,
  },
  {
    path: ROUTES.ABOUT_US,
    element: <LayoutCart Component={AboutUsPage} />,
  },
  {
    path: ROUTES.COMPANY_DETAIL,
    element: <LayoutCart Component={CompanyDetail} />,
  },
  {
    path: ROUTES.CAREERS,
    element: <LayoutCart Component={CareersPage} />,
  },

  /////////// CERTIFICATE ROUTES //////////
  {
    path: ROUTES.CHECKOUT,
    element: <LayoutCart Component={CheckoutPage} />,
  },
  {
    path: ROUTES.FAQ_DETAIL,
    element: <LayoutCart Component={FaqDetailViewPage} />,
  },
  {
    path: ROUTES.FAQ_DETAIL_2,
    element: <LayoutCart Component={FaqDetailView2Page} />,
  },
  {
    path: ROUTES.BLOG_DETAIL,
    element: <LayoutCart Component={BlogPage} />,
  },
  {
    path: ROUTES.TERMSOFUSE,
    element: <LayoutCart Component={TermsofUsePage} />,
  },
  {
    path: ROUTES.PAIDMEMBERSHIP,
    element: <LayoutCart Component={PaidMembershipPage} />,
  },
  {
    path: ROUTES.SEARCHRESULT,
    element: <LayoutCart Component={SearchResultPage} />,
  },
  {
    path: ROUTES.PRESS,
    element: <LayoutCart Component={PressPage} />,
  },
  /////////// AUTHENTICATION ROUTES ///////////
  {
    path: ROUTES.LOGIN,
    element: <LayoutAuth Component={LoginPage} />,
  },
  {
    path: ROUTES.REGISTER,
    element: <LayoutAuth Component={RegisterPage} />,
  },
  {
    path: ROUTES.VERIFY_OTP,
    element: <LayoutAuth Component={VerifyOTPPage} />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    element: <LayoutAuth Component={ResetPasswordPage} />,
  },
  {
    path: ROUTES.NEW_PASSWORD,
    element: <LayoutAuth Component={NewPasswordPage} />,
  },
  {
    path: ROUTES.PROFILE,
    element: <LayoutMain Component={ProfilePage} />,
  },
  {
    path: ROUTES.SHOPPING_CART,
    element: <LayoutCart Component={ShoppingCartPage} />,
  },
  ////////// PRIVATE ROUTES ///////////
  {
    path: "unauthorized",
    element: <UnauthorizedPage />,
  },

  // ADMIN
  {
    path: ROLE.ADMIN,
    element: <RequireAuth allowedRoles={[ROLE.ADMIN]} />,
    children: [
      {
        index: true,
        element: <LayoutAdminPage Component={AdminDashboardPage} />,
      },
      {
        path: ADMIN.SETTINGS,
        element: <LayoutAdminPage Component={SettingPage} />,
      },
      {
        path: ADMIN.DASHBOARD,
        element: <LayoutAdminPage Component={AdminDashboardPage} />,
      },
      {
        path: ADMIN.ACCOUNTS_MANAGEMENT,
        element: <LayoutAdminPage Component={AccountManagementPage} />,
      },
      {
        path: ADMIN.ACCOUNT_APPROVAL,
        element: <LayoutAdminPage Component={AccountApprovalPage} />,
      },
      {
        path: ADMIN.COURSES_MANAGEMENT,
        element: <LayoutAdminPage Component={CourseManagementPage} />,
      },
      {
        path: ADMIN.COURSES_APPROVAL,
        element: <LayoutAdminPage Component={CoursesApprovalPage} />,
      },
      {
        path: ADMIN.CATEGORY_MANAGEMENT,
        element: <LayoutAdminPage Component={CategoryManagementPage} />,
      },
      {
        path: ADMIN.PROFILE,
        element: <LayoutAdminPage Component={ProfilePage} />,
      },
    ],
  },

  // INSTRUCTOR
  {
    path: ROLE.INSTRUCTOR,
    element: <RequireAuth allowedRoles={[ROLE.INSTRUCTOR]} />,
    children: [
      {
        index: true,
        element: <LayoutAdminPage Component={InstructorDashboardPage} />,
      },
      {
        path: INSTRUCTOR.SETTINGS,
        element: <LayoutMain Component={SettingPage} />,
      },
      {
        path: INSTRUCTOR.DASHBOARD,
        element: <LayoutAdminPage Component={InstructorDashboardPage} />,
      },
      {
        path: INSTRUCTOR.ANALYICS,
        element: <LayoutAdminPage Component={InstructorAnalyicsPage} />,
      },
      {
        path: INSTRUCTOR.NOTIFICATION,
        element: <LayoutAdminPage Component={InstructorNotificationPage} />,
      },
      {
        path: INSTRUCTOR.COURSES,
        element: <LayoutAdminPage Component={InstructorCoursePage} />,
      },
      {
        path: INSTRUCTOR.CERTIFICATE,
        element: <LayoutAdminPage Component={InstructorCertificatePage} />,
      },
      {
        path: INSTRUCTOR.CREATE_COURSE,
        element: <LayoutAdminPage Component={NewCoursePage} />,
      },
      {
        path: INSTRUCTOR.LEARNING_VIDEO,
        element: <LayoutCourse Component={CourseVideoPage} />,
      },
      {
        path: INSTRUCTOR.LEARNING_DOC,
        element: <LayoutCourse Component={CourseDocPage} />,
      },
      {
        path: INSTRUCTOR.LEARNING_QUIZ,
        element: <LayoutCourse Component={CourseQuizPage} />,
      },
      {
        path: INSTRUCTOR.LEARNING_ASSIGNMENT,
        element: <LayoutCourse Component={CourseAssignmentPage} />,
      },
      {
        path: INSTRUCTOR.FEEDBACK,
        element: <LayoutMain Component={FeedbackPage} />,
      },
      {
        path: INSTRUCTOR.INVOICE,
        element: <InvoicePage />,
      },
      {
        path: INSTRUCTOR.CERTIFICATE_CENTER,
        element: <LayoutCart Component={CertificateCenterPage} />,
      },
      {
        path: INSTRUCTOR.CERTIFICATION_FORM,
        element: <LayoutCart Component={CertificationFormPage} />,
      },
      {
        path: INSTRUCTOR.CERTIFICATION_TEST,
        element: <LayoutCertificate Component={CertificationTestPage} />,
      },
      {
        path: INSTRUCTOR.CERTIFICATION_RESULTS,
        element: <LayoutCertificate Component={ResultPage} />,
      },
      {
        path: INSTRUCTOR.COURSE_CONTENT,
        element: <LayoutCourse Component={CourseContent} />,
      },
    ],
  },

  // STUDENT
  {
    path: ROLE.STUDENT,
    element: <RequireAuth allowedRoles={[ROLE.STUDENT]} />,
    children: [
      {
        index: true,
        element: <LayoutAdminPage Component={StudentCertificatePage} />,
      },
      {
        path: STUDENT.SETTINGS,
        element: <LayoutMain Component={SettingPage} />,
      },
      // student dashboard
      {
        path: STUDENT.CERTIFICATE,
        element: <LayoutAdminPage Component={StudentCertificatePage} />,
      },
      {
        path: STUDENT.PURCHASED_COURSES,
        element: <LayoutAdminPage Component={PurchasedCoursesPage} />,
      },
      {
        path: STUDENT.APPLY_JOB,
        element: <LayoutCart Component={ApplyJobPage} />,
      },
      {
        path: STUDENT.INSTRUCTOR_SIGNUP,
        element: <LayoutAuth Component={InstructorSignUpPage} />,
      },
      {
        path: STUDENT.LEARNING_VIDEO,
        element: <LayoutCourse Component={CourseVideoPage} />,
      },
      {
        path: STUDENT.LEARNING_DOC,
        element: <LayoutCourse Component={CourseDocPage} />,
      },
      {
        path: STUDENT.LEARNING_QUIZ,
        element: <LayoutCourse Component={CourseQuizPage} />,
      },
      {
        path: INSTRUCTOR.LEARNING_ASSIGNMENT,
        element: <LayoutCourse Component={CourseAssignmentPage} />,
      },
      {
        path: STUDENT.FEEDBACK,
        element: <LayoutMain Component={FeedbackPage} />,
      },
      {
        path: STUDENT.PROFILE,
        element: <LayoutMain Component={ProfilePage} />,
      },
      {
        path: STUDENT.INVOICE,
        element: <InvoicePage />,
      },
      {
        path: STUDENT.CERTIFICATE_CENTER,
        element: <LayoutCart Component={CertificateCenterPage} />,
      },
      {
        path: STUDENT.CERTIFICATION_FORM,
        element: <LayoutCart Component={CertificationFormPage} />,
      },
      {
        path: STUDENT.CERTIFICATION_TEST,
        element: <LayoutCertificate Component={CertificationTestPage} />,
      },
      {
        path: STUDENT.CERTIFICATION_RESULTS,
        element: <LayoutCertificate Component={ResultPage} />,
      },
      {
        path: STUDENT.COURSE_CONTENT,
        element: <LayoutCourse Component={CourseContent} />,
      },
      {
        path: STUDENT.DASHBOARD,
        element: <LayoutAdminPage Component={StudentDashboardPage} />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <AudioProvider>
          <Loading>
            <RouterProvider router={router} />
          </Loading>
        </AudioProvider>
      </Suspense>
    </>
  );
}

export default App;
