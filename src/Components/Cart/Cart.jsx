import React, { useContext, useEffect, useState } from 'react';
import style from "./Cart.module.css"
import { cartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { getCart, deleteCart, updateItem, setNumberOfItems , numberOfItems ,clearCart } = useContext(cartContext);


async  function getUserCart ()
{
let data = await getCart()
setCartProducts(data);
setLoading(false);
setNumberOfItems(data?.numOfCartItems);

}



useEffect( ()=> {
  getUserCart()
} , [] ) 



  async function removeItems(id) {
    setDeleteLoading(true);
    try {
      let data = await deleteCart(id);
      console.log(data);
      if (data.status === "success") {
        toast.error("Product Deleted Successfully..");
        setCartProducts(data);
        setDeleteLoading(false);
        setNumberOfItems(data?.numOfCartItems);
     
      }
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  }


  async function updateProducts(id, count) {
    try {
      const data = await updateItem(id, count);
      console.log(data);
      if (data.status === "success") {
        const oldProduct = cartProducts.data.products.find((product) => product.product._id === id);
        const oldCount = oldProduct.count;
        if (count > oldCount) {
          toast.success("Product quantity increased");
        } else if (count < oldCount) {
          toast.error("Product quantity decreased");
        }
        setCartProducts(data);
      }
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  }



  async function clearCartData ()
  {
    setLoading(true)
  const data =  await clearCart()
    setCartProducts(null)
   setNumberOfItems(0)
  
  if (data.message==="success")
  {
    toast.success("Successfully Cleared ")
    setLoading(false)
  }
  }



  if (loading) return <Loader />;
  if (deleteLoading) return <Loader />;


  if (!cartProducts?.data?.products || cartProducts.data.products.length === 0) {
    return <h1 className='text-center'> Empty CArt </h1>;
  }



  return (
    <>

      <div className="container my-3 bg-main-light p-3 rounded-1">
        <button onClick={clearCartData} className='btn btn-lg  btn-danger my-4 m-auto d-block'>Clear Cart</button>
        <h2 className=' fw-bolder '>Shop Cart :</h2>
       <div className='d-flex justify-content-between mb-3 ' >
       <p className='text-main fw-bolder '>Total Cart Price : {cartProducts?.data?.totalCartPrice} EGP </p>
       <h4 className='fw-bolder '> number of items : <span className='text-main' >{numberOfItems}</span> </h4>
       </div>

        {cartProducts?.data?.products.map(ele =>
          <div className="row py-2 border-bottom" key={ele.product._id}>
            <div className="col-md-2">
              <img src={ele.product.imageCover} className='w-100 categoty' alt="" />
            </div>
            <div className="col-md-10 d-flex justify-content-between">
              <div className="title">
                <p className='m-1 fw-bolder '>  {ele.product.title}</p>
                <p className='text-main p-0 m-1 fw-bolder'> price : {ele.price} </p>
                <button onClick={() => removeItems(ele.product._id)} className='btn p-0 fw-bolder text-danger '> <i className="fa-solid fa-trash-can text-danger fw-bolder "></i> remove </button>
              </div>
              <div>
                <button onClick={() => updateProducts(ele.product._id, ele.count + 1)} className='btn  btn-outline-info   '> + </button>
                <span className='px-2 fw-bolder'> {ele.count} </span>
                <button disabled={ele.count <= 1} onClick={() => updateProducts(ele.product._id, ele.count - 1)} className='btn btn-outline-danger  '> -</button>
              </div>
            </div>
          </div>
        )}
<div className="d-flex justify-content-between">
<Link to={"/Shipping"}  className='btn btn-lg  btn-primary text-white my-4 '> Online Payment : </Link>
<Link to={"/CashPayment"}  className='btn btn-lg btn-primary text-white my-4 '> Cash payment: </Link>

</div>
<Helmet>
      
      <title>Cart page</title>
    
    </Helmet>
      </div>
    </>
  )
}
