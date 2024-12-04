import { useEffect, useState } from 'react';
import loadingGif from '../output-onlinegiftools.gif'
import './index.scss'
interface LoadingWrapperProps {
    children?: React.ReactNode;
}

const Loading: React.FC<LoadingWrapperProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    if (isLoading) {
        return (
            <div className="loading-main">
                <div className="loading-page">
                    <img src={loadingGif} alt="Loading..." />
                    <div className="name-container">
                        <div className="logo-name">Cursus</div>
                    </div>
                    <div className="sub-text">
                        Bringing Joy and Knowledge to Everyone!
                    </div>

                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default Loading
