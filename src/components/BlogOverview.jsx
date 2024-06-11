"use client"
import React, { Fragment, useEffect, useState } from 'react'
import BlogDetails from './blogDetails'
import AddBlog from './AddBlog'

const BlogOverview = () => {
    const data = [
        {
            id: 1, name: "darshan"
        },
        {
            id: 2, name: "darshan1"
        },
        {
            id: 3, name: "darshan3"
        },
        {
            id: 4, name: "darshan4"
        },
    ]
    // const [loading, setLoading] = useState(false);

    const handleSaveBlogData = async () => {
        try {
            // setLoading(true);
            const blogData = await fetch('/api/post-list', {
                method: "POST",
                body: JSON.stringify({ title: "darshan12", description: "Test12" })
            })
            console.log(blogData)
            // setLoading(false);
        } catch (err) {
            console.log(err)
            // setLoading(false)
        }
    }

    useEffect(() => {
        handleSaveBlogData()
    }, [])
    return (
        <Fragment>
            <h2 className='mt-2 text-white mx-auto font-bold text-2xl'>Blog List</h2>
            <AddBlog />
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