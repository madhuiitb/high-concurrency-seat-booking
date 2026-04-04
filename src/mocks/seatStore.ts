/**
 * 
 Seats persist between API calls.
 Persistent in-memory database
 */

import { Seat } from "@/types/seat";
import { generateSeats } from "./generateSeats";
import "./concurrencyEngine";

let seatStore: Seat[] = generateSeats();

export function getSeats() {
    return seatStore.map(seat=>({...seat}));
}

export function updateSeats(newSeats: Seat[]) {
    seatStore = newSeats.map(seat=>({...seat}));
}