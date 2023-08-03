import type {
  ActiveElement,
  ChartArea,
  ChartData,
  ChartEvent,
  ChartOptions,
  ChartType,
  Plugin,
  TooltipModel,
} from "chart.js"
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js"
import "chartjs-adapter-date-fns"
import { useState } from "react"
import { Chart } from "react-chartjs-2"
import styles from "./styles.module.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale
)

type CustomChartProps = {
  width?: number
  height?: number
  options?: ChartOptions
  data: ChartData
  type: ChartType
  gradiant?: {
    top: {
      offset: number
      color: string
    }
    bottom: {
      offset: number
      color: string
    }
  }
}

const CustomChart = (props: CustomChartProps) => {
  const [chartData, setChartData] = useState<ChartData>({
    ...props.data,
  })

  const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
    const canvasGradiant = ctx.createLinearGradient(0, area.top, 0, area.bottom)

    if (props.gradiant) {
      canvasGradiant.addColorStop(
        props.gradiant.top.offset,
        props.gradiant.top.color
      )
      canvasGradiant.addColorStop(
        props.gradiant.bottom.offset,
        props.gradiant.bottom.color
      )
    }

    return canvasGradiant
  }

  const hoverLine: Plugin<typeof props.type> = {
    id: "hoverLine",
    afterDatasetDraw(chart) {
      const { ctx, chartArea, tooltip, scales } = chart

      if (tooltip && tooltip.getActiveElements().length > 0) {
        const xPos = scales.x?.getPixelForValue(
          tooltip.dataPoints[0]?.parsed.x ?? 0
        )
        const yPos = scales.y?.getPixelForValue(
          tooltip.dataPoints[0]?.parsed.y ?? 0
        )

        if (!xPos || !yPos) return

        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = "hsl(274, 69%, 80%)"
        ctx.moveTo(xPos, yPos)
        ctx.setLineDash([6, 4])
        ctx.lineTo(xPos, chartArea.bottom)
        ctx.stroke()
        ctx.closePath()
        ctx.setLineDash([])
      }
    },
  }

  const highlightActiveLabelOnHover = (
    event: ChartEvent,
    elements: ActiveElement[],
    chart: ChartJS<"line">
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

      if (chart.config.options?.scales?.x?.ticks)
        chart.config.options.scales.x.ticks.color = colors

      chart.update()
    }
  }

  const externalTooltipHandler = (context: {
    chart: ChartJS<"line">
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

  return (
    <Chart
      type={props.type}
      ref={(node) => {
        if (node && props.gradiant) {
          setChartData((prev) => ({
            ...prev,
            datasets: prev.datasets.map((dataset) => ({
              ...dataset,
              backgroundColor: createGradient(node.ctx, node.chartArea),
            })),
          }))
        }
      }}
      plugins={[hoverLine]}
      options={{
        onHover: highlightActiveLabelOnHover,
        plugins: {
          tooltip: {
            enabled: false,
            position: "nearest",
            external: externalTooltipHandler,
          },
        },
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
        ...props.options,
      }}
      data={chartData}
      width={props.width}
      height={props.height}
    />
  )
}

export default CustomChart
