import { IoIosStar, IoIosStarHalf } from "react-icons/io";

interface StarProps {
    size?: number;
    color?: string;
    isHalf?: boolean;
    isEmpty?: boolean;
    onClick?: () => void;
}

function Star({ size = 24, color = "#f1c30d", isHalf = false, isEmpty = false, onClick }: StarProps) {
    const starColor = isEmpty ? "#ccc" : color;

    return (
        <span onClick={onClick}> {/* Add onClick to the span wrapping the star */}
            {isHalf ? (
                <IoIosStarHalf className="star" style={{ fontSize: size, color: starColor }} />
            ) : (
                <IoIosStar className="star" style={{ fontSize: size, color: starColor }} />
            )}
        </span>
    );
}

export default Star;
