import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { useCart } from "@/context/cart"
import { eur, products } from "@/data/products"
import ProductArt from "@/components/ProductArt"

function CartSheet() {
  const { open, setOpen, lines, setQty, subtotal } = useCart()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl">Winkelmandje</SheetTitle>
          <SheetDescription>{lines.length ? "Controleer je bestelling." : "Je mandje is leeg."}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto px-4">
          {lines.length === 0 && (
            <Button asChild onClick={() => setOpen(false)}>
              <Link to="/shop">Bekijk de shop</Link>
            </Button>
          )}
          {lines.map((l) => {
            const p = products.find((x) => x.id === l.id)!
            return (
              <div key={l.id} className="flex gap-3">
                <ProductArt product={p} className="size-20 shrink-0 rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium leading-tight">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{eur(p.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button size="icon" variant="outline" className="size-7" aria-label="Minder" onClick={() => setQty(l.id, l.qty - 1)}><Minus /></Button>
                    <span className="w-6 text-center tabular-nums">{l.qty}</span>
                    <Button size="icon" variant="outline" className="size-7" aria-label="Meer" onClick={() => setQty(l.id, l.qty + 1)}><Plus /></Button>
                    <Button size="icon" variant="ghost" className="ml-auto size-7" aria-label={`Verwijder ${p.name}`} onClick={() => setQty(l.id, 0)}><X /></Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {lines.length > 0 && (
          <SheetFooter className="border-t">
            <div className="flex justify-between text-lg"><span>Subtotaal</span><strong>{eur(subtotal)}</strong></div>
            <p className="text-sm text-muted-foreground">Verzending bereken je bij het afrekenen.</p>
            <Button size="lg" variant="outline" onClick={() => setOpen(false)} nativeButton={false} render={<Link to="/afrekenen" />}>
              Afrekenen
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default function Layout() {
  const { count, setOpen } = useCart()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  const link = "text-sm font-medium underline-offset-8 hover:underline"
  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-30 border-b border-inkt/15 bg-wasser/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5">
          <Link to="/" aria-label="Olhère, naar de homepage" className="rounded-md bg-inkt px-3 py-1.5">
            <img src="/wordmark.png" alt="Olhère" className="h-8 w-auto" />
          </Link>
          <nav className="ml-auto flex items-center gap-6">
            <NavLink to="/shop" className={link}>Shop</NavLink>
            <Link to="/#verhaal" className={`${link} hidden sm:inline`}>Ons verhaal</Link>
            <Link to="/#kringloop" className={`${link} hidden sm:inline`}>Hoe het werkt</Link>
            <Link to="/#vragen" className={`${link} hidden md:inline`}>Vragen</Link>
          </nav>
          <Button size="sm" onClick={() => setOpen(true)} aria-label={`Winkelmandje, ${count} items`}>
            <ShoppingBag /> Mandje
            {count > 0 && <Badge className="ml-1 bg-boter text-inkt">{count}</Badge>}
          </Button>
        </div>
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-inkt text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <img src="/wordmark.png" alt="Olhère organic oil sponge" className="w-56" />
            <p className="mt-4 max-w-xs text-sm text-white/75">Haar van Vlaamse kappers wordt een spons voor olievlekken. Lokaal ingezameld, lokaal verkocht.</p>
          </div>
          <div className="text-sm">
            <h3 className="mb-3 text-2xl text-boter">Bedrijf</h3>
            <p>Olhère BV</p><p>Gent, België</p><p>Opgericht op 15 oktober 2026</p>
          </div>
          <div className="text-sm">
            <h3 className="mb-3 text-2xl text-boter">Bestuurders</h3>
            <p>Jenna Vermeulen</p><p>Rani Thooft</p><p>Elise Cosyns</p><p>Ellen Woestijn</p><p>Lore Van Landeghem</p>
          </div>
        </div>
        <Separator className="bg-white/15" />
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/60">© 2026 Olhère BV. Demo-webshop: er worden geen echte bestellingen verwerkt.</p>
      </footer>
      <CartSheet />
    </div>
  )
}
