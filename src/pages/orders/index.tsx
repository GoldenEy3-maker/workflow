import OrderList from "~/components/#pages/orders/List"
import OrdersToolbar from "~/components/#pages/orders/Toolbar"
import * as Section from "~/components/Section"
import MainLayout from "~/layouts/Main"
import { type NextPageWithLayout } from "~/utils/types"

const Orders: NextPageWithLayout = () => {
  return (
    <main>
      <Section.Root>
        <Section.Header>
          <Section.Title>Заказы</Section.Title>
        </Section.Header>
        <OrdersToolbar />
        <Section.Content>
          <OrderList />
        </Section.Content>
      </Section.Root>
    </main>
  )
}

Orders.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}

export default Orders
