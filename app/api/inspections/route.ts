

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"


export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    const session = await getServerSession(authOptions)
    try {
        const values = await req.json()

        if(!session) return new NextResponse("Unauthorized", {status: 401})

  

        const inspection = await db.inspection.create({
            data: {
                ...values
            }
        })

        return NextResponse.json(inspection)
        
    } catch (error) {
        console.log("[INSPECTION-CREATE]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}