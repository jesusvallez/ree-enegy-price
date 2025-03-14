import type { ChartData, Colors } from '~/@types'

import { generateChartConfig, generateAnnotations } from './chart-generator'
import { generateTableConfig } from './table-generator'

/**
 * Update the chart and table according to the selected data set (today or tomorrow)
 * @param chart - The ApexCharts instance
 * @param TABLE - The table element
 * @param isTomorrowSelected - Whether the "tomorrow" switch is checked
 * @param todayData - The data for today
 * @param tomorrowData - The data for tomorrow
 * @param colors - The colors to use for the chart
 */
const updateChartAndTable = (
  chart: ApexCharts,
  TABLE: Element | null,
  isTomorrowSelected: boolean,
  todayData: ChartData,
  tomorrowData: ChartData,
  colors: Colors,
) => {
  const hasTomorrowPrices = tomorrowData.series?.length > 0
  const shouldShowTomorrow = isTomorrowSelected && hasTomorrowPrices

  if (shouldShowTomorrow) {
    // Update with tomorrow data
    const tomorrowChartConfig = generateChartConfig({ ...tomorrowData, colors })
    chart.updateOptions(tomorrowChartConfig)
    chart.clearAnnotations()

    // Update table with tomorrow data (if exists)
    if (TABLE) {
      const tBody = generateTableConfig(tomorrowData.series, false)
      TABLE.innerHTML = tBody.innerHTML
    }
  } else {
    // Update with today data
    const todayChartConfig = generateChartConfig({ ...todayData, colors })
    const { xAxis, yAxis } = generateAnnotations({ avgPrice: todayData.avgPrice, colors })

    chart.updateOptions(todayChartConfig)
    chart.addXaxisAnnotation(xAxis)
    chart.addYaxisAnnotation(yAxis)

    // Update table with today data (if exists)
    if (TABLE) {
      const tBody = generateTableConfig(todayData.series, true)
      TABLE.innerHTML = tBody.innerHTML
    }
  }
}

/**
 * Handler for the "tomorrow" switch change
 * @param SWITCH - The switch element
 * @param TABLE - The table element
 * @param chart - The ApexCharts instance
 * @param todayData - The data for today
 * @param tomorrowData - The data for tomorrow
 * @param lightColors - The colors to use in light mode
 * @param darkColors - The colors to use in dark mode
 */
export const addEventListenerTomorrowSwitch = (
  SWITCH: Element | null,
  TABLE: Element | null,
  chart: ApexCharts,
  todayData: ChartData,
  tomorrowData: ChartData,
  lightColors: Colors,
  darkColors: Colors,
) => {
  if (SWITCH) {
    SWITCH.addEventListener('change', (event) => {
      const isTomorrowSwitchChecked = event.target instanceof HTMLInputElement && event.target.checked
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      const colors = darkMode ? darkColors : lightColors

      updateChartAndTable(chart, TABLE, isTomorrowSwitchChecked, todayData, tomorrowData, colors)
    })
  }
}

/**
 * Handler for dark mode change
 * @param SWITCH - The switch element
 * @param chart - The ApexCharts instance
 * @param todayData - The data for today
 * @param tomorrowData - The data for tomorrow
 * @param lightColors - The colors to use in light mode
 * @param darkColors - The colors to use in dark mode
 */
export const addEventListenerDarkModeSwitch = (
  SWITCH: Element | null,
  chart: ApexCharts,
  todayData: ChartData,
  tomorrowData: ChartData,
  lightColors: Colors,
  darkColors: Colors,
) => {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    const isTomorrowSwitchChecked = SWITCH?.querySelector('input')?.checked ?? false
    const darkMode = event.matches
    const colors = darkMode ? darkColors : lightColors

    // We don't pass TABLE since this event only updates colors, not the table
    updateChartAndTable(chart, null, isTomorrowSwitchChecked, todayData, tomorrowData, colors)
  })
}
