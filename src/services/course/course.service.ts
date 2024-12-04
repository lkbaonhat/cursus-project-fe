import { https } from "../config";

export const courseService = {
  //Create
  createCourse: (data: any) => {
    return https.post("/course/create", data);
  },
  //Get
  getAllCourse: (status: string) => {
    return https.get("/course/all", { params: { status } });
  },
  getCourseApprovedAndRejected: () => {
    return https.get("/course/approved-and-rejected");
  },
  getCourseById: (id: string) => {
    return https.get(`/course/id=${id}`);
  },
  getAllNewsestCourse: () => {
    return https.get("/course/newest");
  },
  getCourseDetail: (slug: string) => {
    return https.get(`/course/${slug}`);
  },
  getInforCourseDashboard: () => {
    return https.get(`/course/statistics/dashboard`);
  },
  getMyCourse: (id: string) => {
    return https.get(`/course/course-instructor/${id}?status=approved`);
  },
  getCoursePurchasedByUserId: (id: string) => {
    return https.get(`/course/course-purchased/${id}`);
  },
  getProcessCourseOfUser: (data: any) => {
    return https.get(`progress/find-progress-course`, { params: data });
  },
  //Update
  updateViewCourseById: (id: string) => {
    return https.post(`/course/update-view/id=${id}`);
  },
  updateCourse: (id: string, data: any) => {
    return https.post(`/course/update/${id}`, data);
  },
  updateStatusCourse: (
    id: string,
    status: "approved" | "rejected",
    rejectionReason?: string
  ) => {
    return https.post(`/course/update/status/${id}`, {
      status,
      rejectionReason,
    });
  },
  publishCourse: (id: string) => {
    return https.post(`/course/publish-course/${id}`);
  },
  updateStatusProcessCourseOfUser: (data: any) => {
    return https.post(`progress/update-progress`, data);
  },

  getCourseByCategoryId: (categoryId: string) => {
    return https.get(`/course/category/category=${categoryId}`);
  },

  getInstructorCourse: (id: string) => {
    return https.get(`course/course-instructor/${id}?status=approved`);
  },
  getPurchaseCourse: (id: string) => {
    return https.get(`course/course-purchased/${id}`);
  },
  getInstructorPendingCourse: (id: string) => {
    return https.get(`course/course-instructor/${id}?status=pending`);
  },
  likeCourse: (payload: any) => {
    return https.post(`/course/${payload.courseId}/like/${payload.userId}`);
  },
  dislikeCourse: (payload: any) => {
    return https.post(`/course/${payload.courseId}/dislike/${payload.userId}`);
  },
  validateCourseReaction: (payload: any) => {
    return https.get(
      `/course/${payload.courseId}validate-course-reaction/${payload.userId}`
    );
  },
  findOneProgressByUserId: (data: any) => {
    return https.get(`/progress/find-progress-course`, { params: data });
  },
};
