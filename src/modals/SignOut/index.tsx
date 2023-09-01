import { useRouter } from "next/router"
import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModalStore } from "~/store/modal"
import { api } from "~/utils/api"
import { ModalName, PagePaths } from "~/utils/enums"

const SignOutModal: React.FC = () => {
  const router = useRouter()

  const modalStore = useModalStore()

  const closeModal = () => modalStore.close(ModalName.SignOut)

  const signOutMut = api.user.signOut.useMutation({
    onError(error) {
      console.log("🚀 ~ file: index.tsx:18 ~ onError ~ error:", error.message)
      toast.error(error.message)
    },
    onSuccess() {
      toast.success("Вы успешно покинули аккаунт!")
      void router.push(PagePaths.SignIn)
    },
  })

  return (
    <Modal.Root
      aria-hidden={!modalStore.activeModals.includes(ModalName.SignOut)}
    >
      <Modal.Wrapper>
        <Modal.Header>
          <Modal.Title>Вы действительно уверены?</Modal.Title>
        </Modal.Header>
        <Modal.Content>
          Если вы уверены, что хотите продолжить, подтвердите это действие ниже.
          Если вы желаете остаться в аккаунте, пожалуйста, выберите иной вариант
          ниже.
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant="elevated"
            type="button"
            title="Нет, я ошибся"
            disabled={signOutMut.isLoading}
            onClick={closeModal}
          >
            Нет, я ошибся
          </Button>
          <Button
            variant="elevated"
            clrType="danger"
            type="button"
            title="Да, выйти"
            disabled={signOutMut.isLoading}
            onClick={() => {
              signOutMut.mutate()
              closeModal()
            }}
          >
            Да, выйти
          </Button>
        </Modal.Actions>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export const useSignOutModal = () => {
  const modalStore = useModalStore()

  return {
    open: () => modalStore.open(ModalName.SignOut),
    close: () => modalStore.close(ModalName.SignOut),
  }
}

export default SignOutModal
