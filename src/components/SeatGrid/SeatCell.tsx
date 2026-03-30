import { useSeatState } from "@/state/useSeatState";
import { Seat } from "@/types/seat";

interface SeatProps{
    seat:Seat
}
export default function SeatCell({ seat }: SeatProps) {
    const { state, dispatch } = useSeatState();
    const isSelected = state.selectedSeats.includes(seat.id);

    const handleClick = () => {
        dispatch({
            type: isSelected ? "DESELECT_SEAT" : "SELECT_SEAT",
            payload:seat.id
        })
    }

    return (
      <button
        onClick={handleClick}
        disabled={seat.status !== "available"}
        className={`w-10 h-10 rounded ${
          seat.status === "reserved"
            ? "bg-gray-400"
            : isSelected
              ? "bg-green-500"
              : "bg-blue-500"
        }`}
      >
        {seat.number}
      </button>
    );
}