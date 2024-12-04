import { https } from "../config";

export const orderService = {
    createOrder: (data: any) => {
        return https.post("/order/create", data);
    },
    getOrderByUserId: (id: string) => {
        return https.get(`/order/user/userId=${id}`);
    },
    getOrderOneCourse: (data: { userId: string; courseId: string }) => {
        return https.get(`/order/user/one-course`, { params: data });
    },
};