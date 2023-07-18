import type { ChangeEventHandler } from "react"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1.5em"
          viewBox="0 -960 960 960"
          width="1.5em"
        >
          <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
        </svg>
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
