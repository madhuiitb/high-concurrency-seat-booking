// Every 5 seconds randomly change 1–2 seats to unavailable


import { getSeats, updateSeats } from "./seatStore";

export function simulateSeatConflicts() {
    const seats = [...getSeats()];

    const availableSeats = seats.filter((seat) => seat.status === "available");

    const randomSeats = availableSeats.sort(() => 0.5 - Math.random()).slice(0, 2);

    randomSeats.forEach((seat) => seat.status = "reserved");
    
    updateSeats(seats);
}