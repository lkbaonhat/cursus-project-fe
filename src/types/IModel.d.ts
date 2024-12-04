declare namespace MODEL {
  export interface IResponseBase<P = any> {
    status?: number | string;
    errorCode?: string | null;
    message?: string | null;
    success: boolean;
    result: P;
  }
  export interface IPagingResult<P = any> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    items: P[];
  }
  export interface IStyleProps {
    height?: string;
    width?: string;
    margin?: string;
    padding?: string;
    color?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    boxShadow?: string;
    transition?: string;
    onWidthChange?: (width: number) => void;
  }
  export interface CardProps {
    title?: string;
    image?: string;
    rating?: number;
    views?: number;
    duration?: string;
    dateCreated?: string;
    price?: number;
    instructor?: any;
    subCategory?: string;
    bestseller?: boolean;
    purchased?: boolean;
    className?: boolean;
    slug?: string;
  }

  export interface CardContactProps {
    name?: string;
    title?: string;
    image?: string;
    students?: string;
    courses?: string;
    className?: boolean;
  }

  export interface ImageProps {
    heightImg?: string;
  }

  interface Option {
    id: number;
    title: string;
    isCorrect: boolean;
  }

  export interface Question {
    type: string;
    question: string;
    score: number;
    options?: Option[];
    correctAnswer?: string;
    imageQuestion?: Array<{ id: number; name: string; url: string }>;
  }

  export interface LectureFormData {
    title: string;
    description: string;
    freePreview: boolean;
    videoUrl: string;
    uploadedFiles: Array<{ id: number; name: string; url: string }>;
  }

  export interface CART {
    _id: string;
    title: string;
    subCategory: string;
    author: string;
    price: number;
    image: string;
  }

  export interface USER {
    _id: string;
    fullname?: string;
    email: string;
    role: string;
    subcribe: number;
    status: string;
    categoryId: CATEGORY;
    description: string;
    image: string;
    createdAt: string;
    subcribe: number;
    isActive: boolean;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string
  }

  export interface COURSE {
    _id?: string;
    userId?: USER;
    title?: string;
    price?: number;
    image?: string;
    instructor?: any;
    author?: any;
    subCategory?: any;
    totalView?: number;
    rating?: number;
    bestseller?: boolean;
    slug?: string;
    duration?: string;
    description?: string;
    dateCreated?: string;
    createdAt?: string;
    role?: string;
    category?: string;
  }

  export interface CATEGORY {
    _id: string;
    name?: string;
    slug?: string;
    subcategories: SUBCATEGORY[];
  }

  export interface SUBCATEGORY {
    _id: string;
    name: string;
    slug?: string;
    categoryId: string;
  }

  export interface REVIEW {
    _id?: string;
    userId?: USER;
    courseId?: COURSE;
    rating?: number;
    comment?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  export interface WeeklyRevenueItem {
    dayOfWeek: number;
    totalRevenue: number;
  }

  export interface PROCESSCOURSEOFUSER {
    _id: string;
    userId: string;
    course: COURSEPROCESS[];
    sections: SECTIONSPROCESS[];
    lectures: LECTUREPOCESS[];
    quizzes: QUIZPROCESS[];
    assignments: ASSIGNMENTPROCESS[];
  }

  interface COURSEPROCESS {
    courseId: string;
    status: string;
    progress: number;
  }

  interface SECTIONSPROCESS {
    sectionId: string;
    status: string;
    progress: number;
  }

  interface LECTUREPOCESS {
    lectureId: string;
    status: string;
  }

  interface QUIZPROCESS {
    quizId: string;
    status: string;
    score: number;
  }

  interface ASSIGNMENTPROCESS {
    assignmentId: string;
    status: string;
  }
}
