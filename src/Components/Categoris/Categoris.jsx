import React, { useEffect, useState } from 'react';
import style from "./Categoris.module.css";
import { Helmet } from 'react-helmet';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function getCategories() {
  
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      // setCategories(data.data);

  }


 let {data , isLoading , isError } =  useQuery("getCategories" , getCategories)
 console.log(data);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setCategories(categories.filter(ele => ele.name.toLowerCase().includes(search.toLowerCase())));
    }, 300); // تأخير البحث بعد 300 ميلي ثانية

    return () => clearTimeout(delaySearch); // تنظيف المؤقت في كل تغيير للحقل النصي
  }, [search]);

  return (
    <>
   {isLoading? <Loader/> :    <div className="container my-5 ">
        <input onChange={(e) => setSearch(e.target.value)} type="text" className='form-control my-4' placeholder='Search....' />
        <h1 className='text-center text-main my-4 fw-bold '>Categories :</h1>
        <div className="row g-5">
          {data?.data.data.map((ele, index) =>
            <div key={index} className="col-md-4">
              <div className="categoty productt">
                <img src={ele.image} height={"350"} className='w-100 my-4' alt="" />
                <h5 className='text-center text-main h4 fw-bolder mb-4 mt-3'>{ele.name}</h5>
              </div>
            </div>
          )}
        </div>
      </div>}

      <Helmet>
        <title>Category page</title>
      </Helmet>
    </>
  )
}
