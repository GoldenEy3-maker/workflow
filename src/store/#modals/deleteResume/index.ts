import { create } from "zustand"

type DeleteResumeModalStore = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useDeleteResumeModalStore = create<DeleteResumeModalStore>(
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
