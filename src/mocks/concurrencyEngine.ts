// Every 5 seconds randomly change 1–2 seats to unavailable


import { getSeats, updateSeats } from "./seatStore";

export function simulateSeatConflicts() {
    const seats = [...getSeats()];

    const candidates = seats.filter((seat) => seat.status === "available" || seat.status === "selected");
    
    if (!candidates.length) {
        return [];
    }

    const numberToBlock = Math.floor(Math.random() * 2) + 1;

    const randomSeats = candidates
      .sort(() => 0.5 - Math.random())
        .slice(0, numberToBlock);
    
    const conflictedSeatIds: string[] = [];

    randomSeats.forEach((seat) => {
        seat.status = "unavailable";
        seat.reservedUntil = null;
        conflictedSeatIds.push(seat.id);
    });
    
    updateSeats(seats);
    return conflictedSeatIds;
}