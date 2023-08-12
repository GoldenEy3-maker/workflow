import { type GetStaticPaths, type GetStaticProps } from "next"
import React from "react"
import Order from "~/components/Order"
import MainLayout from "~/layouts/Main"
import { createSSG } from "~/server/ssg"
import { api } from "~/utils/api"
import { type NextPageWithLayout } from "~/utils/types"

type OrderProps = { id: string }

const OrderPage: NextPageWithLayout<OrderProps> = (props) => {
  const getOrderQuery = api.order.getById.useQuery(
    { id: props.id },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )

  return (
    <Order
      data={getOrderQuery.data}
      loading={getOrderQuery.isLoading}
      error={getOrderQuery.error?.message}
    />
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const ssg = createSSG()

  const id = ctx.params?.id

  if (id && !Array.isArray(id)) await ssg.order.getById.prefetch({ id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}

OrderPage.getLayout = (page) => <MainLayout title="Заказ">{page}</MainLayout>

export default OrderPage
