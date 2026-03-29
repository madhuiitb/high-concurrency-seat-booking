
import { SeatContext } from "@/providers/SeatProvider";
import { useContext } from "react";


export function useSeatState() {
    const context = useContext(SeatContext);

    if (!context) {
        throw new Error("useSeatState must be used inside SeatProvider")

    }
    return context;
}