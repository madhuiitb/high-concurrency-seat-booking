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

export type SeatTier =
    | "VIP"
    | "PREMIUM"
    | "CLASSIC"

export interface Seat {
    id: string
    row: number
    number: number
    tier: SeatTier
    status: SeatStatus
    price: number
    reservedUntil?: number | null
}