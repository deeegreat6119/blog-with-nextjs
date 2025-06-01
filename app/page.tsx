import { getFullname } from "@/utils"

// // let isActive: boolean = false
// // let full: string = "Felix";
// // let age: number = 20

// interface User {
//   // type User = {
//   name?: string
//   age: number
//   height: number
//   isOld: boolean
//   department: string
//   _v?: string
// }

// type UserWithAddress = User & {
//   city: string
//   state: string
// }

// // interface UserWithAddress extends User {
// //   city: string,
// //   state: string
// // }

// type SimpleUser = Pick<User, "name" | "age" | "height">

// // interface SimpleUser {
// //   height: User['height'],
// //   name: User['name'],
// //   isOld: User['isOld'],
// // }

// const user: User = {
//   name: "Felix",
//   age: 18,
//   height: 6,
//   isOld: true,
// }

// // user.name = 40
// // delete user.age
// // user.age =2

// const fruits: string[] = ["Watermelon", "Orange", "Apple", "Pineapple"]
// const counts: number[] = [20, 40, 30]

// const users: Partial<User>[] = [
//   {
//     name: "Felix",
//     // age: 18,
//     // height: 6,
//     isOld: true,
//   },
//   {
//     name: "Felix",
//     age: 18,
//     // height: 6,
//     isOld: true,
//   },
// ]

// const name: User["name"] = "Akin"

export default function Home() {
  // isActive = [20, 40];
  const fullname = getFullname("Felix", "Adegboyega")

  return (
    <>
      <h3 className="text-4xl md:text-8xl sm:text-green-700 m-5 font-bold capitalize">
        level 4 class
      </h3>
      <p className="max-w-lg m-5">
        {fullname} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Labore corrupti voluptatum veritatis sed voluptates omnis, hic incidunt
        recusandae dolorem, ex blanditiis natus nobis corporis aperiam facere
        nostrum suscipit quibusdam iusto?
      </p>
      <button className="px-4 py-2 m-5 text-white rounded-lg bg-black hover:bg-blue-700 transition duration-500 cursor-pointer md:hover:scale-110">
        Register
      </button>
      <button className="px-4 py-2 m-5 rounded-lg border-2 border-dashed border-black  cursor-pointer">
        Login
      </button>
    </>
  )
}
