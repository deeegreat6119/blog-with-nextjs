import AccountSettings from "@/app/components/SettingsForm"
import { userauth } from "@/app/lib/auth"

const page = async () => {
  await userauth()
  return (
    <div className="w-full">
      <AccountSettings  />
    </div>
  )
}

export default page
