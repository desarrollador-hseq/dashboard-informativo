

const { PrismaClient } = require("@prisma/client")
const database = new PrismaClient()

async function main() {
    try {
        await database.user.createMany({
            data: [
                {username: "administrator", password: "$2a$10$lA5JIqCs5R8Eae2FgYMQTeEc1VXx2MTsQC9ql0xNIxnBlXXexN4GS", role: "ADMIN"},
                {username: "viewer", password: "$2a$10$obvjJMBoXAme55FJVAqrTuTJySFurGrrgXefvf7rYPtfpSbe5YJsa", role: "VIEWER"},
            ]
        })

        console.log("Success")
    } catch (error) {
        console.log("Error seeding the database categories", error)
    } finally {
        await database.$disconnect()
    }
}

async function mainwd() {
    try {
        await database.formationParameters.create({
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

async function mainw() {
    try {
        await database.city.createMany({
            data: [

                { realName: "Bogotá", formated: "bogota", color: "#ff5733" },
                { realName: "Medellín", formated: "medellin", color: "#33ff57" },
                { realName: "Cali", formated: "cali", color: "#5733ff" },
                { realName: "Barranquilla", formated: "barranquilla", color: "#ff5733" },
                { realName: "Cartagena", formated: "cartagena", color: "#33ff57" },
                { realName: "Cúcuta", formated: "cucuta", color: "#5733ff" },
                { realName: "Bucaramanga", formated: "bucaramanga", color: "#ff5733" },
                { realName: "Villavicencio", formated: "villavicencio", color: "#33ff57" },
                { realName: "Santa Marta", formated: "santa-marta", color: "#5733ff" },
                { realName: "Ibagué", formated: "ibague", color: "#ff5733" },
                { realName: "Bello", formated: "bello", color: "#33ff57" },
                { realName: "Pasto", formated: "pasto", color: "#5733ff" },
                { realName: "Manizales", formated: "manizales", color: "#ff5733" },
                { realName: "Neiva", formated: "neiva", color: "#33ff57" },
                { realName: "Soledad", formated: "soledad", color: "#5733ff" },
                { realName: "Pereira", formated: "pereira", color: "#ff5733" },
                { realName: "Montería", formated: "monteria", color: "#33ff57" },
                { realName: "Itagüí", formated: "itagui", color: "#5733ff" },
                { realName: "Palmira", formated: "palmira", color: "#ff5733" },
                { realName: "Buenaventura", formated: "buenaventura", color: "#33ff57" },
                { realName: "Villamaria", formated: "villamaria", color: "#5733ff" },
                { realName: "Floridablanca", formated: "floridablanca", color: "#ff5733" },
                { realName: "Valledupar", formated: "valledupar", color: "#33ff57" },
                { realName: "Soacha", formated: "soacha", color: "#5733ff" },
                { realName: "Quibdó", formated: "quibdo", color: "#ff5733" },
                { realName: "Envigado", formated: "envigado", color: "#33ff57" },
                { realName: "Florencia", formated: "florencia", color: "#5733ff" },
                { realName: "Tuluá", formated: "tulua", color: "#ff5733" },
                { realName: "Tunja", formated: "tunja", color: "#33ff57" },
                { realName: "Turbo", formated: "turbo", color: "#5733ff" },
                { realName: "Girardot", formated: "girardot", color: "#ff5733" }
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

mainwd()

mainw()