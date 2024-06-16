"use client"
import React, { Fragment, useEffect, useState } from 'react'
import AddBlog from '../add-new-blog'
import BlogDetails from '../blogDetails'
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const BlogOverview = () => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const [blogFormData, setBlogFormData] = useState({
        title: "", description: ""
    });

    const handleSaveBlogData = async () => {
        try {
            setLoading(true);
            const blogData = await fetch('/api/post-list', {
                method: 'POST',
                body: JSON.stringify(blogFormData)
            });
            const content = await blogData.json();
            console.log(content)
            if (content?.success) {
                setLoading(false);
                setOpenBlogDialog(false)
                setBlogFormData({ title: "", description: "" })
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
            console.log(err)
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
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {
                    data && data?.length > 0 ? (
                        data?.map((item) => (
                            <BlogDetails item={item} key={item?.id} path={`/blog/${item.id}`} />
                        ))) : null
                }
            </div>
        </Fragment>
    )
}

export default BlogOverview