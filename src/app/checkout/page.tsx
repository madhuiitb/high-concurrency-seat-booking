'use client'

import { useSeatState } from "@/state/useSeatState";
import { redirect, useRouter } from "next/navigation";
import useSelectedSeats from "@/hooks/useSelectedSeats";
import SeatSelectionSummary from "@/components/SeatGrid/SeatSelectionSummary";

export default function Checkout() {
    const { state, dispatch } = useSeatState();
    const { selectedSeats} = useSelectedSeats();
    const router = useRouter();

    if (!selectedSeats.length) {
        redirect('/seat-map')
    }

    async function handleConfirmBooking() {
        const response = await fetch('/api/book-seats', {
            method: "POST",
            body: JSON.stringify({
                seatIds: state.reservedSeats.map(seat => seat.id)
            })
        });

        console.log("Booking seats");


        const result = await response.json();

        if (result.success) {
            dispatch({
                type: "BOOKING_SUCCESS"
            });

            router.push("/confirmation");
        } else {

            console.log(`Some seats failed: ${result.failedSeats.join(", ")}`);
        }
    }


  return (
    <div className="flex flex-col items-center bg-black w-full  mx-auto p-6">
      <h1 className="text-red-800 text-2xl font-bold mb-4">
        Final Reservation Confirmation
      </h1>
      <SeatSelectionSummary />
      {/* Confirm button */}
      <button
        onClick={handleConfirmBooking}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md cursor-progress"
      >
        Confirm Booking
      </button>
    </div>
  );
}
