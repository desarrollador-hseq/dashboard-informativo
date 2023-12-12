


async function main() {
    const { PrismaClient } = require("@prisma/client")
    const database = new PrismaClient()
    try {
        await database.user.createMany({
            data: [
                {username: "administrator", password: "$2a$10$ZC9hFJAv/pQL9qFHtOF2nOzt/t8UA0BhcGfCkd9sgPf4HFmjxzmeG", role: "ADMIN"},
                {username: "viewer", password: "$2a$10$ZC9hFJAv/pQL9qFHtOF2nOzt/t8UA0BhcGfCkd9sgPf4HFmjxzmeG", role: "VIEWER"},
            ]
        })

        console.log("Success")
    } catch (error) {
        console.log("Error seeding the database categories", error)
    } finally {
        await database.$disconnect()
    }
}


main()