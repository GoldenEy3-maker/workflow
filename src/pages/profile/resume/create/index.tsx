import { type GetStaticProps } from "next"
import { Controller, useForm } from "react-hook-form"
import { BiAward } from "react-icons/bi"
import { MdOutlineGrade } from "react-icons/md"
import Button from "~/components/Button"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import * as Section from "~/components/Section"
import SlateEditor from "~/components/Slate"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import { createSSG } from "~/server/ssg"
import { api } from "~/utils/api"
import { type NextPageWithLayout, type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

const FormStateKeys = {
  Speciality: "speciality",
  Level: "level",
} as const

type FormStateKeys = ValueOf<typeof FormStateKeys>

type FormState = {
  [Key in FormStateKeys]: string
}

const CreateResume: NextPageWithLayout = () => {
  const hookForm = useForm<FormState>({
    defaultValues: {
      speciality: "",
      level: "",
    },
  })

  const specialityQuery = api.speciality.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const levelQuery = api.level.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Создание резюме</Section.Title>
      </Section.Header>
      <Section.Content className={styles.content}>
        <Form.Root
          withGroups
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={hookForm.handleSubmit((data) => {
            console.log("🚀 ~ file: index.tsx:71 ~ data:", data)
          })}
        >
          <Form.Inputs>
            <Form.Group>
              <Controller
                control={hookForm.control}
                name="speciality"
                render={({ field }) => (
                  <Input
                    label="Специальность"
                    leadingIcon={<BiAward />}
                    options={specialityQuery.data?.map((spec) => spec.value)}
                    optionHandler={(value) =>
                      hookForm.setValue("speciality", value)
                    }
                    optionsReset={() => hookForm.setValue("speciality", "")}
                    {...field}
                  />
                )}
              />
              <Controller
                control={hookForm.control}
                name="level"
                render={({ field }) => (
                  <Input
                    label="Уровень"
                    leadingIcon={<MdOutlineGrade />}
                    options={levelQuery.data?.map((level) => level.value)}
                    optionHandler={(value) => hookForm.setValue("level", value)}
                    optionsReset={() => hookForm.setValue("level", "")}
                    {...field}
                  />
                )}
              />
            </Form.Group>
            <SlateEditor />
          </Form.Inputs>
          <Form.Actions flexEnd>
            <Button variant="elevated">Опубликовать</Button>
          </Form.Actions>
        </Form.Root>
      </Section.Content>
    </Section.Root>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSG()

  await ssg.level.getAll.prefetch()
  await ssg.speciality.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

CreateResume.getLayout = (page) => {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default CreateResume
