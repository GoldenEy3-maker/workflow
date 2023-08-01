import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModal } from "~/hooks/modal.hook"
import { useDeleteResumeModalStore } from "~/store/#modals/deleteResume"
import { api } from "~/utils/api"

type DeleteResumeModalProps = {
  successCallback?: () => void
}

const DeleteResumeModal: React.FC<DeleteResumeModalProps> = (props) => {
  const [, closeModal] = useModal()
  const deleteResumeModalStore = useDeleteResumeModalStore()

  const closeHandler = () => closeModal(() => deleteResumeModalStore.close())

  const deleteResumeMut = api.resume.delete.useMutation({
    onSuccess() {
      toast.success("Резюме успешно удалено!")
      closeHandler()

      if (props.successCallback) props.successCallback()
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:18 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  return (
    <Modal.Root
      aria-hidden={!deleteResumeModalStore.isOpen}
      closeHandler={closeHandler}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Удаление резюме</Modal.Title>
          <Modal.Close handler={closeHandler} />
        </Modal.Header>
        <Modal.Content>
          После удалние резюме, вы станите невидимы для работодателей! Однако,
          вы сможете начать с чистого листа и создать новое резюме. Если вы
          действительно уверены в своих действиях, нажмите &quot;удалить&quot;.
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="elevated"
            onClick={closeHandler}
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

export default DeleteResumeModal
