import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog{
    "content":string;
    "title":string;
    "id":number;
    "author":{
        "name":string
    }
}

export const useBlogs=()=>{
    const [loading,setLoading]=useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([])
    useEffect(()=>{
        console.log(localStorage.getItem("token"))
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        
        })
        .then(response=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    },[])
    return {
        blogs,loading
    }
}


export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true)
    const [blog,setBlog]=useState<Blog>()
    useEffect(()=>{
        console.log(localStorage.getItem("token"))
        axios.get(`${BACKEND_URL}/api/v1/blog/particular/${id}`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        
        })
        .then(response=>{
            setBlog(response.data.blog);
            setLoading(false);
        })
    },[])
    return {
        blog,loading
    }
}