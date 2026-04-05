import { getSeats, updateSeats } from "./seatStore";

let engineStarted = false;

export function simulateSeatConflicts() {
  const seats = getSeats().map((seat) => ({ ...seat }));

  const candidates = seats.filter((seat) => seat.status === "available");

  if (!candidates.length) return [];

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

export function startConcurrencyEngine() {
  if (engineStarted) return;

  engineStarted = true;

  setInterval(() => {
    if (Math.random() < 0.2) {
      simulateSeatConflicts();
    }
  }, 25000);

  setInterval(() => {
    releaseExpiredSeats();
  }, 10000);
}