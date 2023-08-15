import { type GetStaticPaths, type GetStaticProps } from "next"
import { useRouter } from "next/router"
import { SkillModel } from "prisma/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { IoPricetagOutline } from "react-icons/io5"
import { MdTitle } from "react-icons/md"
import { z } from "zod"
import Button from "~/components/Button"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import OptionList from "~/components/OptionList"
import * as Section from "~/components/Section"
import SlateEditor from "~/components/Slate"
import { type CustomElement } from "~/components/Slate/types"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import { createSSG } from "~/server/ssg"
import slateEditorService from "~/services/slateEditor.service"
import validationService from "~/services/validation.service"
import { api } from "~/utils/api"
import { PagePaths } from "~/utils/enums"
import { type NextPageWithLayout, type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

const FormKeys = {
  Title: "title",
  Description: "description",
  Price: "price",
} as const

const FormOptionKeys = {
  Skills: "skills",
} as const

type FormKeys = ValueOf<typeof FormKeys>
type FormOptionKeys = ValueOf<typeof FormOptionKeys>

type FormState = {
  [Key in FormKeys]: string
} & {
  [Key in FormOptionKeys]: string[]
}

const EditOrder: NextPageWithLayout<{ id: string }> = (props) => {
  const router = useRouter()

  const getSkillsQuery = api.skill.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const getOrderQuery = api.order.getById.useQuery(
    { id: props.id },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )

  const updateOrderMut = api.order.update.useMutation({
    onSuccess() {
      toast.success("Заказ успешно обновлен!")
      void router.push(PagePaths.Profile)
    },
    onError(error) {
      console.log("🚀 ~ file: [id].tsx:56 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  const hookForm = useForm<FormState>({
    defaultValues: {
      description: getOrderQuery.data?.description ?? "",
      title: getOrderQuery.data?.title ?? "",
      skills: getOrderQuery.data?.skills.map((s) => s.skill.value) ?? [],
      price: getOrderQuery.data?.price?.toString() ?? "",
    },
  })

  useEffect(() => {
    if (!router.query.id) return void router.push(PagePaths.Profile)

    if (getOrderQuery.isLoading) return
    if (getOrderQuery.error) {
      toast.error(getOrderQuery.error.message)
      console.log(getOrderQuery.error)
      void router.push(PagePaths.Profile)
      return
    }
    if (!getOrderQuery.data) {
      toast.error("Что-то пошло не так... Попробуй позже")
      void router.push(PagePaths.Profile)
      return
    }
  }, [
    router,
    getOrderQuery.data,
    getOrderQuery.isLoading,
    getOrderQuery.error,
    hookForm,
  ])

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Редактирование заказа</Section.Title>
      </Section.Header>
      <Section.Content className={styles.content}>
        <Form.Root
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={hookForm.handleSubmit((data) => {
            const skills = getSkillsQuery.data?.filter((skill) =>
              data.skills
                .map((s) => s.toLowerCase())
                .includes(skill.value.toLowerCase())
            )

            if (!skills) {
              toast.error("Заполните все обязательные поля!")
            }

            if (!router.query.id || Array.isArray(router.query.id)) {
              toast.error("Невалидный параметр - 'id'")
              return void router.push(PagePaths.Profile)
            }

            updateOrderMut.mutate({
              ...data,
              id: router.query.id,
              skills: z.array(SkillModel).parse(skills),
              price: data.price
                ? parseInt(data.price.replace(" ", ""))
                : undefined,
            })
          })}
        >
          <Form.Inputs>
            <Form.Group>
              <Controller
                control={hookForm.control}
                name="title"
                rules={{
                  required: {
                    value: true,
                    message: "Обязательное поле!",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Заголовок"
                    leadingIcon={<MdTitle />}
                    disabled={updateOrderMut.isLoading}
                    validError={hookForm.formState.errors.title?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={hookForm.control}
                name="price"
                render={({ field }) => (
                  <Input
                    label="Цена"
                    type="currency"
                    masked
                    disabled={updateOrderMut.isLoading}
                    leadingIcon={<IoPricetagOutline />}
                    {...field}
                  />
                )}
              />
            </Form.Group>
            <Controller
              control={hookForm.control}
              name="description"
              rules={{
                validate(value) {
                  if (value === "")
                    return "Опишите подробнее задачи вашего заказа!"

                  if (slateEditorService.parseText(value) === "")
                    return "Опишите подробнее задачи вашего заказа!"
                },
              }}
              render={({ field }) => (
                <SlateEditor
                  label="Описание"
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  disabled={updateOrderMut.isLoading}
                  value={field.value}
                  validError={hookForm.formState.errors.description?.message}
                />
              )}
            />
            <Controller
              control={hookForm.control}
              name="skills"
              rules={{
                validate(value) {
                  if (value.length < 3)
                    return "Необходимо указать не менее 3 навыков!"
                },
              }}
              render={({ field }) => (
                <OptionList
                  label="Укажите необходимые навыки для выполнения заказа"
                  options={getSkillsQuery.data?.map((skill) => skill.value)}
                  onChange={field.onChange}
                  value={field.value}
                  disabled={updateOrderMut.isLoading}
                  reset={() => {
                    hookForm.clearErrors("skills")
                    field.onChange([])
                  }}
                  validError={hookForm.formState.errors.skills?.message}
                />
              )}
            />
          </Form.Inputs>
          <Form.Actions flexEnd>
            <Button
              type="submit"
              variant="filled"
              title="Сохранить"
              disabled={updateOrderMut.isLoading}
            >
              Сохранить
            </Button>
          </Form.Actions>
        </Form.Root>
      </Section.Content>
    </Section.Root>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const ssg = createSSG()

  await ssg.skill.getAll.prefetch()

  const id = ctx.params?.id

  if (id && !Array.isArray(id)) await ssg.order.getById.prefetch({ id })

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

EditOrder.getLayout = (page) => (
  <MainLayout title="Редактирование заказа">
    <ProfileLayout>{page}</ProfileLayout>
  </MainLayout>
)

export default EditOrder
