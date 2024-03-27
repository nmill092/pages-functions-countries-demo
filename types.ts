export interface Country {
  abbreviation: string,
  capital: string,
  currency: string,
  name: string,
  phone: string,
  population?: number,
  media: {
    emblem?: string,
    flag?: string,
    orthographic?: string
  },
  id: number
}

export interface Env {
  API_ENDPOINT: string
}
