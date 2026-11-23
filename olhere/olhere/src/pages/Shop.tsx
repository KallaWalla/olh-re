import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { eur, products } from "@/data/products"
import { useCart } from "@/context/cart"
import ProductArt from "@/components/ProductArt"

const filters = [["alle", "Alles"], ["spons", "Sponzen"], ["mat", "Matten"], ["pakket", "Pakketten"]]

export default function Shop() {
  const [filter, setFilter] = useState("alle")
  const { add } = useCart()
  const shown = products.filter((p) => filter === "alle" || p.category === filter)

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-6xl leading-none md:text-7xl">Shop</h1>
      <p className="mt-4 max-w-md text-lg">Alles om olievlekken duurzaam op te kuisen. Gratis verzending vanaf € 30.</p>
      <ToggleGroup type="single" value={filter} onValueChange={(v) => v && setFilter(v)} variant="outline" className="mt-8 bg-white/50">
        {filters.map(([v, l]) => <ToggleGroupItem key={v} value={v} className="px-4 data-[state=on]:bg-inkt data-[state=on]:text-boter">{l}</ToggleGroupItem>)}
      </ToggleGroup>
      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <article key={p.id} className="flex flex-col">
            <ProductArt product={p} className="relative aspect-square rounded-2xl" />
            <div className="mt-4 flex items-start justify-between gap-3">
              <h2 className="text-2xl font-semibold leading-tight">{p.name}</h2>
              <span className="whitespace-nowrap text-lg">{eur(p.price)}</span>
            </div>
            <p className="mt-2 flex-1 text-muted-foreground">{p.description}</p>
            {p.soon && <Badge className="mt-3 w-fit bg-inkt text-boter">Vanaf jaar 2</Badge>}
            <Button className="mt-4" disabled={p.soon} onClick={() => { add(p.id); toast.success(`${p.name} zit in je mandje`) }}>
              {p.soon ? "Binnenkort beschikbaar" : "In mandje"}
            </Button>
          </article>
        ))}
      </div>
    </div>
  )
}
