import Image from "next/image"

const NotFound = () => {
  return (
    <div>
      <Image
        height={1500}
        width={1200}
        className="h-screen w-screen object-cover object-bottom"
        src="https://images.unsplash.com/photo-1609743522653-52354461eb27?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
  )
}

export default NotFound