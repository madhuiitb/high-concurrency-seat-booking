'use client'

import {
    createContext,
    useReducer,
    Dispatch,
    ReactNode,
    useEffect
} from "react";
import {
    SeatAction,
    seatReducer,
    SeatState
} from "@/state/seatReducer";
import { useQueryClient } from "@tanstack/react-query";
import { simulateSeatConflicts, startConcurrencyEngine } from "@/mocks/concurrencyEngine";

interface SeatContextType {
    state: SeatState
    dispatch:Dispatch<SeatAction>
}

const initialSeatState:SeatState = {
    selectedSeats: [],
    reservedSeats: [],
}

export const SeatContext = createContext<SeatContextType | null>(null);

export function SeatProvider({ children }:{children:ReactNode}) {
    const [state, dispatch] = useReducer(seatReducer, initialSeatState);

    const queryClient = useQueryClient();

    useEffect(() => {
        startConcurrencyEngine();   
    },[])

    // Conflict simulation for every 5 seconds
    useEffect(() => {
        const conflictInterval = setInterval(() => {
            const conflictedSeatIds = simulateSeatConflicts();
            dispatch({
                type: "REMOVE_CONFLICTED_SEATS",
                payload: conflictedSeatIds,
            });
            
            queryClient.invalidateQueries({
                queryKey: ["seats"]
            });
        }, 5000);

        return () => clearInterval(conflictInterval);
    }, [queryClient]);

    // Reservation expiry watcher runs every second

    useEffect(() => {
        const expiryInterval = setInterval(() => {
            dispatch({
                type: "EXPIRE_SELECTION",
            });
        }, 1000);

        return () => clearInterval(expiryInterval);
    },[])

    return (<SeatContext.Provider value={{state,dispatch}}>
        {children}
        </SeatContext.Provider>
    )
}