import type {
  ChartArea,
  ChartData,
  ChartOptions,
  ChartType,
  Plugin,
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
  type?: ChartType
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

const CustomChart = ({
  width,
  height,
  options,
  data,
  type = "line",
  gradiant,
}: CustomChartProps) => {
  const [chartData, setChartData] = useState<ChartData>({
    ...data,
  })

  const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
    const canvasGradiant = ctx.createLinearGradient(0, area.top, 0, area.bottom)

    if (gradiant) {
      canvasGradiant.addColorStop(gradiant.top.offset, gradiant.top.color)
      canvasGradiant.addColorStop(gradiant.bottom.offset, gradiant.bottom.color)
    }

    return canvasGradiant
  }

  const hoverLine: Plugin<typeof type> = {
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

  return (
    <Chart
      type={type}
      ref={(node) => {
        if (node && gradiant) {
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
      options={options}
      data={chartData}
      width={width}
      height={height}
    />
  )
}

export default CustomChart
