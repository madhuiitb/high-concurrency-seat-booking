// Frontend API client layer
/**
 * 
React Query → fetchSeats()
fetchSeats() → mockSeatAPI()
mockSeatAPI() → seatStore
 */

import { mockSeatsAPI } from "@/mocks/mockSeatsAPI";
import { Seat } from "@/types/seat";

export async function fetchSeats():Promise<Seat[]> {
  /**
    Direct connect with backend API's (Zero UI change required)
    return fetch("/api/seats").then(res => res.json());
 */
  return mockSeatsAPI();
}
