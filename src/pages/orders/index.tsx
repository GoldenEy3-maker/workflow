import { type GetStaticProps } from "next"
import { useState } from "react"
import {
  type FilterHandler,
  type FilterState,
} from "~/components/Filters/Checkbox"
import ListContainer from "~/components/ListContainer"
import Order from "~/components/Order"
import * as Section from "~/components/Section"
import * as Toolbar from "~/components/Toolbar"
import MainLayout from "~/layouts/Main"
import { createSSG } from "~/server/ssg"
import { api } from "~/utils/api"
import { type NextPageWithLayout, type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

export const SortValues = {
  Date: "Дата",
  Price: "Цена",
  Popular: "Популярность",
} as const

export type SortValues = ValueOf<typeof SortValues>

const Orders: NextPageWithLayout = () => {
  const [searchValue, setSearchValue] = useState("")
  const [sortValue, setSortValue] = useState<SortValues>("Дата")

  const getOrderQuery = api.order.getAll.useQuery()
  const getSkillsQuery = api.skill.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const [filters, setFilters] = useState<FilterState>(() => {
    let state = {
      secure: {
        checked: false,
        value: undefined,
      },
    }

    for (const skill of getSkillsQuery.data!) {
      state = {
        ...state,
        [skill.id]: {
          checked: false,
          value: undefined,
        },
      }
    }

    return state
  })

  const changeFilterHandler: FilterHandler = (args) => {
    setFilters((state) => ({
      ...state,
      [args.id]: { checked: args.checked, value: args.value },
    }))
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
            label="Сортировать по:"
            handler={(value) => setSortValue(value as SortValues)}
            value={sortValue}
            values={Object.values(SortValues)}
          />
          <Toolbar.Filter
            filters={[
              {
                legend: "Навыки",
                checkboxes: getSkillsQuery.data!.map((s) => ({
                  label: s.value,
                  id: s.id,
                  handler: changeFilterHandler,
                  ...filters[s.id],
                })),
              },
              {
                legend: "Сертификат",
                checkboxes: [
                  {
                    label: "Сертифицированные",
                    id: "secure",
                    handler: changeFilterHandler,
                    ...filters.secure,
                  },
                ],
              },
            ]}
          />
        </Toolbar.Root>
        <Section.Content>
          <ListContainer
            data={getOrderQuery.data}
            loading={getOrderQuery.isLoading}
            error={getOrderQuery.error?.message}
            render={(data) => (
              <Order key={crypto.randomUUID()} data={data} backgrounded />
            )}
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
