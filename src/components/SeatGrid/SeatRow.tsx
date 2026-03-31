import { Seat } from "@/types/seat";
import SeatCell from "./SeatCell";

interface SeatRowProps {
    seats: Seat[],
    rowLabel:string,
}
export default function SeatRow({ seats,rowLabel }: SeatRowProps) {
  return (
    <>
      <div className="font-semibold text-center">{rowLabel}</div>
      {seats.map((seat: Seat, index) => (
        <SeatCell key={seat.id} seat={seat} row={rowLabel} />
      ))}
    </>
  );
}