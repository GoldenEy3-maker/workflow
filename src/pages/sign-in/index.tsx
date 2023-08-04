import Link from "next/link"
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { MdLockOutline, MdOutlineEmail } from "react-icons/md"
import Button from "~/components/Button"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import Logo from "~/components/Logo"
import AuthLayout from "~/layouts/Auth"
import validationService from "~/services/validation.service"
import { useAuthStore } from "~/store/auth"
import { api } from "~/utils/api"
import { PagePaths } from "~/utils/enums"
import { cls } from "~/utils/helpers"
import { type NextPageWithLayout, type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

const FormStateKeys = {
  Email: "email",
  Password: "password",
} as const

type FormStateKeys = ValueOf<typeof FormStateKeys>

type FormState = {
  [key in FormStateKeys]: string
}

const SignIn: NextPageWithLayout = () => {
  const router = useRouter()

  const signInMut = api.user.signIn.useMutation({
    async onSuccess(token) {
      toast.success("Авторизация прошла успешно!")

      useAuthStore.setState({ token })

      const bol = await router.push(PagePaths.Home)
      console.log("🚀 ~ file: index.tsx:39 ~ onSuccess ~ bol:", bol)
    },
    onError(e) {
      console.log("🚀 ~ file: index.tsx:41 ~ onError ~ e:", e)
      toast.error(e.message)
    },
  })

  const hookForm = useForm<FormState>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <>
      <Logo isMinimized={true} />
      <h1 className={cls([styles.title, "text-display-l font-medium"])}>
        Авторизация
      </h1>
      <Form.Root
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={hookForm.handleSubmit((data) => {
          toast.dismiss()
          signInMut.mutate(data)
        })}
      >
        <Form.Inputs>
          <Controller
            name="email"
            control={hookForm.control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (!validationService.validateEmail(value))
                  return "Невалидный email-адрес!"
              },
            }}
            render={({ field }) => (
              <Input
                label="Email"
                leadingIcon={<MdOutlineEmail fontSize="1.5em" />}
                type="email"
                id={FormStateKeys.Email}
                validError={hookForm.formState.errors.email?.message}
                disabled={signInMut.isLoading}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={hookForm.control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
            }}
            render={({ field }) => (
              <Input
                label="Пароль"
                leadingIcon={<MdLockOutline fontSize="1.5em" />}
                type="password"
                id={FormStateKeys.Password}
                validError={hookForm.formState.errors.password?.message}
                disabled={signInMut.isLoading}
                {...field}
              />
            )}
          />
        </Form.Inputs>
        <Form.Actions flexEnd>
          <Link href={PagePaths.SignUp} title="Создать аккаунт?">
            Создать аккаунт?
          </Link>
          <Button
            variant="elevated"
            type="submit"
            title="Войти"
            disabled={signInMut.isLoading}
          >
            Войти
          </Button>
        </Form.Actions>
      </Form.Root>
    </>
  )
}

SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn
