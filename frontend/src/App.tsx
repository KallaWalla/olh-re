import { Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Layout from "@/components/Layout"
import Home from "@/pages/Home"
import Shop from "@/pages/Shop"
import Reviews from "@/pages/Reviews"
import Checkout from "@/pages/Checkout"

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="afrekenen" element={<Checkout />} />
        </Route>
      </Routes>
      <Toaster position="bottom-center" />
    </>
  )
}
