import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { products, eur } from "@/data/products"
import { useCart } from "@/context/cart"
import ProductArt from "@/components/ProductArt"

const steps = [
  ["Inzamelen", "Vlaamse kappers bewaren knipsels in plaats van ze weg te gooien. Wij halen ze lokaal op."],
  ["Spons maken", "Menselijk haar heeft de ideale viltstructuur en neemt tot 8 liter olie op per kilo."],
  ["Gebruiken", "Eén pak bevat genoeg sponzen voor keuken, garage of huishouden."],
  ["Terugbrengen", "Verzadigde sponzen en matten gaan in de collection bins bij onze winkelpartners."],
  ["Zuiveren", "In ons zuiveringscentrum halen we de olie eruit met een milieuvriendelijk solvent. De olie gaat naar herraffinage."],
  ["Tweede leven", "Schone matten gaan opnieuw aan het werk. Versleten haar wordt compost voor lokale boeren of een Olhère FireBlock."],
]

const faq = [
  ["Wat is een Olhère-spons?", "Een spons van hergebruikt menselijk en dierlijk haar die olie opneemt. Voor kleine olievlekken in keuken, garage en huishouden."],
  ["Is de spons single-use?", "Eén spons neem je maar één keer vol. Daarom zitten er meerdere in een pak. Daarna breng je hem terug, en krijgt hij een tweede leven."],
  ["Waar breng ik gebruikte sponzen naartoe?", "Naar de collection bins bij onze retailpartners. Particulieren en bedrijven kunnen er verzadigde sponzen en matten inleveren."],
  ["Waar kan ik Olhère kopen?", "In deze webshop. We streven naar schapruimte bij twee winkelketens in ons eerste jaar."],
]

export default function Home() {
  const { add, setOpen } = useCart()
  const featured = products.filter((p) => ["spons-6", "mat-50", "starter"].includes(p.id))
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <img src="/wordmark.png" alt="Olhère, organic oil sponge" className="w-full max-w-xl" />
            <p className="mt-8 max-w-md text-xl leading-snug">Haar van de kapper wordt een spons voor je olievlek. Duurzaam, lokaal en volledig circulair.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link to="/shop" />}>
                Naar de shop
              </Button>
              <Button size="lg" variant="outline" nativeButton={false} render={<Link to="/#verhaal" />}>
                Ons verhaal
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <img src="/mascot.png" alt="De Olhère-spons: een mop met haar en druppelende olie" className="w-full" />
            {[28, 52, 74].map((left, i) => (
              <span key={left} aria-hidden className="absolute bottom-0 h-4 w-2.5 animate-drip rounded-full bg-boter" style={{ left: `${left}%`, animationDelay: `${i * 0.9}s` }} />
            ))}
          </div>
        </div>
      </section>

      <section id="verhaal" className="scroll-mt-16 bg-white py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-boter"><img src="/box.png" alt="Een pak Olhère-sponzen" className="h-5/6" /></div>
          <div>
            <h2 className="text-5xl leading-none md:text-6xl">Wat we weggooien, kan nog veel opnemen</h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed">Bij de kapper wordt al het haar weggegooid en verbrand. Olhère geeft dat haar een tweede bestemming: sponzen en matten die olievlekken efficiënt opkuisen.</p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed">Onze missie is om haarafval van kappers circulair te verwerken en zo milieuvervuiling door olie en huishoudelijke oliespills op te ruimen.</p>
          </div>
        </div>
      </section>

      <section id="kringloop" className="scroll-mt-16 bg-boter py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="max-w-2xl text-5xl leading-none md:text-6xl">Van knipsel tot compost, zonder afval</h2>
          <ol className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="font-display text-5xl leading-none">{i + 1}</span>
                <div><h3 className="text-2xl font-semibold">{t}</h3><p className="mt-1 leading-relaxed">{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-5xl leading-none md:text-6xl">Onze eerste twee jaar</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8">
              <h3 className="text-3xl">Jaar 1</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5"><li>30 Vlaamse kappers sluiten aan</li><li>Collection bins bij retailpartners</li><li>Schapruimte bij 2 winkelketens</li></ul>
            </div>
            <div className="rounded-2xl bg-inkt p-8 text-white">
              <h3 className="text-3xl text-boter">Jaar 2</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5"><li>60 kapperszaken aangesloten</li><li>Verkoop in meerdere winkelketens</li><li>Tweede-leven lijn: Olhère FireBlocks</li></ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-5xl leading-none md:text-6xl">Uit de shop</h2>
            <Button variant="outline" nativeButton={false} render={<Link to="/shop" />}>
              Alle producten
            </Button>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {featured.map((p) => (
              <div key={p.id}>
                <ProductArt product={p} className="aspect-square rounded-2xl" />
                <h3 className="mt-4 text-2xl font-semibold">{p.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg">{eur(p.price)}</span>
                  <Button size="sm" onClick={() => { add(p.id); setOpen(true) }}>In mandje</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vragen" className="scroll-mt-16 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-5xl leading-none md:text-6xl">Veelgestelde vragen</h2>
          <Accordion className="mt-8 rounded-2xl bg-white px-6">
            {faq.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger className="text-left text-lg">{q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}
