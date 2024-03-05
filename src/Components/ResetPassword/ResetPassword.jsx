import React from 'react' ;
import style from "./ResetPassword.module.css"
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

let navigate = useNavigate()

  async function resetPassword (values)
  {
    const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , values)
    console.log(data);
    if (data.token)
    {
      navigate("/login")
    }
  }

  const resetFormik = useFormik({
    initialValues: {
      email: "" ,
      newPassword : ""
    },


    onSubmit : resetPassword 
  
  });


  return (
  <>
  
  <div className={`w-50 mx-auto my-5 `}>
        <h3 className='mt-5 text-center text-danger fw-bold'>Reset Password</h3>
        <form className="form" onSubmit={resetFormik.handleSubmit}>
          <label className='fw-bold my-3' htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' value={resetFormik.values.email} onChange={resetFormik.handleChange} onBlur={resetFormik.handleBlur} className='form-control' />
          <label className='fw-bold my-3 ' htmlFor="newPassword"> New Password</label>
          <input type="password" id='newPassword' name='newPassword' value={resetFormik.values.newPassword} onChange={resetFormik.handleChange} onBlur={resetFormik.handleBlur} className='form-control' />
          {resetFormik.touched.email && resetFormik.errors.email ? <div className='alert alert-danger '>  {resetFormik.errors.email} </div> : ""}
          <button disabled={!(resetFormik.isValid && resetFormik.dirty)} type='submit' className='btn bg-main text-white my-4'>Send Email</button>
        </form>
      </div>
  
  </>
  )
}
