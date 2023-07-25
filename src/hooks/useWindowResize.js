import { useState, useEffect } from "react";
import {
    RESIZE_TIMEOUT,
    WIDTH_725,
    WIDTH_990,
    WIDTH_1280,
    CARDS_IN_ROW_RES_320_725,
    MORE_CARDS_RES_320_725,
    CARDS_IN_ROW_RES_725_990,
    MORE_CARDS_RES_725_990,
    CARDS_IN_ROW_RES_990_1280,
    MORE_CARDS_RES_990_1280,
    CARDS_IN_ROW_RES_MORE_1280,
    MORE_CARDS_RES_MORE_1280,
} from '../utils/constants'

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
            }, { RESIZE_TIMEOUT })
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth, cardsPerRow]);

    useEffect(() => {
        if (windowWidth < WIDTH_725) {
            setCardsPerRow(CARDS_IN_ROW_RES_320_725);
            setLoadMoreCount(MORE_CARDS_RES_320_725);
        } else if (windowWidth < WIDTH_990) {
            setCardsPerRow(CARDS_IN_ROW_RES_725_990);
            setLoadMoreCount(MORE_CARDS_RES_725_990);
        } else if (windowWidth < WIDTH_1280) {
            setCardsPerRow(CARDS_IN_ROW_RES_990_1280);
            setLoadMoreCount(MORE_CARDS_RES_990_1280);
        } else {
            setCardsPerRow(CARDS_IN_ROW_RES_MORE_1280);
            setLoadMoreCount(MORE_CARDS_RES_MORE_1280);
        }
    }, [windowWidth]);

    return { displayedMovies, setDisplayedMovies, cardsPerRow, loadMoreCount };
}

