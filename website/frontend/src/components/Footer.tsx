'use client';

import Link from 'next/link';
import { Globe, ExternalLink } from 'lucide-react';
import { FOOTER_CONTENT, SITE_NAME, SITE_TAGLINE } from '@/lib/content';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-jubilee-500 to-jubilee-600 flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Jubilee<span className="text-jubilee-400">Internet</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {SITE_TAGLINE}
            </p>
            <p className="text-gray-400 text-sm max-w-xs">
              {FOOTER_CONTENT.tagline}
            </p>
            <p className="text-jubilee-400 text-sm mt-2 font-medium">
              {FOOTER_CONTENT.browserMessage}
            </p>
          </div>

          {/* Link Columns */}
          {FOOTER_CONTENT.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith('http');
                  const LinkComponent = isExternal ? 'a' : Link;
                  const linkProps = isExternal
                    ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                    : { href: link.href };

                  return (
                    <li key={link.label}>
                      <LinkComponent
                        {...linkProps}
                        className={`
                          text-sm hover:text-white transition-colors inline-flex items-center
                          ${link.comingSoon ? 'text-gray-500' : 'text-gray-400'}
                        `}
                      >
                        <span>{link.label}</span>
                        {isExternal && (
                          <ExternalLink className="h-3 w-3 ml-1 opacity-50" />
                        )}
                        {link.comingSoon && (
                          <span className="ml-1.5 text-[10px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded">
                            Soon
                          </span>
                        )}
                      </LinkComponent>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
              <p className="text-gray-500">
                © {FOOTER_CONTENT.legal.copyright}
              </p>
              <span className="hidden md:inline text-gray-700">•</span>
              <p className="text-gray-600 text-center md:text-left">
                {FOOTER_CONTENT.legal.notice}
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
