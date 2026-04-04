// Mock API Layer

import { Seat } from "@/types/seat";
import { getSeats } from "./seatStore";

export async function mockSeatsAPI():Promise<Seat[]> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate latency

    return getSeats();
}