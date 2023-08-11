import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModal } from "~/hooks/modal.hook"
import { useArchiveOrderModalStore } from "~/store/#modals/archiveOrder"
import { api } from "~/utils/api"

type ArchiveOrderModalProps = {
  successCallback: () => void
}

const ArchiveOrderModal: React.FC<ArchiveOrderModalProps> = (props) => {
  const [, closeModal] = useModal()
  const archiveOrderModalStore = useArchiveOrderModalStore()

  const closeHandler = () => closeModal(() => archiveOrderModalStore.close())

  const archiveOrderMut = api.order.archive.useMutation({
    onSuccess() {
      toast.success("Заказ успешно архивирован!")
      closeHandler()

      if (props.successCallback) props.successCallback()
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:20 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  return (
    <Modal.Root
      aria-hidden={!archiveOrderModalStore.isOpen}
      closeHandler={closeHandler}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Архивирование заказа</Modal.Title>
          <Modal.Close handler={closeHandler} />
        </Modal.Header>
        <Modal.Content>
          Ваш заказ не удалится полностью . Он{" "}
          <span className="rich-text">поместится в архив</span>, откуда вы
          сможете его вернуть в случае нужды. Однако, по{" "}
          <span className="rich-text">истечению полных 30 дней</span> с момента
          архивирования, заказ <span className="rich-text">заморозится</span> -
          все дальнейшие действия с заказом будут невозможны! Обратитесь в
          службу поддержки, если у вас возникнут вопросы.
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="elevated"
            onClick={closeHandler}
            disabled={archiveOrderMut.isLoading}
            title="Отменить"
          >
            Отменить
          </Button>
          <Button
            variant="elevated"
            clrType="danger"
            isLoading={archiveOrderMut.isLoading}
            disabled={archiveOrderMut.isLoading}
            onClick={() =>
              archiveOrderMut.mutate({ id: archiveOrderModalStore.id })
            }
            title="Архивировать"
          >
            Архивировать
          </Button>
        </Modal.Actions>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export default ArchiveOrderModal
