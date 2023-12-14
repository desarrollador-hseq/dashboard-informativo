import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/route";

const f = createUploadthing();

const handleAuth = async () => {
    const session = await getServerSession(authOptions)
    if(!session) throw new Error("Unauthorized")
    return {userId: session.user.id}
}


export const ourFileRouter = {
    collaboratorPdf: f({ pdf: { maxFileSize: "1MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;