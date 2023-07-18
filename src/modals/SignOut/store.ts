import { create } from "zustand"

type SignOutModalStore = {
  state: boolean
}

export const useSignOutModalStore = create<SignOutModalStore>(() => ({
  state: false,
}))