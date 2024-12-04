import { https } from "../config";

export const categoryService = {
    getCategory: () => {
        return https.get("/category");
    },
    createCategory: (data: { name: string }) => {
        return https.post("/category/create", data);
    },
    updateCategory: (categoryId: string, data: { name: string }) => {
        return https.post(`/category/update/${categoryId}`, data);
    },
};