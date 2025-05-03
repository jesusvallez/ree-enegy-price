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

export interface SocialMedia {
  github: string
  linkedin: string
  cv: string
}

export interface ChartData {
  pricesByHour: PriceByHour[]
  series: number[]
  categories: string[]
  min: number
  max: number
  avgPrice: number
  tick: number
}

export interface Colors {
  maxColor: string
  medColor: string
  minColor: string
  textColor: string
  gridColor: string
  annotationsColor: string
  currentHourBgColor: string
}
