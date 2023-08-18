import { createContext, useContext } from "react"

export type FilterContext = {
  isOpen: boolean
  toggle: () => void
}

export const FilterContext = createContext<FilterContext | null>(null)

export const useFilterContext = () => {
  const ctx = useContext(FilterContext)

  if (!ctx) throw new Error("FilterContextProvider is lost!")

  return ctx
}
