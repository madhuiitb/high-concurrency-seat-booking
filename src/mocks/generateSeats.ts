/**
 * 
 Generating Mock seats 
 Rows 10 
 Seats in each row 8
 */

import { Seat, SeatStatus, SeatTier } from "@/types/seat";

const ROWS = 10;
const SEATS_PER_ROW = 8;

export function generateSeats(): Seat[] {
    const seats: Seat[] = [];

    for (let rowIndex = 0; rowIndex < ROWS; rowIndex++) {
      const rowLabel = String.fromCharCode(65 + rowIndex);

      for (let column = 1; column <= SEATS_PER_ROW; column++) {
        let tierStatus: SeatTier = "CLASSIC";
        let tierPrice: number = 150;
        const seatAvailability: SeatStatus =
          Math.random() < 0.1 ? "reserved" : "available";

        if (rowIndex <= 1) {
          tierStatus = "VIP";
          tierPrice = 350;
        } else if (rowIndex <= 4) {
          tierStatus = "PREMIUM";
          tierPrice = 200;
        }
        seats.push({
          id: `${rowLabel}${column}`,
          row: rowIndex,
          column: column,
          tier: tierStatus,
          price: tierPrice,
          status: seatAvailability,
          reservedUntil: null,
        });
      }
    }
    return seats;
}