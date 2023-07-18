import { createContext, useContext } from "react"

export type FilterContextState = {
  isOpen: boolean
}

type FilterContext = [
  FilterContextState,
  React.Dispatch<React.SetStateAction<FilterContextState>>
]

export const FilterContext = createContext<FilterContext | undefined>(undefined)

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) throw new Error("FilterContextProvider is lost!")

  return context
}
