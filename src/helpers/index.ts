import type { Included, REE } from '@/types'

const COLORS = {
  MAX: '#F93827',
  MIN: '#16C47F',
  MED: '#FFD65A',
  CURRENT_HOUR: '#252525',
  WHITE: '#FFF',
  ORANGE: '#FEB019',
  GRAY: '#9E9E9E',
  DARK_GRAY: '#6C757D',
}

const INTERVAL = 8
const NUM_HIGHLIGHT = 4

/**
 * Adjusts the minimum and maximum values to multiples of the interval
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @return {{ min: number, max: number }} Adjusted values
 */
const adjustMinMax = (min: number, max: number) => ({
  min: Math.floor(min / INTERVAL) * INTERVAL,
  max: Math.ceil(max / INTERVAL) * INTERVAL,
})

/**
 * Calculates the number of ticks on the Y axis
 * @param {number} min Minimum value
 * @param {number} max Maximum value
 * @return {number} Number of ticks
 */
const getTickAmount = (min: number, max: number) => (max - min) / INTERVAL

/**
 * Formats a date in the YYYY-MM-DD format
 * @param {Date} date Date
 * @return {string} Formatted date
 */
const formatDate = (date: Date) => date.toISOString().split('T')[0]

/**
 * Gets the current hour
 * @return {number} Current hour
 */
const getCurrentHour = () => new Date().getHours()

/**
 * Gets the current date and tomorrow's date in ISO 8601 format
 * @return {{ startDate: string, endDate: string }} Formatted dates
 */
const getDateRange = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  return {
    startDate: `${formatDate(today)}T00:00`,
    endDate: `${formatDate(tomorrow)}T23:59`,
  }
}

/**
 * Generates hourly data with maximum and minimum values
 * @param {number[]} prices List of prices
 * @return {PriceByHour[]} Formatted data
 */
export const generateHourlyPriceData = (prices: number[]) => {
  const sortedPrices = [...prices].sort((a, b) => a - b)
  const minValues = sortedPrices.slice(0, NUM_HIGHLIGHT)
  const maxValues = sortedPrices.slice(-NUM_HIGHLIGHT)

  return prices.map((price, hour) => ({
    price,
    hour,
    isMax: maxValues.includes(price),
    isMin: minValues.includes(price),
  }))
}

/**
 * Extracts prices for a given date
 * @param {Date} date Date
 * @param {Included} pricesData Prices data
 * @return {number[]} Extracted prices
 */
const extractPrices = (date: Date, pricesData: Included | undefined) => {
  return (
    pricesData?.attributes.values
      .filter(({ datetime }) => new Date(datetime).getDate() === date.getDate())
      .map(({ value }) => value) ?? []
  )
}

/**
 * Extracts current and tomorrow's prices from REE data
 * @param {REE} data REE data
 * @return {{ prices: number[], tomorrowPrices: number[] }} Extracted prices
 */
export const getPrices = (data: REE) => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const pricesData = data.included.find((item) => item.type === 'PVPC')
  const prices = extractPrices(today, pricesData)
  const tomorrowPrices = extractPrices(tomorrow, pricesData)

  return { prices, tomorrowPrices }
}

/**
 * Generates the API URL for prices
 * @return {string} Generated URL
 */
export const generateURL = () => {
  const { startDate, endDate } = getDateRange()

  return `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${startDate}&end_date=${endDate}&time_trunc=hour`
}

export { INTERVAL, COLORS, NUM_HIGHLIGHT, getTickAmount, adjustMinMax, formatDate, getCurrentHour, getDateRange }
