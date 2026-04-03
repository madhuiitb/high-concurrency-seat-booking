'use client'
import SeatGrid from "@/components/SeatGrid/SeatGrid";

export default function SeatMap(){
    return (
      <div className="bg-black flex flex-col gap-8">
        <h1 className="text-green-400 flex items-center justify-center text-4xl bt-8 font-extrabold  m-8">
          Currency Event Booking Seats
        </h1>
        <SeatGrid />
      </div>
    );
}