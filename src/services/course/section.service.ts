import { https } from "../config";

export const sectionService = {
    getSectionByCourseId: (data: string) => {
        return https.get(`/section/${data}`);
    },
    getSection: () => {
        return https.get("/section/create");
    },
    createSection: (data: any) => {
        return https.post("/section/create", data);
    },
    updateSection: (data: any) => {
        return https.post(`/section/update/${data.sectionId}`, {name : data.name});
    },
    deleteSectionBySectionId: (id: string) => {
        return https.post(`/section/delete/${id}`);
    },
};