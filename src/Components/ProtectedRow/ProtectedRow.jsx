import React from 'react' ;
import style from "./ProtectedRow.module.css"
import { Navigate } from 'react-router-dom';

export default function ProtectedRow(props) {



if ( localStorage.getItem("userToken") !==null  )
{

return props.children


} else 
{
return <Navigate to={"/Login"} />
}

  return (
    <h2>
      ProtectedRow
    </h2>
  )
}
