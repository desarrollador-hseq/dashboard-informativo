const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

async function mainwd() {
    try {
        await database.FormationParameters.create({
            data: {
                threshold: 80
            }
        })

        console.log("Success")
    } catch (error) {
        console.log("Error seeding the database categories", error)
    } finally {
        await database.$disconnect()
    }
}

mainwd()