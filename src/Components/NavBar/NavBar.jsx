import style from "./NavBar.module.css"
import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContext';
import imgLogo from "../../assets/image/freshcart-logo.svg";
import { cartContext } from '../../Context/CartContext';

export default function NavBar() {
  const { numberOfItems , numberOfWish } = useContext(cartContext);
  const { token, setToken } = useContext(tokenContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/Login");
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className={`container bg-main-light p-3 rounded-3`}>
        <Link className="navbar-brand" to={"home"}> <img src={imgLogo} alt="" /> </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token ? (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink exact activeClassName={style.activeLink} className="nav-link fw-bold" to={"home"}>  Home <i className="fa-solid fa-house text-black "></i></NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName={style.activeLink} className="nav-link fw-bold position-relative" to={"cart"}>
                  Cart <i className="fa-solid fa-cart-shopping  text-dark fs-4 "></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {numberOfItems}</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName={style.activeLink} className="nav-link fw-bold" to={"products"}>Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName={style.activeLink} className="nav-link fw-bold" to={"categories"}>Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName={style.activeLink} className="nav-link fw-bold" to={"brands"}>Brands</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName={style.activeLink} className="nav-link fw-bold position-relative" to={"wishList"}>
                  Wish List <i class="fa-solid fa-heart fs-4 text-danger "></i>
                </NavLink>
              </li>
            </ul>
          ) : null}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className=' align-self-center '>
              <a target='_blank' href="https://www.facebook.com/home.php"><i className="fa-brands fa-facebook px-2 text-main "></i></a>
              <i className="fa-brands fa-linkedin px-2 text-main"></i>
              <i className="fa-brands fa-instagram px-2 text-main"></i>
              <i className="fa-brands fa-twitter px-2 text-main"></i>
              <i className="fa-brands fa-youtube px-2 text-main"></i>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <span onClick={() => logOut()} className={`nav-link fw-bold ${style.CursorPointer}`}>LogOut</span>
                </li>
                <li className="nav-item">
                  <NavLink activeClassName={style.activeLink} className="nav-link fw-bold" to={"profile"}>Profile</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink activeClassName={style.activeLink} className="nav-link fw-bold" to={"login"}>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink activeClassName={style.activeLink} className="nav-link fw-bold" to={"register"}>Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
