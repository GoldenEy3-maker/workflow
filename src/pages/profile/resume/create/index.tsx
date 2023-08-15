import { type GetStaticProps } from "next"
import { useRouter } from "next/router"
import { SkillModel } from "prisma/zod"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { BiAward } from "react-icons/bi"
import { MdOutlineGrade } from "react-icons/md"
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

const FormStateKeys = {
  Speciality: "speciality",
  Level: "level",
  Bio: "bio",
} as const

const FormOptionKeys = {
  Skills: "skills",
} as const

type FormOptionKeys = ValueOf<typeof FormOptionKeys>
type FormStateKeys = ValueOf<typeof FormStateKeys>

type FormState = {
  [Key in FormStateKeys]: string
} & {
  [Key in FormOptionKeys]: string[]
}

const CreateResume: NextPageWithLayout = () => {
  const router = useRouter()
  const hookForm = useForm<FormState>({
    defaultValues: {
      speciality: "",
      level: "",
      bio: "",
      skills: [],
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

  const skillQuery = api.skill.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const createResumeMut = api.resume.create.useMutation({
    onError(error) {
      toast.error(error.message)
      console.log(error)
    },
    onSuccess() {
      toast.success("Резюме успешно добавлено!")
      void router.push(PagePaths.Profile)
    },
  })

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Создание резюме</Section.Title>
      </Section.Header>
      <Section.Content className={styles.content}>
        <Form.Root
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={hookForm.handleSubmit((data) => {
            const speciality = specialityQuery.data?.find((spec) =>
              spec.value.toLowerCase().includes(data.speciality.toLowerCase())
            )
            const level = levelQuery.data?.find((lvl) =>
              lvl.value.toLowerCase().includes(data.level.toLowerCase())
            )
            const skills = skillQuery.data?.filter((skill) =>
              data.skills
                .map((s) => s.toLowerCase())
                .includes(skill.value.toLowerCase())
            )

            if (!speciality || !level || skills?.length === 0) {
              toast.error("Невалидные данные!")
              return
            }

            createResumeMut.mutate({
              level,
              speciality,
              skills: z.array(SkillModel).parse(skills),
              bio: data.bio,
            })
          })}
        >
          <Form.Inputs>
            <Form.Group>
              <Controller
                control={hookForm.control}
                name="speciality"
                rules={{
                  required: {
                    value: true,
                    message: "Обязательное поле!",
                  },
                  validate(value) {
                    if (
                      !specialityQuery.data
                        ?.map((spec) => spec.value)
                        .includes(value)
                    )
                      return "Необходимо выбрать значение из списка!"
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Специальность"
                    leadingIcon={<BiAward />}
                    options={specialityQuery.data?.map((spec) => spec.value)}
                    optionHandler={(value) => {
                      field.onChange(value)
                      hookForm.clearErrors("speciality")
                    }}
                    disabled={createResumeMut.isLoading}
                    optionsReset={() => hookForm.resetField("speciality")}
                    validError={hookForm.formState.errors.speciality?.message}
                    {...field}
                  />
                )}
              />
              <Controller
                control={hookForm.control}
                name="level"
                rules={{
                  required: {
                    value: true,
                    message: "Обязательное поле!",
                  },
                  validate(value) {
                    if (
                      !levelQuery.data
                        ?.map((level) => level.value)
                        .includes(value)
                    )
                      return "Необходимо выбрать значение из списка!"
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Уровень"
                    leadingIcon={<MdOutlineGrade />}
                    options={levelQuery.data?.map((level) => level.value)}
                    optionHandler={(value) => {
                      field.onChange(value)
                      hookForm.clearErrors("level")
                    }}
                    disabled={createResumeMut.isLoading}
                    optionsReset={() => hookForm.resetField("level")}
                    validError={hookForm.formState.errors.level?.message}
                    {...field}
                  />
                )}
              />
            </Form.Group>
            <Controller
              control={hookForm.control}
              name="bio"
              rules={{
                validate(value) {
                  if (value === "") return "Опишите немного себя!"

                  if (slateEditorService.parseText(value) === "")
                    return "Опишите немного себя!"
                },
              }}
              render={({ field }) => (
                <SlateEditor
                  label="Расскажите о себе"
                  validError={hookForm.formState.errors.bio?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  name={field.name}
                  disabled={createResumeMut.isLoading}
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
                  options={skillQuery.data?.map((skill) => skill.value)}
                  label="Укажите свои навыки"
                  value={field.value}
                  onChange={field.onChange}
                  reset={() => {
                    field.onChange([])
                    hookForm.clearErrors("skills")
                  }}
                  disabled={createResumeMut.isLoading}
                  validError={hookForm.formState.errors.skills?.message}
                />
              )}
            />
          </Form.Inputs>
          <Form.Actions flexEnd>
            <Button
              type="submit"
              variant="filled"
              disabled={createResumeMut.isLoading}
            >
              Опубликовать
            </Button>
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
  await ssg.skill.getAll.prefetch()

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  }
}

CreateResume.getLayout = (page) => {
  return (
    <MainLayout title="Создание резюме">
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default CreateResume
