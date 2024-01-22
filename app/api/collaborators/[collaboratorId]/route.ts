import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";




export async function PATCH(req: Request, { params }: { params: { collaboratorId: string } }) {
    try {
        const session = await getServerSession(authOptions)
        const { collaboratorId } = params;
        const values = await req.json()

        if (!session) return new NextResponse("Unauthorized", { status: 401 })

        const collaborator = await db.collaborator.update({
            where: {
                id: collaboratorId,
            },
            data: {
                ...values
            }
        })


        return NextResponse.json(collaborator)

    } catch (error) {
        console.log("[COLLABORATOR_PATCH_ID]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { collaboratorId: string } }) {

    try {
        const session = await getServerSession(authOptions)
        const { collaboratorId } = params;

        if (!session) return new NextResponse("Unauthorized", { status: 401 })
        if (!collaboratorId) return new NextResponse("Not Found", { status: 404 })

        const collaboratorDeleted = await db.collaborator.update({
            where: {
                id: collaboratorId,
            },
            data: {
                active: false,
            },
        })

        return NextResponse.json(collaboratorDeleted)
    } catch (error) {
        console.log("[DELETED_ID_COLABORATOR]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}