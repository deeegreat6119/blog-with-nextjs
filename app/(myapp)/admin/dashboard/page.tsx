// import ProductList, { ProductsSkeleton } from "@/components/ProductList"
import ProductListWithSWR from "@/app/components/ProductListWithSWR"
// import { Suspense } from "react"
// import { Product } from "@/types"

const page = async () => {
  // const products = fetch("https://api.vercel.app/products").then((res) =>
  //   res.json()
  // )

  return (
    <div>
      {/* <Button label="Register" />
      <Button label="Register" />
      <Button label="Register" /> */}
      Admin Dashboard Here
      {/* {products.map((each) => (
        <div key={each.id} className="rounded bg-slate-100 p-4 m-4">
          {each.name}
        </div>
      ))} */}
      {/* <Suspense fallback={<ProductsSkeleton />}>
        <ProductList products={products} />
      </Suspense> */}
      <ProductListWithSWR />
    </div>
  )
}

export default page
