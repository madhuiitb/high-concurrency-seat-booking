
import { createContext, useReducer, Dispatch, ReactNode } from "react";
import { SeatAction, seatReducer, SeatState } from "@/state/seatReducer";

interface SeatContextType {
    state: SeatState
    dispatch:Dispatch<SeatAction>
}

const initialSeatState:SeatState = {
    selectedSeats: [],
    reservedSeats: [],
    timer:null,
}

export const SeatContext = createContext<SeatContextType | null>(null);

export function SeatProvider({ children }:{children:ReactNode}) {
    const [state, dispatch] = useReducer(seatReducer, initialSeatState);

    return (<SeatContext.Provider value={{state,dispatch}}>
        {children}
        </SeatContext.Provider>
    )
}