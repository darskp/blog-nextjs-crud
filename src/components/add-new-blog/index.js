"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const AddBlog = ({ openBlogDialog, setOpenBlogDialog, setBlogFormData, loading, blogFormData, handleSaveBlogData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogFormData((pre) => {
            return ({ ...pre, [name]: value })
        })
    }

    return (
        <>
            <Dialog open={openBlogDialog} onOpenChange={()=>{
            setOpenBlogDialog(false);
            setBlogFormData({title:"",description:""})
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Blog</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="Title"
                                placeholder="Title"
                                className="col-span-3"
                                value={blogFormData.title}
                                onChange={(e) => handleChange(e)}
                                name="title"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Description"
                                className="col-span-3"
                                value={blogFormData.description}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSaveBlogData} disabled={!blogFormData.title.length}>
                            {
                                loading ? 'Saving Changes....' : ' Save changes'
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddBlog