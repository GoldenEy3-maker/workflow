import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import * as Modal from "~/components/Modal"
import { useModal } from "~/hooks/modal.hook"
import { useConfirmSignUpModalStore } from "~/store/#modals/confirmSingUp"

const ConfirmSignUpModal: React.FC = () => {
  const [, closeModal] = useModal()
  const confirmSignUpModalStore = useConfirmSignUpModalStore()
  const closeHandler = () => closeModal(confirmSignUpModalStore.close)

  return (
    <Modal.Root
      aria-hidden={!confirmSignUpModalStore.isOpen}
      closeHandler={closeHandler}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>
            Подтверждение <IoMdCheckmarkCircleOutline />
          </Modal.Title>
          <Modal.Close handler={closeHandler} />
        </Modal.Header>
        <Modal.Content>
          <p>
            На указанную почту <span className="rich-text">выслано письмо</span>
            , в котором находится ссылка для&nbsp;
            <span className="rich-text">активации вашего аккаунта</span>.
          </p>
          <p>
            Если вам не пришло письмо, проверьте папку спам или повторите
            попытку снова через некоторое время.
          </p>
        </Modal.Content>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export default ConfirmSignUpModal
