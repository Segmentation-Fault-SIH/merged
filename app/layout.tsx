import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './auth/Nav.jsx'
const inter = Inter({ subsets: ['latin'] })
import { Roboto} from 'next/font/google'
import QueryWrapper from './auth/QueryWrapper'

const roboto= Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable :"--font-roboto",
})
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 xl:mx-96 ${roboto.variable} bg-gray-200` }>
        <QueryWrapper>
        <Nav />
       
        {children}
          </QueryWrapper>
       </body>
    </html>
  )
}
