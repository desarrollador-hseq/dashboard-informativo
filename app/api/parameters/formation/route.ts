import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"



export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    try {


        if (!session) return new NextResponse("Unauthorized", { status: 401 })


        const threshold = await db.formationParameters.findFirst()

        return NextResponse.json(threshold)

    } catch (error) {
        console.log("[GET-THRESHOLD]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}