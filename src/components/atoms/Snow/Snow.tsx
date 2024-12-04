import { useEffect, useState } from "react";
import styled from "styled-components";

interface SnowProps {
    id: number;
    left: number;
    top: number;
    width: number;
    duration: number;
    blur: number;
}

const SnowIcon = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("https://res.cloudinary.com/dwyzqcunj/image/upload/v1732582262/snow_avbszz.png");
  background-size: cover;
  z-index: 9999;
  animation: fall 5s linear infinite;

  @keyframes fall {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
`;

const Snow = () => {
    const count = 50;
    const [snows, setSnows] = useState<SnowProps[]>([]);

    useEffect(() => {
        const generateSnows = () => {
            const flakes = [];
            for (let i = 0; i < count; i++) {
                flakes.push({
                    id: i,
                    left: Math.random() * window.innerWidth,
                    top: 0,
                    width: Math.random() * 50,
                    duration: Math.random() * 5 + 5,
                    blur: Math.random() * 5,
                });
            }
            setSnows(flakes);
        };

        generateSnows();
    }, []);

    return (
        <>
            {snows.map((snow: SnowProps) => (
                <SnowIcon
                    key={snow.id}
                    style={{
                        left: snow.left,
                        top: snow.top,
                        width: `${snow.width}px`,
                        height: `${snow.width}px`,
                        animationDuration: `${snow.duration}s`,
                        filter: `blur(${snow.blur}px)`,
                    }}
                />
            ))}
        </>
    );
};

export default Snow;
