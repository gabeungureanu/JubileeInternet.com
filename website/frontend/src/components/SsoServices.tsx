'use client';

import Link from 'next/link';
import {
  Globe,
  BookOpen,
  Sparkles,
  MessageCircle,
  Mail,
  ExternalLink,
  Check,
  Clock
} from 'lucide-react';
import { SSO_SERVICES } from '@/lib/content';

const serviceIcons: Record<string, React.ReactNode> = {
  'Jubilee Browser': <Globe className="h-6 w-6" />,
  'Jubilee Bible': <BookOpen className="h-6 w-6" />,
  'JubileeVerse': <Sparkles className="h-6 w-6" />,
  'Round Table': <MessageCircle className="h-6 w-6" />,
  'Inspire Web Spaces': <Globe className="h-6 w-6" />,
  'Jubilee Email': <Mail className="h-6 w-6" />,
};

export function SsoServices() {
  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>One Account, Everything Jubilee</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {SSO_SERVICES.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {SSO_SERVICES.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SSO_SERVICES.services.map((service) => {
            const isAvailable = service.status === 'available';
            const isExternal = service.href.startsWith('http');

            return (
              <Link
                key={service.name}
                href={isAvailable ? service.href : '#'}
                target={isExternal && isAvailable ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`
                  group relative flex items-start space-x-4 p-5 rounded-xl border transition-all
                  ${isAvailable
                    ? 'bg-white border-gray-200 hover:border-jubilee-300 hover:shadow-md cursor-pointer'
                    : 'bg-gray-50 border-gray-100 cursor-default'
                  }
                `}
                onClick={(e) => !isAvailable && e.preventDefault()}
              >
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isAvailable ? 'bg-jubilee-100 text-jubilee-600' : 'bg-gray-100 text-gray-400'}
                `}>
                  {serviceIcons[service.name] || <Globe className="h-6 w-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className={`font-semibold ${isAvailable ? 'text-gray-900' : 'text-gray-500'}`}>
                      {service.name}
                    </h3>
                    {isExternal && isAvailable && (
                      <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${isAvailable ? 'text-gray-600' : 'text-gray-400'}`}>
                    {service.description}
                  </p>
                  <div className="mt-2">
                    {isAvailable ? (
                      <span className="inline-flex items-center text-xs text-green-600 font-medium">
                        <Check className="h-3 w-3 mr-1" />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs text-gray-400 font-medium">
                        <Clock className="h-3 w-3 mr-1" />
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
