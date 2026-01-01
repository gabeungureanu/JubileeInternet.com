import Link from 'next/link';
import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-jubilee-400" />
              <span className="text-xl font-bold text-white">
                Jubilee<span className="text-jubilee-400">Internet</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-md">
              The central identity and domain registry for the Jubilee Internet ecosystem.
              A private network designed for faith-based communities and ministries.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Note: Domains registered here exist only within the Jubilee Internet
              and are resolved exclusively by Jubilee Browser.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/domains" className="hover:text-white transition-colors">
                  Register Domain
                </Link>
              </li>
              <li>
                <Link href="/domains/search" className="hover:text-white transition-colors">
                  Domain Search
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  My Domains
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Jubilee Internet
                </Link>
              </li>
            </ul>
          </div>

          {/* Jubilee Ecosystem */}
          <div>
            <h3 className="text-white font-semibold mb-4">Jubilee Ecosystem</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://jubileebrowser.com" className="hover:text-white transition-colors">
                  Jubilee Browser
                </a>
              </li>
              <li>
                <a href="https://jubileebible.com" className="hover:text-white transition-colors">
                  Jubilee Bible
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  JubileeVerse
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Round Table
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Jubilee Internet, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
