// components/admin/admin-header.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AdminHeader() {
    const pathname = usePathname()

    const tabs = [
        { label: "Tổng quát", href: "/admin" },
        { label: "Giáo viên", href: "/admin/teachers" },
        { label: "Lớp học", href: "/admin/classes" },
        { label: "Học sinh", href: "/admin/students" },
        { label: "Lịch học", href: "/admin/schedule" },
        { label: "Báo cáo", href: "/admin/reports" },
    ]

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
                <GraduationCapIcon className="h-6 w-6" />
                <span>Trung tâm trí thức việt</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`text-sm font-medium underline-offset-4 hover:underline ${isActive ? "text-purple-600 underline" : ""
                                }`}
                        >
                            {tab.label}
                        </Link>
                    )
                })}
            </nav>
            <Button variant="outline" size="sm" className="ml-auto md:hidden">
                <MenuIcon className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
            </Button>
        </header>
    )
}


function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
    )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}
