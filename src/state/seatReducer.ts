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
    | { type: "RESERVE_SEAT" }
    | { type: "REMOVE_CONFLICTED_SEATS"; payload: string[] };
    

export function seatReducer(
    state: SeatState,
    action: SeatAction
): SeatState {
    switch (action.type) {
        case "SELECT_SEAT":
            if (state.selectedSeats.includes(action.payload) || state.reservedSeats.some((seat)=>seat.id===action.payload)) {
                return state;
            }
            return {
                ...state,
                selectedSeats: [...state.selectedSeats, action.payload]
            };
        case "DESELECT_SEAT":
            return {
                ...state,
                selectedSeats:state.selectedSeats.filter((seat)=>seat!==action.payload)
            }
        case "CLEAR_SELECTION": 
            return {
                ...state,
                selectedSeats:[]
            }
    
        case "EXPIRE_SELECTION": 
            const now = Date.now();
            return {
                ...state,
                reservedSeats: state.reservedSeats.filter((seat)=>seat.reservedUntil && seat.reservedUntil > now)
            }
        case "RESERVE_SEAT":
            const expirationTime = Date.now() + 5 * 60 * 1000;
            
            return {
                ...state,
                reservedSeats: [...state.reservedSeats,
                    ...state.selectedSeats.map(id => ({ id, reservedUntil: expirationTime }))],
                selectedSeats:[]
            }
        case "REMOVE_CONFLICTED_SEATS":
            return {
                ...state,
                selectedSeats:state.selectedSeats.filter((seatId)=>!action.payload.includes(seatId))
            }
        default:
            return state;
    }
    
}
    