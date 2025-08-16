import { WalletProvider } from "@/components/wallet-provider"
import { CartProvider } from "@/components/cart-provider"
import HomePage from "@/components/home-page"

export default function Page() {
  return (
    <WalletProvider>
      <CartProvider>
        <HomePage />
      </CartProvider>
    </WalletProvider>
  )
}
