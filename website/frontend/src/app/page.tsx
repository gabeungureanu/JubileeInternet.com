'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe, Shield, Users, Sparkles, Church, BookOpen, Heart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DomainSearch } from '@/components/DomainSearch';
import { api, type TLD } from '@/lib/api';

export default function HomePage() {
  const [tlds, setTlds] = useState<TLD[]>([]);

  useEffect(() => {
    api.getTLDs().then(({ tlds }) => setTlds(tlds)).catch(console.error);
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-jubilee-50 via-white to-gold-50" />
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-jubilee-100 text-jubilee-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe className="h-4 w-4" />
              <span>Jubilee Internet Domain Registry</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Claim Your Space in the
              <br />
              <span className="text-jubilee-600">Jubilee Internet</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Register your ministry, church, or community domain on the private Jubilee
              network. Accessible exclusively through Jubilee Browser.
            </p>

            {/* Domain Search */}
            <DomainSearch
              onSelect={(domain) => {
                window.location.href = `/domains/register?name=${domain.name}&tld=${domain.tld}`;
              }}
            />

            <p className="mt-6 text-sm text-gray-500">
              Starting at just <span className="font-semibold text-jubilee-600">$3/year</span> •
              Includes identity on JubileeVerse
            </p>
          </div>
        </section>

        {/* TLD Showcase */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Domain Extension
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Express your ministry&apos;s calling with a meaningful domain extension
                designed for the Jubilee community.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tlds.slice(0, 8).map((tld) => (
                <div
                  key={tld.id}
                  className="card hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-jubilee-100 flex items-center justify-center group-hover:bg-jubilee-200 transition-colors">
                      {tld.tld === 'church' && <Church className="h-5 w-5 text-jubilee-600" />}
                      {tld.tld === 'faith' && <Heart className="h-5 w-5 text-jubilee-600" />}
                      {tld.tld === 'teacher' && <BookOpen className="h-5 w-5 text-jubilee-600" />}
                      {!['church', 'faith', 'teacher'].includes(tld.tld) && (
                        <Globe className="h-5 w-5 text-jubilee-600" />
                      )}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{tld.displayName}</span>
                  </div>
                  <p className="text-sm text-gray-500">{tld.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/domains/tlds" className="text-jubilee-600 hover:text-jubilee-700 font-medium">
                View all domain extensions →
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Jubilee Internet?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-16 h-16 rounded-full bg-jubilee-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-jubilee-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Private & Secure
                </h3>
                <p className="text-gray-600">
                  Your domain exists within the protected Jubilee Internet ecosystem,
                  separate from the public web and its risks.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Single Sign-On
                </h3>
                <p className="text-gray-600">
                  One identity across all Jubilee services — Browser, Bible, JubileeVerse,
                  Round Table, and your registered domains.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Your Digital Ministry
                </h3>
                <p className="text-gray-600">
                  Each domain represents a unique space in JubileeVerse — a foundation
                  for your community, content, and ministry presence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-12 px-4 bg-jubilee-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">
              Understanding Jubilee Internet Domains
            </h3>
            <p className="text-jubilee-200">
              Domains registered on Jubilee Internet are <strong>not</strong> part of the public
              Internet or ICANN DNS. They exist exclusively within the Jubilee network and are
              accessible only through Jubilee Browser. This creates a private, faith-focused
              space separate from the public web.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Establish Your Presence?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the Jubilee Internet community and claim your domain today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/domains" className="btn-primary text-lg px-8 py-3">
                Register a Domain
              </Link>
              <Link href="/about" className="btn-secondary text-lg px-8 py-3">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
