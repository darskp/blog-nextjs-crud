import { blog } from "@/model/blog"

const { dbConnection } = require("@/database")
const { NextResponse } = require("next/server")

export const GET = async () => {
    try {
        await dbConnection();
        const result = await blog.find({});
        console.log(result);
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