declare namespace ICourse {
  export interface Course {
    _id: string;
    title: string;
    shortDescription: string;
    description: string;
    studentLearn: string;
    requirements: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    levels: any[]; // Change the type to any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    language: any[]; // Change the type to any[]
    subCategoryId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    captions: any[]; // Change the type to any[]
    useId: string;
    introVideo: string;
    thumbnail: string;
    requireLogIn: boolean;
    requireEnroll: boolean;
    price: number;
    discount: number;
    status: string;
    createdAt: string;
    author: { fullname: string; email: string }[];
    subCategory: { name: string }[];
    rejectionReason: string;
  }

  export interface subCategory {
    _id: string;
    name: string;
    slug?: string;
    categoryId: string;
  }

  export interface Category {
    _id: string;
    name: string;
    slug?: string;
    subcategories: subCategory[];
  }

  export interface Lecture {
    _id: string;
    sectionId: string;
    title: string;
    description: string;
    freePreview: boolean;
    videoUrl: string;
    duration: string;
    videoPosterUrl: string;
    uploadedFiles: Array<{ id: number; name: string; url: string }>;
  }

  export interface Option {
    id: number;
    title: string;
    isCorrect: boolean;
  }

  export interface Question {
    _id?: number;
    question: string;
    options?: Option[];
    correctAnswer?: string;
    score: number;
    type: string;
  }

  export interface Quiz {
    _id: string;
    sectionId: string;
    title: string;
    description: string;
    timeLimit: number;
    quizGradable: boolean;
    passingScore: number;
    showTime: boolean;
    questionLimit: number;
    questions: Question[];
  }

  export interface Assignment {
    _id: string;
    sectionId: string;
    title: string;
    description: string;
    timeDuration: number;
    totalNumber: number;
    minPassNumber: number;
    uploadLimit: number;
    maxAttachmentSize: number;
    uploadedFiles: Array<{ id: number; name: string; url: string }>;
  }
  export interface Section {
    _id: string;
    name: string;
    courseId: string;
    listLecture: Lecture[];
    listQuiz: Quiz[];
    listAssignment: Assignment[];
  }

  export interface QUIZRESULT {
    _id?: string;
    quizId?: string;
    userId?: string;
    score?: number;
    result?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
