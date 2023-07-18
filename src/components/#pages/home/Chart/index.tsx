import type {
  ActiveElement,
  ChartEvent,
  Chart as ChartType,
  TooltipModel,
} from "chart.js"
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

  const externalTooltipHandler = (context: {
    chart: ChartType<"line">
    tooltip: TooltipModel<"line">
  }) => {
    const { chart, tooltip } = context

    let tooltipEl = chart.canvas.parentNode?.querySelector("div")

    if (!tooltipEl) {
      tooltipEl = document.createElement("div")
      tooltipEl.classList.add(styles.tooltip)
      chart.canvas.parentNode?.appendChild(tooltipEl)
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = "0"
      return
    }

    if (tooltip.body) {
      const titleLines = tooltip.title || []
      const bodyLines = tooltip.body.map((b) => b.lines)

      const h5 = document.createElement("h5")
      h5.classList.add(styles.title)

      for (const title of titleLines) {
        const text = document.createTextNode(title)
        h5.appendChild(text)
      }

      const content = document.createElement("div")
      content.classList.add(styles.content)

      for (const body of bodyLines) {
        const p = document.createElement("p")
        const text = document.createTextNode(body[0])
        p.appendChild(text)
        content.appendChild(p)
      }

      while (tooltipEl?.firstChild) {
        tooltipEl.firstChild.remove()
      }

      tooltipEl?.appendChild(h5)
      tooltipEl?.appendChild(content)
    }

    const { offsetLeft, offsetTop } = chart.canvas

    tooltipEl.style.opacity = "1"
    tooltipEl.style.left = `${offsetLeft + tooltip.caretX}px`
    tooltipEl.style.top = `${offsetTop + tooltip.caretY - 10}px`
  }

  const highlightActiveLabelOnHover = (
    event: ChartEvent,
    elements: ActiveElement[],
    chart: ChartType<"line">
  ) => {
    const colors: string[] = []

    if (elements[0] && chart.data.labels) {
      const datapoint = elements[0].index

      chart.data.labels.forEach((_label, i) => {
        if (datapoint === i) {
          colors.push("hsl(274, 69%, 80%)")
        } else {
          colors.push("hsla(0, 0%, 40%)")
        }
      })

      chart.config.options!.scales!.x!.ticks!.color = colors

      chart.update()
    }
  }

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
            onHover: highlightActiveLabelOnHover,
            elements: {
              point: {
                radius: 0,
                pointStyle: "circle",
                hoverBorderColor: "hsl(274, 69%, 80%)",
                hoverBorderWidth: 3,
                hoverBackgroundColor: "#fff",
                hoverRadius: 8,
              },
            },
            interaction: {
              intersect: false,
            },
            plugins: {
              tooltip: {
                enabled: false,
                position: "nearest",
                external: externalTooltipHandler,
              },
            },
          }}
        />
      </Section.Content>
    </Section.Root>
  )
}

export default Chart
