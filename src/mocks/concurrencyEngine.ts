// Every 5 seconds randomly change 1–2 seats to unavailable

import { getSeats, updateSeats } from "./seatStore";

export function simulateSeatConflicts() {
  const seats = getSeats().map((seat) => ({ ...seat }));

  const candidates = seats.filter((seat) => seat.status === "available");

  if (!candidates.length) {
    return [];
  }

  const numberToBlock = Math.floor(Math.random() * 2) + 1;

  const randomSeats = candidates
    .sort(() => 0.5 - Math.random())
    .slice(0, numberToBlock);

  const conflictedSeatIds: string[] = [];

  randomSeats.forEach((seat) => {
    seat.status = "reserved";
    seat.reservedUntil = Date.now() + 2 * 60 * 1000;
    conflictedSeatIds.push(seat.id);
  });

  updateSeats(seats);
  return conflictedSeatIds;
}

export function releaseExpiredSeats() {
  const seats = getSeats();

  const now = Date.now();

  seats.forEach((seat) => {
    if (
      seat.status === "reserved" &&
      seat.reservedUntil &&
      seat.reservedUntil < now
    ) {
      seat.status = "available";
      seat.reservedUntil = null;
    }
  });

  updateSeats(seats);
}

setInterval(() => {
    if (Math.random() < 0.2) {
      simulateSeatConflicts();
 }
}, 25000);

setInterval(() => {
  releaseExpiredSeats();
}, 10000);