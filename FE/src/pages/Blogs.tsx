import React from 'react'
import { BlogCard } from '../components/BLogCard'
import { AppBar } from '../components/AppBar'
import { useBlogs } from '../hooks'
import { BlogsSkeleton } from '../components/BlogsSkeleton'
export const Blogs = () => {
  const {blogs,loading}=useBlogs();
  console.log(blogs)
  if(loading){
    return <div>
      <AppBar></AppBar>
    <div className='flex justify-center'>
      <div>
      <BlogsSkeleton></BlogsSkeleton>
      <BlogsSkeleton></BlogsSkeleton>
      <BlogsSkeleton></BlogsSkeleton>
      <BlogsSkeleton></BlogsSkeleton>
      </div>
    </div>
    </div>
  }
  return <div >
    <AppBar></AppBar>
    <div className='flex justify-center'>
    <div className=''>
      {
        blogs?.map((blog)=>
        <BlogCard
        id={blog.id}
        authorName={blog?.author.name||"Anonymous"}
        title={blog?.title}
        content={blog.content}
        publishedDate={"2nd dec 2024"}>
      </BlogCard>)
      }
      
    </div>
    </div>
  </div>
}
