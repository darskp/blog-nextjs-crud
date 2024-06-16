import Link from 'next/link'
import React from 'react'

const BlogDetails = ({ item,path }) => {
    return (
        <Link href={path}>
            <div className='p-4 border text-white border-red-400 bg-grey' key={item?.id}>
                <h2>{item?.title}</h2>
            </div>
        </Link>
    )
}

export default BlogDetails