import type { User } from "@prisma/client"
import { create } from "zustand"

type AuthStore = {
  token: string | null
  user: User | null
  setToken: (token: string) => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  setToken(token) {
    set({ token })
  },
  setUser(user) {
    set({ user })
  },
}))
