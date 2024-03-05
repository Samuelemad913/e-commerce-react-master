import React, {  useContext, useState } from 'react' ;
import style from "./Login.module.css" ;
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { tokenContext } from '../../Context/TokenContext';
import Loader from '../Loader/Loader';
import { Vortex } from 'react-loader-spinner';



export default function Login() {


  let { token , setToken , getUserData  } = useContext(tokenContext)

 



  const [ errMessage , setErrMessage ] = useState("") ;
  const [ isLoading , setIsLoading ] = useState(false) ;

  const navigate = useNavigate() ;
  const callLogin= async (reqBody)=>
{
setErrMessage("")
setIsLoading(true)
 
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , reqBody)
  .catch((err)=>{
    setIsLoading(false)
    setErrMessage(err.response.data.message )})
  if ( data.message === "success"  ) {

    localStorage.setItem("userToken" , data.token)

    setToken(data.token)
    getUserData()

  
  navigate ('/home')
  }
}



const validationSchema = Yup.object(
  {
   
    email: Yup.string().email("email not valid").required("email is required") ,
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("passowrd is required") ,
    
  }
)

const loginForm = useFormik({
  initialValues : {
    email:"",
    password:""
  },

  validationSchema : validationSchema ,



onSubmit : callLogin

})

  return (
    <>
 

 
<div className=' w-50 m-auto py-5 '>
  <h2>login Now :</h2>
  { errMessage ? <div className='alert alert-danger '> {errMessage } </div>:null  }

  <form onSubmit={loginForm.handleSubmit}>
 
    <div className="form-group">
      <label htmlFor="email"> email</label>
      <input type="email" id='email' name='email' value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} className='form-control mb-3' />
     { loginForm.errors.email && loginForm.touched.email?  <div className='alert alert-danger'> { loginForm.errors.email } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="password"> password</label>
      <input type="password" id='password' name='password' value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} className='form-control mb-3' />
     { loginForm.errors.password && loginForm.touched.password?  <div className='alert alert-danger'> { loginForm.errors.password } </div>:null }
    </div>
  
    <button type="submit" className='btn bg-main text-white d-block  ms-auto  '> 
    { isLoading ? <Vortex
  visible={true}
  height="35"
  width="35"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  /> : "Login" }
     </button>
  
  <Link to={"/forgetPassword"}> <span className=' btn btn-danger text-white '>forget Password...</span> </Link>
  </form>
</div>

    </>
  )


}
