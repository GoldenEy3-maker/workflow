import { MdArrowDownward, MdArrowUpward } from "react-icons/md"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import styles from "./styles.module.scss"
import { SortTypeKeys, type Option } from "./types"

type ContentProps = {
  resetHandler: () => void
  options: Option[]
  sortType: SortTypeKeys
  sortTypeHandler: (id: SortTypeKeys) => void
} & React.HTMLAttributes<HTMLDivElement>

export const Content: React.FC<ContentProps> = ({
  options,
  resetHandler,
  sortType,
  sortTypeHandler,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()

  return (
    <div {...props} className={cls([props.className, styles.content])}>
      <header className={styles.header}>
        <p className={styles.title}>Сортировка</p>
        <Button
          type="button"
          title="Сбросить"
          clrType="danger"
          size="sm"
          onClick={resetHandler}
        >
          Сбросить
        </Button>
      </header>
      <div className={styles.container}>
        {options.map((opt, i) => (
          <div className={styles.containerItem} key={i}>
            <input
              type="radio"
              name="sort"
              checked={opt.checked}
              onChange={opt.onChange}
              id={opt.id}
            />
            <label htmlFor={opt.id} onPointerDown={rippleEffectEvent}>
              <i></i>
              <p>{opt.label}</p>
            </label>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerItem}>
          <input
            type="radio"
            name="sort-type"
            checked={sortType === SortTypeKeys.Asc}
            id={SortTypeKeys.Asc}
            onChange={(event) =>
              sortTypeHandler(event.target.id as SortTypeKeys)
            }
          />
          <label htmlFor="asc" onPointerDown={rippleEffectEvent}>
            <MdArrowUpward fontSize="1.5rem" />
            <p>Возрастание</p>
          </label>
        </div>
        <div className={styles.footerItem}>
          <input
            type="radio"
            name="sort-type"
            checked={sortType === SortTypeKeys.Desc}
            id={SortTypeKeys.Desc}
            onChange={(event) =>
              sortTypeHandler(event.target.id as SortTypeKeys)
            }
          />
          <label htmlFor="desc" onPointerDown={rippleEffectEvent}>
            <MdArrowDownward fontSize="1.5rem" />
            <p>Убывание</p>
          </label>
        </div>
      </footer>
    </div>
  )
}
