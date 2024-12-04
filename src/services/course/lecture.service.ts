import { https } from "../config";

export const lectureService = {
    createLecture: (data: any) => {
        return https.post("/lecture/create", data);
    },
    updateLecture: (data: any) => {
        return https.post(`/lecture/update/${data.lectureId}`, {
            sectionId: data.sectionId,
            title: data.title,
            description: data.description,
            freePreview: data.freePreview,
            duration: data.duration,
            videoUrl: data.videoUrl,
            videoPosterUrl: data.videoPosterUrl,
            uploadedFiles: data.uploadedFiles
        });
    },
    deleteLecture: (id: string) => {
        return https.delete(`/lecture/delete/${id}`);
    },
    getLectureById: (id: string) => {
        return https.get(`/lecture/id=${id}`);
    },
};