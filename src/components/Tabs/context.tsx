import { createContext, useContext, useState } from "react"

type ActiveTab = {
  width: number
  offset: number
}

type TabsContext = {
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>
} & ActiveTab

const TabsContext = createContext<TabsContext | null>(null)

export const TabsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>({
    width: 0,
    offset: 0,
  })

  return (
    <TabsContext.Provider value={{ ...activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export const useTabsContext = () => {
  const ctx = useContext(TabsContext)

  if (!ctx) throw new Error("TabsContextProvider is lost!")

  return ctx
}
