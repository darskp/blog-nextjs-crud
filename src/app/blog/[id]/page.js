import React from 'react'

const BlogId = ({ params }) => {

    return (
        <div className='min-h-screen w-full bg-black'>
            <h2 className='text-white font-blod mx-auto w-full border border-red-500'>id is {params.id}</h2>
        </div>
    )
}

export default BlogId