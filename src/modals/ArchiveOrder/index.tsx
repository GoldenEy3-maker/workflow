import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { api } from "~/utils/api"
import { ModalName } from "~/utils/enums"

export type ArchiveOrderModalOpts = {
  id: string
}

type ArchiveOrderModalProps = {
  successCallback: () => void
}

const ArchiveOrderModal: React.FC<ArchiveOrderModalProps> = (props) => {
  const modalStore = useModalStore()

  const closeModal = () => modalStore.close(ModalName.ArchiveOrder)

  const archiveOrderMut = api.order.archive.useMutation({
    onSuccess() {
      toast.success("Заказ успешно архивирован!")
      closeModal()

      if (props.successCallback) props.successCallback()
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:20 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  return (
    <Modal.Root
      aria-hidden={!modalStore.activeModals.includes(ModalName.ArchiveOrder)}
      closeHandler={closeModal}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Архивирование заказа</Modal.Title>
          <Modal.Close handler={closeModal} />
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
            onClick={closeModal}
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
            onClick={() => {
              if (modalStore.opts) {
                archiveOrderMut.mutate({
                  id: modalStore.opts[ModalName.ArchiveOrder]?.id,
                })
              }
            }}
            title="Архивировать"
          >
            Архивировать
          </Button>
        </Modal.Actions>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export const useArchiveOrderModal = () => {
  const modalStore = useModalStore()

  return {
    open: (opts: ArchiveOrderModalOpts) =>
      modalStore.open(ModalName.ArchiveOrder, opts),
    close: () => modalStore.close(ModalName.ArchiveOrder),
  }
}

export default ArchiveOrderModal
