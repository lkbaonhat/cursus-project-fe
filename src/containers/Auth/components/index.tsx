import { Button } from "@/components/atoms/Button/Button";
import { useEffect, useState } from "react";

interface ButtonAuthProps {
    children: React.ReactNode;
    onClick: () => void;
}

export const ButtonAuth = ({ children, onClick }: ButtonAuthProps) => {
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (disabled) {
            setTimeout(() => {
                setDisabled(false);
            }, 2000);
        }
    }, [disabled]);

    const handleDisabled = (e: React.MouseEvent) => {
        e.preventDefault();
        setDisabled(true);
        onClick();
    };

    return (
        <Button
            width="100%"
            height="100%"
            fontSize="18px"
            padding="10px 0"
            border_radius="5px"
            disabled={disabled}
            onClick={handleDisabled}
        >
            {children}
        </Button>
    );
};
