
export default function SeatLegend() {
    return (
      <div className="flex justify-center gap-6 text-sm m-4 text-white">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-amber-600 rounded-lg" />
          VIP ₹350
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-600 rounded-lg" />
          Premium ₹200
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-cyan-600 rounded-lg" />
          Classic ₹150
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-400 rounded-lg" />
          Unavailable
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-600 rounded-lg" />
          Selected 
        </div>
      </div>
    );
}