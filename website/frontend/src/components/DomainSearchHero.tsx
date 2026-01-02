'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { HERO_CONTENT, SITE_TAGLINE } from '@/lib/content';

type SearchMode = 'register' | 'transfer';

interface ValidationError {
  field: string;
  message: string;
}

function validateDomainInput(input: string, mode: SearchMode): ValidationError | null {
  const trimmed = input.trim().toLowerCase();

  if (!trimmed) {
    return { field: 'domain', message: 'Please enter a domain name' };
  }

  if (trimmed.includes(' ')) {
    return { field: 'domain', message: 'Domain names cannot contain spaces' };
  }

  // Basic domain format check (alphanumeric, hyphens, dots)
  const domainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
  if (!domainRegex.test(trimmed)) {
    return { field: 'domain', message: 'Please enter a valid domain name (letters, numbers, hyphens only)' };
  }

  // Check for consecutive hyphens
  if (trimmed.includes('--')) {
    return { field: 'domain', message: 'Domain names cannot contain consecutive hyphens' };
  }

  // Minimum length
  if (trimmed.length < 2) {
    return { field: 'domain', message: 'Domain name must be at least 2 characters' };
  }

  // Maximum length
  if (trimmed.length > 63) {
    return { field: 'domain', message: 'Domain name must be 63 characters or less' };
  }

  return null;
}

export function DomainSearchHero() {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>('register');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove spaces and convert to lowercase as user types
    setQuery(value.replace(/\s/g, '').toLowerCase());
    setError(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateDomainInput(query, mode);
    if (validation) {
      setError(validation.message);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Navigate to results page
      const searchParams = new URLSearchParams({
        query: query.trim().toLowerCase(),
        mode,
      });
      router.push(`/domains/search?${searchParams.toString()}`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-jubilee-50 via-white to-gold-50/30" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-jubilee-100/50 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-gold-100/30 to-transparent rounded-tr-full" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-jubilee-100 text-jubilee-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-jubilee-500 rounded-full animate-pulse" />
          <span>{HERO_CONTENT.badge}</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {HERO_CONTENT.headline}
          <br />
          <span className="text-jubilee-600">{HERO_CONTENT.headlineHighlight}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          {HERO_CONTENT.subheadline}
        </p>

        {/* Search Module */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-4">
            <button
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors relative ${
                mode === 'register'
                  ? 'text-jubilee-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {HERO_CONTENT.tabs.register}
              {mode === 'register' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jubilee-600" />
              )}
            </button>
            <button
              onClick={() => {
                setMode('transfer');
                setError(null);
              }}
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors relative ${
                mode === 'transfer'
                  ? 'text-jubilee-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {HERO_CONTENT.tabs.transfer}
              {mode === 'transfer' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jubilee-600" />
              )}
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="p-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className={`flex items-center w-full border-2 rounded-xl transition-colors ${
                  error
                    ? 'border-red-300 focus-within:border-red-400'
                    : 'border-gray-200 focus-within:border-jubilee-500'
                }`}>
                  <span className="pl-4 text-lg text-jubilee-600 font-mono font-bold select-none whitespace-nowrap">
                    inspire://
                  </span>
                  <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder={HERO_CONTENT.searchPlaceholder[mode]}
                    className="flex-1 py-4 pr-4 text-lg bg-transparent focus:ring-0 focus:outline-none"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-jubilee-600 text-white font-semibold rounded-xl hover:bg-jubilee-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span>{HERO_CONTENT.cta[mode]}</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center space-x-2 mt-3 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Pricing hint */}
        <p className="mt-6 text-sm text-gray-500">
          Starting at just <span className="font-semibold text-jubilee-600">$3/year</span>
          {' '}&bull;{' '}
          The Worldwide Bible Web
          {' '}&bull;{' '}
          Accessible via Jubilee Browser
        </p>
      </div>
    </section>
  );
}
