import { https } from "../config";

export const assignmentService = {
    createAssignment: (data: any) => {
        return https.post("/assignment/create", data);
    },
    updateAssignment: (data: any) => {
        return https.post(`/assignment/update/${data.assignmentId}`, 
            {
                sectionId: data.sectionId,
                title: data.title,
                description: data.description,
                timeDuration: data.timeDuration,
                totalNumber: data.totalNumber,
                minPassNumber: data.minPassNumber,
                uploadLimit: data.uploadLimit,
                maxAttachmentSize: data.maxAttachmentSize,
                uploadedFiles: data.uploadedFiles
            }
        );
    },
}