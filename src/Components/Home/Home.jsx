import { Helmet } from "react-helmet";
import MainSlder from "../MainSlder/MainSlder";
import style from "./Home.module.css";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import Loader from "../Loader/Loader";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

export default function Home() {

  return (
    <>
      <Helmet>
      
        <title>Home page</title>
      
      </Helmet>
      <MainSlder />

      <CategoriesSlider/>
      <FeaturedProducts/>
    </>
  );
}
