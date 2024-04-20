import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import {SignupType} from "@kalpitb/medium-common-new"
import { BACKEND_URL } from '../config';
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<SignupType>({
        name:"",
        email:"",
        password:""
    })
    const [error,setError]=useState(false);
    async function sendRequest(){
        console.log(postInputs)
        try{
            const response =await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postInputs);
            const jwt=response.data.jwt
            localStorage.setItem("token",jwt);
            console.log(response)
            navigate("/blogs")
        }catch(e){
            setError(true)
        }
        
    }
    return <div className=" h-screen flex justify-center flex-col">
        <div className='flex justify-center'>
            <div>
            <div>

                <div className="text-3xl font-extrabold">
                {type=="signin"?"Login":"Create An Account"} 
                </div>
                <div className='text-slate-400'>
                    {type=="signin"?"Don't have an account?":"Already have an account?"} 
                    <Link className='pl-2 underline' to={ type=="signin"?"/signup":"/signin"}>
                    {type=="signin"?"Sign up":"Signin"}
                    </Link>
                </div>
            </div>
            <div className='pt-8'>
                {
                    type==="signup"? <LabelInput type={"name"} label="Name" placeholder="Enter Name" onChange={(e)=>{
                        setPostInputs(c=>({
                            ...postInputs,
                            name:e.target.value
                        }))
                    }}></LabelInput>:null
                }
           
            <LabelInput type={"name"} label="Email" placeholder="Enter email" onChange={(e)=>{
                setPostInputs(c=>({
                    ...postInputs,
                    email:e.target.value
                }))
            }}></LabelInput>
            <LabelInput type={"password"} label="Password" placeholder="Enter Password" onChange={(e)=>{
                setPostInputs(c=>({
                    ...postInputs,
                    password:e.target.value
                }))
            }}></LabelInput>
       {error? <div className="p-4 mt-3 text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium ">{type=="signin"?"Signin Failed":"Signup Failed"}</span>
</div>:""}
            <button onClick={sendRequest} type="button" className="mt-8 w-full  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {type=="signin"?"Signin":"Signup"}

            </button>

            </div>
            </div>
        </div>
    </div>
    {/* <div className="h-screen bg-gradient-to-br   flex justify-center items-center w-full"> */ }
    {/* <form> */ }
    {/* <div className="bg-white px-10 py-8 rounded-xl w-screen  max-w-sm">
      <div className="max-w-md text-left text-xl font-semibold mt-4">
        Create An Account
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Username</label>
          <input type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Email</label>
          <input type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">Password</label>
          <input type="text" className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full" />
        </div>
      </div>
      <button className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide">Register</button>
    </div> */}
    {/* </form> */ }

    // </div>
}
interface LabelInputType{
    label:string;
    placeholder:string;
    type?:string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
}
function LabelInput({ label,placeholder,type,onChange}:LabelInputType){
return <div>
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
<input onChange={onChange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
</div>
}