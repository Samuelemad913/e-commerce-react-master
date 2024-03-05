
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import style from "./Products.module.css"
import { Helmet } from 'react-helmet'; 



export default function Products() {





  return (
    <h2>
  

<FeaturedProducts/>

      <Helmet>
      
      <title>products page</title>
    
    </Helmet>
    </h2>
  )
}
