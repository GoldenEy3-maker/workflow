import Button from "~/components/Button"
import * as Section from "~/components/Section"

const Resume: React.FC = () => {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Ваше резюме</Section.Title>
      </Section.Header>
      <Section.Content>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1em",
            height: "100%",
            fontSize: "var(--body-extra-fs)",
          }}
        >
          <p>
            Похоже, у вас все еще нет резюме
            <br />
            Без резюме работодатели не смогут вас найти!
          </p>
          <Button variant="filled" type="button" title="Создать резюме">
            Создать резюме
          </Button>
        </div>
      </Section.Content>
    </Section.Root>
  )
}

export default Resume
