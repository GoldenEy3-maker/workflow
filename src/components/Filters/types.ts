export type FiltersCheckboxValue = "on" | "off" | undefined
export type FiltersState = Record<string, FiltersCheckboxValue>
export type FiltersCheckboxHandler = (args: {
  id: string
  value: FiltersCheckboxValue
}) => void
