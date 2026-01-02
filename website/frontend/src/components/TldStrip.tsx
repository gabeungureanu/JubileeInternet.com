'use client';

import Link from 'next/link';
import { TLD_PRICING } from '@/lib/content';

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`;
}

export function TldStrip() {
  return (
    <section className="py-8 px-4 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <span className="text-sm text-gray-500 font-medium mr-2">Popular Web Spaces:</span>
          {TLD_PRICING.map((item) => (
            <Link
              key={item.tld}
              href={`/domains/search?query=${item.tld.slice(1)}&tld=${item.tld.slice(1)}`}
              className="group relative"
            >
              <div className={`
                flex items-center space-x-2 px-4 py-2 rounded-full border transition-all
                ${item.popular
                  ? 'bg-jubilee-50 border-jubilee-200 hover:border-jubilee-400 hover:bg-jubilee-100'
                  : 'bg-white border-gray-200 hover:border-jubilee-300 hover:bg-gray-50'
                }
              `}>
                <span className={`font-semibold ${item.popular ? 'text-jubilee-700' : 'text-gray-800'}`}>
                  {item.tld}
                </span>
                <span className="text-sm text-gray-500">
                  {formatPrice(item.price)}/yr
                </span>
                {item.popular && (
                  <span className="absolute -top-2 -right-1 text-[10px] bg-gold-400 text-gold-900 px-1.5 py-0.5 rounded-full font-medium">
                    Popular
                  </span>
                )}
              </div>
            </Link>
          ))}
          <Link
            href="/domains/tlds"
            className="text-sm text-jubilee-600 hover:text-jubilee-700 font-medium ml-2"
          >
            View all →
          </Link>
        </div>
      </div>
    </section>
  );
}
