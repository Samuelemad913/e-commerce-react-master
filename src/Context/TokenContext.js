import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";


export let tokenContext = createContext();


export default function TokenContextProvider (props)
{

const[ token , setToken  ]= useState() ;
const[ userData , setUserData  ]= useState(null)


function getUserData ()
{
 const userData =    jwtDecode(localStorage.getItem("userToken"))
 console.log(userData , "userData");
 setUserData(userData)
}


    return <tokenContext.Provider value={{ token , setToken  , userData , getUserData }}>
 { props.children  }

    </tokenContext.Provider>
}