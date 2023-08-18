import React, { useEffect, useRef, useState } from "react"
import { MdSearch } from "react-icons/md"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import Input from "../Input"
import styles from "./styles.module.scss"

type ContentProps = {
  resetHandler: () => void
  children: (searchValue: string) => React.ReactNode | React.ReactNode
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">

export const Content: React.FC<ContentProps> = ({
  children,
  resetHandler,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("")

  const contentRef = useRef<HTMLDivElement>(null)

  const changeSearchValueHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setSearchValue(event.target.value)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.setProperty(
        "--offset-top",
        contentRef.current.getBoundingClientRect().top.toString() + "px"
      )
    }
  }, [])

  return (
    <div
      {...props}
      className={cls([props.className, styles.content])}
      ref={contentRef}
    >
      <header className={styles.header}>
        <p className={styles.title}>Фильтры</p>
        <Button
          clrType="danger"
          type="button"
          size="sm"
          title="Сбросить"
          onClick={() => {
            setSearchValue("")
            resetHandler()
          }}
        >
          Сбросить
        </Button>
      </header>
      <div className={styles.searchContainer}>
        <Input
          size="sm"
          label="Поиск"
          value={searchValue}
          onChange={changeSearchValueHandler}
          leadingIcon={<MdSearch />}
        />
      </div>
      <div className={styles.container}>
        {typeof children === "function" ? children(searchValue) : children}
      </div>
    </div>
  )
}
