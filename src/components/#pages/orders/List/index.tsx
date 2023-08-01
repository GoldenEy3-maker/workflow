// import OrderItem from "@/components/OrderItem"
// import { trpc } from "@/utils/trpc"
// import LoadingSkelet from "./loadingSkelet"
import styles from "./styles.module.scss"

const OrderList: React.FC = () => {
  // const orders = trpc.order.getAll.useQuery()

  return (
    <div className={styles.list}>
      {/* {!orders.isFetching && !orders.isLoading ? (
        !orders.error && orders.data && orders.data.length > 0 ? (
          orders.data?.map((order) => (
            <OrderItem
              key={order.id}
              id={order.id}
              title={order.title}
              description={order.description}
              clicks={order.clickedUsersId.length}
              date={order.createdAt}
              price={order.price}
              verified={order.verified}
              views={order.viewedUsersId.length}
              isFavorite={order.isFavorite}
            />
          ))
        ) : null
      ) : (
        <LoadingSkelet />
      )} */}
    </div>
  )
}

export default OrderList
