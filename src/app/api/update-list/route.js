import { dbConnection } from "@/database";
import { blog } from "@/model/blog";
import { schema } from "@/model/schema";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
    try {
        await dbConnection();
        const { searchParams } = new URL(req.url);
        const requestedId = searchParams.get('id');

        if (!requestedId) {
            return NextResponse.json({
                success: false,
                message: "Blog Id not found"
            })
        }

        const extractedData = await req.json();
        if (!extractedData) {
            return NextResponse.json({
                success: false,
                message: "Blog Data not found"
            })
        }

        const { title, description } = extractedData;
        const { error } = schema.validate({ title, description });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            })
        }
        const filter={_id:requestedId}
        const updateBlogID = await blog.findOneAndUpdate(
            filter, extractedData, {
            new: true
        })

        if (updateBlogID) {
            return NextResponse.json({
                success: true,
                message: "Blog is updated successfully",
            });
        }
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    } catch (err) {
        throw new Error(err);
    }
}