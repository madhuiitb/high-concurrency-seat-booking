import { Seat } from "@/types/seat";

export function groupSeatsByRow(seats:Seat[]) {
    const rows: Record<string, Seat[]> = {};

    seats.forEach((seat) => {
        if (!rows[seat.row]) {
            rows[seat.row] = [];
        }
        rows[seat.row].push(seat);
    });

    return Object.entries(rows).map(([row, seats]) => ({ row, seats }));
}