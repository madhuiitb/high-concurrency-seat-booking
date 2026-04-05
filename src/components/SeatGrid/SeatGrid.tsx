/**
 * 
 polling already integrated
 React Query already wired
 */
import { fetchSeats } from "@/services/api/fetchSeats" // Frontend Service 
import { groupSeatsByRow } from "@/utils/groupSeatsByRow"
import { useQuery } from "@tanstack/react-query"
import { Fragment, use, useEffect } from "react"
import { useSeatState } from "@/state/useSeatState"
import { toast } from "sonner"
import SeatCell from "./SeatCell"
import SeatLegend from "./SeatLegend"
import SeatSelectionSummary from "./SeatSelectionSummary"
import { useRouter } from "next/navigation"
import useReservationTimer from "@/hooks/useReservationTimer"
import ReservationTimer from "../common/ReservationTimer"


export default function SeatGrid() {
    const { state, dispatch } = useSeatState();
    const { data: seats, isLoading } = useQuery({
        queryKey: ["seats"],
        queryFn: fetchSeats,
        refetchInterval:1000,
    })

  const earlyExpiry = state.reservedSeats.length > 0 ? Math.min(...state.reservedSeats.map(seat => seat.reservedUntil)) : undefined;

  const remainingSeconds = useReservationTimer(earlyExpiry);

  

  const router = useRouter();

    useEffect(() => {
        if (!seats) {
            return;
        }

        const reservedSeatIds = seats.filter((seat) => seat.status === "reserved").map((seat) => seat.id);
        const conflictedSeats = state.selectedSeats.filter((seatId) => reservedSeatIds.includes(seatId));

        if (conflictedSeats.length > 0) {
            dispatch({
                type: "REMOVE_CONFLICTED_SEATS",
                payload: conflictedSeats
            })

            toast.warning(
              `Seat ${conflictedSeats.join(", ")} was booked by another user`,
            );
        }

    }, [seats, state.selectedSeats, dispatch])
  
  useEffect(() => {
    if (remainingSeconds === 0) {
      dispatch({
        type: "EXPIRE_SELECTION"
      })
    }
  }, [remainingSeconds, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>
    }

  const groupedSeats = groupSeatsByRow(seats ?? []);
  const columnNumbers = groupedSeats.at(0)?.seats.map((seat) => seat.column) ?? [];

  const gridTemplate = `36px repeat(${columnNumbers.length}, 42px)`;
  
  const hasSelection =
    state.selectedSeats.length > 0 || state.reservedSeats.length > 0;
  
  return (
    <div className="flex flex-col items-center gap-6 min-h-screen">
      <div className="flex gap-8 items-center">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: gridTemplate,
          }}
        >
          {/* spacer */}
          <div />

          {columnNumbers.map((col) => (
            <div key={col} className="text-center font-semibold text-white">
              {col}
            </div>
          ))}

          {groupedSeats.map((group) => {
            const rowLabel = String.fromCharCode(65 + Number(group.row));
            return (
              <Fragment key={group.row}>
                {/** Row Label */}
                <div
                  key={group.row}
                  className="flex items-center justify-center font-semibold text-white"
                >
                  {rowLabel}
                </div>

                {group.seats.map((seat) => (
                  <SeatCell key={seat.id} seat={seat} />
                ))}
              </Fragment>
            );
          })}
        </div>
        <div className="flex flex-col justify-center gap-3">
          {remainingSeconds > 0 && <ReservationTimer remainingSeconds={remainingSeconds} />
          }
          {hasSelection && <SeatSelectionSummary />}
        </div>
      </div>
      <SeatLegend />
      {hasSelection && (
        <button
          onClick={() => router.push("/checkout")}
          className="m-4 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md w-full cursor-pointer"
        >
          Proceed to checkout
        </button>
      )}
    </div>
  );
}