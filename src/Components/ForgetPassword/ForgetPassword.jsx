import React, { useState } from 'react';
import style from "./ForgetPassword.module.css";
import { useFormik,} from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function ForgetPassword() {

let navigate = useNavigate()

  const [firstFormCompleted, setFirstFormCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function forgotPassword(values) {
    setIsLoading(true)
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
    if (data.statusMsg === "success") {
      toast.success(" The code has been sent to you successfully...");
      setFirstFormCompleted(true); 
      setIsLoading(false)
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email("email not valid").required("email is required"),
  });

  const emailFormik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: forgotPassword,
    validationSchema: validationSchema
  });

  async function verifyCode(values) {
  setIsLoading(true)
  
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
    console.log(data);

    if (data.status === 'Success') {
      setIsLoading(false)
      navigate("/resetPassword");

    }
    
    
    
  }

  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Enter Your Code"),
  });

  const verifyFormik = useFormik({
    initialValues: {
      resetCode: ""
    },
    onSubmit: verifyCode,
    validationSchema: validationSchema2
  });




if (isLoading) return <Loader/>


  return (
    <>
      <div className={`w-50 mx-auto my-5 ${firstFormCompleted ? 'd-none' : ''}`}>
        <h3 className='mt-5 text-center text-danger fw-bold'>Forgot Password</h3>
        <form className="form" onSubmit={emailFormik.handleSubmit}>
          <label className='fw-bold my-3' htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' value={emailFormik.values.email} onChange={emailFormik.handleChange} onBlur={emailFormik.handleBlur} className='form-control' />
          {emailFormik.touched.email && emailFormik.errors.email ? <div className='alert alert-danger '>  {emailFormik.errors.email} </div> : ""}
          <button disabled={!(emailFormik.isValid && emailFormik.dirty)} type='submit' className='btn bg-main text-white my-4'>Send Email</button>
        </form>
      </div>

      <div className={`w-50 mx-auto my-5 ${firstFormCompleted ? '' : 'd-none'}`}>
        <h3 className='mt-5 text-center text-danger fw-bold'>Verify Code</h3>
        <form className="form" onSubmit={verifyFormik.handleSubmit}>
          <label className='fw-bold my-3' htmlFor="resetCode">resetCode:</label>
          <input type="text" id='resetCode' name='resetCode' value={verifyFormik.values.resetCode.toString()} onChange={verifyFormik.handleChange} onBlur={verifyFormik.handleBlur} className='form-control' />
    
          {verifyFormik.touched.resetCode && verifyFormik.errors.resetCode ? <div className='alert alert-danger '>  {verifyFormik.errors.resetCode} </div> : ""}
          <button disabled={!(verifyFormik.isValid && verifyFormik.dirty)} type='submit' className='btn bg-main text-white my-4'>Send Code</button>
        </form>
      </div>
    </>
  );
}
