import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IKON Pest Control Services - Professional Pest Management Solutions",
  description:
    "IKON Pest Control Services - Over 15+ years of professional pest management in Mira Road, Bhayandar, Thane. WHO & HACCP approved chemicals, 24/7 service, 4.8★ Google rating.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
