import { useRouter } from "next/router"
import { useRef } from "react"
import toast from "react-hot-toast"
import Button from "~/components/Button"
import * as Modal from "~/components/Modal"
import { useModal } from "~/hooks/modal.hook"
import { api } from "~/utils/api"
import { PagePaths } from "~/utils/enums"
import { useSignOutModalStore } from "./store"

const SignOutModal: React.FC = () => {
  const [, closeModal] = useModal()
  const router = useRouter()
  const state = useSignOutModalStore()
  const signOutMut = api.user.signOut.useMutation({
    onError(e) {
      console.log("🚀 ~ file: index.tsx:18 ~ onError ~ e:", e)
      toast.error(e.message)
    },
    async onSuccess() {
      await router.push(PagePaths.SignIn)
    },
  })
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <Modal.Root ref={rootRef} aria-hidden={!state.state}>
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
                useSignOutModalStore.setState({ state: false })
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

              closeModal(() => useSignOutModalStore.setState({ state: false }))
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
