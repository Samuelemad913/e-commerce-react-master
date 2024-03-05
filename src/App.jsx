import logo from './logo.svg';
import './App.css'; 
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import { Children, useContext, useEffect } from 'react';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Products from './Components/Products/Products';
import Categoris from './Components/Categoris/Categoris';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';

import LogOut from './Components/LogOut/LogOut';
import ProtectedRow from './Components/ProtectedRow/ProtectedRow';
import { tokenContext } from './Context/TokenContext';
import Protected from './Components/Protected/Protected';
import ProductsDetiles from './Components/ProductsDetiles/ProductsDetiles';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Shipping/Shipping';
import Allorders from './Components/Allorders/Allorders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import CashPayment from './Components/CashPayment/CashPayment';
import Profile from './Components/Profile/Profile';
import WishList from './Components/WishList/WishList';
import ResetPassword from './Components/ResetPassword/ResetPassword';







function App() {


  let { setToken  ,getUserData } = useContext(tokenContext)

const routes =  createHashRouter([
  { path : "" , element : <LayOut/> , children : [
    {  path : "home" , element : <Protected> <Home/>  </Protected>},
    {  path : "" , element : <Protected> <Home/>  </Protected>},
    {  path : "brands" , element : <Protected> <Brands/>  </Protected>} ,
    {  path : "products" , element : <Protected> <Products/>  </Protected>},
    {  path : "cart" , element : <Protected> <Cart/>  </Protected>},
    {  path : "profile" , element : <Protected> <Profile/>  </Protected>},
    {  path : "wishList" , element : <Protected> <WishList/>  </Protected>},
    {  path : "categories" , element : <Protected> <Categoris/>  </Protected>},
    {  path : "resetPassword" , element :  <ResetPassword/> },
    {  path : "shipping" , element : <Protected> <Shipping/>  </Protected>},
    {  path : "CashPayment" , element : <Protected> <CashPayment/>  </Protected>},
    {  path : "/allorders" , element : <Protected> <Allorders/>  </Protected>},
    {  path : "ProductsDetiles/:id" , element : <Protected> <ProductsDetiles/>  </Protected>},
    {  path : "forgetPassword" , element : <ForgetPassword/>  },
    {  path : "login" , element : <Login/>  },
  
    {  path : "register" , element : <Register/>  },
    {  path : "*" , element : <NotFound/>  },
    
  ] }
 ])

 useEffect ( ()=>{
if (localStorage.getItem("userToken") !==null)
{
  setToken(localStorage.getItem("userToken"))
  getUserData()
}
 } ,[]  )

  return (
   <>



<RouterProvider router={routes}></RouterProvider> 


   

   </>
  );
}

export default App;
