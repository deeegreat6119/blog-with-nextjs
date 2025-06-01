"use client"
import { Product } from "@/types"
import { use } from "react"

const ProductList = ({ products }: { products: Promise<Product[]> }) => {
  const allproducts = use(products)

  return (
    <div>
      {allproducts.map((each) => (
        <div key={each.id} className="rounded bg-slate-100 p-4 m-4">
          {each.name}
        </div>
      ))}
    </div>
  )
}

export default ProductList

export const ProductsSkeleton = () => {
  return (
    <div className="">
      <div className="bg-slate-100 animate-pulse h-10 w-80 m-3 rounded"></div>
      <div className="bg-slate-100 animate-pulse h-10 w-80 m-3 rounded"></div>
      <div className="bg-slate-100 animate-pulse h-10 w-80 m-3 rounded"></div>
    </div>
  )
}
