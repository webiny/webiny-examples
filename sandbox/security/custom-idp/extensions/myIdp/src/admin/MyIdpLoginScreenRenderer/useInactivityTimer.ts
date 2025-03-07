import { useRef } from "react";

const INACTIVITY_TIMEOUT = 3_600_000; // 1 hour.

const createTimeout = () => {
    return setTimeout(() => {
        // Reload browser after 1 hour of inactivity
        window.location.reload();
    }, INACTIVITY_TIMEOUT) as unknown as number;
};

export const useInactivityTimer = () => {
    const timerRef = useRef<number | undefined>(undefined);

    return {
        timer: timerRef.current,
        start: () => {
            timerRef.current = createTimeout();
        },
        restart: () => {
            clearTimeout(timerRef.current);
            timerRef.current = createTimeout();
        },
        clear: () => {
            clearTimeout(timerRef.current);
        }
    };
};
