import prisma from "@/lib/prisma"
import { authOptions } from "./auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { getJob, alreadyApplied } from "@/lib/data"

export default async function handler (req, res) {
    if(req.method !== 'POST'){
        return res.status(501).end()
    }
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({message: 'Not logged in'})
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })
    if(!user) return res.status(401).json({message: 'User not found'})
    if(req.method === 'POST') {
        if(!req.body.title)
        return res
        .status(400)
        .json({message: 'Required parameter title mising'})

        if(!req.body.description)
        return res
        .status(400)
        .json({message: 'Required parameter description missing'})
         if(!req.body.location)
         return res
         .status(400)
         .json({message: 'Required parameter location missing'})

         if(!req.body.salary)
         return res
         .status(400)
         .json({message: 'Required parameter salary missing'})
    

    await prisma.job.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            salary: req.body.salary,
            author: {
                connect: {id: user.id},
            },
        },
    })
    res.status(200).end()
}
}