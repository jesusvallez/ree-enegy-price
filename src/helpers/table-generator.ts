import { generateHourlyPriceData, getCurrentHour } from '~/helpers'

export const generateTableConfig = (prices: number[], todayPrices = false) => {
  const pricesByHour = generateHourlyPriceData(prices)
  const tBody = document.createElement('tbody')

  tBody.setAttribute('id', 'table')
  tBody.classList.add('font-sans', 'text-sm', 'antialiased', 'font-normal')

  const minColors = ['text-light-min', 'dark:text-dark-min'].join(' ')
  const maxColors = ['text-light-max', 'dark:text-dark-max'].join(' ')
  const medColors = ['text-light-med', 'dark:text-dark-med'].join(' ')

  pricesByHour.forEach(({ price, hour, isMax, isMin }, index) => {
    // if the hour is greater than the current hour, we don't show it
    // adding 1 to the current hour to show the previous hour if enableHidePreviusHours is false
    const currentHour = getCurrentHour()
    if (hour + 1 < currentHour && todayPrices) return

    const tr = document.createElement('tr')
    const diffNextHour = index === pricesByHour.length - 1 ? 0 : pricesByHour[index + 1].price - price
    const diffNextHourFixed = (diffNextHour / 1000).toFixed(3)
    const diffNextHourFixedWithSign = diffNextHour / 1000 > 0 ? `+${diffNextHourFixed}` : diffNextHourFixed
    const color = isMax ? maxColors : isMin ? minColors : medColors

    if (hour === currentHour && todayPrices) {
      tr.classList.add('bg-light-current-hour', 'dark:bg-dark-current-hour')
    }

    tr.innerHTML = `
      <td class="p-2">
        <p class="block font-bold auto-color">
          ${hour}h - ${hour + 1}h
        </p>
      </td>
      <td class="p-2">
        <p class="block font-bold ${color}">
          ${(price / 1000).toFixed(3)} €/kWh
        </p>
      </td>
      <td class="p-2 text-right">
        <p class="block">
          ${diffNextHourFixedWithSign}
        </p>
      </td>
    `

    tBody.appendChild(tr)
  })

  return tBody
}
