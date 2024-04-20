import React from 'react'
import { Link } from 'react-router-dom';
interface BLogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:number
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}) => {
    return <Link to={`/blog/${id}`}>
    <div className='p-4 border-slate-200 border-b pb-4 w-screen max-w-screen-md cursor-pointer'>
        <div className='flex'>
            {/* <div className='flex justify-center flex-col'> */}
            <Avatar size={'small'} name={authorName}></Avatar>
            {/* </div> */}
            <div className='font-extralight pl-2 text-sm flex justify-center flex-col'>
                {authorName}
            </div>
            <div className='flex justify-center flex-col pl-2 flex justify-center flex-col'>
                <Circle />
            </div>
            <div className='font-extralight pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col'>
                {publishedDate}
            </div>
        </div>
        <div className='text-xl font-semibold pt-2'>
            {title}
        </div>
        <div className='text-md font-thin pt-2'>
            {content.slice(0, 100) + "..."}
        </div>
        <div className='text-slate-500 text-sm font-thin'>
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        {/* <div className='bg-slate-200 h-1 w-full text-slate-400'>

        </div> */}
    </div>
    </Link>
}

export function Circle() {
    return <div className='h-1 w-1 rounded-full bg-slate-200'>

    </div>
}
export function Avatar({ name, size = "small" }: { name: string, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center
    overflow-hidden bg-gray-600 rounded-full ${size == "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size == "small" ? "text-xs" : "text-md"} font-extralight text-white dark:text-gray-300`}>{name[0]}</span>
    </div>
}