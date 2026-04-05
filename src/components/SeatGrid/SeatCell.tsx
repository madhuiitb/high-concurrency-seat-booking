import { useSeatState } from "@/state/useSeatState";
import { Seat } from "@/types/seat";

interface SeatProps{
    seat: Seat,
}
export default function SeatCell({ seat }: SeatProps) {
  const { state, dispatch } = useSeatState();

  const isSelected =
    state.selectedSeats.includes(seat.id);
  const isReserved = state.reservedSeats.some((reservedSeat) => reservedSeat.id === seat.id);
  
  const isUnavailable = seat.status === "reserved" && !isReserved;


  const handleClick = async() => {
    if (isReserved) {
      // await fetch("/api/release-seat", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     seatIds:[seat.id],
      //   })
      // });
      // await queryClient.invalidateQueries({
      //   queryKey: ["seats"],
      // });

      dispatch({
        type: "CANCEL_RESERVATION",
        payload: seat.id,
      });

      return;
    }
    if (!isSelected) {
      // const response = await fetch("/api/reserve-seat", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     seatIds: [seat.id]
      //   })
      // });

      // const result = await response.json();

      // if (!result.success) {
      //   alert("Some one has booked");
      //   return;
      // }

      //  await queryClient.invalidateQueries({
      //    queryKey: ["seats"],
      //  });
      
      dispatch({
        type: "SELECT_SEAT",
        payload: seat.id,
      });

      dispatch({
        type: "RESERVE_SEAT",
        payload: {
          id: seat.id,
          reservedUntil: Date.now() + 2 * 60 * 1000,
        },
      });
    } else {
      dispatch({
        type: "DESELECT_SEAT",
        payload: seat.id,
      });
    }
  }
  
  const tierColorMap = {
    VIP: "bg-amber-600 text-white",
    PREMIUM: "bg-blue-800 text-white",
    CLASSIC: "bg-cyan-600 text-white",
  };
  
    function getSeatStyle() {
      if (isUnavailable) {
        return "bg-gray-400 cursor-not-allowed";
      }
      if (isSelected || isReserved) {
        return "bg-green-600 text-white ring-2 ring-green-300 animate-seatPulse";
      }
      return tierColorMap[seat.tier];
    }

    return (
      <button
        title={`Seat ${seat.id}.₹${seat.price}`}
        onClick={handleClick}
        disabled={isUnavailable}
        aria-label={`Seat ${seat.id}`}
        className={`
          flex flex-col items-center justify-center
          w-8 h-8 rounded-md
          transition-all duration-200 ease-out
          hover:scale-110
          active:scale-95
          cursor-pointer
          ${getSeatStyle()}
          `}
      >
        <span className="text-[12px] font-bold leading-none">{seat.id}</span>
      </button>
    );
}