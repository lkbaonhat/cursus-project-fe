import React, { useState } from 'react';
import Star from '@/components/atoms/Star/Star';
import { toast } from 'react-toastify';
import './index.scss';
import { useDispatch } from 'react-redux';
interface FeedbackProps {
    courseId: string;
    userId?: string;
}

const Feedback: React.FC<FeedbackProps> = ({ courseId, userId }) => {
    const [feedbackContent, setFeedbackContent] = useState('');
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();

    const handleSend = () => {
        if (!userId) {
            toast.error('You must be logged in to submit feedback.');
            return;
        }

        if (rating === 0) {
            toast.error('Please rate this course.');
            return;
        }

        const payload = {
            userId,
            courseId,
            rating,
            comment: feedbackContent.trim() || '',
        };

        dispatch({ type: 'postFeedback', payload });
        setFeedbackContent('');
        setRating(0);
    };

    const handleStarClick = (newRating: number) => {
        setRating(newRating === rating ? 0 : newRating);
    };
    return (
        <div className='send-feedback'>
            <h3>Send your feedback </h3>
            <div className='rating-select'>
                <p className='rate-course-review'>Rate this course:</p>
                <div className='star-rating'>
                    {Array.from({ length: 5 }, (_, i) => {
                        const isFullStar = i < rating;
                        const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;
                        return (
                            <Star
                                key={i}
                                size={20}
                                color="#f1c30d"
                                isHalf={isHalfStar}
                                isEmpty={!isFullStar && !isHalfStar}
                                onClick={() => handleStarClick(i + 1)}
                            />
                        );
                    })}
                </div>
            </div>
            <input
                value={feedbackContent}
                onChange={(e) => setFeedbackContent(e.target.value)}
                placeholder="Enter your feedback here..."
            />
            <div className='btn-send-feedback'>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};


export default Feedback;
