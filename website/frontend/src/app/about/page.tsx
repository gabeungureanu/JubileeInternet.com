import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Globe, Shield, Users, Zap, BookOpen, Church } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-jubilee-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Jubilee Internet
            </h1>
            <p className="text-xl text-gray-600">
              A private, faith-focused network built for communities, ministries,
              and believers who want a different kind of online experience.
            </p>
          </div>
        </section>

        {/* What is Jubilee Internet */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What is Jubilee Internet?
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Jubilee Internet is a <strong>private network</strong> that exists alongside—but
                separate from—the public Internet. It&apos;s not a website or an app, but an
                entirely different namespace where faith-based communities, ministries, churches,
                and individuals can establish their digital presence.
              </p>
              <p>
                Unlike traditional domains that exist on the public Internet (like .com or .org),
                Jubilee Internet domains exist only within our private network. They are accessible
                exclusively through <strong>Jubilee Browser</strong>, ensuring a protected,
                curated experience.
              </p>
            </div>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Key Concepts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-jubilee-100 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-jubilee-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Private Namespace
                </h3>
                <p className="text-gray-600">
                  Jubilee Internet domains don&apos;t exist on public DNS or ICANN systems.
                  They&apos;re resolved only within the Jubilee network, creating a completely
                  separate digital space.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Protected Environment
                </h3>
                <p className="text-gray-600">
                  Because access requires Jubilee Browser, the network is naturally protected
                  from the noise, advertisements, and risks of the open web.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Single Identity
                </h3>
                <p className="text-gray-600">
                  Your Jubilee identity (SSO) works across all Jubilee services—Browser, Bible,
                  JubileeVerse, Round Table, and every domain you register.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  JubileeVerse Integration
                </h3>
                <p className="text-gray-600">
                  Each registered domain represents a unique &quot;space&quot; in JubileeVerse—a
                  foundation for communities, content, and ministry presence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Domain Extensions */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Meaningful Domain Extensions
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Jubilee Internet offers domain extensions designed for the faith community:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { tld: '.church', icon: Church, desc: 'Churches & congregations' },
                { tld: '.ministry', icon: Users, desc: 'Ministry organizations' },
                { tld: '.faith', icon: Globe, desc: 'Faith-based initiatives' },
                { tld: '.teacher', icon: BookOpen, desc: 'Teaching ministries' },
                { tld: '.apostle', icon: Globe, desc: 'Apostolic ministries' },
                { tld: '.prophet', icon: Globe, desc: 'Prophetic voices' },
                { tld: '.shepherd', icon: Globe, desc: 'Pastoral care' },
                { tld: '.community', icon: Users, desc: 'Faith communities' },
              ].map(({ tld, icon: Icon, desc }) => (
                <div key={tld} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon className="h-4 w-4 text-jubilee-500" />
                    <span className="font-semibold text-gray-900">{tld}</span>
                  </div>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-jubilee-900 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-jubilee-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Register Your Domain</h3>
                  <p className="text-jubilee-200">
                    Search for an available name and register it through this portal.
                    Domains cost just $3/year.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-jubilee-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Domain Goes Live on Jubilee Network</h3>
                  <p className="text-jubilee-200">
                    Your domain becomes accessible within the Jubilee Internet namespace,
                    ready for use.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-jubilee-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Access via Jubilee Browser</h3>
                  <p className="text-jubilee-200">
                    Users with Jubilee Browser can navigate to your domain directly,
                    experiencing your content in the protected Jubilee environment.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-jubilee-700 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Build Your Presence</h3>
                  <p className="text-jubilee-200">
                    Your domain is your foundation in JubileeVerse—connect it to communities,
                    content, and services as the platform grows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I access Jubilee Internet domains from a regular browser?
                </h3>
                <p className="text-gray-600">
                  No. Jubilee Internet domains are only accessible through Jubilee Browser.
                  This is intentional—it keeps the network private and protected.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is this connected to ICANN or public DNS?
                </h3>
                <p className="text-gray-600">
                  No. Jubilee Internet operates independently from the public Internet
                  infrastructure. Our domains do not exist in public DNS.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What can I do with my Jubilee domain?
                </h3>
                <p className="text-gray-600">
                  Your domain represents your space in JubileeVerse. As the platform evolves,
                  you&apos;ll be able to connect it to community pages, ministry content,
                  and other services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What is .inspire?
                </h3>
                <p className="text-gray-600">
                  The .inspire domain is restricted and reserved for official Jubilee
                  personas and system entities. It&apos;s not available for general registration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Join Jubilee Internet?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Register your domain and become part of this growing faith-based network.
            </p>
            <Link href="/domains" className="btn-primary text-lg px-8 py-3">
              Register a Domain
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
