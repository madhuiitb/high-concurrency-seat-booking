'use client'

import { useSeatState } from "@/state/useSeatState";
import { redirect, useRouter } from "next/navigation";
import useSelectedSeats from "@/hooks/useSelectedSeats";
import SeatSelectionSummary from "@/components/SeatGrid/SeatSelectionSummary";
import { useEffect } from "react";

export default function Checkout() {
    const { state, dispatch } = useSeatState();
    const { selectedSeats} = useSelectedSeats();
    const router = useRouter();

     useEffect(() => {
       if (!selectedSeats.length) {
         router.replace("/seat-map");
       }
     }, [selectedSeats, router]);

   async function handleConfirmBooking() {
     const reservedSeatIds = state.reservedSeats.map((seat) => seat.id);

     console.log("Mock booking seats:", reservedSeatIds);

     // Backend code. 
    //  await new Promise((resolve) => setTimeout(resolve, 100));

    //  const failedSeats = reservedSeatIds.filter(() => Math.random() < 0.05);

    //  if (failedSeats.length) {
    //    console.log(`Some seats failed: ${failedSeats.join(", ")}`);

    //    alert(`Seats unavailable: ${failedSeats.join(", ")}`);

    //    return;
    //  }
     dispatch({
       type: "BOOKING_SUCCESS",
     });
    redirect("/confirmation");
     
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
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md cursor-pointer"
      >
        Confirm Booking
      </button>
    </div>
  );
}
