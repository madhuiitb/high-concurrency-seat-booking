'use client'

import { useRouter } from "next/navigation";



export default function ConfirmationPage() {
    const router = useRouter()
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">Booking Confirmed</h1>
        <p>Your seats are successfully booked</p>
            <button
                onClick={() => router.push('/seat-map')}
                className="flex items-center bg-blue-400 px-8 py-3 font-bold text-2xl rounded-md shadow-green-900"
            >Seat map page</button>
      </div>
    );
}