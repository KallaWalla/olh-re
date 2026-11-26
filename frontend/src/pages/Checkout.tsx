import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { eur, products } from "@/data/products"
import { useCart } from "@/context/cart"

export default function Checkout() {
  const { lines, subtotal, clear } = useCart()
  const [delivery, setDelivery] = useState("thuis")
  const [terms, setTerms] = useState(false)
  const [order, setOrder] = useState<string | null>(null)

  const shipping = delivery === "afhalen" || subtotal >= 30 ? 0 : 4.95
  const total = subtotal + shipping

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setOrder(`OLH-${Math.floor(10000 + Math.random() * 90000)}`)
    clear()
  }

  if (order)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <img src="/mascot.png" alt="" className="mx-auto h-48" />
        <h1 className="mt-6 text-6xl leading-none">Bedankt voor je bestelling</h1>
        <p className="mt-4 text-lg">Ordernummer <strong>{order}</strong>. We sturen een bevestiging per e-mail. (Demo: er is niets echt besteld.)</p>
        <Button size="lg" className="mt-8" nativeButton={false} render={<Link to="/" />}>
          Verder winkelen
        </Button>
      </div>
    )

  if (lines.length === 0)
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-6xl leading-none">Je mandje is leeg</h1>
        <Button size="lg" className="mt-8" nativeButton={false} render={<Link to="/shop" />}>
          Naar de shop
        </Button>
      </div>
    )

  const field = (id: string, label: string, props: React.ComponentProps<"input"> = {}) => (
    <div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} required className="bg-white" {...props} /></div>
  )

  return (
    <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-10">
        <h1 className="text-6xl leading-none">Afrekenen</h1>
        <section className="space-y-4">
          <h2 className="text-3xl">Contact</h2>
          <div className="grid gap-4 sm:grid-cols-2">{field("naam", "Naam", { autoComplete: "name" })}{field("email", "E-mailadres", { type: "email", autoComplete: "email" })}</div>
        </section>
        <section className="space-y-4">
          <h2 className="text-3xl">Levering</h2>
          <RadioGroup value={delivery} onValueChange={setDelivery} className="gap-3">
            {[["thuis", "Thuislevering", subtotal >= 30 ? "Gratis" : eur(4.95)], ["afhalen", "Afhalen in Gent", "Gratis"]].map(([v, l, p]) => (
              <Label key={v} htmlFor={v} className="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-4 has-[[data-state=checked]]:ring-2 has-[[data-state=checked]]:ring-inkt">
                <RadioGroupItem id={v} value={v} /><span className="flex-1">{l}</span><span>{p}</span>
              </Label>
            ))}
          </RadioGroup>
          {delivery === "thuis" && (
            <div className="grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-4">{field("straat", "Straat en nummer", { autoComplete: "street-address" })}</div>
              <div className="sm:col-span-2">{field("postcode", "Postcode", { autoComplete: "postal-code", inputMode: "numeric" })}</div>
              <div className="sm:col-span-4">{field("gemeente", "Gemeente", { autoComplete: "address-level2" })}</div>
              <div className="space-y-2 sm:col-span-2"><Label>Land</Label>
                <Select defaultValue="be"><SelectTrigger className="w-full bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="be">België</SelectItem><SelectItem value="nl">Nederland</SelectItem></SelectContent></Select>
              </div>
            </div>
          )}
        </section>
        <section className="space-y-4">
          <h2 className="text-3xl">Betaling</h2>
          <RadioGroup defaultValue="bancontact" className="gap-3">
            {[["bancontact", "Bancontact"], ["kaart", "Visa of Mastercard"], ["overschrijving", "Overschrijving"]].map(([v, l]) => (
              <Label key={v} htmlFor={v} className="flex cursor-pointer items-center gap-3 rounded-lg bg-white p-4 has-[[data-state=checked]]:ring-2 has-[[data-state=checked]]:ring-inkt">
                <RadioGroupItem id={v} value={v} />{l}
              </Label>
            ))}
          </RadioGroup>
          <p className="text-sm text-muted-foreground">Dit is een demo. Er wordt niets betaald.</p>
        </section>
      </div>

      <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 lg:sticky lg:top-24">
        <h2 className="text-3xl">Overzicht</h2>
        {lines.map((l) => {
          const p = products.find((x) => x.id === l.id)!
          return <div key={l.id} className="flex justify-between gap-4"><span>{l.qty} × {p.name}</span><span>{eur(l.qty * p.price)}</span></div>
        })}
        <Separator />
        <div className="flex justify-between"><span>Subtotaal</span><span>{eur(subtotal)}</span></div>
        <div className="flex justify-between"><span>Verzending</span><span>{shipping ? eur(shipping) : "Gratis"}</span></div>
        <Separator />
        <div className="flex justify-between text-xl font-semibold"><span>Totaal</span><span>{eur(total)}</span></div>
        <p className="text-sm text-muted-foreground">Prijzen zijn incl. btw.</p>
        <div className="flex items-start gap-2"><Checkbox id="terms" checked={terms} onCheckedChange={(v) => setTerms(v === true)} className="mt-1" /><Label htmlFor="terms" className="font-normal leading-snug">Ik ga akkoord met de algemene voorwaarden.</Label></div>
        <Button type="submit" size="lg" className="w-full" disabled={!terms}>Bestelling plaatsen</Button>
      </aside>
    </form>
  )
}
