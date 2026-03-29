/**
 * 
 Generating Mock seats 
 Rows 15 
 Seats in each row 12
 */

import { Seat, SeatStatus, SeatTier } from "@/types/seat";

const ROWS = 15;
const SEATS_PER_ROW = 12;

export function generateSeats(): Seat[] {
    const seats: Seat[] = [];

    for (let row = 1; row <= ROWS; row++){
        for (let num = 1; num <= SEATS_PER_ROW; num++){
            let tierStatus: SeatTier = "CLASSIC";
            let tierPrice: number = 150;
            const seatAvailability: SeatStatus = Math.random() < 0.1 ? "reserved" : "available";

            if(row <= 3) {
                tierStatus = "VIP";
                tierPrice = 350;
            }else if (row <= 8) {
                tierStatus = "PREMIUM";
                tierPrice = 200;
            }
             seats.push({
               id: `${String.fromCharCode(64 + row)}${num}`,
               row,
               number: num,
               tier: tierStatus,
               price: tierPrice,
               status: seatAvailability,
               reservedUntil: null,
             });
        }
    }
    return seats;
}