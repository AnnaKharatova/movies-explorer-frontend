import { useState, useEffect } from "react";

export function useWindowResize() {

    const [cardsPerRow, setCardsPerRow] = useState(0);
    const [loadMoreCount, setLoadMoreCount] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [displayedMovies, setDisplayedMovies] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setTimeout(() => {
                setWindowWidth(window.innerWidth);
                setDisplayedMovies(cardsPerRow)
            }, 200)
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth, cardsPerRow]);
    
    useEffect(() => {
        if (windowWidth < 725) {
            setCardsPerRow(1);
            setLoadMoreCount(2);
        } else if (windowWidth < 990) {
            setCardsPerRow(2);
            setLoadMoreCount(2);
        } else if (windowWidth < 1280) {
            setCardsPerRow(3);
            setLoadMoreCount(3);
        } else {
            setCardsPerRow(4);
            setLoadMoreCount(4);
        }
    }, [windowWidth]);

    return { displayedMovies, setDisplayedMovies, cardsPerRow, loadMoreCount };
    
}

