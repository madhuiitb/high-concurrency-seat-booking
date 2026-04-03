import { fetchSeats } from "@/services/api/fetchSeats";
import { useSeatState } from "@/state/useSeatState";
import { Seat } from "@/types/seat";
import { useQuery } from "@tanstack/react-query";


export default function useSelectedSeats() {
    const { state } = useSeatState();

    const { data: seats } = useQuery({
        queryKey: ["seats"],
        queryFn: fetchSeats,
    });

    const selectedSeats = seats?.filter((seat) => state.selectedSeats.includes(seat.id)) ?? [];
    
    const groupByTier = selectedSeats.reduce((acc, seat) => {
        if (!acc[seat.tier]) {
            acc[seat.tier] = []
        }
        acc[seat.tier].push(seat);
        return acc;
    }, {} as Record<string, Seat[]>);

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    return {
        seats,
        selectedSeats,
        groupByTier,
        totalPrice
    }

}