// import * as Select from "~/components/Select"
import * as Sort from "~/components/Sort"
import { type Option, type SortTypeKeys } from "~/components/Sort/types"
import styles from "./styles.module.scss"

type SortProps = {
  options: Option[]
  resetHandler: () => void
  sortType: SortTypeKeys
  sortTypeHandler: (id: SortTypeKeys) => void
}

export const Sorter: React.FC<SortProps> = (props) => {
  return (
    <Sort.Root className={styles.sort}>
      <Sort.Trigger title="Сортировать">Сортировать</Sort.Trigger>
      <Sort.Content
        resetHandler={props.resetHandler}
        options={props.options}
        sortType={props.sortType}
        sortTypeHandler={props.sortTypeHandler}
      />
    </Sort.Root>
  )
}
