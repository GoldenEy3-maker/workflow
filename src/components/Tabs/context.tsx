import { createContext, useContext, useState } from "react"

type TabsContextState = {
  activeWidth: number
  activeOffset: number
}

type TabsContext = [
  TabsContextState,
  React.Dispatch<React.SetStateAction<TabsContextState>>
]

const TabsContext = createContext<TabsContext | undefined>(undefined)

export const TabsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const contextStore = useState<TabsContextState>({
    activeOffset: 0,
    activeWidth: 0,
  })

  return (
    <TabsContext.Provider value={contextStore}>{children}</TabsContext.Provider>
  )
}

export const useTabsContext = () => {
  const context = useContext(TabsContext)

  if (!context) throw new Error("TabsContextProvider is lost!")

  return context
}
