import type { ChangeEventHandler } from "react"
import { create } from "zustand"
import type { CheckboxValue } from "~/components/Filters/Checkbox"
import { changeFilterStateHandler } from "~/components/Filters/helpers"
import { type ValueOf } from "~/utils/types"

export const SortValues = {
  Date: "Дата",
  Price: "Цена",
  Popular: "Популярность",
} as const

export type SortValues = ValueOf<typeof SortValues>

export const FilterValues = {
  React: "react",
  Angular: "angular",
  Vue: "vue",
  Figma: "figma",
  Verified: "verified",
} as const

type FilterValues = ValueOf<typeof FilterValues>

type FilterValuesState = {
  [Key in FilterValues]: {
    checked: boolean
    value: CheckboxValue
  }
}

type OrdersStore = {
  searchValue: string
  filters: FilterValuesState
  sortValue: SortValues
  changeFilterHandler: ChangeEventHandler<HTMLInputElement>
  changeSearchValue: (value: string) => void
  changeSortValue: (value: SortValues) => void
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  searchValue: "",
  filters: {
    angular: {
      checked: false,
      value: undefined,
    },
    figma: {
      checked: false,
      value: undefined,
    },
    react: {
      checked: false,
      value: undefined,
    },
    verified: {
      checked: false,
      value: undefined,
    },
    vue: {
      checked: false,
      value: undefined,
    },
  },
  sortValue: "Дата",
  changeSearchValue(value) {
    set({ searchValue: value })
  },
  changeSortValue(value) {
    set({ sortValue: value })
  },
  changeFilterHandler: (event) => {
    const id = event.target.id as FilterValues

    set((state) => ({
      filters: {
        ...state.filters,
        [id]: changeFilterStateHandler(state.filters[id]),
      },
    }))
  },
}))
