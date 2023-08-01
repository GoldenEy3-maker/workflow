import { useRouter } from "next/router"
import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModal } from "~/hooks/modal.hook"
import { api } from "~/utils/api"
import { PagePaths } from "~/utils/enums"
import { useSignOutModalStore } from "../../store/#modals/signOut"

const SignOutModal: React.FC = () => {
  const [, closeModal] = useModal()
  const router = useRouter()
  const signOutModalStore = useSignOutModalStore()
  const signOutMut = api.user.signOut.useMutation({
    onError(error) {
      console.log("🚀 ~ file: index.tsx:18 ~ onError ~ error:", error.message)
      toast.error(error.message)
    },
    onSuccess() {
      void router.push(PagePaths.SignIn)
    },
  })

  return (
    <Modal.Root aria-hidden={!signOutModalStore.isOpen}>
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
            onClick={() =>
              closeModal(() => {
                signOutModalStore.close()
              })
            }
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

              closeModal(() => signOutModalStore.close())
            }}
          >
            Да, выйти
          </Button>
        </Modal.Actions>
      </Modal.Wrapper>
    </Modal.Root>
  )
}

export default SignOutModal
