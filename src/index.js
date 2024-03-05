import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TokenContextProvider from './Context/TokenContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools"
import CartContextProvider from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { Offline } from 'react-detect-offline';







const root = ReactDOM.createRoot(document.getElementById('root'));
let quertClient = new QueryClient()
root.render(


<Provider store={store} > 
    
<QueryClientProvider client={quertClient}>
<CartContextProvider>
    <TokenContextProvider>
<ToastContainer theme='colored' autoClose={1000} />
<App /> 
</TokenContextProvider>
<ReactQueryDevtools initialIsOpen= "false" position='bottom-left' /> </CartContextProvider>


</QueryClientProvider>
    
    <Offline>
    <div className="div bg-dark text-white w-100 vh-100 fixed-bottom"> Your Interner Connection has been Corrected </div>
    </Offline>
    
    </Provider>

    


 

 




  
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
