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
  
  const tierColorMap = {
    VIP: "bg-amber-600 text-white",
    PREMIUM: "bg-blue-800 text-white",
    CLASSIC: "bg-cyan-600 text-white",
  };
  
    function getSeatStyle() {
      if (isReserved) {
        return "bg-gray-400 cursor-not-allowed";
      }
      if (isSelected) {
        return "bg-green-600 text-white ring-2 ring-green-300 animate-seatPulse";
      }
      return tierColorMap[seat.tier];
    }

    return (
      <button
        title={`Seat ${seat.id}.₹${seat.price}`}
        onClick={handleClick}
        disabled={isReserved}
        aria-label={`Seat ${seat.id}`}
        className={`
          flex flex-col items-center justify-center
          w-8 h-8 rounded-md
          transition-all duration-200 ease-out
          hover:scale-110
          active:scale-95
          ${getSeatStyle()}
          `}
      >
        <span className="text-[12px] font-bold leading-none">{seat.id}</span>
      </button>
    );
}