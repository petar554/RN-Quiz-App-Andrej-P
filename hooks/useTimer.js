import { useState, useEffect } from 'react'

// Konstante za definiranje dana, sati, minuta i sekunda
const DAYS_MS = 1000 * 60 * 60 * 24
const HOURS_MS = 1000 * 60 * 60
const MINUTES_MS = 1000 * 60
const SECONDS_MS = 1000

/* UTILITY FUNKCIJE */

/**
     * Formatira broj na temelju toga je li vrijednost jednoznamenkasta ili dvoznamenkasta
     */
const formatNumber = (number) => {
    return number < 10 ? `0${number}` : number
}

/**
     * Dohvaca konacnu vremensku razliku izmedju dana, sati, minuta i sekundi
     */
const getTimeDiff = (diffMS) => {
    let diff = diffMS
    const days = Math.floor(diff / DAYS_MS)
    diff -= days * DAYS_MS
    const hours = Math.floor(diff / HOURS_MS)
    diff -= hours * HOURS_MS
    const minutes = Math.floor(diff / MINUTES_MS)
    diff -= minutes * MINUTES_MS
    const seconds = Math.floor(diff / SECONDS_MS)

    return {
        days: formatNumber(days),
        hours: formatNumber(hours),
        minutes: formatNumber(minutes),
        seconds: formatNumber(seconds)
    }
}

// Custom hook za postavljanje countdown timera
const useTimer = ({
    initialTime,
    onComplete,
}) => {
    /* STANJA */
    const [timeLeft, setTimeLeft] = useState(initialTime - Date.now());  // Biljezi koliko vremena ostaje (oduzima se inicijalno vrijeme od trenutnog,
                                                                         // polazi se od pretpostavke da je inicijalno vrijeme u buducnosti)
    const [hasCompleted, setHasCompleted] = useState(false);             // Biljezi je li countdown timer dosegnuo kraj

    useEffect(() => {
        // Ako timer dosegne 00:00, te nije oznacen kao zavrsen,
        // izvrsi callback funkciju koja je poslana kao parametar,
        // oznaci da je countdown zavrsio s brojanjem, te prekini
        // izvrsavanje
        if (timeLeft <= 0 && !hasCompleted) {
            onComplete?.(); // ?.() provjerava je li vrijednost poslanog parametra null, te ako nije, izvrsava kao funkciju
            setHasCompleted(true); 
            setTimeLeft(0);
            return;
        }

        // Dok jos ima vremena, izvrsavaj countdown tako da se 
        // oduzima po jedna sekunda od preostalog vremena
        if (timeLeft > 0) {
            let countdown = setTimeout(() => {
                setTimeLeft((prev) => prev - 1000);
            }, 1000);

            return () => clearTimeout(countdown);
        }
    }, [timeLeft, onComplete, hasCompleted]);

    // Vrati vrijednost dana, sati, minuta i sekunda
    return getTimeDiff(timeLeft);
};

export default useTimer;
