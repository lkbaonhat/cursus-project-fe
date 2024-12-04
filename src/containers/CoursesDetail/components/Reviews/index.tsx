import { useEffect, useRef, useState } from "react";
import ProgressBar from "../../../../components/molecules/ProcessBar/ProcessBar";
import ReviewItem from "../ReviewItem";
import Star from "../../../../components/atoms/Star/Star";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import {
    selectFilteredReviews,
    selectReviewsLoading,
    selectReviewSummary,
} from "@/modules/global/selector";
import Feedback from "../Feedback";
import { decodeJWT } from "@/utils/hooks/useUser";


const Reviews = ({ courseId, isBuyCourse }: { courseId: string; isBuyCourse: boolean | null }) => {
    const userId = decodeJWT()?.sub;
    const dispatch = useDispatch();
    const reviewSectionRef = useRef<HTMLDivElement>(null);
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [visibleReviewsCount, setVisibleReviewsCount] = useState(5);
    const [delayedLoading, setDelayedLoading] = useState(false);
    const reviewSummary = useSelector(selectReviewSummary) || {
        totalReviews: 0,
        averageRating: 0,
        ratingCounts: [0, 0, 0, 0, 0],
        ratingPercentages: [0, 0, 0, 0, 0],
    };
    const filteredReviews = useSelector(selectFilteredReviews) || [];
    const isReviewsLoading = useSelector(selectReviewsLoading);


    const handleFilterChange = (rating: number | null) => {

        if (ratingFilter === rating) {
            setRatingFilter(null);
            setVisibleReviewsCount(5);
            dispatch({
                type: "fetchFilteredReviews",
                payload: { courseId, ratingFilter: null },
            });
        } else {
            setRatingFilter(rating);
            setVisibleReviewsCount(5);
            setDelayedLoading(true);
            setTimeout(() => {
                dispatch({
                    type: "fetchFilteredReviews",
                    payload: { courseId, ratingFilter: rating },
                });
            }, 500);
        }
    };

    const showMoreReviews = () => {
        setVisibleReviewsCount((prev) => prev + 5);
    };

    const hideReviews = () => {
        setVisibleReviewsCount(5);
        reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (courseId) {
            dispatch({ type: "fetchReviewSummary", payload: { courseId } });
            dispatch({ type: "fetchFilteredReviews", payload: { courseId, ratingFilter: null } });
        }
    }, [courseId, dispatch]);

    useEffect(() => {
        if (isReviewsLoading) {
            setDelayedLoading(true);
            const timer = setTimeout(() => {
                setDelayedLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setDelayedLoading(false);
        }
    }, [isReviewsLoading]);

    return (
        <div className="student-preview">
            <div className="row">
                <div className="col-lg-5">
                    <div className="review-left">
                        <h3>Student Feedback</h3>
                        {reviewSummary && (
                            <>
                                <div className="total-rating">
                                    <div className="rating-number">
                                        {reviewSummary.averageRating?.toFixed
                                            ? reviewSummary.averageRating.toFixed(1)
                                            : "0.0"}
                                    </div>
                                    <div className="rating-box">
                                        {[...Array(5)].map((_, index) => {
                                            const isFullStar = index < Math.floor(reviewSummary.averageRating || 0);
                                            const isHalfStar =
                                                !isFullStar && index < (reviewSummary.averageRating || 0);
                                            return (
                                                <Star
                                                    key={index}
                                                    size={20}
                                                    isHalf={isHalfStar}
                                                    isEmpty={!isFullStar && !isHalfStar}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="rating">Course Rating</div>
                                </div>
                                <div className="rate">
                                    {reviewSummary.ratingPercentages.map((value, index) => (
                                        <div className="rate-process" key={index}>
                                            <div className="process">
                                                <ProgressBar value={value} />
                                            </div>
                                            <div className="rating-box">
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        size={20}
                                                        color={starIndex < 5 - index ? "#f1c30d" : undefined}
                                                        isEmpty={starIndex >= 5 - index}
                                                    />
                                                ))}
                                            </div>
                                            <div className="process-num">{value.toFixed(1)}%</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    {isBuyCourse &&
                        <div className='review-left-feedback'>
                            <Feedback courseId={courseId} userId={userId} />
                        </div>
                    }
                </div>

                <div className="col-lg-7">
                    <div className="review-right" ref={reviewSectionRef}>
                        <div className="filter-by-rating">
                            <span>Filter by:</span>
                            {[...Array(5)].map((_, index) => {
                                const starRating = 5 - index;
                                const isActive = ratingFilter === starRating;
                                return (
                                    <div
                                        key={index}
                                        className={`rating-star ${isActive ? "active" : ""}`}
                                        onClick={() => handleFilterChange(starRating)}
                                    >
                                        <div className="stars">
                                            {[...Array(starRating)].map((_, starIndex) => (
                                                <Star key={starIndex} size={16} color="#f1c30d" isEmpty={false} />
                                            ))}
                                        </div>
                                        <span className="rating-count">
                                            ({reviewSummary?.ratingCounts[starRating - 1] || 0})
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {(delayedLoading || isReviewsLoading) ? (
                            <div className="review-all">
                                {[...Array(visibleReviewsCount)].map((_, index) => (
                                    <div key={index} className="review-item">
                                        <Skeleton height={40} width="80%" style={{ marginBottom: 10 }} />
                                        <Skeleton width="50%" height={15} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="review-all">
                                {filteredReviews?.length ? (
                                    filteredReviews.slice(0, visibleReviewsCount).map((review) => (
                                        <ReviewItem
                                            key={review._id}
                                            fullname={review.userId.fullname || ''}
                                            image={review.userId.image}
                                            time={new Date(review.createdAt)}
                                            rating={review.rating}
                                            content={review.comment}
                                        />
                                    ))
                                ) : (
                                    <p>No reviews available for this course.</p>
                                )}

                                {/* Hiển thị nút Show More Reviews khi có nhiều hơn reviews hiện tại */}
                                {filteredReviews.length > visibleReviewsCount && (
                                    <div className="more-reviews">
                                        <a onClick={showMoreReviews}>Show More Reviews</a>
                                    </div>
                                )}

                                {/* Hiển thị nút Hide Reviews khi reviews đã được mở rộng */}
                                {visibleReviewsCount > 5 && (
                                    <div className="more-reviews">
                                        <a onClick={hideReviews}>Hide Reviews</a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
