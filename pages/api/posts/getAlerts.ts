/* eslint-disable */
// @ts-nocheck
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next"
export default  async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method==='GET'){

        try{
            const data = await prisma.Alerts.findMany(
                {
                  
                }
                // {
                //     include:{
                //         user:true,
                //         Comment:true,
                //     },
                //     orderBy:{
                //         createdAt:"desc"
                //     }
                // }
            )
            res.status(200).json(data)
        }
        catch(err){
            res.status(403).json({err:"Error fetching posts"})
        }
    }

}