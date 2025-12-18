"use client"

import { useEffect, useState } from "react"
import { auth } from "@/lib/firebase"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await signOut(auth)
    router.push("/login")
  }

  return { user, loading, logout }
}
