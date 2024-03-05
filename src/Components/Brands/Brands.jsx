import React, { useEffect, useState } from 'react' ;
import style from "./Brands.module.css"
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';

export default function Brands() {




  async function getAllBrands()
  {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  
  }


let {data , isLoading , isError} =   useQuery("getAllBrands" , getAllBrands)

console.log(data);




  return (

    
  <>
  
{isLoading?<Loader/> :  <div className="container my-5">
    <h1 className='text-center fw-bold text-main my-5 '>All Brands</h1>
    <div className="row g-5">
    { data?.data.data.map((ele , id)=>   <div key={id} className={`col-md-3 `}>
        <div className="categoty productt">
     <img src= {ele.image} className='w-100'  alt="" />
     <h4 className='text-center my-4 h6 fw-bold'> {ele.name} </h4>
        </div>
      </div> ) }
    </div>
  </div>
   }
<Helmet>
      
      <title>Brands page</title>
    
    </Helmet>

  </>
  )
}
