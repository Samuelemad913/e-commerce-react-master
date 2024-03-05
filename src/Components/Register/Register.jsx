import React, { useState } from 'react' ;
import style from "./Register.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function Register() {


  const [ errMessage , setErrMessage ] = useState("") ;
  const [ isLoading , setIsLoading ] = useState(false) ;

  const navigate = useNavigate() ;
  const callRegister = async (reqBody)=>
{
setErrMessage("")
setIsLoading(true)
 
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , reqBody)
  .catch((err)=>{
    setIsLoading(false)
    setErrMessage(err.response.data.message )})
  console.log(data);
  if ( data.message === "success"  ) {
  
  navigate ('/Login')
  }
}



const validationSchema = Yup.object(
  {
    name: Yup.string().min(3 , "name is too short").max(7,"name is too long").required("the name is required") ,
    email: Yup.string().email("email not valid").required("email is required") ,
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("passowrd is required") ,
    rePassword: Yup.string().oneOf([Yup.ref("password")] , "passowrd and rePassowrd should be match").required("rePassword is required") ,
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/ ,"invalid number").required("phone is required")
  }
)

const registerForm = useFormik({
  initialValues : {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:""
  },

  validationSchema : validationSchema ,



onSubmit : callRegister

})

  return (
    <>
 

 
<div className=' w-50 m-auto py-5 '>
  <h2>Register Now :</h2>
  { errMessage ? <div className='alert alert-danger '> {errMessage } </div>:null  }

  <form onSubmit={registerForm.handleSubmit}>
    <div className="form-group">
      <label htmlFor="fullName"> full Name </label>
      <input type="text" id='fullName' name='name' value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className='form-control mb-3' />
     { registerForm.errors.name && registerForm.touched.name?  <div className='alert alert-danger'> { registerForm.errors.name } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="email"> email</label>
      <input type="email" id='email' name='email' value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className='form-control mb-3' />
     { registerForm.errors.email && registerForm.touched.email?  <div className='alert alert-danger'> { registerForm.errors.email } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="password"> password</label>
      <input type="password" id='password' name='password' value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className='form-control mb-3' />
     { registerForm.errors.password && registerForm.touched.password?  <div className='alert alert-danger'> { registerForm.errors.password } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="rePassword"> rePassword</label>
      <input type="password" id='rePassword' name='rePassword' value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className='form-control mb-3' />
     { registerForm.errors.rePassword && registerForm.touched.rePassword?  <div className='alert alert-danger'> { registerForm.errors.rePassword } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="phone"> phone</label>
      <input type="tel" id='phone' name='phone' value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} className='form-control mb-3' />
     { registerForm.errors.phone && registerForm.touched.phone?  <div className='alert alert-danger'> { registerForm.errors.phone } </div>:null }
    </div>
    <button type="submit" className='btn bg-main text-white d-block  ms-auto  '> 
     "Register" 
     </button>
  </form>
</div>

    </>
  )
}
