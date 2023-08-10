import { type GetStaticProps } from "next"
import { Controller, useForm } from "react-hook-form"
import { IoPricetagOutline } from "react-icons/io5"
import { MdTitle } from "react-icons/md"
import Button from "~/components/Button"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import OptionList from "~/components/OptionList"
import * as Section from "~/components/Section"
import SlateEditor from "~/components/Slate"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import { createSSG } from "~/server/ssg"
import { api } from "~/utils/api"
import { type NextPageWithLayout, type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

const FormKeys = {
  Title: "title",
  Details: "details",
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
  const getSkillsQuery = api.skill.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const hookForm = useForm<FormState>({
    defaultValues: {
      details: "",
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
        <Form.Root>
          <Form.Inputs>
            <Form.Group>
              <Controller
                control={hookForm.control}
                name="title"
                render={({ field }) => (
                  <Input
                    label="Заголовок"
                    leadingIcon={<MdTitle />}
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
                    leadingIcon={<IoPricetagOutline />}
                    {...field}
                  />
                )}
              />
            </Form.Group>
            <SlateEditor label="Описание" />
            <Controller
              control={hookForm.control}
              name="skills"
              render={({ field }) => (
                <OptionList
                  label="Укажите необходимые навыки для выполнения заказа"
                  options={getSkillsQuery.data?.map((skill) => skill.value)}
                  onChange={field.onChange}
                  value={field.value}
                  reset={() => hookForm.resetField("skills")}
                />
              )}
            />
          </Form.Inputs>
          <Form.Actions flexEnd>
            <Button type="submit" variant="filled" title="Создать">
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
