import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

export const blog=mongoose.models.blogs || mongoose.model('blogs',blogSchema)