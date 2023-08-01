import type { ChangeEventHandler } from "react"
import { MdOutlineFilterAlt } from "react-icons/md"
import * as Filters from "~/components/Filters"

type FilterProps = {
  filters: {
    legend: string
    checkboxes: {
      label: string
      value: "on" | "off" | undefined
      id: string
      checked: boolean
      onChange: ChangeEventHandler<HTMLInputElement>
    }[]
  }[]
}

export const Filter: React.FC<FilterProps> = ({ filters }) => {
  return (
    <Filters.Root>
      <Filters.Trigger title="Фильтры">
        <MdOutlineFilterAlt fontSize="1.5em" />
      </Filters.Trigger>
      <Filters.Content>
        {filters.map((group, index) => (
          <Filters.Group legend={group.legend} key={index}>
            {group.checkboxes.map((checkbox, index) => (
              <Filters.Checkbox {...checkbox} key={index} />
            ))}
          </Filters.Group>
        ))}
      </Filters.Content>
    </Filters.Root>
  )
}
