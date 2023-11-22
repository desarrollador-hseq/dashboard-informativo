import { db } from "@/lib/db";



export const getFormationThreshold = async (): Promise<number> => {


    const threshold = await db.formationParameters.findFirst()

    if (!threshold) {
        return 80
    }


    return threshold.threshold
}