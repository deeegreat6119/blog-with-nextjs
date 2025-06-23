"use client"
import { Product} from "@/types"
import { gql, useQuery } from "@apollo/client"
import {use} from "react"
import client from "@/app/lib/graphql-client"


const GET_USERS = gql `
  query{
    users
  }
`

const ProductList = ({products}: {products: Promise<Product[]>}) => {
  const allproducts = use(products)

  const response = useQuery(GET_USERS, {client})
  console.log(response);
  

  return (
    <div>
      {allproducts.map((each)=>(
        <div key={each.id} className="rounded bg-slate-100 p-4 m-4">
          {each.name}
        </div>
      ))}
    </div>
  )
}

export default ProductList

export const ProductsSkeleton = ()=>{
  return <div>
    <div>Loading product</div>
  </div>
}