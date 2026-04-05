import { getSeats, updateSeats } from "@/mocks/seatStore";

export async function POST(req: Request) {
  const { seatIds } = await req.json();

  const seats = getSeats();

  const now = Date.now();

  const reservedSeats: string[] = [];
    const failedSeats: string[] = [];

  seatIds.forEach((id: string) => {
    const seat = seats.find((seat) => seat.id === id);

    if (!seat || seat.status !== "available") {
      failedSeats.push(id);
      return;
    }

    seat.status = "reserved";

    seat.reservedUntil = now + 5*60*1000; // 2 minutes

    reservedSeats.push(id);
  });

  updateSeats(seats);

  return Response.json({
    success: failedSeats.length === 0,
    reservedSeats,
    failedSeats,
  });
}