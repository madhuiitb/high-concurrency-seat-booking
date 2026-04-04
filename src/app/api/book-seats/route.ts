import { getSeats, updateSeats } from "@/mocks/seatStore";

export async function POST(req: Request) {
  const { seatIds } = await req.json();

  const seats = getSeats();

  const bookedSeats: string[] = [];
  const failedSeats: string[] = [];

  seatIds.forEach((id: string) => {
    const seat = seats.find((seat) => seat.id === id);

    if (!seat || seat.status !== "reserved") {
      failedSeats.push(id);
      return;
    }

    seat.status = "booked";
    seat.reservedUntil = null;

    bookedSeats.push(id);
  });

  updateSeats(seats);

  return Response.json({
    success: failedSeats.length === 0,
    bookedSeats,
    failedSeats,
  });
}