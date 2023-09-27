/* eslint-disable */
// @ts-nocheck
import prisma from "../../../prisma/client";
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        console.log(req.body);
       // const name: string = req.body.name || "Default Title"; // Default title if none provided

        // Create a post
        try {
            const result = await prisma.Alerts.create({
                data: {
                   title:req.body.title,
                    // Removed userId since we're not checking for a user
                }
            })
            res.status(200).json({ message: "Post created" })
        }
        catch (err) {
            console.error(err); // Log the error for debugging
            res.status(403).json({ message: `Something went wrong ${req.body.title}`})
        }
    }
}
