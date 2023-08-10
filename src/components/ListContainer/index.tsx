import { type Order, type Resume } from "@prisma/client"

type ListContainerProps = {
  data: Resume[] | Order[] | undefined | null
  loading: boolean
  error?: string | React.ReactNode
  render: (item: Resume | Order) => React.ReactNode
  empty?: string | React.ReactNode
}

const ListContainer: React.FC<ListContainerProps> = (props) => {
  return (
    <div>
      {(() => {
        if (props.loading) return <p>Loading...</p>

        if (props.error) return <p>Error</p>

        if (props.data && props.data.length > 0)
          return props.data.map((item) => props.render(item))

        return props.empty
      })()}
    </div>
  )
}

export default ListContainer
