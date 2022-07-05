import { getAllUsers } from "../../controllers/user"

export default function handler(req, res) {
    getAllUsers().then(item => {
        res.status(200).json({ data: item.users })
        return item.prisma
    }).then(async prisma => 
        await prisma.$disconnect()
    ).catch((e) => {
        throw e;
    })
}