import * as Toolbar from "~/components/Toolbar"
import { FilterValues, SortValues, useOrdersStore } from "~/store/#pages/orders"
import styles from "./styles.module.scss"

const OrdersToolbar: React.FC = () => {
  const { changeFilterHandler, filters, searchValue, sortValue } =
    useOrdersStore()

  return (
    <Toolbar.Root className={styles.toolbar}>
      <Toolbar.Search
        value={searchValue}
        onChange={(e) =>
          useOrdersStore.setState({ searchValue: e.target.value })
        }
      />
      <Toolbar.Sort
        label="Сортировать по:"
        handler={(value) =>
          useOrdersStore.setState({ sortValue: value as SortValues })
        }
        value={sortValue}
        values={Object.values(SortValues)}
      />
      <Toolbar.Filter
        filters={[
          {
            legend: "Теги",
            checkboxes: [
              {
                label: "React",
                id: FilterValues.React,
                checked: filters.react.checked,
                value: filters.react.value,
                onChange: changeFilterHandler,
              },
              {
                label: "Angular",
                id: FilterValues.Angular,
                checked: filters.angular.checked,
                value: filters.angular.value,
                onChange: changeFilterHandler,
              },
              {
                label: "Vue",
                id: FilterValues.Vue,
                checked: filters.vue.checked,
                value: filters.vue.value,
                onChange: changeFilterHandler,
              },
              {
                label: "Figma",
                id: FilterValues.Figma,
                checked: filters.figma.checked,
                value: filters.figma.value,
                onChange: changeFilterHandler,
              },
            ],
          },
          {
            legend: "Сертификат",
            checkboxes: [
              {
                label: "Сертифицированные",
                id: FilterValues.Verified,
                checked: filters.verified.checked,
                value: filters.verified.value,
                onChange: changeFilterHandler,
              },
            ],
          },
        ]}
      />
    </Toolbar.Root>
  )
}

export default OrdersToolbar
