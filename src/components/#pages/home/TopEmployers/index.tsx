import Link from "~/components/Link"
import RatingSpan from "~/components/RatingSpan"
import * as Section from "~/components/Section"
import * as Table from "~/components/Table"
import UserProfile from "~/components/UserProfile"

const TopEmployers: React.FC = () => {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Топ работодатели месяца</Section.Title>
        <Link variant="elevated" href="#" title="Посмотреть всех">Посмотреть всех</Link>
      </Section.Header>
      <Section.Content>
        <Table.Root template="1fr 0.5fr 0.5fr 0.5fr">
          <Table.Head>
            <Table.Row>
              <Table.Cell>Профиль</Table.Cell>
              <Table.Cell>Заказы</Table.Cell>
              <Table.Cell>Рейтиг</Table.Cell>
              <Table.Cell>Опыт работы</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <UserProfile name="Иван"/>
              </Table.Cell>
              <Table.Cell>20</Table.Cell>
              <Table.Cell><RatingSpan value={4.7} /></Table.Cell>
              <Table.Cell>2 года</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <UserProfile name="Гоша"/>
              </Table.Cell>
              <Table.Cell>20</Table.Cell>
              <Table.Cell><RatingSpan value={4.7} /></Table.Cell>
              <Table.Cell>2 года</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <UserProfile name="Григорий"/>
              </Table.Cell>
              <Table.Cell>20</Table.Cell>
              <Table.Cell><RatingSpan value={4.7} /></Table.Cell>
              <Table.Cell>2 года</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Section.Content>
    </Section.Root>
  )
}
export default TopEmployers
