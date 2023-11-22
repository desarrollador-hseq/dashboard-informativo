

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"


export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    const session = await getServerSession(authOptions)
    try {
        const values = await req.json()

        if(!session) return new NextResponse("Unauthorized", {status: 401})

        const existingCollaborator = await db.collaborator.findUnique({
            where: { numDoc: values.numDoc }
        });
        
        if (existingCollaborator) {
            return new NextResponse("Número de documento ya registrado", { status: 400 });
        }
        

        const collaborator = await db.collaborator.create({
            data: {
                ...values
            }
        })

        return NextResponse.json(collaborator)
        
    } catch (error) {
        console.log("[COLLABORATOR-CREATE]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}