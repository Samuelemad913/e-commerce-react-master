import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';

export default function FeaturedProducts() {




  const { addToCart, setNumberOfItems, addWishList, setNumberOfWish } = useContext(cartContext);
  const [addLoading, setAddLoading] = useState(false);
  const [selectedHeart, setSelectedHeart] = useState(null); 

  async function addProductToCart(productId) {
    setAddLoading(true);
    let data = await addToCart(productId);
    console.log("data", data);
    if (data.status === "success") {
      toast.success(data.message);
      setAddLoading(false);
      setNumberOfItems(data.numOfCartItems);
    }
  }

  async function addWish(productId) {
    const { data } = await addWishList(productId);
    console.log(data);
    setNumberOfWish(data.count);
    toast.success("it has been successfuly added");
  }

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, isError, data, isFetching } = useQuery("FeaturedProducts", getProducts, {
    cacheTime: 3000,
  });

  if (addLoading) return <Loader />;






  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container my-4">
          <div className="row gy-4">
            {data?.data.data.map((product, id) => (
              <div key={product.id} className="col-md-2">
                <div className="product p-2">
                <i class=" fa-solid fa-heart-circle-plus  fs-2 cursor-pointer" style={{color : selectedHeart===product.id ? "red": "unset"}} onClick={ ()=>{ addWish(product.id) ; setSelectedHeart(product.id)  } } ></i>
                  <Link to={`/ProductsDetiles/${product.id}`}>
                    <img src={product.imageCover} className="w-100" alt="" />
                    <p className="text-main font-sm">{product.category.name}</p>
                    <h3 className="h5 fw-bold ">{product.title.split(" ").splice(0, 2).join(" ")}</h3>
                    <div className="d-flex justify-content-between align-items-center py-3">
                      <span className="font-sm">{product.price} EGP</span>
                      <span className="font-sm">
                        {product.ratingsAverage} <i className="fas fa-star rating-color me-1"></i>
                      </span>
                    </div>
                  </Link>
                  <button onClick={() => addProductToCart(product.id)} className="btn bg-main w-100 text-white btn-sm">
                    +Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
