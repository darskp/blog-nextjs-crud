import { dbConnection } from "@/database";
import { blog } from "@/model/blog";
import { schema } from "@/model/schema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await dbConnection();
        const extractedData = await req.json();

        if (extractedData) {
            const { title, description } = extractedData;
            const {error,value} = schema.validate({ title, description });

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                })
            }

            const newBlogData = await blog.create(extractedData);
            if (newBlogData) {
                return NextResponse.json({
                    success: true,
                    message: "Blog Added Successfully",
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Something went wrong! Please try again"
                })
            }
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
