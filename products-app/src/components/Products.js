import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
    const [productArray, setProductArray] = useState([]);
    const postApi = async ()=>{
        try{
            await axios
            .post("https://pfp-public-productdb-api.azurewebsites.net/api/product/search",
            {})
            .then((res)=> {
                console.log(res,"response")
                setProductArray(res?.data?.results)})
            }catch(error){
            console.log(error)
        }
    } ;
    console.log("Product Array", productArray)

    useEffect(()=>{postApi()
         },[])
  return (
    {productArray?.map((product)=>{
     return<div>
        <p>{product?.id}</p>
        <p>{product.name}</p>
        </div>
  })}
  )
  }

export default Products