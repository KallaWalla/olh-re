export type Product = {
  id: string
  name: string
  size: "Klein" | "Groot"
  description: string
  use: string
  price: number // incl. btw
  priceExcl: number // excl. btw
  pieces: number
  dimensions?: string // vul aan zodra de exacte afmetingen vastliggen, bv. "10 × 15 cm"
  art: "box" | "mascot"
  tint: string
}

export const products: Product[] = [
  {
    id: "spons-klein",
    name: "Olhère spons klein, 6-pack",
    size: "Klein",
    description: "Zes kleine sponzen van 100% menselijk haar.",
    use: "Voor kleine olievlekken en vetresten in keuken en huishouden.",
    price: 5.99,
    priceExcl: 4.95,
    pieces: 6,
    art: "box",
    tint: "bg-boter",
  },
  {
    id: "spons-groot",
    name: "Olhère spons groot, 6-pack",
    size: "Groot",
    description: "Zes grote sponzen van 100% menselijk haar.",
    use: "Voor grotere olievlekken in garage, werkplaats of grootkeuken.",
    price: 9.99,
    priceExcl: 8.26,
    pieces: 6,
    art: "box",
    tint: "bg-white",
  },
]

export const eur = (n: number) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(n)
