import { ru } from "date-fns/locale"
import { useState } from "react"
import CustomChart from "~/components/Chart"
import * as Section from "~/components/Section"
import * as Select from "~/components/Select"
import dateService from "~/services/date.service"
import { getRandomNumber } from "~/utils/helpers"
import { type ValueOf } from "~/utils/types"
import styles from "./styles.module.scss"

const TypeSelectValues = {
  Orders: "Заказов",
  Views: "Просмотров",
  Activity: "Активности",
} as const

type TypeSelectValues = ValueOf<typeof TypeSelectValues>

const SortSelectValues = {
  Month: "Месяц",
  Year: "Год",
} as const

type SortSelectValues = ValueOf<typeof SortSelectValues>

const Chart: React.FC = () => {
  const [typeSelectState, setTypeSelectState] =
    useState<TypeSelectValues>("Заказов")
  const [sortSelectState, setSortSelectState] =
    useState<SortSelectValues>("Месяц")

  return (
    <Section.Root className={styles.chart}>
      <Section.Header>
        <Section.Title>
          <span>Аналитика</span>
          <Select.Root>
            <Select.Trigger value={typeSelectState} />
            <Select.Options
              values={Object.values(TypeSelectValues)}
              handler={(value) => setTypeSelectState(value as TypeSelectValues)}
            />
          </Select.Root>
        </Section.Title>
        <Select.Root label="Промежуток:">
          <Select.Trigger value={sortSelectState} />
          <Select.Options
            values={Object.values(SortSelectValues)}
            handler={(value) => setSortSelectState(value as SortSelectValues)}
          />
        </Select.Root>
      </Section.Header>
      <Section.Content>
        <CustomChart
          key={crypto.randomUUID()}
          type="line"
          data={{
            labels:
              sortSelectState === "Месяц"
                ? dateService.getDaysInMonth()
                : dateService.getMonths(),
            datasets: [
              {
                fill: true,
                data: (sortSelectState === "Месяц"
                  ? dateService.getDaysInMonth()
                  : dateService.getMonths()
                ).map(() => getRandomNumber(50000, 100000)),
                borderColor: "hsl(274, 80%, 80%)",
              },
            ],
          }}
          gradiant={{
            top: {
              offset: 0.6,
              color: "hsla(274, 80%, 80%, .2)",
            },
            bottom: {
              offset: 1,
              color: "hsl(0, 0%, 100%, 0)",
            },
          }}
          width={1000}
          height={300}
          options={{
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  displayFormats: {
                    day: "dd",
                    month: "MMMM",
                  },
                  unit: sortSelectState === "Месяц" ? "day" : "month",
                  tooltipFormat:
                    sortSelectState === "Месяц" ? "dd MMMM yyyy" : "MMMM yyyy",
                },
                adapters: {
                  date: {
                    locale: ru,
                  },
                },
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                },
              },
              y: {
                border: {
                  display: false,
                  dash: [4, 8],
                },
                grid: {
                  color: "hsl(0, 0%, 20%)",
                },
              },
            },
          }}
        />
      </Section.Content>
    </Section.Root>
  )
}

export default Chart
