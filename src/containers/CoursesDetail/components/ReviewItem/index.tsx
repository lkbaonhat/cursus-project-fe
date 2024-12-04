import "@/containers/CoursesDetail/components/ReviewItem/ReviewItem.scss";
import Star from "@/components/atoms/Star/Star";
import { formatDistanceToNow, isBefore, subDays } from "date-fns";

interface ReviewItemProps {
    fullname: string;
    image: string;
    time: Date;
    rating: number;
    content: string;

}

const ReviewItem: React.FC<ReviewItemProps> = ({
    fullname,
    image,
    time,
    rating,
    content,
}) => {
    const now = new Date();
    const formattedTime = isBefore(time, subDays(now, 7))
        ? time.toLocaleDateString()
        : formatDistanceToNow(time, { addSuffix: true });

    const renderStars = (rating: number) =>
        Array.from({ length: 5 }, (_, i) => {
            const isHalf = i === Math.floor(rating) && rating % 1 !== 0;
            const isEmpty = i >= Math.ceil(rating);

            return (
                <Star
                    key={i}
                    size={20}
                    color="#f1c30d"
                    isHalf={isHalf}
                    isEmpty={isEmpty}
                />
            );
        });

    return (
        <div className="review-item">
            <div className="review-user">
                <img
                    src={image || "https://gambolthemes.net/html-items/cursus-new-demo/images/hd_dp.jpg"}
                    onError={(e) => (e.currentTarget.src = "/path/to/placeholder.jpg")}
                    alt={`Profile of ${fullname}`}
                />
                <div className="review-user-info">
                    <h4 className="review-user-name">{fullname}</h4>
                    <span className="review-user-time">{formattedTime}</span>
                </div>
            </div>
            <div className="rating-box">{renderStars(rating)}</div>
            <p className="review-content">{content}</p>
        </div>
    );
};

export default ReviewItem;
