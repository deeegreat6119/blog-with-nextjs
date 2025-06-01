"use client"
import { Product} from "@/types"
import {fetcher} from "@/utils"
import useSWR from "swr"

// const fetcher = ()

const ProductListwithSWR = () => {
  const {data, isLoading, error} = useSWR<Product[]>(
    "https://api.vercel.app/products",
    fetcher
  )
  if (isLoading) return <div>loading products ...</div>
  if(error){
    return <div>An error occured</div>
  }
  return (
    <div>
      {data?.map((each)=>(
        <div key={each.id} className="rounded bg-slate-100 p-4 m-4">
          {each.name}
        </div>
      ))}
    </div>
  )
}

export default ProductListwithSWR

// export const ProductsSkeleton = ()=>{
//   return <div>
//     <div>Loading product</div>
//   </div>
// }