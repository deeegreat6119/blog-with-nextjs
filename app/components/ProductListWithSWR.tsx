"use client"
import { Product } from "@/types"
import { fetcher } from "@/utils"
import useSWR from "swr"

// const value = Boolean("0");
// console.log(value);

// const number = 1e10;

const ProductListWithSWR = () => {
  const { data, isLoading, error } = useSWR<Product[]>(
    "https://api.vercel.app/products",
    // https://jsonplaceholder.typicode.com/posts
    fetcher
  )

  if (isLoading) {
    return <div>Loading Products...</div>
  }

  if (error) {
    return <div>An error occured</div>
  }

  return (
    <div>
      {data?.map((each) => (
        <div key={each.id} className="rounded bg-slate-100 p-4 m-4">
          {each.name}
        </div>
      ))}
    </div>
  )
}

export default ProductListWithSWR

export const ProductsSkeleton = () => {
  return (
    <div className="">
      <div className="bg-slate-100 animate-pulse h-10 w-80 m-3 rounded"></div>
      <div className="bg-slate-100 animate-pulse h-10 w-80 m-3 rounded"></div>
      <div className="bg-slate-100 animate-pulse h-10 w-80 m-3 rounded"></div>
    </div>
  )
}
