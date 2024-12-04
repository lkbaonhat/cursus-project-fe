import { TbKayak, TbWindsock, TbAward } from "react-icons/tb";
import { IoSearch, IoChatbubblesOutline, IoAnalytics } from "react-icons/io5";
import {
  MdOutlineLayers,
  MdOutlineSupervisorAccount,
  MdOutlineSettings,
} from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { FaBook } from "react-icons/fa6";
import { LuBellRing, LuHome, LuPlusCircle } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { FiBook } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";
import { ADMIN, INSTRUCTOR, ROLE, ROUTES, STUDENT } from "@/routes";
import { decodeJWT } from "@/utils/hooks/useUser";

const userJWT = decodeJWT();
const role = userJWT?.role;

// GUEST
export const MainLayoutItems = (
  categories: { label: string; link: string }[],
  instructor: { image: string; label: string; link: string }[]
) => [
    // slideItems1
    [
      { content: "sidebar.home", icon: <LuHome />, link: "/" },
      {
        content: "sidebar.liveStream",
        icon: <TbKayak />,
        link: ROUTES.COMINGSOON,
      },
      { content: "sidebar.explore", icon: <IoSearch />, link: ROUTES.EXPLORE },
      {
        content: "sidebar.categories",
        icon: <MdOutlineLayers />,
        dropdownItems: categories,
        link: ROUTES.EXPLORE,
      },
    ],

    // slideItems2
    [
      ...instructor.slice(0, 5).map((item) => ({
        icon: <Avatar width="30px" height="30px" src={item.image || "https://gambolthemes.net/html-items/cursus-new-demo/images/hd_dp.jpg"} alt="avatar" />,
        content: item.label,
        link: item.link,
      })),
      {
        content: "sidebar.browseinstructors",
        icon: <LuPlusCircle size={20} />,
        link: ROUTES.ALL_INSTRUCTOR,
      },
    ],

    // slideItems3
    [
      {
        content: "sidebar.settings",
        icon: <MdOutlineSettings />,
        link: `/${role ?? ROLE.STUDENT}/${STUDENT.SETTINGS}`,
      },
      {
        content: "sidebar.help",
        icon: <FaRegQuestionCircle />,
        link: ROUTES.HELP,
      },
      {
        content: "sidebar.reportHistory",
        icon: <TbWindsock />,
        link: "/report",
      },
      // {
      //   content: "sidebar.sendFeedback",
      //   icon: <BiCommentError />,
      //   link: `/${role ?? ROLE.STUDENT}/${STUDENT.FEEDBACK}`,
      // },
    ],
  ];

// ADMIN

export const AdminLayoutItems = [
  // items1
  [
    {
      content: "Dashboard",
      icon: <IoAnalytics />,
      link: `/${ROLE.ADMIN}/${ADMIN.DASHBOARD}`,
    },
    {
      content: "Account Management",
      icon: <MdOutlineSupervisorAccount />,
      dropdownItems: [
        {
          label: "Account",
          link: `/${ROLE.ADMIN}/${ADMIN.ACCOUNTS_MANAGEMENT}`,
        },
        {
          label: "Account Approval",
          link: `/${ROLE.ADMIN}/${ADMIN.ACCOUNT_APPROVAL}`,
        },
      ],
    },

    {
      content: "Course Management",
      icon: <FaBook />,
      dropdownItems: [
        { label: "Course", link: `/${ROLE.ADMIN}/${ADMIN.COURSES_MANAGEMENT}` },
        {
          label: "Course Approval",
          link: `/${ROLE.ADMIN}/${ADMIN.COURSES_APPROVAL}`,
        },
      ],
    },
    {
      content: "Category Management",
      icon: <AiFillProduct />,
      link: `/${ROLE.ADMIN}/${ADMIN.CATEGORY_MANAGEMENT}`,
    },
  ],
  // items2
  [
    {
      content: "Settings",
      icon: <MdOutlineSettings />,
      link: `/${ROLE.ADMIN}/${ADMIN.SETTINGS}`,
    },
  ],
];

// STUDENTS

export const StudentsLayoutItems = [
  // items1
  [
    {
      content: "Dashboard",
      icon: <RxDashboard />,
      link: `/${ROLE.STUDENT}/${STUDENT.DASHBOARD}`,
    },
    {
      content: "Purchased Courses",
      icon: <FiBook />,
      link: `/${ROLE.STUDENT}/${STUDENT.PURCHASED_COURSES}`,
    },
    // { content: "Messages", icon: <IoChatbubblesOutline />, link: "/message" },
    // { content: "Notifications", icon: <LuBellRing />, link: "/notificates" },
    {
      content: "My Certificates",
      icon: <TbAward />,
      link: `/${ROLE.STUDENT}/${STUDENT.CERTIFICATE}`,
    },
    // { content: "Reviews", icon: <FaRegStar />, link: "/reviews" },
    // { content: "Credits", icon: <LuWallet />, link: "/credit" },
    // { content: "Statements", icon: <GrDocumentText />, link: "/statements" },
  ],
  // items2
  [
    {
      content: "Settings",
      icon: <MdOutlineSettings />,
      link: `/${ROLE.STUDENT}/${STUDENT.SETTINGS}`,
    },
    // {
    //   content: "Send Feedback",
    //   icon: <BiCommentError />,
    //   link: `/${ROLE.STUDENT}/${STUDENT.FEEDBACK}`,
    // },
  ],
];

// INSTRUCTOR

export const InstructorLayoutItems = [
  // items1
  [
    {
      content: "Dashboard",
      icon: <RxDashboard />,
      link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.DASHBOARD}`,
    },
    {
      content: "Courses",
      icon: <FiBook />,
      link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.COURSES}`,
    },
    {
      content: "Analytics",
      icon: <IoAnalytics />,
      link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.ANALYICS}`,
    },
    {
      content: "Create Courses",
      icon: <GoPlusCircle />,
      link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CREATE_COURSE}`,
    },
    // { content: "Messages", icon: <IoChatbubblesOutline />, link: "/message" },
    {
      content: "Notifications",
      icon: <LuBellRing />,
      link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.NOTIFICATION}`,
    },
    {
      content: "My Certificates",
      icon: <TbAward />,
      link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.CERTIFICATE}`,
    },
    // { content: "Reviews", icon: <FaRegStar />, link: "/reviews" },
    // { content: "Earning", icon: <PiCurrencyDollarSimple />, link: "/earning" },
    // { content: "Payout", icon: <LuWallet />, link: "/payout" },
    // { content: "Statements", icon: <GrDocumentText />, link: "/statements" },
    // {
    //   content: "Verification",
    //   icon: <FaRegCircleCheck />,
    //   link: "/verification",
    // },
  ],
  // items2
  [
    {
      content: "Settings",
      icon: <MdOutlineSettings />,
      link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.SETTINGS}`,
    },
    // {
    //   content: "Send Feedback",
    //   icon: <BiCommentError />,
    //   link: `/${ROLE.INSTRUCTOR}/${INSTRUCTOR.FEEDBACK}`,
    // },
  ],
];
