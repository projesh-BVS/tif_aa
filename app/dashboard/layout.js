"use client"

import DashHeader from '@/components/Dashboard/DashHeader'
import DashSidebar from '@/components/Dashboard/DashSidebar'
import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({ subsets: ['latin'] })

const metadata = {
    title: 'TIF Dashboard',
    description: 'Administrator dashboard for Try It First',
}

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
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