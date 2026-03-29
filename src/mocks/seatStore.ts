/**
 * 
 Seats persist between API calls.
 */

import { Seat } from "@/types/seat";
import { generateSeats } from "./generateSeats";


let seatStore: Seat[] = generateSeats();

export function getSeats() {
    return seatStore;
}

export function updateSeats(newSeats: Seat[]) {
    seatStore = newSeats;
}