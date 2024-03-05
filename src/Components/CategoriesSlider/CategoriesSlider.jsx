import React, { useEffect, useState } from 'react';
import style from "./CategoriesSlider.module.css";
import axios from 'axios';
import Slider from 'react-slick';
import Loader from '../Loader/Loader';

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [loadein, setLoadein] = useState(true); 

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadein(false); 
      }
    }
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1
  };

  return (
    <>
      <div className="container my-5 ">
        {loadein ? ( 
          <Loader />
        ) : (
          <Slider {...settings}>
            {categories.map((cat,index) => (
              <div className="categories px-1" key={index}>
                <img src={cat.image} height={"200"} className="w-100" alt="" />
                <h5>{cat.name}</h5>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
