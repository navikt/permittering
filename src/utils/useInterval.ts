import { useEffect, useRef } from 'react';

type UseInterval<T> = (callback: T, delay: number) => void;

export const useInterval: UseInterval<() => void> = (callback, delay) => {
    const savedCallback = useRef<typeof callback>();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        };
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};
