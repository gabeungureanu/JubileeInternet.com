'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Globe,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Mail,
  Server,
  Shield,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { getStoredAuth, initiateLogin, logout, type User as UserType } from '@/lib/auth';
import { NAV_LINKS, SITE_NAME } from '@/lib/content';

const navIcons: Record<string, React.ReactNode> = {
  'Inspire Web Spaces': <Globe className="h-4 w-4" />,
  'About JPI': <HelpCircle className="h-4 w-4" />,
  Browser: <Globe className="h-4 w-4" />,
  Help: <HelpCircle className="h-4 w-4" />,
};

export function HeaderNav() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const { user } = getStoredAuth();
    setUser(user);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    initiateLogin(window.location.pathname);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-white'
      }`}
    >
      {/* Top bar - optional promo/announcement */}
      <div className="bg-jubilee-900 text-white text-center py-2 px-4 text-sm">
        <span className="text-jubilee-200">The Worldwide Bible Web:</span>{' '}
        Register your Inspire Web Space for just <span className="font-semibold">$3/year</span>
        <Link href="/domains" className="ml-2 underline hover:no-underline">
          Get started →
        </Link>
      </div>

      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-jubilee-600 to-jubilee-700 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Inspire<span className="text-jubilee-600">WebSpaces</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.primary.map((link) => (
                <div key={link.label} className="relative group">
                  {link.comingSoon ? (
                    <span className="flex items-center space-x-1 px-4 py-2 text-gray-400 cursor-not-allowed">
                      {navIcons[link.label]}
                      <span>{link.label}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full ml-1">
                        Soon
                      </span>
                    </span>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-jubilee-600 hover:bg-jubilee-50 rounded-lg transition-colors"
                    >
                      {navIcons[link.label]}
                      <span>{link.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Account Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-jubilee-600 hover:bg-jubilee-50 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">
                      {user.displayName || user.email}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-gray-700 hover:text-jubilee-600 transition-colors"
                  >
                    {NAV_LINKS.account.signIn}
                  </button>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-jubilee-600 text-white rounded-lg hover:bg-jubilee-700 transition-colors font-medium"
                  >
                    {NAV_LINKS.account.createAccount}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-1">
                {NAV_LINKS.primary.map((link) => (
                  <div key={link.label}>
                    {link.comingSoon ? (
                      <span className="flex items-center justify-between px-4 py-3 text-gray-400 rounded-lg">
                        <span className="flex items-center space-x-3">
                          {navIcons[link.label]}
                          <span>{link.label}</span>
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-jubilee-600 hover:bg-jubilee-50 rounded-lg transition-colors"
                      >
                        {navIcons[link.label]}
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </div>
                ))}

                <div className="border-t border-gray-100 my-2 pt-2">
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-jubilee-600 hover:bg-jubilee-50 rounded-lg"
                      >
                        <User className="h-4 w-4" />
                        <span>{NAV_LINKS.account.dashboard}</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>{NAV_LINKS.account.signOut}</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 px-4 pt-2">
                      <button
                        onClick={() => {
                          handleLogin();
                          setIsMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {NAV_LINKS.account.signIn}
                      </button>
                      <Link
                        href="/auth/signup"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full px-4 py-3 bg-jubilee-600 text-white text-center rounded-lg hover:bg-jubilee-700 transition-colors font-medium"
                      >
                        {NAV_LINKS.account.createAccount}
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
