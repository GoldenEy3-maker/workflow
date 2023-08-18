import { type GetStaticProps } from "next"
import { useRouter } from "next/router"
import { SkillModel } from "prisma/zod"
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
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import { createSSG } from "~/server/ssg"
import slateEditorService from "~/services/slateEditor.service"
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
const OrderCreate: NextPageWithLayout = () => {
  const router = useRouter()

  const getSkillsQuery = api.skill.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const createOrderMut = api.order.create.useMutation({
    onSuccess() {
      toast.success("Заказ успешно создан!")
      void router.push(PagePaths.Profile)
    },
    onError(error) {
      console.log("🚀 ~ file: index.tsx:48 ~ onError ~ error:", error)
      toast.error(error.message)
    },
  })

  const hookForm = useForm<FormState>({
    defaultValues: {
      description: "",
      title: "",
      skills: [],
      price: "",
    },
  })

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Создание заказа</Section.Title>
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

            if (!skills) return

            console.log(parseInt(data.price))

            createOrderMut.mutate({
              ...data,
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
                    disabled={createOrderMut.isLoading}
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
                    disabled={createOrderMut.isLoading}
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
                  value={field.value}
                  disabled={createOrderMut.isLoading}
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
                  disabled={createOrderMut.isLoading}
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
              title="Создать"
              disabled={createOrderMut.isLoading}
            >
              Создать
            </Button>
          </Form.Actions>
        </Form.Root>
      </Section.Content>
    </Section.Root>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSG()

  await ssg.skill.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  }
}

OrderCreate.getLayout = (page) => (
  <MainLayout title="Создание заказа">
    <ProfileLayout>{page}</ProfileLayout>
  </MainLayout>
)

export default OrderCreate
