"use client"
import React, { Fragment, useEffect, useState } from 'react'
import AddBlog from '../add-new-blog'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { Label } from '../ui/label'

const deleteBlogData = async (id) => {
    const response = await fetch(`/api/delete-list?id=${id}`, {
        method: 'DELETE'
    })
    const result = await response.json();
    return result;
}

const BlogOverview = ({ data }) => {
    const { toast } = useToast()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const [blogFormData, setBlogFormData] = useState({
        title: "", description: ""
    });
    const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);
    useEffect(() => {
        router.refresh()
    }, [])

    const handleUpdateBlog = async (item) => {
        setCurrentEditedBlogID(item._id)
        setOpenBlogDialog(true)
        setBlogFormData({ title: item.title, description: item.description })
    }

    const handleDeleteBlog = async (id) => {
        const response = await deleteBlogData(id);
        if (response) {
            router.refresh()
            toast({
                title: response?.message
            })
        }
    }

    const handleSaveBlogData = async () => {
        try {
            setLoading(true);
            const blogData = currentEditedBlogID ? (
                await fetch(`/api/update-list?id=${currentEditedBlogID}`, {
                    method: 'PUT',
                    body: JSON.stringify(blogFormData)
                })) : (await fetch('/api/post-list', {
                    method: 'POST',
                    body: JSON.stringify(blogFormData)
                }))
            const content = await blogData.json();
            if (content?.success) {
                setLoading(false);
                setOpenBlogDialog(false)
                setCurrentEditedBlogID(null)
                setBlogFormData({ title: "", description: "" })
                router.refresh()
                toast({
                    title: content?.message
                })
            } else {
                setLoading(false);
                toast({
                    variant: "destructive",
                    title: content?.message
                })
            }
        } catch (err) {
            setLoading(false)
        }
    }

    return (
        <Fragment>
            <div>
                <Button onClick={() => setOpenBlogDialog(true)} variant="outline">Add New Blog</Button>
            </div>
            <h2 className='mt-2 text-white mx-auto font-bold text-2xl'>Blog List Section</h2>
            <AddBlog
                openBlogDialog={openBlogDialog}
                setOpenBlogDialog={setOpenBlogDialog}
                setBlogFormData={setBlogFormData}
                loading={loading}
                blogFormData={blogFormData}
                handleSaveBlogData={handleSaveBlogData}
                currentEditedBlogID={currentEditedBlogID}
                setCurrentEditedBlogID={setCurrentEditedBlogID}
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    data && data?.length > 0 ? (
                        data?.map((item) => (
                            <Card className='p-5' key={item?._id}>
                                <CardContent>
                                    <CardTitle className="mb-5">{item?.title}</CardTitle>
                                    <CardDescription>{item?.description}</CardDescription>
                                    <div className='mt-5 flex gap-5 justify-center'>
                                        <Button onClick={() => handleUpdateBlog(item)}>Edit</Button>
                                        <Button onClick={() => handleDeleteBlog(item._id)}>Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))) : <Label className="text-3xl font-extrabold">NO blog found</Label>
                }
            </div>
        </Fragment>
    )
}

export default BlogOverview