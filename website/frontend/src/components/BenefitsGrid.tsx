'use client';

import Link from 'next/link';
import { Shield, BookOpen, Key, Lock, Users, ArrowRight } from 'lucide-react';
import { BENEFITS } from '@/lib/content';

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="h-6 w-6" />,
  book: <BookOpen className="h-6 w-6" />,
  key: <Key className="h-6 w-6" />,
  lock: <Lock className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
};

const colorMap: Record<string, { bg: string; icon: string }> = {
  shield: { bg: 'bg-blue-100', icon: 'text-blue-600' },
  book: { bg: 'bg-amber-100', icon: 'text-amber-600' },
  key: { bg: 'bg-jubilee-100', icon: 'text-jubilee-600' },
  lock: { bg: 'bg-green-100', icon: 'text-green-600' },
  users: { bg: 'bg-purple-100', icon: 'text-purple-600' },
};

export function BenefitsGrid() {
  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Inspire Web Spaces?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A faith-based, family-safe internet experience built for believers, churches, and ministries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const colors = colorMap[benefit.icon] || colorMap.shield;
            return (
              <div
                key={benefit.id}
                className="group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-jubilee-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className={colors.icon}>{iconMap[benefit.icon]}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <Link
                  href={benefit.href}
                  className="inline-flex items-center text-jubilee-600 hover:text-jubilee-700 font-medium group/link"
                >
                  <span>{benefit.cta}</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/auth/signup"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-jubilee-600 text-white font-semibold rounded-xl hover:bg-jubilee-700 transition-colors shadow-lg shadow-jubilee-200"
          >
            <span>Create Your Free Account</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            No credit card required to get started
          </p>
        </div>
      </div>
    </section>
  );
}
