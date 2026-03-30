/**
 * 
 polling already integrated
 React Query already wired
 */
import { fetchSeats } from "@/services/api/fetchSeats" // Frontend Service 
import { groupSeatsByRow } from "@/utils/groupSeatsByRow"
import { useQuery } from "@tanstack/react-query"
import SeatRow from "./SeatRow"


export default function SeatGrid() {
    const { data: seats, isLoading } = useQuery({
        queryKey: ["seats"],
        queryFn: fetchSeats,
        refetchInterval:5000,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    const groupedSeats = groupSeatsByRow(seats ?? []);

    return (
      <div className="flex flex-col gap-2">
        {groupedSeats.map((group) => (
          <SeatRow key={group.row} seats={group.seats} />
        ))}
      </div>
    );
}