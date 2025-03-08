import { COLORS, generateHourlyPriceData, getCurrentHour } from '.'

export const generateTableConfig = (prices: number[], enableHidePreviusHours = false) => {
  const pricesByHour = generateHourlyPriceData(prices)
  const tBody = document.createElement('tbody')

  tBody.setAttribute('id', 'table')
  tBody.classList.add('font-sans', 'text-sm', 'antialiased', 'font-normal')

  pricesByHour.forEach(({ price, hour, isMax, isMin }, index) => {
    // if the hour is greater than the current hour, we don't show it
    // adding 1 to the current hour to show the previous hour if enableHidePreviusHours is false
    const currentHour = getCurrentHour()
    if (hour + 1 < currentHour && enableHidePreviusHours) return

    const tr = document.createElement('tr')
    const diffNextHour = index === pricesByHour.length - 1 ? 0 : pricesByHour[index + 1].price - price
    const diffNextHourFixed = (diffNextHour / 1000).toFixed(3)
    const diffNextHourFixedWithSign = diffNextHour / 1000 > 0 ? `+${diffNextHourFixed}` : diffNextHourFixed

    if (hour === currentHour) {
      tr.style.backgroundColor = COLORS.CURRENT_HOUR
    }

    tr.innerHTML = `
      <td class="p-2">
        <p class="block">${hour}h - ${hour + 1}h</p>
      </td>
      <td class="p-2">
        <p class="block" style="color: ${isMax ? COLORS.MAX : isMin ? COLORS.MIN : COLORS.MED}" >${(price / 1000).toFixed(3)} €/kWh</p>
      </td>
      <td class="p-2">
        <p class="block">${diffNextHourFixedWithSign}</p>
      </td>
    `

    tBody.appendChild(tr)
  })

  return tBody
}
