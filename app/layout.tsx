import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Suspense } from "react"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Data Atmos - Unify your OLTP, OLAP, and AI Orchestration",
  description:
    "DataAtmos consolidates database operations, data-lake pipelines, and AI/ML workflows in one cloud-native platform. Enterprise-grade governance for small and mid-sized businesses.",
  keywords: [
    "Data Atmos",
    "DataAtmos",
    "dataatmos",
    "data atmos",
    "database operations",
    "data lakes",
    "AI ML workflows",
    "DataOps",
    "cloud-native platform",
    "database management",
    "data pipelines",
    "OLTP",
    "OLAP",
    "AI orchestration",
    "DBaaS",
    "data lake pipelines",
    "agentic reporting",
    "enterprise data governance",
    "unified data platform",
  ],
  authors: [{ name: "Data Atmos Team" }],
  creator: "Data Atmos",
  publisher: "Data Atmos",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dataatmos.ai",
    siteName: "Data Atmos",
    images: ["/og-image.png"],
    title: "Data Atmos - OLTP, OLAP, and AI orchestration is about to get easier with Data Atmos",
    description:
      "Consolidate database operations, data-lake pipelines, and AI/ML orchestration in one cloud-native platform.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Atmos - OLTP, OLAP, and AI orchestration is about to get easier with Data Atmos",
    description:
      "Consolidate database operations, data-lake pipelines, and AI/ML orchestration in one cloud-native platform.",
    images: ["/og-image.png"],
    creator: "@dataatmos",
  },
  alternates: {
    canonical: "https://dataatmos.ai",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Data Atmos",
              alternateName: ["DataAtmos", "dataatmos", "data atmos"],
              description:
                "DataAtmos consolidates database operations, data-lake pipelines, and AI/ML orchestration in one cloud-native platform. Custom AI agents run databases and drive agentic reporting.",
              applicationCategory: "DatabaseApplication",
              operatingSystem: "Cloud",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "Data Atmos",
                url: "https://dataatmos.ai",
              },
              keywords:
                "database operations, data lakes, AI ML workflows, DataOps, cloud-native platform, OLTP, OLAP, AI orchestration",
            }),
          }}
        />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}
