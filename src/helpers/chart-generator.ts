import type { ApexOptions } from 'apexcharts'

import { COLORS, getTickAmount, generateHourlyPriceData, getCurrentHour, adjustMinMax } from '.'

export const generateChartConfig = (prices: number[]) => {
  const pricesByHour = generateHourlyPriceData(prices)

  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)
  const avgPrice = prices.reduce((acc, price) => acc + price, 0) / prices.length

  const { min, max } = adjustMinMax(minPrice, maxPrice)
  const tickAmount = getTickAmount(min, max)

  const chartConfig: ApexOptions = {
    series: [
      {
        name: 'PVPC',
        type: 'column',
        data: pricesByHour.map(({ price }) => price),
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
        color: '#9E9E9E',
        fontFamily: 'inherit',
        fontWeight: 400,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [
      ({ dataPointIndex }: { dataPointIndex: number }) => {
        if (pricesByHour[dataPointIndex].isMax) return COLORS.MAX
        if (pricesByHour[dataPointIndex].isMin) return COLORS.MIN

        return COLORS.MED
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
          colors: '#9E9E9E',
          fontSize: '14px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
      },
      categories: pricesByHour.map(({ hour }) => `${hour}h`),
    },
    yaxis: {
      max,
      min,
      tickAmount,
      labels: {
        style: {
          colors: '#9E9E9E',
          fontSize: '14px',
          fontFamily: 'inherit',
          fontWeight: 400,
        },
        formatter: (val: number) => `${(val / 1000).toFixed(3)} €/kWh`,
      },
    },
    grid: {
      show: true,
      borderColor: '#6C757D',
      strokeDashArray: 0,
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
    annotations: {
      yaxis: [
        {
          y: avgPrice - 0.5,
          y2: avgPrice + 0.5,
          borderColor: '#FFF',
          fillColor: '#FEB019',
        },
      ],
      xaxis: [
        {
          x: `${getCurrentHour()}h`,
          borderColor: '#FEB019',
          label: {
            text: 'Ahora',
            borderColor: COLORS.CURRENT_HOUR,
            style: {
              color: '#FFF',
              background: COLORS.CURRENT_HOUR,
            },
          },
        },
      ],
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          yaxis: {
            show: true,
            max,
            min,
            tickAmount,
            labels: {
              style: {
                colors: '#9E9E9E',
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
                colors: '#9E9E9E',
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
