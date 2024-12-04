import { https } from "../config";

export const reviewService = {
  getCountAllReviews: () => {
    return https.get(`/reviews/count`);
  },
  getLimitReviews: (limit: number) => {
    return https.get(`/reviews/recent?limit=${limit}`);
  },
  getReviewSummaryByCourseId: (courseId: string) => {
    return https.get(`/reviews/summary/${courseId}`);
  },
  getFilteredReviews: (courseId: string, rating?: number) => {
    return https.get(`/reviews/filtered/${courseId}`, {
      params: { rating },
    });
  },
  getAverageRatingByCourseId: (courseId: string) => {
    return https.get(`/reviews/average-rating/${courseId}`);
  },
  getAverageRatingBySlug: (slug: string) => {
    return https.get(`/reviews/average-rating/slug/${slug}`);
  },
  postReview: (reviewData: {
    userId: string;
    courseId: string;
    rating: number;
    comment: string;
  }) => {
    return https.post(`/reviews/create`, reviewData);
  },
  checkReview: (courseId: string, userId: string) => {
    return https.get(`/reviews/check-review?courseId=${courseId}&userId=${userId}`);
  }
};