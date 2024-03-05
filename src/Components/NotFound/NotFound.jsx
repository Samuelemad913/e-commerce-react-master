import React from 'react' ;
import style from "./NotFound.module.css"
import imgNotFound from "../../assets/image/error.svg"

export default function NotFound() {
  return (
 <>
 
 
 <div className="container">
<figure className='text-center'>
  <img src= { imgNotFound } className='w-75' alt="" />
</figure>
 </div>
 
 </>
  )
}
