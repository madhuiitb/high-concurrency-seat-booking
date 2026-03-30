'use client'
import SeatGrid from "@/components/SeatGrid/SeatGrid";

export default function SeatMap(){
    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-center gap-8 text-4xl bt-8 font-extrabold text-blue-400"> Seat Map</div>
        <SeatGrid />
      </div>
    );
}