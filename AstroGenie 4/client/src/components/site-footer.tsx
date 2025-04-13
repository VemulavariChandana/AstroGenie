import { Link } from "wouter";
import { Logo } from "./logo";
import { Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center space-x-2 mb-4">
            <Logo size="small" />
            <h3 className="font-heading font-bold text-xl text-primary">AstroGenie</h3>
          </div>
          <p className="text-gray-400 mb-4 max-w-md">Your personal guide to the cosmic influences shaping your life journey.</p>
          
          <div className="flex space-x-6 mb-4">
            <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#horoscope" className="text-gray-400 hover:text-primary transition-colors">
              Get Your Jathakam
            </Link>
          </div>
          
          <div className="flex items-center justify-center text-gray-400 mb-4">
            <Mail className="text-primary mr-2" size={16} />
            <span>support@astrogenie.com</span>
          </div>
          
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} AstroGenie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
