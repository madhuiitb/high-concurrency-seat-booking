import { Seat } from "@/types/seat";
import SeatCell from "./SeatCell";


interface SeatRowProps {
    seats: Seat[]
}
export default function SeatRow({ seats }: SeatRowProps) {
  return (
    <div className="flex gap-2 justify-center">
      {seats.map((seat: Seat) => (
        <SeatCell key={seat.id} seat={seat} />
      ))}
    </div>
  );
}