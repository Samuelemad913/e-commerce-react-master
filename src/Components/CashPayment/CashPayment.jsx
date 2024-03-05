import React, { useContext } from 'react' ;
import style from "./CashPayment.module.css"
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function CashPayment() {
  let {cartId , cashPayment} =   useContext(cartContext)

const navigate = useNavigate()

async function handleCashPayment (value)
{
const {data} = await cashPayment(value)
console.log(data , "hambozooooo");
if (data.status==="success")
{
  toast.success("The order has been delivered")
  navigate("/Home")
}
}




  
const cashForm = useFormik({
  initialValues : {
    details: "",
    phone: "",
    city: ""
  } ,


onSubmit : handleCashPayment

}) 





return (
  <div className="w-75  mx-auto bg-main-light my-5 p-3 rounded-2 ">
    <h2 className='text-center fw-bold'>Cash Address :</h2>
    <form onSubmit={cashForm.handleSubmit} className="form ">
      <div className="form-group mb-3">
        <label htmlFor="details">Details</label>
        <input type="text" id='details' value={cashForm.values.details} onChange={cashForm.handleChange} name='details' className='form-control'  />
      </div>
      <div className="form-group mb-3">
        <label className='mb-1' htmlFor="phone">Phone</label>
        <input type="tel" id='phone' value={cashForm.values.phone} onChange={cashForm.handleChange} name='phone' className='form-control'  />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="city">City</label>
        <input type="text" value={cashForm.values.city} onChange={cashForm.handleChange} id='city' name='city' className='form-control'  />
      </div>
     <div className="d-flex justify-content-between ">
     <button type='submit' className='btn bg-main text-white mt-2'>Confirm Cash Payment  </button>
     </div>
    </form>
  </div>
);

}
