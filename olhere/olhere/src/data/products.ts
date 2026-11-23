export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: "spons" | "mat" | "pakket"
  art: "box" | "mascot"
  tint: string
  soon?: boolean
}

export const products: Product[] = [
  { id: "spons-6", name: "Olhère spons, pak van 6", description: "Voor keukenvlekken, een druppelende fiets of een lekkende bak in de garage.", price: 9.95, category: "spons", art: "box", tint: "bg-boter" },
  { id: "spons-12", name: "Olhère spons, pak van 12", description: "Het gezinspak. Genoeg sponzen om een heel jaar olievlekken voor te zijn.", price: 16.95, category: "spons", art: "box", tint: "bg-white" },
  { id: "mat-50", name: "Olie-mat 50 × 50 cm", description: "Leg ze onder de barbecue, de motor of de frituurpan.", price: 14.95, category: "mat", art: "mascot", tint: "bg-white" },
  { id: "mat-100", name: "Olie-mat XL 100 × 100 cm", description: "Voor garages en werkplaatsen waar er meer dan een druppel valt.", price: 24.95, category: "mat", art: "mascot", tint: "bg-boter" },
  { id: "starter", name: "Starterspakket", description: "Zes sponzen en één mat. Alles wat een huishouden nodig heeft.", price: 22.95, category: "pakket", art: "box", tint: "bg-white" },
  { id: "fireblocks", name: "Olhère FireBlocks, 24 stuks", description: "Aanmaakblokjes voor haard, barbecue en kampvuur, gemaakt van sponzen die klaar zijn met hun eerste leven.", price: 7.95, category: "pakket", art: "mascot", tint: "bg-boter", soon: true },
]

export const eur = (n: number) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(n)
