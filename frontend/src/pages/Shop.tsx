import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { eur, products } from "@/data/products"
import { useCart } from "@/context/cart"
import ProductArt from "@/components/ProductArt"

export default function Shop() {
  const { add } = useCart()
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-6xl leading-none md:text-7xl">Shop</h1>
      <p className="mt-4 max-w-lg text-lg">Twee formaten, telkens per 6 stuks. Kies het formaat dat past bij je olievlek. Gratis verzending vanaf € 30.</p>

      <div className="mt-12 space-y-12">
        {products.map((p) => (
          <article key={p.id} className="grid items-center gap-8 md:grid-cols-2">
            <ProductArt product={p} className="aspect-[4/3] rounded-2xl" />
            <div>
              <h2 className="text-4xl leading-tight">{p.name}</h2>
              <p className="mt-3 text-lg">{p.use}</p>
              <dl className="mt-6 grid max-w-sm grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Formaat</dt><dd>{p.size}</dd>
                <dt className="text-muted-foreground">Inhoud</dt><dd>{p.pieces} sponzen per pak</dd>
                {p.dimensions && (<><dt className="text-muted-foreground">Afmetingen</dt><dd>{p.dimensions}</dd></>)}
                <dt className="text-muted-foreground">Materiaal</dt><dd>100% menselijk haar</dd>
                <dt className="text-muted-foreground">Prijs excl. btw</dt><dd>{eur(p.priceExcl)}</dd>
              </dl>
              <Separator className="my-6 max-w-sm" />
              <div className="flex items-center gap-6">
                <span className="font-display text-4xl">{eur(p.price)}</span>
                <Button size="lg" onClick={() => { add(p.id); toast.success(`${p.name} zit in je mandje`) }}>In mandje</Button>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Prijs incl. btw</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-16 max-w-xl">Ervaring met onze sponzen? <Link to="/reviews" className="font-medium underline underline-offset-4">Lees of schrijf een review</Link>.</p>
    </div>
  )
}
