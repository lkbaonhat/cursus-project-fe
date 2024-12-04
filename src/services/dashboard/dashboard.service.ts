import { https } from "../config";

export const dashboardService = {
    getRevenueData: (year: number) => {
        return https.get(`/order/revenue/monthly?year=${year}`);
    },
    getWeeklyRevenueData: () => {
        return https.get(`/order/revenue/weekly`);
    },
    getVisitorsByMonth: () => {
        return https.get('/analytics/visitors');
    },
    getCompletionRate: () => {
        return https.get('/progress/completion-rates');
    },
    getAverageProgress: () => {
        return https.get('/progress/average-progress');
    }
};