export interface REE {
  included: Included[]
}

export interface Included {
  type: string
  id: string
  groupId: unknown
  attributes: Attributes
}

export interface Attributes {
  title: string
  description: unknown
  color: string
  icon: unknown
  type: unknown
  magnitude: string
  composite: boolean
  'last-update': string
  values: Value[]
}

export interface Value {
  value: number
  percentage: number
  datetime: string
}

export interface PriceByHour {
  price: number
  hour: number
  isMax: boolean
  isMin: boolean
}
