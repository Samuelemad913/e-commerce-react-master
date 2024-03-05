import React, { useContext, useState } from 'react' ;
import style from "./Shipping.module.css"
import { useFormik } from 'formik';
import axios from 'axios';
import { cartContext } from '../../Context/CartContext';

export default function Shipping() {

  const {cartId ,  onlinePayment} =  useContext(cartContext) ;




async function handleOnsubmit (value)
 {
  const {data} =  await onlinePayment(value)
  console.log(data);

  window.location.href = data.session.url
 
 }


const shippingForm = useFormik({
  initialValues : {
    details: "",
    phone: "",
    city: ""
  } ,


onSubmit : handleOnsubmit

}) 





return (
  <div className="w-75  mx-auto bg-main-light my-5 p-3 rounded-2 ">
    <h2 className='text-center fw-bold'>Shipping Address :</h2>
    <form onSubmit={shippingForm.handleSubmit} className="form ">
      <div className="form-group mb-3">
        <label htmlFor="details">Details</label>
        <input type="text" id='details' value={shippingForm.values.details} onChange={shippingForm.handleChange} name='details' className='form-control'  />
      </div>
      <div className="form-group mb-3">
        <label className='mb-1' htmlFor="phone">Phone</label>
        <input type="tel" id='phone' value={shippingForm.values.phone} onChange={shippingForm.handleChange} name='phone' className='form-control'  />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="city">City</label>
        <input type="text" value={shippingForm.values.city} onChange={shippingForm.handleChange} id='city' name='city' className='form-control'  />
      </div>
     <div className="d-flex justify-content-between ">
     <button type='submit' className='btn bg-main text-white mt-2'>Confirm Online Payment  </button>
     </div>
    </form>
  </div>
);

}
