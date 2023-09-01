import { Fzf } from "fzf"
import { useMemo } from "react"
import * as Filters from "~/components/Filters"
import {
  type FiltersCheckboxHandler,
  type FiltersCheckboxValue,
} from "../Filters/types"

type FilterProps = {
  resetHandler: () => void
  options: {
    label: string
    checkboxes: {
      label: string
      value: FiltersCheckboxValue
      id: string
      handler: FiltersCheckboxHandler
    }[]
  }[]
}

export const Filter: React.FC<FilterProps> = (props) => {
  const activeCounter = useMemo(() => {
    let result = 0

    for (const opt of props.options) {
      for (const checkbox of opt.checkboxes) {
        if (checkbox.value !== undefined) result += 1
      }
    }

    return result
  }, [props.options])

  return (
    <Filters.Root>
      <Filters.Trigger title="Фильтровать" activeCounter={activeCounter}>
        Фильтровать
      </Filters.Trigger>
      <Filters.Content resetHandler={props.resetHandler}>
        {(searchValue) => {
          return props.options.map((group, index) => {
            const checkboxes = new Fzf(group.checkboxes, {
              selector: (item) => group.label + " " + item.label,
            })
              .find(searchValue)
              .map((res) => res.item)

            if (checkboxes.length === 0) return null

            return (
              <Filters.Group label={group.label} key={index}>
                {checkboxes.map((checkbox, index) => (
                  <Filters.Checkbox {...checkbox} key={index} />
                ))}
              </Filters.Group>
            )
          })
        }}
      </Filters.Content>
    </Filters.Root>
  )
}
