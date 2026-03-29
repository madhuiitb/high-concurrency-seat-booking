

/**
 * 
 * @param req 
 * @returns 
 * 
 * Simulates:

timeout expiration
manual deselection
checkout cancellation

Real production behavior modeling 
 */
export async function POST(req: Request) {
    const body = await req.json();
    return Response.json({
        released: true,
        seatId:body.seatId,
    })
}