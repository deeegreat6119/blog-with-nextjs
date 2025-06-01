import Navbar from "@/app/components/Navbar"
import Image from "next/image"
import { The_Girl_Next_Door } from "next/font/google"

const girl = The_Girl_Next_Door({
  variable: "--font-girl",
  weight: "400",
  subsets: ["latin"],
})

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-slate-800">
        <div className="flex flex-col min-h-dvh gap-y-10 justify-center items-center">
          <h3 className={`text-white font-semibold text-7xl ${girl.className}`}>
            <span className="text-teal-400">Supercharge</span> your business
          </h3>

          <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
            <div className="col-span-2 h-[30rem] rounded-xl bg-white p-5 flex flex-col relative group">
              <span className="text-sm">The Bold Network</span>
              <div className="mt-auto max-w-[18rem] group/wrapper">
                <h3 className="text-3xl tracking-tighter font-bold">
                  Connect to over 80 million shoppers
                </h3>
                <p className="text-sm mt-2">
                  Recognize over 40% of your shoppers instantly – even if
                  they&apos;ve never been to your site.
                </p>
                <button className="text-sm font-semibold my-4 group-hover/wrapper:scale-110">
                  More about the bolt Network
                </button>
              </div>
              <Image
                className="absolute group-hover:scale-105 transition duration-500 right-10 top-10 w-xs"
                alt="Bolt Network"
                width={500}
                height={1000}
                src={
                  "https://res.cloudinary.com/dugcmkito/image/upload/v1742822889/Millions_of_shoppers_0ba8229d86.svg"
                }
              />
            </div>
            <div className="col-span-1 h-[30rem] rounded-xl bg-white p-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
