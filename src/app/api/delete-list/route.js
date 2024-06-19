import { dbConnection } from "@/database";
import { blog } from "@/model/blog";
import { NextResponse } from "next/server"

export const DELETE = async (req) => {
    try {
        await dbConnection();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        console.log("deleteCurrentBlogByIDi",getCurrentBlogID)

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: "Blog ID is required",
            });
        }
        const deleteCurrentBlogByID = await blog.findByIdAndDelete(
            getCurrentBlogID
        )
        if (deleteCurrentBlogByID) {
            return NextResponse.json({
                success: true,
                message: "Blog is deleted successfully",
            });
        }
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    } catch {
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again.....",
        });
    }
}