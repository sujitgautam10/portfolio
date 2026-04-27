import type { Metadata } from 'next'
import { Poppins, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-poppins'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Sujit Gautam | Software Engineering Student from Nepal',
  description: 'Sujit Gautam - Software Engineering student at PCPS College, Nepal. Aspiring developer skilled in Java, Python, JavaScript. View my portfolio, projects, and academic journey.',
  generator: 'v0.app',
  keywords: [
    'Sujit Gautam',
    'Sujit Gautam Nepal',
    'Sujit Gautam portfolio',
    'Sujit Gautam software engineer',
    'Sujit Gautam PCPS College',
    'Software Engineering student Nepal',
    'PCPS College student',
    'Nepal developer portfolio',
    'Java developer Nepal',
    'Python developer Nepal'
  ],
  authors: [{ name: 'Sujit Gautam' }],
  creator: 'Sujit Gautam',
  publisher: 'Sujit Gautam',
  alternates: {
    canonical: 'https://sujitgautam.com.np',
  },
  openGraph: {
    title: 'Sujit Gautam | Software Engineering Student from Nepal',
    description: 'Sujit Gautam - Software Engineering student at PCPS College, Nepal. Aspiring developer skilled in Java, Python, JavaScript.',
    url: 'https://sujitgautam.com.np',
    siteName: 'Sujit Gautam Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://sujitgautam.com.np/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sujit Gautam - Software Engineering Student',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sujit Gautam | Software Engineering Student from Nepal',
    description: 'Sujit Gautam - Software Engineering student at PCPS College, Nepal. View my portfolio and projects.',
    images: ['https://sujitgautam.com.np/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
