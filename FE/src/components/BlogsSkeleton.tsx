import React from 'react'
import { Circle } from './BLogCard'

export const BlogsSkeleton = () => {
  return <div role="status" className="animate-pulse">
  <div className='p-4 border-slate-200 border-b pb-4 w-screen max-w-screen-md cursor-pointer'>
        <div className='flex'>
            {/* <div className='flex justify-center flex-col'> */}
            <div className="h-4 w-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
            {/* </div> */}
            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
            <div className='flex justify-center flex-col pl-2 flex justify-center flex-col'>
                <Circle />
            </div>
            <div className='font-extralight pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col'>
            <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
            </div>
        </div>
        <div className='text-xl font-semibold pt-2'>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
        </div>
        <div className='text-md font-thin pt-2'>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
        </div>
        <div className='text-slate-500 text-sm font-thin'>
            
        </div>
        {/* <div className='bg-slate-200 h-1 w-full text-slate-400'>

        </div> */}
    </div>
  
</div>
  
}
