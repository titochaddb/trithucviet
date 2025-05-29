"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function AdminHeader() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const tabs = [
        { label: "Giáo viên", href: "/admin/teachers" },
        { label: "Lớp học", href: "/admin/classes" },
        { label: "Học sinh", href: "/admin/students" },
        { label: "Cài đặt", href: "/admin/page-setting" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-semibold text-purple-700 hover:text-purple-800">
                    <GraduationCapIcon className="h-6 w-6" />
                    <span className="text-base sm:text-lg whitespace-nowrap">Trung tâm trí thức Việt</span>
                </Link>

                {/* Desktop Tabs */}
                <nav className="hidden md:flex gap-6">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`text-sm font-medium transition-colors underline-offset-4 hover:underline ${isActive ? "text-purple-600 underline" : "text-gray-700"
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Open Menu">
                                <MenuIcon className="h-5 w-5 text-purple-700" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            <SheetHeader>
                                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                            </SheetHeader>
                            {/* Logo */}
                            <div className="flex items-center gap-2 text-purple-700 font-semibold mb-6">
                                <GraduationCapIcon className="h-5 w-5" />
                                <span className="text-lg">Trí thức Việt</span>
                            </div>

                            <div className="space-y-1 border-t pt-4">
                                {tabs.map((tab) => {
                                    const isActive = pathname === tab.href
                                    return (
                                        <Link
                                            key={tab.href}
                                            href={tab.href}
                                            onClick={() => setOpen(false)}
                                            className={`block px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                ? "bg-purple-100 text-purple-700"
                                                : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {tab.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

// Icons
function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
    )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}
