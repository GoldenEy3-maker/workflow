import { type ValueOf } from "~/utils/types"

export const SortTypeKeys = {
  Asc: "asc",
  Desc: "desc",
} as const

export type SortTypeKeys = ValueOf<typeof SortTypeKeys>

export type Option = {
  id: string
  checked: boolean
  label: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}
