import { useState, type FormEvent } from "react"
import { Star } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products } from "@/data/products"

type Review = { id: string; name: string; product: string; rating: number; text: string; date: string }

const KEY = "olhere-reviews"

// Voorbeeldreviews voor de demo. Vervang of verwijder ze zodra er echte reviews zijn.
const seed: Review[] = [
  { id: "s1", name: "Marie D.", product: "spons-klein", rating: 5, date: "12 november 2026", text: "Een omgevallen flesje olijfolie in de keuken, in een mum van tijd opgeruimd. Leuk dat het van haar gemaakt is." },
  { id: "s2", name: "Tom V.", product: "spons-groot", rating: 4, date: "8 november 2026", text: "Goed voor de olievlek onder mijn auto. Ik had graag meer sponzen in een pak gehad, maar de werking is prima." },
  { id: "s3", name: "Nele P.", product: "spons-klein", rating: 5, date: "2 november 2026", text: "De gebruikte spons ging als aanmaakblokje in de barbecue. Dat idee vind ik sterk." },
]

const productName = (id: string) => products.find((p) => p.id === id)?.name ?? "Olhère in het algemeen"

function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${value} van 5 sterren`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${className} text-inkt ${n <= value ? "fill-inkt" : "opacity-25"}`} />
      ))}
    </span>
  )
}

function load(): Review[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") } catch { return [] }
}

export default function Reviews() {
  const [mine, setMine] = useState<Review[]>(load)
  const [filter, setFilter] = useState("alle")
  const [name, setName] = useState("")
  const [product, setProduct] = useState("algemeen")
  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState("")

  const all = [...mine, ...seed]
  const shown = all.filter((r) => filter === "alle" || r.product === filter)
  const average = all.reduce((s, r) => s + r.rating, 0) / all.length

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!rating) return setError("Kies een aantal sterren.")
    const review: Review = {
      id: crypto.randomUUID(), name: name.trim(), product, rating, text: text.trim(),
      date: new Date().toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" }),
    }
    const next = [review, ...mine]
    setMine(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* opslag niet beschikbaar */ }
    setName(""); setProduct("algemeen"); setRating(0); setText(""); setConsent(false); setError("")
    toast.success("Bedankt, je review is geplaatst")
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="text-6xl leading-none md:text-7xl">Reviews</h1>
      <div className="mt-6 flex items-center gap-4">
        <span className="font-display text-6xl leading-none">{average.toFixed(1).replace(".", ",")}</span>
        <div><Stars value={Math.round(average)} className="size-5" /><p className="mt-1 text-sm">{all.length} reviews</p></div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Demo: de eerste drie reviews zijn voorbeelden.</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <section aria-label="Alle reviews">
          <ToggleGroup type="single" value={filter} onValueChange={(v) => v && setFilter(v)} variant="outline" className="bg-white/50">
            <ToggleGroupItem value="alle" className="px-4 data-[state=on]:bg-inkt data-[state=on]:text-boter">Alle</ToggleGroupItem>
            {products.map((p) => (
              <ToggleGroupItem key={p.id} value={p.id} className="px-4 data-[state=on]:bg-inkt data-[state=on]:text-boter">{p.size}</ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="mt-6">
            {shown.length === 0 && <p>Nog geen reviews voor dit formaat. Schrijf de eerste.</p>}
            {shown.map((r, i) => (
              <article key={r.id}>
                {i > 0 && <Separator className="my-6 bg-inkt/20" />}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Stars value={r.rating} />
                  <time className="text-sm text-muted-foreground">{r.date}</time>
                </div>
                <p className="mt-3 text-lg leading-relaxed">{r.text}</p>
                <p className="mt-2 text-sm"><strong>{r.name}</strong> over {productName(r.product)}</p>
              </article>
            ))}
          </div>
        </section>

        <form onSubmit={submit} className="h-fit space-y-5 rounded-2xl bg-white p-6 lg:sticky lg:top-24">
          <h2 className="text-3xl">Schrijf een review</h2>
          <div className="space-y-2"><Label htmlFor="r-naam">Naam</Label><Input id="r-naam" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Bijvoorbeeld Marie D." /></div>
          <div className="space-y-2">
            <Label>Product</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="algemeen">Olhère in het algemeen</SelectItem>
                {products.map((p) => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label id="r-sterren">Beoordeling</Label>
            <div role="radiogroup" aria-labelledby="r-sterren" className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} ${n === 1 ? "ster" : "sterren"}`}
                  onClick={() => { setRating(n); setError("") }} className="rounded p-1 focus-visible:ring-2 focus-visible:ring-ring">
                  <Star className={`size-8 text-inkt ${n <= rating ? "fill-inkt" : "opacity-30"}`} />
                </button>
              ))}
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          </div>
          <div className="space-y-2"><Label htmlFor="r-tekst">Je ervaring</Label><Textarea id="r-tekst" required rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Wat heb je opgeruimd en hoe werkte de spons?" /></div>
          <div className="flex items-start gap-2">
            <Checkbox id="r-toestemming" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1" />
            <Label htmlFor="r-toestemming" className="font-normal leading-snug">Ik geef toestemming om mijn review te gebruiken voor openbare reclame en publicatie.</Label>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={!consent}>Review plaatsen</Button>
        </form>
      </div>
    </div>
  )
}
