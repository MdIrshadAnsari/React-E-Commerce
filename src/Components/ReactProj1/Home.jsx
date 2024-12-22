import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import {ProductContext} from "../Utils/Context";
import Loading from "./Loading";
import axios from "../Utils/axios";

function Home(){
  
  const [products] = useContext(ProductContext)
  const {search} = useLocation();
  const category = decodeURIComponent(search.split("=")[1])

  const[filterproduct, setfilterproduct] = useState(null)

  const getproductcategory = async()=>{
    try {
     const{data} = await axios.get(`/products/category/${category}`)
     setfilterproduct(data)
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(!filterproduct || category == "undefined") setfilterproduct(products)
    if(category != "undefined") {
     // getproductcategory()
      setfilterproduct(products.filter((p)=> p.category == category))
    }
  },[category, products])
 console.log(filterproduct)

    return products ? (
        <>
        <Nav />
        <div className=" w-[85%] p-10 pt[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filterproduct && filterproduct.map((items, index)=> (
        <Link to={`/details/${items.id}`} className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex-col flex items-center justify-center ">
          <div
            className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                `url(${items.image})`,
            }}
          ></div>
          <h1>{items.title}</h1>
        </Link >
          ))}
        
        </div>
      </>
    ):(
      <Loading />
    )
}
export default Home;