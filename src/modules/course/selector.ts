import { RootState } from "@/redux/store";

// Selector to get the counter value from the state
export const selectedLevels = (state: RootState) => state.course.levels;
export const selectedLanguages = (state: RootState) => state.course.languages;
export const selectedCategories = (state: RootState) => state.course.Categories;
export const selectedSections = (state: RootState) => state.course.sections;
export const selectedLectures = (state: RootState) => state.course.lectures;
export const selectedQuizes = (state: RootState) => state.course.quizes;
export const selectedAssignments = (state: RootState) => state.course.assignments;
export const selectedQuiz = (state: RootState) => state.course.quiz;
export const selectedLecture = (state: RootState) => state.course.lecture;
export const selectedQuizResult = (state: RootState) => state.course.quizResult;
export const selectedCourse = (state: RootState) => state.course.course;
export const selectedMyCourse = (state: RootState) => state.course.myCourse;