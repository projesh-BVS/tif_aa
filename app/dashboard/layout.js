import DashHeader from '@/components/Dashboard/DashHeader'
import DashSidebar from '@/components/Dashboard/DashSidebar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'TIF Dashboard',
    description: 'Administrator dashboard for Try It First',
}

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex w-screen h-screen">
                    <section>
                        <DashSidebar/>
                    </section>
                    <section className='flex flex-col w-full h-full'>
                        <DashHeader/>
                        {children}
                    </section>
                </main>
            </body>
        </html>
    )
}