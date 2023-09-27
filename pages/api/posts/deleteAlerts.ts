/* eslint-disable */
// @ts-nocheck
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next"
export default async function handler(req, res) {
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return res.status(401).json({ message: "Please signin to create a post." })
    // }
    if (req.method === "DELETE") {
     //   const {id} = req.query;
       // console.log(id);
      
       // Access the ID from the request body
       
     // const postId = id;
      //console.log(postId)
      try {
        const result = await prisma.Alerts.deleteMany({
          
        })
  
        res.status(200).json(result)
      } catch (err) {
        res.status(403).json({ err: "Error has occured while deleting a post" })
      }
    }
  }