import { create } from "zustand"

type ConfirmSignUpModalStore = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useConfirmSignUpModalStore = create<ConfirmSignUpModalStore>(
  (set) => ({
    isOpen: false,
    open() {
      set({ isOpen: true })
    },
    close() {
      set({ isOpen: false })
    },
  })
)
