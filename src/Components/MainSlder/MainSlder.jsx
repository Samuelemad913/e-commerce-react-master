import React from 'react' ;
import style from "./MainSlder.module.css" ;
import img1 from "../../assets/image/slider-image-1.jpeg" ;
import img2 from "../../assets/image/slider-image-2.jpeg" ;
import img3 from "../../assets/image/slider-image-3.jpeg" ;
import Slider from 'react-slick';

export default function MainSlder() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
   <div className="container my-5">
    <div className="row">
      <div className="col-md-8">
      <Slider {...settings}>
     <img src={ img3 } alt="" />
     <img src={ img1 } alt="" />
     <img src={ img2 } alt="" />
    </Slider>
      </div>
      <div className="col-md-4">
<img src={ img1 } className='w-100' alt="" /> 
<img src={ img2 } className='w-100' alt="" /> 
      </div>
    </div>
   </div>
    </>
  )
}
