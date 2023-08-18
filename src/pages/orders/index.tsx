import { Fzf } from "fzf"
import { type GetStaticProps } from "next"
import { useMemo, useState } from "react"
import {
  type FiltersCheckboxHandler,
  type FiltersState,
} from "~/components/Filters/types"
import ListContainer from "~/components/ListContainer"
import Order from "~/components/Order"
import * as Section from "~/components/Section"
import { type SortTypeKeys } from "~/components/Sort/types"
import * as Toolbar from "~/components/Toolbar"
import MainLayout from "~/layouts/Main"
import { createSSG } from "~/server/ssg"
import slateEditorService from "~/services/slateEditor.service"
import { api } from "~/utils/api"
import { type NextPageWithLayout, type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

const SortValueKeys = {
  Date: "date",
  Price: "price",
  Popular: "popular",
} as const

type SortValueKeys = ValueOf<typeof SortValueKeys>

const Orders: NextPageWithLayout = () => {
  const [searchValue, setSearchValue] = useState("")
  const [sortValue, setSortValue] = useState<SortValueKeys>("date")
  const [sortType, setSortType] = useState<SortTypeKeys>("desc")

  const getOrdersQuery = api.order.getAll.useQuery()
  const getSkillsQuery = api.skill.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const fzf = useMemo(
    () =>
      getOrdersQuery.data &&
      new Fzf(getOrdersQuery.data, {
        selector: (item) =>
          item.title + " " + slateEditorService.parseText(item.description),
      }),
    [getOrdersQuery.data]
  )

  const [filters, setFilters] = useState<FiltersState>(() => {
    let state = {
      secure: undefined,
    }

    getSkillsQuery.data?.forEach(
      (skill) => (state = { ...state, [skill.id]: undefined })
    )

    return state
  })

  const changeFilterHandler: FiltersCheckboxHandler = (args) => {
    setFilters((state) => ({
      ...state,
      [args.id]: args.value,
    }))
  }

  const resetFilters = () => {
    setFilters((state) => {
      let newState = state

      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined) newState = { ...newState, [key]: undefined }
      }

      return newState
    })
  }

  const getSortOptionLabel = (key: SortValueKeys) => {
    switch (key) {
      case "date":
        return "Дата"
      case "popular":
        return "Популярность"
      case "price":
        return "Цена"
    }
  }

  return (
    <main>
      <Section.Root>
        <Section.Header>
          <Section.Title>Заказы</Section.Title>
        </Section.Header>
        <Toolbar.Root className={styles.toolbar}>
          <Toolbar.Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Toolbar.Sort
            resetHandler={() => {
              setSortValue("date")
              setSortType("desc")
            }}
            sortType={sortType}
            sortTypeHandler={(key) => setSortType(key)}
            options={Object.values(SortValueKeys).map((key) => ({
              id: key,
              checked: sortValue === (key as SortValueKeys),
              label: getSortOptionLabel(key as SortValueKeys),
              onChange: () => setSortValue(key as SortValueKeys),
            }))}
          />
          <Toolbar.Filter
            resetHandler={resetFilters}
            options={[
              {
                label: "Навыки",
                checkboxes: getSkillsQuery.data!.map((s) => ({
                  label: s.value,
                  id: s.id,
                  value: filters[s.id],
                  handler: changeFilterHandler,
                })),
              },
              {
                label: "Сертификат",
                checkboxes: [
                  {
                    label: "Сертифицированные",
                    id: "secure",
                    value: filters.secure,
                    handler: changeFilterHandler,
                  },
                ],
              },
            ]}
          />
        </Toolbar.Root>
        <Section.Content>
          <ListContainer
            data={fzf
              ?.find(searchValue)
              .map((res) => res.item)
              .filter((data) => {
                const skillsId = data.skills.map((s) => s.skillId)
                let result = true

                for (const [key, value] of Object.entries(filters)) {
                  if (value === "on") result = skillsId.includes(key)
                  if (value === "off") result = !skillsId.includes(key)

                  if (key === "secure") {
                    if (value === "on") result = data.secure
                    if (value === "off") result = !data.secure
                  }
                }

                return result
              })
              .sort((a, b) => {
                if (sortValue === "price") {
                  const aPrice = a.price ?? 0
                  const bPrice = b.price ?? 0

                  return sortType === "desc" ? bPrice - aPrice : aPrice - bPrice
                }

                return sortType === "desc"
                  ? b.updatedAt.getTime() - a.updatedAt.getTime()
                  : a.updatedAt.getTime() - b.updatedAt.getTime()
              })}
            loading={getOrdersQuery.isLoading}
            error={getOrdersQuery.error?.message}
            render={(data) => (
              <Order
                key={crypto.randomUUID()}
                data={data}
                backgrounded
                reduced
              />
            )}
            empty={
              <Order
                data={undefined}
                loading={false}
                backgrounded
                empty={<p>Пока что заказов нет</p>}
              />
            }
          />
        </Section.Content>
      </Section.Root>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSG()

  await ssg.skill.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

Orders.getLayout = (page) => <MainLayout title="Заказы">{page}</MainLayout>

export default Orders
