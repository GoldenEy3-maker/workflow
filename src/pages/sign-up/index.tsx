import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"
import { type ParsedUrlQuery } from "querystring"
import { useEffect } from "react"
import { Controller, useForm, type UseFormSetValue } from "react-hook-form"
import toast from "react-hot-toast"
import {
  MdOutlineCalendarMonth,
  MdOutlineEmail,
  MdOutlineLock,
  MdPersonOutline,
} from "react-icons/md"
import InputMask from "react-input-mask"
import Button from "~/components/Button"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import Logo from "~/components/Logo"
import * as Tabs from "~/components/Tabs"
import AuthLayout from "~/layouts/Auth"
import validationService from "~/services/validation.service"
import { api } from "~/utils/api"
import { InputMaskPatterns, PagePaths, QueryKeys } from "~/utils/enums"
import { type NextPageWithLayout, type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

const RoleTabKeys = {
  EMPLOYER: "EMPLOYER",
  PERFORMER: "PERFORMER",
} as const

type RoleTabKeys = ValueOf<typeof RoleTabKeys>

const FormStateKeys = {
  FullName: "fullName",
  Email: "email",
  Password: "password",
  RepeatPassword: "repeatPassword",
  BirthDate: "birthDate",
} as const

type FormStateKeys = ValueOf<typeof FormStateKeys>

type FormState = {
  [Key in FormStateKeys]: string
} & {
  role: RoleTabKeys
}

const useQueryToInitializeRole = (setter: UseFormSetValue<FormState>) => {
  const router = useRouter()

  const parseQuery = (queries: ParsedUrlQuery) => {
    const tabQuery = queries ? queries[QueryKeys.SignUp.Tab] : null

    if (!tabQuery) return null

    return (
      ((Array.isArray(tabQuery)
        ? tabQuery[0]
        : tabQuery
      ).toUpperCase() as RoleTabKeys) ?? null
    )
  }

  useEffect(() => {
    setter("role", parseQuery(router.query) ?? RoleTabKeys.EMPLOYER)
  }, [router.query, setter])
}

const SignUp: NextPageWithLayout = () => {
  const signUpMut = api.user.signUp.useMutation({
    onError(error) {
      toast.error(error.message)
    },
    onSuccess() {
      toast.success(
        "На указанную почту выслано приглашение для активации аккаунта!"
      )

      hookForm.reset()
    },
  })

  const hookForm = useForm<FormState>({
    defaultValues: {
      fullName: "",
      birthDate: "",
      email: "",
      password: "",
      repeatPassword: "",
      role: RoleTabKeys.EMPLOYER,
    },
    mode: "onChange",
  })

  useQueryToInitializeRole(hookForm.setValue)

  return (
    <>
      <Logo isMinimized={true} />
      <h1 className="text-display-l font-medium">Регистрация</h1>

      <Form.Root
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={hookForm.handleSubmit((data) => {
          toast.dismiss()

          signUpMut.mutate(data)
        })}
        noValidate
      >
        <Tabs.Root className={styles.tabs}>
          <Tabs.List>
            <Controller
              name="role"
              control={hookForm.control}
              render={({ field: { value, ...props } }) => (
                <Tabs.Item
                  label="Работодатель"
                  id={RoleTabKeys.EMPLOYER}
                  value={RoleTabKeys.EMPLOYER}
                  checked={value === RoleTabKeys.EMPLOYER}
                  disabled={signUpMut.isLoading}
                  {...props}
                />
              )}
            />

            <Controller
              name="role"
              control={hookForm.control}
              render={({ field: { value, ...props } }) => (
                <Tabs.Item
                  label="Исполнитель"
                  id={RoleTabKeys.PERFORMER}
                  value={RoleTabKeys.PERFORMER}
                  checked={value === RoleTabKeys.PERFORMER}
                  disabled={signUpMut.isLoading}
                  {...props}
                />
              )}
            />
          </Tabs.List>
        </Tabs.Root>
        <Form.Inputs>
          <Controller
            name="fullName"
            control={hookForm.control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (!validationService.validateOnlyCyrillic(value))
                  return "Только кириллица!"

                if (!validationService.validateFullName(value))
                  return "Невалидное ФИО!"
              },
            }}
            render={({ field }) => (
              <Input
                label="ФИО"
                type="text"
                leadingIcon={<MdPersonOutline fontSize="1.5em" />}
                disabled={signUpMut.isLoading}
                validError={hookForm.formState.errors.fullName?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="birthDate"
            control={hookForm.control}
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (!validationService.validateDatePattern(value))
                  return "Невалидная дата!"

                const years = dayjs(new Date()).diff(value, "y")

                if (years < 16)
                  return "К сожалению мы не можем предоставить вам аккаунт в силу вашего возраста!"
              },
            }}
            render={({ field }) => (
              <InputMask
                mask={InputMaskPatterns.Date}
                maskPlaceholder="ГГГГ-ММ-ДД"
                disabled={signUpMut.isLoading}
                {...field}
              >
                <Input
                  label="Дата рождения"
                  type="text"
                  leadingIcon={<MdOutlineCalendarMonth fontSize="1.5em" />}
                  validError={hookForm.formState.errors.birthDate?.message}
                />
              </InputMask>
            )}
          />

          <Controller
            control={hookForm.control}
            name="email"
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
                type="email"
                leadingIcon={<MdOutlineEmail fontSize="1.5em" />}
                disabled={signUpMut.isLoading}
                validError={hookForm.formState.errors.email?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={hookForm.control}
            name="password"
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                const { isMinLength, isUpperCase } =
                  validationService.validatePassword(value)

                if (!isMinLength)
                  return "Пароль должен быть не менее 6 символов!"

                if (!isUpperCase)
                  return "Пароль должен содержать не менее одной заглавной буквы!"
              },
            }}
            render={({ field }) => (
              <Input
                label="Пароль"
                type="password"
                leadingIcon={<MdOutlineLock fontSize="1.5em" />}
                disabled={signUpMut.isLoading}
                validError={hookForm.formState.errors.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            control={hookForm.control}
            name="repeatPassword"
            rules={{
              required: {
                value: true,
                message: "Обязательное поле!",
              },
              validate(value) {
                if (hookForm.getValues("password") !== value)
                  return "Пароль не совпадает!"
              },
            }}
            render={({ field }) => (
              <Input
                label="Повторите пароль"
                type="password"
                leadingIcon={<MdOutlineLock fontSize="1.5em" />}
                disabled={signUpMut.isLoading}
                validError={hookForm.formState.errors.repeatPassword?.message}
                {...field}
              />
            )}
          />
        </Form.Inputs>

        <Form.Actions flexEnd>
          <Link href={PagePaths.SignIn} title="Есть аккаунт?">
            Есть аккаунт?
          </Link>
          <Button
            variant="elevated"
            type="submit"
            title="Создать"
            disabled={signUpMut.isLoading}
          >
            Создать
          </Button>
        </Form.Actions>
      </Form.Root>
    </>
  )
}

SignUp.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUp
