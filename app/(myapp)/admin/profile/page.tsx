import ProfilePage from "@/app/components/ProfileForm"
import { userauth } from "@/app/lib/auth"

const page = async () => {
  const session = await userauth()
  return (
    <div className="w-full">
      <ProfilePage session={session} />
    </div>
  )
}

export default page
