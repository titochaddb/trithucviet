import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

function GraduationCapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 relative">
        {/* Left: Logo or nav (optional) */}
        <div className="flex items-center">
          {/* Logo or left nav if needed */}
        </div>

        {/* Center: Site Title */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCapIcon className="h-6 w-6" />
            <h1 className="text-lg md:text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors text-center whitespace-nowrap">
              Trung tâm trí thức Việt
            </h1>
          </Link>
        </div>

        {/* Right: Admin Button */}
        <div className="flex items-center">
          <Link href="/admin/teachers">
            <Button
              variant="ghost"
              size="sm"
              className="bg-purple-600 text-white hover:bg-purple-700 transition-all gap-2 px-3 py-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Quản trị</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
