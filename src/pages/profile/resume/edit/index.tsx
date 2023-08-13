import { type GetStaticProps } from "next"
import { useRouter } from "next/router"
import { SkillModel } from "prisma/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { BiAward } from "react-icons/bi"
import { MdOutlineGrade } from "react-icons/md"
import { z } from "zod"
import Button from "~/components/Button"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import LoadingSpin from "~/components/Loading/Spin"
import OptionList from "~/components/OptionList"
import * as Section from "~/components/Section"
import SlateEditor from "~/components/Slate"
import { type CustomElement } from "~/components/Slate/types"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
import { createSSG } from "~/server/ssg"
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

const EditResume: NextPageWithLayout = () => {
  const router = useRouter()

  const getResumeQuery = api.resume.getByUserId.useQuery()

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

  const updateResumeMut = api.resume.update.useMutation({
    onError(error) {
      toast.error(error.message)
      console.log(error)
    },
    onSuccess() {
      toast.success("Резюме успешно изменено!")
      void router.push(PagePaths.Profile)
    },
  })

  const hookForm = useForm<FormState>({
    defaultValues: {
      speciality: "",
      level: "",
      bio: "",
      skills: [],
    },
  })

  useEffect(() => {
    if (getResumeQuery.isLoading) return

    if (getResumeQuery.error) {
      console.log(
        "🚀 ~ file: index.tsx:100 ~ useEffect ~ getResumeQuery.error:",
        getResumeQuery.error
      )
      toast.error(getResumeQuery.error.message)
      return void router.push(PagePaths.Profile)
    }

    if (!getResumeQuery.data) {
      toast.error("Для начала создайте свое резюме!")
      return void router.push(PagePaths.Profile)
    } else {
      hookForm.setValue("speciality", getResumeQuery.data.speciality.value)
      hookForm.setValue("level", getResumeQuery.data.level.value)
      hookForm.setValue("bio", getResumeQuery.data.bio)
      hookForm.setValue(
        "skills",
        getResumeQuery.data.skills.map((s) => s.skill.value)
      )
    }
  }, [
    getResumeQuery.data,
    getResumeQuery.isLoading,
    getResumeQuery.error,
    hookForm,
    router,
  ])

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Изменить резюме</Section.Title>
      </Section.Header>
      <Section.Content className={styles.content}>
        {(() => {
          if (getResumeQuery.isLoading) return <LoadingSpin />

          return (
            <Form.Root
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={hookForm.handleSubmit((data) => {
                const speciality = specialityQuery.data?.find((spec) =>
                  spec.value
                    .toLowerCase()
                    .includes(data.speciality.toLowerCase())
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

                updateResumeMut.mutate({
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
                        options={specialityQuery.data?.map(
                          (spec) => spec.value
                        )}
                        optionHandler={(value) => {
                          field.onChange(value)
                          hookForm.clearErrors("speciality")
                        }}
                        disabled={updateResumeMut.isLoading}
                        optionsReset={() => hookForm.resetField("speciality")}
                        validError={
                          hookForm.formState.errors.speciality?.message
                        }
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
                        disabled={updateResumeMut.isLoading}
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

                      const content = JSON.parse(value) as CustomElement[]

                      const isEmpty = content.every((elem) =>
                        validationService.validateEmptySlateEditor(
                          elem.children
                        )
                      )

                      if (isEmpty) return "Опишите немного себя!"
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
                      disabled={updateResumeMut.isLoading}
                    />
                  )}
                />
                <Controller
                  control={hookForm.control}
                  name="skills"
                  rules={{
                    validate(value) {
                      if (value.length < 3)
                        return "Необходимо указать минимум 3 навыка!"
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
                      disabled={updateResumeMut.isLoading}
                      validError={hookForm.formState.errors.skills?.message}
                    />
                  )}
                />
              </Form.Inputs>
              <Form.Actions flexEnd>
                <Button
                  type="submit"
                  variant="filled"
                  disabled={updateResumeMut.isLoading}
                  title="Сохранить"
                >
                  Сохранить
                </Button>
              </Form.Actions>
            </Form.Root>
          )
        })()}
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

EditResume.getLayout = (page) => {
  return (
    <MainLayout title="Редактирование резюме">
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default EditResume
