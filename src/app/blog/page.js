import BlogOverview from '@/components/blog-overview'
import React from 'react';

const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/get-list', {
            cache: 'no-store',
            metthod: 'GET'
        });
        const result = await response.json();
        if (result) {
            return result?.data;
        } else {
            console.log("Res",result)
        }
    } catch (err) {
        throw new Error(err)
    }
}

const Blog = async () => {
    const data = await getData()
    console.log("test1", data)
    return (
        <div className='flex w-full flex-col bg-black p-4 min-h-screen'>
            <BlogOverview data={data} />
        </div>
    )
}

export default Blog
