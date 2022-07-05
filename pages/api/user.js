import { prisma } from "@prisma/client"
import { createUser, getUserByEmail, getAllUsers } from "../../controllers/user"

export default function handler(req, res) {

    console.log(req.query, 'REQ');
    if (Object.keys(req.query).length) {
        getUserByEmail(req.query).then(item => {
            res.status(200).json({ data: item.user })
            return item.prisma
        }).then(async prisma => 
            await prisma.$disconnect()
        ).catch((e) => {
            throw e;
        })
    } else {
        res.status(404).json({ message: 'No user email defined'})
    }

    if(req.method === 'POST') {
        console.log(req.body, 'req.param');
        createUser(req.body).then(item => {
            res.status(200).json({ data: item.user, message: 'userCreated' })
            return item.prisma
        }).then(async prisma => 
            await prisma.$disconnect()
        ).catch((e) => {
            throw e;
        })
    }
    
  }