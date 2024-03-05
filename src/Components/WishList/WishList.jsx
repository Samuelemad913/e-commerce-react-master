import React, { useContext, useEffect, useState } from 'react' ;
import style from "./WishList.module.css"
import axios from 'axios';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';

export default function WishList() {


const [wishProducts , setWishProducts] =  useState([])
const [removeLoading , setRemoveLoading] =  useState(false)
const [addLoading , setaddLoading] =  useState(false)
const [isLoading , setisLoading] =  useState(true)
const {addToCart , setNumberOfItems , setNumberOfWish,numberOfWish} =  useContext(cartContext)


async function getWishList  ()
{

  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,
  {
    headers : { token : localStorage.getItem("userToken") }
  }).then(res=>res).catch(err=>err)
  console.log(data);
  setWishProducts(data.data)
  setNumberOfWish(data?.numberOfWish)
  setisLoading(false)
  setNumberOfWish(data.count)



}


async function removeWish(wishId) {
  setRemoveLoading(true)
  const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${wishId}`, {
    headers: { token: localStorage.getItem("userToken") }
  }).then(res => res).catch(err => err);

  console.log(data);

  if (data.status === "success") {
    toast.error(`${data.message}`);
    setRemoveLoading(false)
    setWishProducts(prevWishProducts => prevWishProducts.filter(product => product.id !== wishId));
    setNumberOfWish(prevNumberOfWish => prevNumberOfWish - 1); 
    

  }
}



useEffect(()=>{
  getWishList()
} , [])


async function addWishToCart(productId) {
  setaddLoading(true)
  const data = await addToCart(productId);
  if (data.status === "success") {
    toast.success("Product added to cart successfully");
    setNumberOfItems(data?.numOfCartItems);
    setaddLoading(false)
    setWishProducts(prevWishProducts => prevWishProducts.filter(product => product.id !== productId));
    setNumberOfWish(prevNumberOfWish => prevNumberOfWish - 1); 


  }
}


if (removeLoading) return <Loader/> ;
if (addLoading) return <Loader/>




  return (
 <>
 
{ isLoading? <Loader/> :  <div className="container bg-main-light my-5">
 <h2 className=' fw-bolder my-5 py-5 text-center'>My wish List</h2>
{ wishProducts.map((ele , id)=>  <div key={id} className="row">
   
 <div className="col-md-2">
  <figure>
    <img src= {ele.imageCover} className='w-75'  alt="" />
  </figure>
 </div>
 <div className="col-md-10">
  <div className="d-flex justify-content-between align-items-center ">

<div>
<h3 className='h6 fw-bold my-3'> {ele.title} </h3>
    <div className="price fw-bold"> {ele.price} </div>
    <button onClick={()=>removeWish(ele.id)} className='btn p-0 fw-bolder text-danger my-3 '> <i className="fa-solid fa-trash-can text-danger fw-bolder "></i> remove </button></div>
<div>
  <button onClick={()=>addWishToCart(ele.id)} className='btn btn-lg btn-info text-white my-2'> Add To Cart </button>
  
  </div>
  </div>
 </div>
  </div>)  }
 </div>
  }
 
 </>
  )
}
