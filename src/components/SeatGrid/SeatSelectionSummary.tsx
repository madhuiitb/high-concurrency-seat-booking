import useSelectedSeats from "@/hooks/useSelectedSeats";

export default function SeatSelectionSummary(){

    const { selectedSeats, totalPrice,groupByTier } = useSelectedSeats();

    if (!selectedSeats.length) {
        return null;
    }

    console.log("Selected seats", selectedSeats);

    return (
      <div className="flex flex-col gap-6 p-5 rounded-xl shadow-md flex-1 max-w-sm border-2 border-lime-500 min-w-64">
        <h2 className="font-semibold text-lg mb-2 text-white">
          Selected Seats
        </h2>
        {Object.entries(groupByTier).map(([tier, tierSeats]) => (
          <div key={tier}>
            <div className="text-sm font-semibold mb-1 text-amber-100">
              {tier} ({tierSeats.length})
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {tierSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="px-2 py-1 text-sm bg-gray-500 rounded-md text-white"
                >
                  {seat.id}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="font-semibold text-amber-400">Total: ₹{totalPrice}</div>
      </div>
    );
}