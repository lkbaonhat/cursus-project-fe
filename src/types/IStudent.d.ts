declare namespace IStudent {
    export interface Dashboard {
        totalEnroll: {
            total: number,
            new: number
        },
        totalCourses: {
            total: number,
            new: number,
        },
    }

    export interface Certificate {
        _id: string;
        title: string;
        mark: number;
        outOf: number;
        uploadDate: string;
    }

    export  interface PURCHASES{
        _id: string;
        title: string;
        userId: string;
        price: number;
        deliveryType: string;
        subCategoryId: string;
        purchasedDate: string;
    }
}