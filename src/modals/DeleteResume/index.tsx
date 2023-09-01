import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { api } from "~/utils/api"
import { ModalName } from "~/utils/enums"

type DeleteResumeModalProps = {
  successCallback?: () => void
}

const DeleteResumeModal: React.FC<DeleteResumeModalProps> = (props) => {
  const modalStore = useModalStore()

  const closeModal = () => modalStore.close(ModalName.DeleteResume)

  const deleteResumeMut = api.resume.delete.useMutation({
    onSuccess() {
      toast.success("Резюме успешно удалено!")
      closeModal()

      if (props.successCallback) props.successCallback()
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:18 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  return (
    <Modal.Root
      aria-hidden={!modalStore.activeModals.includes(ModalName.DeleteResume)}
      closeHandler={closeModal}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Удаление резюме</Modal.Title>
          <Modal.Close handler={closeModal} />
        </Modal.Header>
        <Modal.Content>
          После удалние резюме, вы станите невидимы для работодателей! Однако,
          вы сможете начать с чистого листа и создать новое резюме. Если вы
          действительно уверены в своих действиях, нажмите &quot;удалить&quot;.
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="elevated"
            onClick={closeModal}
            disabled={deleteResumeMut.isLoading}
          >
            Отменить
          </Button>
          <Button
            variant="elevated"
            clrType="danger"
            isLoading={deleteResumeMut.isLoading}
            disabled={deleteResumeMut.isLoading}
            onClick={() => deleteResumeMut.mutate()}
          >
            Удалить
          </Button>
        </Modal.Actions>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export const useDeleteResumeModal = () => {
  const modalStore = useModalStore()

  return {
    open: () => modalStore.open(ModalName.DeleteResume),
    close: () => modalStore.close(ModalName.DeleteResume),
  }
}

export default DeleteResumeModal
