import { MdArrowDownward, MdArrowUpward } from "react-icons/md"
import * as Section from "~/components/Section"

const Stats: React.FC = () => {
  return (
    <Section.Root>
      <Section.Content>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-y-8">
          <div className="relative flex flex-col gap-2 border-l-2 border-dashed border-outline px-8 first:border-l-0 first:pl-0 last:pr-0">
            <header className="flex items-center gap-2">
              <p className="truncate text-title-l">Стоимость заказов</p>
              <div className="flex flex-shrink-0 items-center gap-1 rounded-large-shape bg-danger-container px-2 py-[0.3rem] text-danger">
                <MdArrowDownward />
                <p className="text-body-m leading-none">3.0%</p>
              </div>
            </header>
            <h3 className="text-headline-l font-medium text-primary">
              100 000 ₽
            </h3>
            <p className="text-body-m">24 заказа</p>
          </div>
          <div className="relative flex flex-col gap-2 border-l-2 border-dashed border-outline px-8 first:border-l-0 first:pl-0 last:pr-0">
            <header className="flex items-center gap-2">
              <p className="truncate text-title-l">Кол-во заказов</p>
              <div className="flex flex-shrink-0 items-center gap-1 rounded-large-shape bg-success-container px-2 py-[0.3rem] text-success">
                <MdArrowUpward />
                <p className="text-body-m leading-none">3.2%</p>
              </div>
            </header>
            <h3 className="text-headline-l font-medium text-primary">24</h3>
            <p className="text-body-m">За последний месяц</p>
          </div>
          <div className="relative flex flex-col gap-2 border-l-2 border-dashed border-outline px-8 first:border-l-0 first:pl-0 last:pr-0">
            <header className="flex items-center gap-2">
              <p className="truncate text-title-l">Личный рейтинг</p>
              <div className="flex flex-shrink-0 items-center gap-1 rounded-large-shape bg-success-container px-2 py-[0.3rem] text-success">
                <MdArrowUpward />
                <p className="text-body-m leading-none">10.0%</p>
              </div>
            </header>
            <h3 className="text-headline-l font-medium text-primary">4,7</h3>
            <p className="text-body-m">Вс, 18 июня</p>
          </div>
          <div className="relative flex flex-col gap-2 border-l-2 border-dashed border-outline px-8 first:border-l-0 first:pl-0 last:pr-0">
            <header className="flex items-center gap-2">
              <p className="truncate text-title-l">Просмотры резюме</p>
              <div className="flex flex-shrink-0 items-center gap-1 rounded-large-shape bg-success-container px-2 py-[0.3rem] text-success">
                <MdArrowUpward />
                <p className="text-body-m leading-none">8.3%</p>
              </div>
            </header>
            <h3 className="text-headline-l font-medium text-primary">326</h3>
            <p className="text-body-m">За последнюю неделю</p>
          </div>
        </div>
      </Section.Content>
    </Section.Root>
  )
}

export default Stats
