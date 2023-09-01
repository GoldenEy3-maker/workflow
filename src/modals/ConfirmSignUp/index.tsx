import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { ModalName } from "~/utils/enums"

const ConfirmSignUpModal: React.FC = () => {
  const modalStore = useModalStore()

  const closeModal = () => modalStore.close(ModalName.ConfirmSignUp)

  return (
    <Modal.Root
      aria-hidden={!modalStore.activeModals.includes(ModalName.ConfirmSignUp)}
      closeHandler={closeModal}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>
            Подтверждение <IoMdCheckmarkCircleOutline />
          </Modal.Title>
          <Modal.Close handler={closeModal} />
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

export const useConfirmSignUpModal = () => {
  const modalStore = useModalStore()

  return {
    open: () => modalStore.open(ModalName.ConfirmSignUp),
    close: () => modalStore.close(ModalName.ConfirmSignUp),
  }
}

export default ConfirmSignUpModal
