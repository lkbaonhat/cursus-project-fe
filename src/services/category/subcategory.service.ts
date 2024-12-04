import { https } from "../config";

export const subcategoryService = {
    getSubCategory: () => {
        return https.get("/sub-category");
    },
    createSubcategory: (
        categoryId: string,
        subcategoryData: { name: string }[]
    ) => {
        return https.post(`/sub-category/create/${categoryId}`, subcategoryData);
    },
    removeSubcategory: (id: string) => {
        return https.post(`/sub-category/remove-subcategory`, { subCategoryId: id });
    },
};