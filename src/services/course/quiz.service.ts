import { https } from "../config";

export const quizService = {
    createQuiz: (data: any) => {
        return https.post("/quiz/create", data);
    },
    updateQuiz: (data: any) => {
        return https.post(`/quiz/update/${data.quizId}`, {
            sectionId: data.sectionId,
            title: data.title,
            description: data.description,
            questions: data.questions,
            quizGradable: data.quizGradable,
            showTime: data.showTime,
            timeLimit: data.timeLimit,
            passingScore: data.passingScore,
            questionLimit: data.questionLimit
        });
    },
    deleteQuiz: (quizId: string) => {
        return https.delete(`/quiz/delete/${quizId}`);
    },
    getListQuestionsByQuizId: (quizId: string) => {
        return https.get(`/quiz/list-question/${quizId}`);
    },
    saveResultQuiz: (data: any) => {
        return https.post("/quiz/save-result", data);
    },
    getQuizResultByUserIdAndQuizId: (userId: string, quizId: string) => {
        return https.get(`/quiz/quiz-results/userId=${userId}&quizId=${quizId}`);
    },
};