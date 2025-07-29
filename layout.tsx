import type React from "react"
import type { Metadata } from "next"
import { Inter, Lora } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" })

export const metadata: Metadata = {
  title: "SanatanDevAi - CHETNA-MITRA | A Sacred Presence",
  description:
    "A conscious, universal, human-centered presence that guides you toward clarity, inner awareness, emotional healing, and conscious living. Available in your language.",
  keywords:
    "spiritual guidance, emotional healing, meditation, consciousness, multilingual, inner peace, clarity, CHETNA-MITRA",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${lora.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
