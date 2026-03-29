

/**
 * 
 * @param req 
 * @returns 
 * Later upgraded to:
conflict simulation
reservation timer logic
 */
export async function POST(req: Request) {
    const body = await req.json();

    return Response.json({
        success: true,
        seatId:body.seatId,
    })
}