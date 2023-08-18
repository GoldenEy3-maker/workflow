import { createContext, useContext } from "react"

type SelectContext = {
  isOpen: boolean
  triggerRef: React.RefObject<HTMLButtonElement>
  close: () => void
  toggle: () => void
}

export const SelectContext = createContext<SelectContext | null>(null)

export const useSelectContext = () => {
  const context = useContext(SelectContext)

  if (!context) throw new Error("SelectContextProvider is lost")

  return context
}
