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
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'

const BlogOverview = ({ data }) => {
    const { toast } = useToast()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const [blogFormData, setBlogFormData] = useState({
        title: "", description: ""
    });

    useEffect(() => {
        router.refresh()
    }, [])


    const handleSaveBlogData = async () => {
        try {
            setLoading(true);
            const blogData = await fetch('/api/post-list', {
                method: 'POST',
                body: JSON.stringify(blogFormData)
            });
            const content = await blogData.json();
            if (content?.success) {
                setLoading(false);
                setOpenBlogDialog(false)
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
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    data && data?.length > 0 ? (
                        data?.map((item) => (
                            <Card className='p-5' key={item?.id}>
                                <CardContent>
                                    <CardTitle className="mb-5">{item?.title}</CardTitle>
                                    <CardDescription>{item?.description}</CardDescription>
                                    <div className='mt-5 flex gap-5 justify-center'>
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))) : null
                }
            </div>
        </Fragment>
    )
}

export default BlogOverview