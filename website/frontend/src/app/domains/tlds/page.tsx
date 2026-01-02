'use client';

import Link from 'next/link';
import { ArrowLeft, Globe, Search, Sparkles, Shield, Church, Users, Heart, BookOpen, Music, Video, Calendar, MessageCircle } from 'lucide-react';
import { HeaderNav } from '@/components/HeaderNav';
import { Footer } from '@/components/Footer';

interface WebSpace {
  space: string;
  shortcut: string | null;
  description: string;
  restricted?: boolean;
}

interface WebSpaceCategory {
  name: string;
  icon: React.ReactNode;
  description: string;
  spaces: WebSpace[];
}

const WEB_SPACES: WebSpaceCategory[] = [
  {
    name: 'Core',
    icon: <Sparkles className="h-5 w-5" />,
    description: 'Foundation web spaces for the Jubilee Private Internet',
    spaces: [
      { space: '.inspire', shortcut: '.insp', description: 'Official Jubilee spaces', restricted: true },
      { space: '.jubilee', shortcut: '.jubi', description: 'Jubilee official spaces', restricted: true },
      { space: '.community', shortcut: '.comm', description: 'Faith communities' },
      { space: '.group', shortcut: null, description: 'Small groups & gatherings' },
      { space: '.verified', shortcut: '.vrfy', description: 'Verified ministries', restricted: true },
    ],
  },
  {
    name: 'Fivefold Ministry',
    icon: <Shield className="h-5 w-5" />,
    description: 'Web spaces for the fivefold ministry gifts',
    spaces: [
      { space: '.apostle', shortcut: '.apos', description: 'Apostolic ministries', restricted: true },
      { space: '.prophet', shortcut: '.prph', description: 'Prophetic voices', restricted: true },
      { space: '.evangelist', shortcut: '.evan', description: 'Evangelistic outreach', restricted: true },
      { space: '.pastor', shortcut: '.past', description: 'Pastoral ministries' },
      { space: '.shepherd', shortcut: '.shep', description: 'Pastoral care', restricted: true },
      { space: '.teacher', shortcut: '.tchr', description: 'Teaching ministries', restricted: true },
    ],
  },
  {
    name: 'Church & Ministry',
    icon: <Church className="h-5 w-5" />,
    description: 'Web spaces for churches and ministry organizations',
    spaces: [
      { space: '.church', shortcut: '.chur', description: 'Churches & congregations' },
      { space: '.ministry', shortcut: '.mini', description: 'Ministry organizations' },
      { space: '.mission', shortcut: '.miss', description: 'Missions & outreach' },
      { space: '.gospel', shortcut: '.gosp', description: 'Gospel proclamation' },
      { space: '.messianic', shortcut: '.mess', description: 'Messianic communities' },
      { space: '.bible', shortcut: null, description: 'Scripture & study', restricted: true },
      { space: '.book', shortcut: null, description: 'Christian books & publishing', restricted: true },
      { space: '.prayer', shortcut: '.pray', description: 'Prayer ministries' },
      { space: '.discipleship', shortcut: '.disc', description: 'Discipleship programs' },
      { space: '.teshuvah', shortcut: '.tshv', description: 'Repentance & renewal', restricted: true },
      { space: '.covenant', shortcut: '.covt', description: 'Covenant communities', restricted: true },
      { space: '.yeshua', shortcut: null, description: 'Yeshua-centered ministries', restricted: true },
      { space: '.yahuah', shortcut: null, description: 'Sacred name ministries', restricted: true },
      { space: '.shaddai', shortcut: null, description: 'El Shaddai ministries', restricted: true },
    ],
  },
  {
    name: 'Family & Life Stages',
    icon: <Users className="h-5 w-5" />,
    description: 'Web spaces for family and demographic ministries',
    spaces: [
      { space: '.family', shortcut: '.faml', description: 'Family ministries' },
      { space: '.youth', shortcut: null, description: 'Youth & young adults' },
      { space: '.children', shortcut: '.kids', description: "Children's ministry" },
      { space: '.men', shortcut: null, description: "Men's ministry" },
      { space: '.women', shortcut: null, description: "Women's ministry" },
    ],
  },
  {
    name: 'Worship & Teaching',
    icon: <Music className="h-5 w-5" />,
    description: 'Web spaces for worship and teaching content',
    spaces: [
      { space: '.worship', shortcut: '.wrsh', description: 'Worship ministries' },
      { space: '.praise', shortcut: '.praz', description: 'Praise & celebration' },
      { space: '.sermon', shortcut: '.srmn', description: 'Sermon archives' },
      { space: '.teaching', shortcut: '.tchr', description: 'Teaching content' },
      { space: '.music', shortcut: null, description: 'Christian music' },
    ],
  },
  {
    name: 'Giving & Stewardship',
    icon: <Heart className="h-5 w-5" />,
    description: 'Web spaces for generosity and stewardship',
    spaces: [
      { space: '.giving', shortcut: '.give', description: 'Generosity & giving' },
      { space: '.charity', shortcut: '.chty', description: 'Charitable works' },
      { space: '.stewardship', shortcut: '.stwd', description: 'Stewardship resources' },
    ],
  },
  {
    name: 'Care & Coaching',
    icon: <Heart className="h-5 w-5" />,
    description: 'Web spaces for pastoral care and coaching',
    spaces: [
      { space: '.coaching', shortcut: '.coch', description: 'Christian coaching' },
      { space: '.marriage', shortcut: '.marr', description: 'Marriage ministry' },
      { space: '.recovery', shortcut: '.recv', description: 'Recovery programs' },
      { space: '.healing', shortcut: '.heal', description: 'Healing ministry' },
    ],
  },
  {
    name: 'Education',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Web spaces for Christian education',
    spaces: [
      { space: '.school', shortcut: '.schl', description: 'Christian schools' },
      { space: '.academy', shortcut: '.acad', description: 'Educational academies' },
      { space: '.library', shortcut: '.libr', description: 'Resource libraries' },
      { space: '.resources', shortcut: '.rsrc', description: 'Ministry resources' },
    ],
  },
  {
    name: 'Media & Content',
    icon: <Video className="h-5 w-5" />,
    description: 'Web spaces for Christian media',
    spaces: [
      { space: '.media', shortcut: null, description: 'Christian media' },
      { space: '.video', shortcut: null, description: 'Video content' },
      { space: '.movie', shortcut: null, description: 'Christian films & movies' },
      { space: '.show', shortcut: null, description: 'Christian shows & series' },
      { space: '.animation', shortcut: '.anim', description: 'Christian animation' },
      { space: '.podcast', shortcut: '.podc', description: 'Podcasts & audio' },
      { space: '.radio', shortcut: null, description: 'Christian radio & broadcasting' },
      { space: '.news', shortcut: null, description: 'Faith-based news' },
    ],
  },
  {
    name: 'Events & Gatherings',
    icon: <Calendar className="h-5 w-5" />,
    description: 'Web spaces for events and conferences',
    spaces: [
      { space: '.events', shortcut: '.evts', description: 'Ministry events' },
      { space: '.conference', shortcut: '.conf', description: 'Conferences' },
      { space: '.retreat', shortcut: '.rtrt', description: 'Retreats & gatherings' },
    ],
  },
  {
    name: 'Community & Fellowship',
    icon: <MessageCircle className="h-5 w-5" />,
    description: 'Web spaces for community and fellowship',
    spaces: [
      { space: '.serve', shortcut: null, description: 'Service & volunteering' },
      { space: '.testimony', shortcut: '.test', description: 'Testimonies & stories' },
      { space: '.fellowship', shortcut: '.fell', description: 'Fellowship groups' },
      { space: '.persona', shortcut: null, description: 'Personal ministry profiles' },
    ],
  },
  {
    name: 'Denominational',
    icon: <Church className="h-5 w-5" />,
    description: 'Web spaces for denominational churches',
    spaces: [
      { space: '.catholic', shortcut: '.cath', description: 'Catholic churches' },
      { space: '.baptist', shortcut: '.bapt', description: 'Baptist churches' },
      { space: '.sbaptist', shortcut: '.sbap', description: 'Southern Baptist' },
      { space: '.methodist', shortcut: '.meth', description: 'Methodist churches' },
      { space: '.lutheran', shortcut: '.luth', description: 'Lutheran churches' },
      { space: '.pentecostal', shortcut: '.pent', description: 'Pentecostal churches' },
      { space: '.presbyterian', shortcut: '.pres', description: 'Presbyterian churches' },
      { space: '.anglican', shortcut: '.angl', description: 'Anglican churches' },
      { space: '.episcopal', shortcut: '.epis', description: 'Episcopal churches' },
      { space: '.reformed', shortcut: '.refo', description: 'Reformed churches' },
      { space: '.assembliesofgod', shortcut: '.aogd', description: 'Assemblies of God' },
      { space: '.churchofgod', shortcut: '.cogd', description: 'Church of God' },
      { space: '.churchofchrist', shortcut: '.coch', description: 'Church of Christ' },
      { space: '.nondenominational', shortcut: '.nden', description: 'Non-denominational' },
      { space: '.mennonite', shortcut: '.menn', description: 'Mennonite churches' },
      { space: '.nazarene', shortcut: '.naze', description: 'Nazarene churches' },
      { space: '.adventist', shortcut: '.advt', description: 'Adventist churches' },
      { space: '.quaker', shortcut: '.quak', description: 'Quaker meetings' },
      { space: '.orthodox', shortcut: '.orth', description: 'Orthodox churches' },
      { space: '.coptic', shortcut: '.copt', description: 'Coptic churches' },
      { space: '.wesleyan', shortcut: '.wesl', description: 'Wesleyan churches' },
      { space: '.foursquare', shortcut: '.fsqr', description: 'Foursquare churches' },
      { space: '.vineyard', shortcut: '.viny', description: 'Vineyard churches' },
      { space: '.calvarychapel', shortcut: '.calv', description: 'Calvary Chapel' },
      { space: '.holiness', shortcut: '.holy', description: 'Holiness churches' },
    ],
  },
];

export default function TldsPage() {
  const totalSpaces = WEB_SPACES.reduce((acc, cat) => acc + cat.spaces.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-jubilee-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-jubilee-100 text-jubilee-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Globe className="h-4 w-4" />
            <span>The Worldwide Bible Web</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Inspire Web Spaces
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Browse all {totalSpaces} available web spaces on the Jubilee Private Internet.
            Each web space provides a unique namespace for faith-based communities.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            All web spaces start at just <span className="font-semibold text-jubilee-600">$3/year</span> and are accessible exclusively through the Jubilee Browser.
          </p>
        </div>

        {/* Search CTA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-gray-900 mb-1">Ready to register?</h3>
              <p className="text-sm text-gray-600">Search for your perfect Inspire Web Space</p>
            </div>
            <Link
              href="/domains"
              className="inline-flex items-center gap-2 px-6 py-3 bg-jubilee-600 text-white font-medium rounded-lg hover:bg-jubilee-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              Search Now
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {WEB_SPACES.map((category) => (
            <section key={category.name} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-jubilee-50 to-gold-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-jubilee-100 flex items-center justify-center text-jubilee-600">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                  <span className="ml-auto text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                    {category.spaces.length} spaces
                  </span>
                </div>
              </div>

              {/* Web Spaces Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {category.spaces.map((space) => (
                    <Link
                      key={space.space}
                      href={`/domains/search?query=${space.space.slice(1)}&tld=${space.space.slice(1)}`}
                      className={`
                        group relative flex flex-col p-4 rounded-lg border-2 transition-all
                        ${space.restricted
                          ? 'border-purple-200 bg-purple-50/50 hover:border-purple-400'
                          : 'border-gray-200 bg-white hover:border-jubilee-400 hover:shadow-sm'
                        }
                      `}
                    >
                      {space.restricted && (
                        <span className="absolute -top-2 -right-2 text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full font-medium">
                          Restricted
                        </span>
                      )}
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-mono font-bold text-jubilee-600 group-hover:text-jubilee-700">
                          inspire://*{space.space}
                        </span>
                      </div>
                      {space.shortcut && (
                        <span className="text-xs text-gray-400 font-mono mb-2">
                          Shortcut: {space.shortcut}
                        </span>
                      )}
                      <span className="text-sm text-gray-600 mt-auto">
                        {space.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-jubilee-600 to-jubilee-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Ready to claim your web space?</h3>
            <p className="text-jubilee-100 mb-6 max-w-lg mx-auto">
              Join the Worldwide Bible Web and establish your presence on the Jubilee Private Internet.
            </p>
            <Link
              href="/domains"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-jubilee-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5" />
              Search for Your Web Space
            </Link>
          </div>
        </div>

        {/* Info Notice */}
        <div className="mt-8 p-6 bg-gray-100 rounded-xl border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-jubilee-100 flex items-center justify-center text-jubilee-600 flex-shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">About Inspire Web Spaces</h4>
              <p className="text-sm text-gray-600">
                Inspire Web Spaces are private addressing constructs that exist exclusively within the Jubilee Private Internet.
                They are not public DNS domains and are accessible only through the Jubilee Browser using the <code className="bg-gray-200 px-1.5 py-0.5 rounded text-jubilee-700 font-mono text-xs">inspire://</code> protocol.
                This ensures a safe, faith-aligned digital environment separate from the public internet.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
