import type { ApexOptions } from 'apexcharts'

import type { ChartData, Colors } from '~/@types'
import { getTickAmount, generateHourlyPriceData, adjustMinMax, getCurrentHour } from '~/helpers'

export const generateChartData = (prices: number[]): ChartData => {
  const pricesByHour = generateHourlyPriceData(prices)
  const series = pricesByHour.map(({ price }) => price)
  const categories = pricesByHour.map(({ hour }) => `${hour}h`)

  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)
  const avgPrice = prices.reduce((acc, price) => acc + price, 0) / prices.length

  const { min, max } = adjustMinMax(minPrice, maxPrice)
  const tick = getTickAmount(min, max)

  return {
    pricesByHour,
    series,
    categories,
    min,
    max,
    avgPrice,
    tick,
  }
}

export const getColors = ({ darkMode }: { darkMode: boolean }): Colors => {
  const maxColor = darkMode ? 'var(--color-dark-max)' : 'var(--color-light-max)'
  const medColor = darkMode ? 'var(--color-dark-med)' : 'var(--color-light-med)'
  const minColor = darkMode ? 'var(--color-dark-min)' : 'var(--color-light-min)'
  const textColor = darkMode ? 'var(--color-dark-text)' : 'var(--color-light-text)'
  const gridColor = darkMode ? 'var(--color-dark-grid)' : 'var(--color-light-grid)'
  const annotationsColor = darkMode ? 'var(--color-dark-annotations)' : 'var(--color-light-annotations)'
  const currentHourBgColor = darkMode ? 'var(--color-dark-current-hour)' : 'var(--color-light-current-hour)'

  const colors = {
    maxColor,
    medColor,
    minColor,
    textColor,
    gridColor,
    annotationsColor,
    currentHourBgColor,
  }

  return colors
}

export const generateChartConfig = ({
  pricesByHour,
  categories,
  max,
  min,
  series,
  tick,
  colors,
}: ReturnType<typeof generateChartData> & { colors: ReturnType<typeof getColors> }) => {
  const { gridColor, maxColor, medColor, minColor, textColor } = colors

  const chartConfig: ApexOptions = {
    series: [
      {
        name: 'PVPC',
        type: 'column',
        data: series,
      },
    ],
    chart: {
      type: 'bar',
      height: 340,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 400,
      },
    },
    title: {
      text: 'Evolución del precio de la electricidad en KWh',
      align: 'center',
      style: {
        color: textColor,
        fontFamily: 'inherit',
        fontWeight: 400,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        if (pricesByHour[dataPointIndex].isMax) return maxColor
        if (pricesByHour[dataPointIndex].isMin) return minColor

        return medColor
      },
    ],
    stroke: {
      lineCap: 'round',
      curve: 'smooth',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: textColor,
          fontSize: '14px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      categories: categories,
    },
    yaxis: {
      max,
      min,
      tickAmount: tick,
      labels: {
        style: {
          colors: textColor,
          fontSize: '14px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
        formatter: (val: number) => `${(val / 1000).toFixed(3)} €/kWh`,
      },
    },
    grid: {
      show: true,
      borderColor: gridColor,
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          yaxis: {
            show: true,
            max,
            min,
            tickAmount: tick,
            labels: {
              style: {
                colors: textColor,
                fontSize: '10px',
                fontFamily: 'inherit',
                fontWeight: 400,
              },
              formatter: (val: number) => `${(val / 1000).toFixed(3)}`,
            },
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              rotateAlways: true,
              style: {
                colors: textColor,
                fontSize: '10px',
                fontFamily: 'inherit',
                fontWeight: 300,
              },
            },
          },
        },
      },
    ],
  }

  return chartConfig
}

export const generateAnnotations = ({
  colors,
  avgPrice,
}: {
  colors: ReturnType<typeof getColors>
  avgPrice: ReturnType<typeof generateChartData>['avgPrice']
}) => {
  const { annotationsColor, currentHourBgColor, textColor } = colors

  const xAxis = {
    id: 'current-hour',
    x: `${getCurrentHour()}h`,
    borderColor: annotationsColor,
    label: {
      text: 'Ahora',
      borderColor: currentHourBgColor,
      style: {
        color: textColor,
        background: currentHourBgColor,
      },
    },
  }

  const yAxis = {
    id: 'avg-price',
    y: avgPrice - 1,
    y2: avgPrice + 1,
    borderColor: textColor,
    fillColor: annotationsColor,
  }

  return { xAxis, yAxis }
}
