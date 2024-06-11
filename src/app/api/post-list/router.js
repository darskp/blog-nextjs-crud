import { dbConnection } from "@/database";
import { blog } from "@/model/blog";
const { NextResponse } = require("next/server");

export const postBlog = async (req) => {
    try {
        dbConnection();
        const data = req.json();

        if (data) {
            const { title, description } = data;
            const insertData = await blog.insert(data);

            return NextResponse.json({
                success: true,
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