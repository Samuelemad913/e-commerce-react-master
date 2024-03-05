import React, { useContext } from 'react' ;
import style from "./Profile.module.css"
import { tokenContext } from '../../Context/TokenContext';



export default function Profile() {


 const {userData} =  useContext(tokenContext)
  return (
  <>
  
 <div className="container" >
 <h1 className='my-5 bg-black text-white text-center'> Hello Ya  {userData?.name} </h1>
 </div>
  
  
  </>
  )
}
