import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { products } from "@/data/products"

type Line = { id: string; qty: number }
type Ctx = {
  lines: Line[]
  count: number
  subtotal: number
  open: boolean
  setOpen: (v: boolean) => void
  add: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<Ctx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([])
  const [open, setOpen] = useState(false)

  const value = useMemo<Ctx>(() => {
    const price = (id: string) => products.find((p) => p.id === id)?.price ?? 0
    return {
      lines,
      open,
      setOpen,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * price(l.id), 0),
      add: (id) =>
        setLines((prev) =>
          prev.some((l) => l.id === id)
            ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
            : [...prev, { id, qty: 1 }]
        ),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
        ),
      clear: () => setLines([]),
    }
  }, [lines, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart moet binnen CartProvider gebruikt worden")
  return ctx
}
