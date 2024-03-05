import React from 'react'
import { ColorRing } from 'react-loader-spinner'
import style from "./Loader.module.css"
import imgLoader from "../../assets/image/freshcart-logo.svg"


export default function Loader() {
  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 position-fixed top-0 start-0 end-0 bottom-0 ${style.loaderWrapper}`}>
      <ColorRing
        visible={true}
        height={80}
        width={80}
        ariaLabel="color-ring-loading"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      <figure className='text-center'>
        <img src={imgLoader} className='w-100' alt="" />
      </figure>
    </div>
  );
}
