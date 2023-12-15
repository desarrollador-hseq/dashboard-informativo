import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { UTApi } from "uploadthing/server";




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
        console.log("[COURSES_ID]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: { params: { collaboratorId: string } }) {


    try {
        const session = await getServerSession(authOptions)
        const { collaboratorId } = params;

        if (!session) return new NextResponse("Unauthorized", { status: 401 })
        if (!collaboratorId) return new NextResponse("Not Found", { status: 404 })

        const collaboratorDeleted = await db.collaborator.delete({
            where: {
                id: collaboratorId,
            },
        })
        const utapi = new UTApi();
        try {
            if (collaboratorDeleted.pdfUrl) {
                const keyPdf = collaboratorDeleted?.pdfUrl.split("/")
                const lastPath = keyPdf[keyPdf.length - 1]
                if (collaboratorDeleted && collaboratorDeleted.pdfUrl) {
                    await utapi.deleteFiles(lastPath);
                }
            }
        } catch (error) {
            console.log("[upth_error_deleting]", error)
        }

        return NextResponse.json(collaboratorDeleted)
    } catch (error) {
        console.log("[DELETED_ID_COLABORATOR]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}