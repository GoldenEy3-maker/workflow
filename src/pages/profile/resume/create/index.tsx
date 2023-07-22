import { Controller, useForm } from "react-hook-form"
import { BiAward } from "react-icons/bi"
import { MdOutlineGrade } from "react-icons/md"
import * as Form from "~/components/Form"
import Input from "~/components/Input"
import * as Section from "~/components/Section"
import SlateEditor from "~/components/Slate"
import MainLayout from "~/layouts/Main"
import ProfileLayout from "~/layouts/Profile"
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

  const specialityQuery = api.speciality.getAll.useQuery(
    {
      filterValue: hookForm.watch().speciality,
    },
    {
      // enabled: !!hookForm.getValues().speciality,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  const levelQuery = api.level.getAll.useQuery(
    {
      filterValue: hookForm.watch().level,
    },
    {
      // enabled: !!hookForm.getValues().level,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )

  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Создание резюме</Section.Title>
      </Section.Header>
      <Section.Content className={styles.content}>
        <Form.Root withGroups>
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
                    isOptionsLoading={
                      specialityQuery.isLoading || specialityQuery.isFetching
                    }
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
                    isOptionsLoading={
                      levelQuery.isLoading || levelQuery.isFetching
                    }
                    {...field}
                  />
                )}
              />
            </Form.Group>
            <SlateEditor/>
          </Form.Inputs>
        </Form.Root>
      </Section.Content>
    </Section.Root>
  )
}

CreateResume.getLayout = (page) => {
  return (
    <MainLayout>
      <ProfileLayout>{page}</ProfileLayout>
    </MainLayout>
  )
}

export default CreateResume
