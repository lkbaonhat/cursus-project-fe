import { https } from "../config";

export const userService = {
    getUser: () => {
        return https.get("/user/find-all");
    },
    getUserByStatus: (status: string) => {
        return https.get("user/all-users-with-status", { params: { status } });
    },
    postBecomeInstructor: (userId: string, data: any) => {
        return https.post(`/user/become-instructor/${userId}`, data);
    },
    deleteUser: (id: string) => {
        return https.post(`/user/delete/${id}`, { isActive: false });
    },
    approveAndRejectBecomeInstructor: (userId: string,
        status: "approved" | "rejected",
        rejectionReason?: string) => {

        return https.post(`/user/approve-instructor/${userId}`, {
            status,
            rejectionReason,
        });
    },
    getCountUserActive: () => {
        return https.get(`/user/count-active-users`);
    },
    getPopularInstructors: () => {
        return https.get(`/user/popular-instructors`);
    },
    getUserById: (id: string) => {
        return https.get(`/user/id=${id}`);
    },
    updateUserById: (id: string, data: any) => {
        return https.post(`/user/update-user/${id}`, data);
    },
    subscribe: (data: any) => {
        return https.post(`/user/${data.userId}/subscribe/${data.instructorId}`);
    },
    unsubscribe: (data: any) => {
        return https.post(`/user/${data.userId}/unsubscribe/${data.instructorId}`);
    },
    isInstructorSubscribed: (data: any) => {
        return https.get(`/user/${data.userId}/is-instructor-subscribed/${data.instructorId}`);
    },
    getSubscribedInstructors: (userId: any) => {
        return https.get(`/user/${userId}/subscribed-instructors`);
    },
    changePassword: (userId: string, data: any) => {
        return https.post(`/user/change-password/${userId}`, data);
    },
};