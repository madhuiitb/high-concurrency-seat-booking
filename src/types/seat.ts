/**
 * 
 * 
    This becomes your single source of truth across:
    reducer
    API routes
    UI components
    services layer
 */


export type SeatStatus =
  | "available"
  | "selected"
  | "unavailable"
  | "reserved"
  | "booked";

export type SeatTier =
    | "VIP"
    | "PREMIUM"
    | "CLASSIC"

export interface Seat {
  id: string;
  row: number;
  column: number;
  price: number;
  tier: SeatTier;
  status: SeatStatus;
  reservedUntil: number | null;
}