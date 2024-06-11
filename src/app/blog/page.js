import React from 'react'
import BlogDetails from '../../components/blogDetails'
import { getBlogs } from '../api/get-list/router';

const Blog = async () => {
    //    console.log(blogData);
    const data1 = await getBlogs();
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
    console.log("data", data1)
    return (
        <div className='flex w-full flex-col bg-black p-4 min-h-screen'>
            <h2 className='mt-2 text-white mx-auto font-bold text-2xl'>Blog List</h2>
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {
                    data && data?.length > 0 ? (
                        data?.map((item) => (
                            <BlogDetails item={item} key={item?.id} path={`/blog/${item.id}`}/>
                        ))) : null
                }
            </div>
        </div>
    )
}

export default Blog
