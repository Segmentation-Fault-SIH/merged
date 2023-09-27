/* eslint-disable */
// @ts-nocheck
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next"
export default  async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method==='POST'){
        const session = await getServerSession( req,res, authOptions)
        if(!session) return res.status(401).json({message:"Please sign in"});
        console.log(req.body);
        const title:string = req.body.title;
        const prismaUser = await prisma.user.findUnique({
            where:{email:session?.user?.email},
        })
        console.log(prismaUser);
        //check title
        if(title.length>3000) return res.status(403).json({message:"Please add a shorter title"});
        if(!title.length) return res.status(403).json({message:"Please add a title"});
        //create a post
        try{
            const result = await prisma.post.create({
                data:{
                    title:title,
                    userId:prismaUser?.id,
                }
            }) 
            res.status(200).json({message:"Post created"})
        }
        catch(err){
            res.status(403).json({message:"Something went wrong"})
        }
    }

}