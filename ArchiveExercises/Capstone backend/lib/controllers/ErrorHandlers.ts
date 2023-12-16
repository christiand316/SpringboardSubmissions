import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function ErrorHandler(req: NextApiRequest, res: NextApiResponse, error: any) {
    if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.flatten() });
    }
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
}