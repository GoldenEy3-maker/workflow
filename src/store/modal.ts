import { create } from "zustand"
import { type ArchiveOrderModalOpts } from "~/modals/ArchiveOrder"
import { type ModalName } from "~/utils/enums"

type ModalStore = {
  activeModals: ModalName[]
  opts: null | {
    [ModalName.ArchiveOrder]?: ArchiveOrderModalOpts
  }
  open: <T>(name: ModalName, opts?: T) => void
  close: (name: ModalName) => void
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModals: [],
  opts: null,
  open(name, opts) {
    document.body.style.setProperty(
      "--scrollbar-width",
      `${window.innerWidth - document.body.offsetWidth}px`
    )

    document.body.dataset.lock = "true"

    if (opts)
      set((state) => ({
        opts: { ...state.opts, [name]: opts },
      }))

    set((state) => ({ activeModals: [...state.activeModals, name] }))
  },
  close(name) {
    set((state) => ({
      activeModals: state.activeModals.filter(
        (activeName) => activeName !== name
      ),
    }))

    setTimeout(() => {
      document.body.removeAttribute("data-lock")
    }, 200)
  },
}))
