import React from 'react'
import { Avatar } from './BLogCard'
import { Link } from 'react-router-dom'
export const AppBar = () => {
    return <div className='border-b flex justify-between px-10 py-4'>
        <Link to={'/blogs'} className='flex flex-col justify-center cursor-pointer'>
            Medium
        </Link>
        <div>
            



            <Link to={"/publish"}>
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Create Blog</button>
        </Link>
            <Avatar size={"big"} name={"k"}></Avatar>
            <Link to={"/signup"}>
            <button type="button" className="ml-4 text-white bg-red-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Log Out</button>
            </Link>
        </div>
    </div>
}