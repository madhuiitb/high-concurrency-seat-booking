/**
 * 
 * 
    availability → React Query
    selection → reducer
    timer → reducer
 */
export interface SeatState {
    selectedSeats: string[]
    reservedSeats: {
        id: string,
        reservedUntil: number
    }[]
}

// These represent user intent, not UI behavior.

export type SeatAction =
  | { type: "SELECT_SEAT"; payload: string }
  | { type: "DESELECT_SEAT"; payload: string }
  | { type: "CLEAR_SELECTION" }
  | { type: "EXPIRE_SELECTION" }
    | {
        type: "RESERVE_SEAT"; payload: {
            id: string,
            reservedUntil:number,
    } }
  | { type: "REMOVE_CONFLICTED_SEATS"; payload: string[] }
  | { type: "BOOKING_SUCCESS" }
    | { type: "CANCEL_RESERVATION"; payload: string }
    

export function seatReducer(
    state: SeatState,
    action: SeatAction
): SeatState {
    switch (action.type) {
        case "SELECT_SEAT":
            const now = Date.now();
            const activeReservations = state.reservedSeats.filter(seat => seat.reservedUntil > now);

            const alreadyReserved = activeReservations.some(seat => seat.id === action.payload);

            if (
              state.selectedSeats.includes(action.payload) || alreadyReserved) {
                return {
                  ...state,
                  reservedSeats: activeReservations
                };
            }
            return {
                ...state,
                reservedSeats:activeReservations,
                selectedSeats: [...state.selectedSeats, action.payload]
            };
        case "DESELECT_SEAT":
            return {
                ...state,
                selectedSeats: state.selectedSeats.filter((seat) => seat !== action.payload),
                reservedSeats: state.reservedSeats.filter(
      seat => seat.id !== action.payload)
            }
        case "CLEAR_SELECTION": 
            return {
                ...state,
                selectedSeats:[]
            }
    
        case "EXPIRE_SELECTION": 
            const currentTime = Date.now();
            return {
                ...state,
                reservedSeats: state.reservedSeats.filter((seat)=>seat.reservedUntil > currentTime)
            }
        case "RESERVE_SEAT":
            const activeReserved = state.reservedSeats.filter(seat => seat.reservedUntil > Date.now());
            
            return {
                ...state,
                reservedSeats: [...activeReserved,
                    action.payload],
                selectedSeats:state.selectedSeats.filter(id=>id!==action.payload.id)
            }
        case "REMOVE_CONFLICTED_SEATS":
            return {
                ...state,
                selectedSeats:state.selectedSeats.filter((seatId)=>!action.payload.includes(seatId))
            }
        case "BOOKING_SUCCESS":
            return {
                selectedSeats: [],
                reservedSeats: []
            }
        case "CANCEL_RESERVATION":
            return {
                ...state,
                reservedSeats: state.reservedSeats.filter(seat => seat.id !== action.payload),
                selectedSeats:state.selectedSeats.filter(id=>id!==action.payload)
            }
        default:
            return state;
    }
    
}
    