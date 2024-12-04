declare namespace IINSTRUCTOR {
  export interface DASHBOARD {
    totalSales: {
      total: number,
      new: number
    },
    totalEnroll: {
      total: number,
      new: number
    },
    totalCourses: {
      total: number,
      new: number,
    },
    totalStudents: {
      total: number,
      new: number
    }
  }

  export interface CERTIFICATE {
    _id: string;
    title: string;
    mark: number;
    outOf: number;
    uploadDate: string;
  }

  export interface COURSES {
    _id: string;
    title: string;
    price: number;
    totalSold: number;
    status: string;
    createdAt: string;
    approvedAt: string;
    subCategoryId: string;
    isDeleted: boolean;
  }

  export interface PENDING_COURSES {
    _id: string;
    title: string;
    price: number;
    totalSold: number;
    status: string;
    createdAt: string;
    approvedAt: string;
    subCategoryId: string;
    isDeleted: boolean;
  }

  export interface PURCHASES {
    _id: string;
    title: string;
    userId: string;
    price: number;
    deliveryType: string;
    subCategoryId: string;
    purchasedDate: string;
  }

  export interface INSTRUCTOR {
    _id?: string;
    fullname?: string;
    title?: string;
    courses?: string;
    students?: string;
    image?: string;
    youtube?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    categoryId?: string;
  }

  export interface INSTRUCTOR_COURSEDASHBOARD {
    image?: string;
    title?: string;
    view?: string;
    purchased?: string;
    totalLike?: string;
  }
}