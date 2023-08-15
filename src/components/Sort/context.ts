import { createContext, useContext } from "react"

type SortContext = {
  isOpen: boolean
  toggle: () => void
}

export const SortContext = createContext<SortContext | null>(null)

export const useSortContext = () => {
  const ctx = useContext(SortContext)

  if (!ctx) throw new Error("SortContextProvider is lost!")

  return ctx
}
