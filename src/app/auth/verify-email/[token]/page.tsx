import LayoutPublic from "@/components/layout/layout"
import {VerifyEmail} from "@/features/auth/verify-email/verify-email"

export default async function page({
  params
}:{
  params: Promise<{token:string}>
}) {
  const token =(await params).token
  return (
    <LayoutPublic>
      <VerifyEmail token={token}/>
    </LayoutPublic>
  )
}
