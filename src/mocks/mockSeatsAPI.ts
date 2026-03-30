// Mock API Layer

import { Seat } from "@/types/seat";
import { getSeats } from "./seatStore";
import { simulateSeatConflicts } from "./concurrencyEngine";

setInterval(() => {
  simulateSeatConflicts(); // Connect Conflict Engine to API Layer
}, 5000)


export async function mockSeatsAPI():Promise<Seat[]> {
    await new Promise((resolve) => setTimeout(resolve, 400)); // simulate latency

    return getSeats();
}