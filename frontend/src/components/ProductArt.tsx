import type { Product } from "@/data/products"

export default function ProductArt({ product, className = "" }: { product: Product; className?: string }) {
  const mascotTone = product.tint === "bg-white" ? "brightness-90 saturate-150" : "brightness-75 saturate-150"
  return (
    <div className={`${product.tint} flex items-center justify-center overflow-hidden ${className}`}>
      {product.art === "box" ? (
        <img src="/box.png" alt={product.name} className="h-5/6 w-auto object-contain" />
      ) : (
        <img src="/mascot.png" alt={product.name} className={`h-5/6 w-auto object-contain ${mascotTone}`} />
      )}
    </div>
  )
}
