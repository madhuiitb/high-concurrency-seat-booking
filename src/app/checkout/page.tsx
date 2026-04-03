'use client'

import { useSeatState } from "@/state/useSeatState";
import { fetchSeats } from "@/services/api/fetchSeats";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import useSelectedSeats from "@/hooks/useSelectedSeats";
import SeatSelectionSummary from "@/components/SeatGrid/SeatSelectionSummary";

export default function Checkout() {
    const { selectedSeats} = useSelectedSeats();

    if (!selectedSeats) {
        redirect('/seat-map')
    }

  return (
    <div className="flex flex-col items-center bg-black w-full  mx-auto p-6">
      <h1 className="text-indigo-200 text-2xl font-bold mb-4">
        Final Reservation Confirmation
      </h1>
          <SeatSelectionSummary />
      {/* Confirm button */}
      <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md">
        Confirm Booking
      </button>
    </div>
  );
}
