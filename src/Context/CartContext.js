import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { date } from "yup";

export let cartContext = createContext();



export default function CartContextProvider(props) {
  const [numberOfItems, setNumberOfItems] = useState(null);
  const [numberOfWish , setNumberOfWish] = useState(null)
  const [cartId, setCartId] = useState(null);




  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }


  async function getCart() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
  

  async function deleteCart(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }



  async function clearCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      
      return data;
    } catch (error) {
      throw error;
    }
  }



  async function updateItem(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      return data;
    } catch (error) {
      throw error;
    }
  }



  async  function getUserCart ()
  {
  let data = await getCart()

  setNumberOfItems(data?.numOfCartItems);

setCartId(data?.data._id)
  
  }
  

  useEffect ( ()=>{
    getUserCart()
  } , []  )






  async function onlinePayment(shippingAddress) {
    try {
     return await axios.post(
       `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        shippingAddress ,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );

    } catch (error) {
      throw error;
    }
  }



  
  async function cashPayment(shippingAddress) {
    try {
     return await axios.post(
       `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingAddress ,
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );

    } catch (error) {
      throw error;
    }
  }



  
  async function addWishList(productId) {
    try {
      return await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId }, 
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
    } catch (error) {
      throw error;
    }
  }
  


  return (
    <cartContext.Provider
      value={{ addToCart, getCart, deleteCart, updateItem, numberOfItems, setNumberOfItems ,cartId , onlinePayment ,clearCart , cashPayment ,addWishList ,setNumberOfWish , numberOfWish  }}
    >
      {props.children}
    </cartContext.Provider>
  );
}






// 65d4fa721eac6df1dfa2f351