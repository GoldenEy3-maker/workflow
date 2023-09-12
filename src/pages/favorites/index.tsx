import React from "react"
import ListContainer from "~/components/ListContainer"
import Order from "~/components/Order"
import * as Section from "~/components/Section"
import MainLayout from "~/layouts/Main"
import { api } from "~/utils/api"
import { type NextPageWithLayout } from "~/utils/types"

const Favorites: NextPageWithLayout = () => {
  const getCurretUserQuery = api.user.getCurrent.useQuery()

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Избранное</Section.Title>
      </Section.Header>
      <Section.Content>
        <ListContainer
          data={getCurretUserQuery.data?.favoriteOrders.map((fo) => fo.order)}
          loading={getCurretUserQuery.isLoading}
          render={(data) => (
            <Order key={data.id} data={data} backgrounded reduced />
          )}
        />
      </Section.Content>
    </Section.Root>
  )
}

Favorites.getLayout = (page) => (
  <MainLayout title="Избранное">{page}</MainLayout>
)

export default Favorites
