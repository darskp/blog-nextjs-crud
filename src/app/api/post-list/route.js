import { dbConnection } from "@/database";
import { blog } from "@/model/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Joi.object({
    title: Joi.string()
        .min(3)
        .required()
        .max(30),
    description: Joi.string()
        .min(3)
        .max(30)
        .required()
})

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
