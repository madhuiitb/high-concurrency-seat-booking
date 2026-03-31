/**
 * 
 * 
    availability → React Query
    selection → reducer
    timer → reducer
 */
export interface SeatState {
    selectedSeats: string[]
    reservedSeats: string[]
    timer: number | null
}

// These represent user intent, not UI behavior.

export type SeatAction =
  | { type: "SELECT_SEAT"; payload: string }
  | { type: "DESELECT_SEAT"; payload: string }
  | { type: "CLEAR_SELECTION" }
  | { type: "START_TIMER"; payload: number }
  | { type: "TICK_TIMER" }
  | { type: "EXPIRE_SELECTION" }
    | { type: "RESERVE_SEAT" }
    | { type: "REMOVE_CONFLICTED_SEATS"; payload: string[] };
    

export function seatReducer(state: SeatState, action: SeatAction): SeatState {
    switch (action.type) {
        case "SELECT_SEAT":
            if (state.selectedSeats.includes(action.payload) || state.reservedSeats.includes(action.payload)) {
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
        case "START_TIMER":
            return {
                ...state,
                timer:action.payload
            }
        case "TICK_TIMER":
            if (state.timer === null || state.timer === 0) {
                return {...state,timer:0}
            }
            return {
                ...state,
                timer: state.timer -1
            }
        case "EXPIRE_SELECTION": 
            return {
                ...state,
                selectedSeats:[],
                timer:null
            }
        case "RESERVE_SEAT":
            return {
                ...state,
                reservedSeats: [...state.reservedSeats, ...state.selectedSeats],
                selectedSeats: [],
                timer:null,
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
    