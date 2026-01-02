'use client';

import { Info } from 'lucide-react';
import { IMPORTANT_NOTICE } from '@/lib/content';

export function ImportantNotice() {
  return (
    <section className="py-10 px-4 bg-jubilee-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-jubilee-800 flex items-center justify-center">
              <Info className="h-6 w-6 text-jubilee-300" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1 text-white">
              {IMPORTANT_NOTICE.title}
            </h3>
            <p className="text-jubilee-200 leading-relaxed">
              {IMPORTANT_NOTICE.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
