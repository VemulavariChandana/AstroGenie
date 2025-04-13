import { useState } from "react";
import { Link } from "wouter";
import { LogoWithText } from "./logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { UserProfile } from "./auth/user-profile";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <LogoWithText />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/history" className="font-medium hover:text-primary transition-colors">
              My History
            </Link>
          </nav>
          <UserProfile />
        </div>

        {/* Mobile Menu Button and Profile */}
        <div className="md:hidden flex items-center gap-4">
          <UserProfile />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-2 bg-white border-t border-gray-200">
          <Link
            href="/"
            className="block py-2 font-medium hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/history"
            className="block py-2 font-medium hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            My History
          </Link>
        </div>
      )}
    </header>
  );
}
