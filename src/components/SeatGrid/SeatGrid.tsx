/**
 * 
 polling already integrated
 React Query already wired
 */
import { fetchSeats } from "@/services/api/fetchSeats" // Frontend Service 
import { groupSeatsByRow } from "@/utils/groupSeatsByRow"
import { useQuery } from "@tanstack/react-query"
import { Fragment, useEffect } from "react"
import { useSeatState } from "@/state/useSeatState"
import { toast } from "sonner"
import SeatCell from "./SeatCell"


export default function SeatGrid() {
    const { state, dispatch } = useSeatState();
    const { data: seats, isLoading } = useQuery({
        queryKey: ["seats"],
        queryFn: fetchSeats,
        refetchInterval:5000,
    })

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

    },[seats,state.selectedSeats, dispatch])

    if (isLoading) {
        return <div>Loading...</div>
    }

  const groupedSeats = groupSeatsByRow(seats ?? []);
  const columnNumbers = groupedSeats.at(0)?.seats.map((seat) => seat.column) ?? [];

  const gridTemplate = `40px repeat(${columnNumbers.length}, 48px)`;
  
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: gridTemplate,
        justifyContent: "center",
      }}
    >
      {/* spacer */}
      <div />

      {/* column numbers */}
      {columnNumbers.map((col) => (
        <div key={col} className="text-center font-semibold">
          {col}
        </div>
      ))}

      {/* rows */}
      {groupedSeats.map((group) => {
        const rowLabel = String.fromCharCode(65 + Number(group.row));
        return (
          <Fragment key={group.row}>
            {/** Row Label */}
            <div key={group.row} className="mt-2 text-center font-semibold">
              {rowLabel}
            </div>

            {group.seats.map((seat) => (
              <SeatCell key={seat.id} seat={seat} />
            ))}
          </Fragment>
        );
      })}

    </div>
  );
}