import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Mic2 } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Mic2 className="w-8 h-8 text-black" />
            <span className="text-xl font-bold">VerbaTTS</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <NavLinks mobile />
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const baseClasses = mobile
    ? "flex flex-col space-y-4"
    : "flex items-center space-x-8";

  return (
    <div className={baseClasses}>
      <Link to="/" className="hover:text-gray-600">Home</Link>
      <Link to="/about" className="hover:text-gray-600">About</Link>
      <Link to="/features" className="hover:text-gray-600">Features</Link>
      <Link to="/faq" className="hover:text-gray-600">FAQ</Link>
      <Link to="/contact" className="hover:text-gray-600">Contact</Link>
    </div>
  );
}