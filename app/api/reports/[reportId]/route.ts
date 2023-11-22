import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";



export async function PATCH(req: Request, { params }: { params: { reportId: string } }) {
    try {
        const session = await getServerSession(authOptions)
        const { reportId } = params;
        const values = await req.json()

        if (!session) return new NextResponse("Unauthorized", { status: 401 })

        const report = await db.report.update({
            where: {
                id: reportId,
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(report)

    } catch (error) {
        console.log("[REPORT_ID]", error)
        return new NextResponse("Internal Errorr", { status: 500 })
    }
}