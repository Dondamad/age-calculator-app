import './globals.css'
import { Poppins } from 'next/font/google'

const poppinss = Poppins({
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: "--font-poppins",
})

export const metadata = {
  title: 'Age Calculator App',
  description: 'Age calculator app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppinss.variable} items-center flex flex-col justify-center h-screen sm:flex-col bg-neutral-light-grey`}>
        <main>
          <h1 className="sr-only">Age calculator app</h1>
          {children}
        </main>
        <footer className="absolute justify-center hidden text-center bottom-3 sm:block sm:bottom-3">
          <p className="text-sm text-neutral-smokey-grey-purple">
            Challenge by <a className='underline text-primary-purple' href="https://www.frontendmentor.io" rel='noopener noreferrer' target="_blank">Frontend Mentor</a>.
            Coded by <a className="underline text-primary-purple" href="https://github.com/Dondamad" rel='noopener noreferrer' target="_blank" aria-label="DonnxDev">DonnxDev</a>.
          </p>
        </footer>
      </body>
    </html>
  )
}
