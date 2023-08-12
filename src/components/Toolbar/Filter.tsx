import { MdOutlineFilterAlt } from "react-icons/md"
import * as Filters from "~/components/Filters"
import { type FilterHandler, type FilterValue } from "../Filters/Checkbox"

type FilterProps = {
  filters: {
    legend: string
    checkboxes: {
      label: string
      value: FilterValue
      id: string
      checked: boolean
      handler: FilterHandler
    }[]
  }[]
}

export const Filter: React.FC<FilterProps> = (props) => {
  return (
    <Filters.Root>
      <Filters.Trigger title="Фильтры">
        <MdOutlineFilterAlt fontSize="1.5em" />
      </Filters.Trigger>
      <Filters.Content>
        {props.filters.map((group, index) => (
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
