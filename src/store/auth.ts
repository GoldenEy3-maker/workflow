import type { User } from "@prisma/client"
import { create } from "zustand"

type AuthStore = {
  token: string | null
  user: User | null
}

export const useAuthStore = create<AuthStore>(() => ({
  token: null,
  user: null,
}))
