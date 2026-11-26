import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { products, eur } from "@/data/products"
import { useCart } from "@/context/cart"
import ProductArt from "@/components/ProductArt"

const steps = [
  ["Inzamelen", "Kappers in Vlaanderen verzamelen het haar in een Olhère-box met een plastic zak erin. Wij halen die op."],
  ["Vilten en snijden", "Het haar wordt gevilt tot matten en daarna gesneden tot sponzen in twee formaten."],
  ["Opruimen", "Het haar heeft een viltstructuur die tussen 5 en 9 kg olie per kilogram haar opneemt."],
  ["Aanmaakblokje", "Een gebruikte spons gebruik je als aanmaakblokje voor je haardvuur of barbecue."],
  ["Vanaf jaar 3", "Inzamelpunten in winkels, zuivering door een extern bedrijf en herraffinage van de olie. Wat niet meer te reinigen is, wordt compost of een Olhère FireBlock."],
]

const faq = [
  ["Wat is een Olhère-spons?", "Een spons van 100% menselijk haar, ethisch ingezameld bij Vlaamse kappers. Hij ruimt kleine tot middelgrote olievlekken op en is een alternatief voor polyester sponzen en papieren doekjes."],
  ["Welk formaat kies ik?", "Klein voor kleine vlekken in keuken en huishouden, groot voor grotere vlekken in garage of grootkeuken. Beide zijn er per 6 stuks."],
  ["Wat doe ik met een gebruikte spons?", "Je geeft hem een tweede leven als aanmaakblokje voor je haardvuur of barbecue. Vanaf jaar 3 voorzien we inzamelpunten om sponzen te recycleren."],
  ["Waar kan ik Olhère kopen?", "In deze webshop, bij lokale bulkwinkels, eco-shops en zelfstandige supermarkten in de regio Gent."],
  ["Kan ik een review schrijven?", "Ja, op de reviewpagina. Je geeft daarbij toestemming dat we je review publiceren."],
]

export default function Home() {
  const { add, setOpen } = useCart()
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
            <p className="mt-6 max-w-prose text-lg leading-relaxed">Bij de kapper wordt al het haar weggegooid en verbrand. Olhère geeft dat haar een tweede bestemming: sponzen die olievlekken efficiënt opruimen.</p>
            <p className="mt-4 max-w-prose text-lg leading-relaxed">Onze missie is om haarafval van kappers circulair te verwerken en zo milieuvervuiling door olie en huishoudelijke oliespills op te ruimen.</p>          </div>
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
          <h2 className="text-5xl leading-none md:text-6xl">Onze eerste drie jaar</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-8">
              <h3 className="text-3xl">Jaar 1</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5"><li>30 Vlaamse kappers sluiten aan</li><li>Schapruimte bij 5 winkelketens</li><li>Verpakking moedigt aan tot een tweede leven als aanmaakblokje</li></ul>
            </div>
            <div className="rounded-2xl bg-white p-8">
              <h3 className="text-3xl">Jaar 2</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5"><li>60 kapperszaken aangesloten</li><li>Verkoop in meer winkelketens</li></ul>
            </div>
            <div className="rounded-2xl bg-inkt p-8 text-white">
              <h3 className="text-3xl text-boter">Jaar 3</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5"><li>Inzamelpunten in winkels</li><li>Recyclage: FireBlocks, compost en gerefurbishte sponzen</li></ul>
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
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {products.map((p) => (
              <div key={p.id}>
                <ProductArt product={p} className="aspect-square rounded-2xl" />
                <h3 className="mt-4 text-3xl">{p.name}</h3><p className="mt-1">{p.use}</p>
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
