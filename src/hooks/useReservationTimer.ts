import { useCallback, useEffect, useState } from "react";


export default function useReservationTimer(reservedUntil?:number) {
    const [remaningSeconds, setRemaningSeconds] = useState(0);
    
    const getRemainingTime = useCallback(() => {

        if (!reservedUntil) {
            return 0;
        }
        return Math.max(0, Math.floor((reservedUntil - Date.now()) / 1000));
    },[reservedUntil]);

   

    useEffect(() => {
        if (!reservedUntil) {
            return;
        }

        const interval = setInterval(() => {
            setRemaningSeconds(getRemainingTime());
        }, 1000);
        return () => clearInterval(interval);
    }, [reservedUntil, getRemainingTime]);

    return remaningSeconds;
}