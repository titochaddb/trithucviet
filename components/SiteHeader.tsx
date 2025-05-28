import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left: Logo or optional nav */}
        <div className="flex flex-1 items-center">
          {/* You can add a logo here if needed */}
        </div>

        {/* Center: Site Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-xl md:text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors">
              Trung tâm trí thức Việt
            </h1>
          </Link>
        </div>

        {/* Right: Admin Button */}
        <div className="flex flex-1 justify-end">
          <Link href="/admin/teachers">
            <Button
              variant="ghost"
              size="sm"
              className="bg-purple-600 text-white hover:bg-purple-700 transition-all gap-2"
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
