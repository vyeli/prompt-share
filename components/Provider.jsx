"use client" // We need to use client because we are using browser functions

import { SessionProvider} from "next-auth/react"

const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider