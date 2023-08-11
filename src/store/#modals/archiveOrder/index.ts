import { create } from "zustand"

type ArchiveOrderModalStore = {
  isOpen: boolean
  id: string | undefined
  open: (id: string) => void
  close: () => void
  setId: (id: string) => void
}

export const useArchiveOrderModalStore = create<ArchiveOrderModalStore>(
  (set) => ({
    isOpen: false,
    id: undefined,
    setId(id) {
      set({ id })
    },
    close() {
      set({ isOpen: false, id: undefined })
    },
    open(id) {
      set({ isOpen: true, id })
    },
  })
)
