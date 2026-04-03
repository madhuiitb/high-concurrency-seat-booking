import { useSeatState } from "@/state/useSeatState";
import { Seat } from "@/types/seat";

interface SeatProps{
    seat: Seat,
}
export default function SeatCell({ seat }: SeatProps) {
    const { state, dispatch } = useSeatState();
  const isSelected = state.selectedSeats.includes(seat.id);
  const isReserved = seat.status === "reserved";

  const handleClick = () => {
    if (isReserved) {
      return;
        }
        dispatch({
            type: isSelected ? "DESELECT_SEAT" : "SELECT_SEAT",
            payload:seat.id
        })
    }
  
    function getColor() {
      if (isReserved) {
          return "bg-gray-400 cursor-not-allowed"
      }
      if (isSelected) {
        return "bg-green-500";
      }
      if (seat.tier === "VIP") {
        return "bg-amber-400";
      }
       if (seat.tier === "PREMIUM") {
         return "bg-blue-500";
       }
       if (seat.tier === "CLASSIC") {
         return "bg-cyan-500";
       }
    
      return "bg-gray-200";
    }

    return (
      <button
        onClick={handleClick}
        disabled={seat.status !== "available"}
        className={`w-10 h-10 rounded ${getColor()}`}
        >
        {seat.row}
        {seat.column}
      </button>
    );
}