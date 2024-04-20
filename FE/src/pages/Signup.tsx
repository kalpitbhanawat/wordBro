import React from 'react'

import { Quote } from "../components/Quote"
import { Auth } from '../components/Auth'
export const Signup = () => {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid grid-cols-2'>
        <div>
          <Auth type={"signup"}></Auth>
        </div>
        <div className="invisible lg:visible">
          <Quote></Quote>
        </div>
      </div>
    </div>
  )
}
