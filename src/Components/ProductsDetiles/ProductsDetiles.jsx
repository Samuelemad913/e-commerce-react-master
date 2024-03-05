import React, { useContext, useEffect, useState } from 'react' ;
import style from "./ProductsDetiles.module.css"
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { logDOM } from '@testing-library/react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';


export default function ProductsDetiles() {

  const { setNumberOfItems } = useContext(cartContext); 

  let [ addLoading , setAddLoading  ] = useState(false)

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  const { addToCart } = useContext(cartContext); 

  async function addProductToCart(productId) {
    setAddLoading(true)
    let data = await addToCart(productId);
    console.log("data", data);
    if (data.status === "success") {
      toast.success(data.message);
      setAddLoading(false)
      setNumberOfItems( data.numOfCartItems )
    }
  }



  let {id}=useParams()
 function getProductDetailes ()
  {
return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)


  }

let {isLoading , isError , data}  = useQuery("productsDetails" , getProductDetailes)
  if (isLoading) {
    return <Loader/>
  }


  if (isError){
    return <Navigate to={'/home'} />
  }


  if ( addLoading ) return <Loader/>




  
  
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
       

         <Slider {...settings}>
  {data?.data.data.images && data?.data.data.images.map((img , id)=> <img key={data?.data.data.id} src={img} className='w-100' alt="" />)}
</Slider>

<Helmet>
<title>{data?.data.data.title} </title>  
</Helmet>

        </div>
        <div className="col-md-8">
          <div className="detailes">
            <h3 className='h5'>{data?.data.data.title}</h3>
            <p className='font-sm'>{data?.data.data.description}</p>
            <span className='fw-bold'>{data?.data.data.category && data?.data.data.category.name}</span>
            <div className="d-flex justify-content-between align-items-center py-3">
              <span className='font-sm'>{data?.data.data.price} EGP</span>
              <span className='font-sm'>{data?.data.data.ratingsAverage} <i className='fas fa-star rating-color me-1'></i></span>
            </div>
            <button onClick={()=>addProductToCart(data?.data.data.id)} className='btn bg-main w-100 text-white btn-sm'>
            
              +Add to cart
              </button>
          </div>
        </div>
      </div>
    </div>

  )
  
}
