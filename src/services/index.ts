import { categoryService } from "./category/category.service";
import { subcategoryService } from "./category/subcategory.service";
import { assignmentService } from "./course/assignment.service";
import { courseService } from "./course/course.service";
import { lectureService } from "./course/lecture.service";
import { quizService } from "./course/quiz.service";
import { sectionService } from "./course/section.service";
import { dashboardService } from "./dashboard/dashboard.service";
import { orderService } from "./order/order.service";
import { reviewService } from "./review/review.service";
import { userService } from "./user/user.service";

export const cursusAPI = {
    categoryService,
    subcategoryService,
    assignmentService,
    courseService,
    lectureService,
    quizService,
    sectionService,
    dashboardService,
    orderService,
    reviewService,
    userService,
}