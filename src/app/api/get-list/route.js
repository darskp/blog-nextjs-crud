import { blog } from "@/model/blog"
import { dbConnection } from "@/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await dbConnection();
        const result = await blog.find({});
        if (result) {
            return NextResponse.json({
                success: true,
                data: result,
                message: "Fetched Successfully",
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again"
            })
        }
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again"
        })
    }
}