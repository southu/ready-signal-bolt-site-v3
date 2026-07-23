import SEO from '../../components/SEO';
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  Database,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import logo from '../../assets/images/ready-signal-full-logo.png';
import HubSpotStyledForm from './HubSpotStyledForm';
import { AI_MARKETING_DATA_CONTENT as content } from './aiMarketingDataContent';

/**
 * Focused campaign landing page at /ai-marketing-data.
 * All copy lives in aiMarketingDataContent.ts so marketing can edit messaging
 * without changing the layout.
 */
function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="AI-Ready Marketing Data | Ready Signal"
        description="Find, prepare, and validate the external signals that help AI marketing models explain demand, anticipate market shifts, and make smarter decisions."
        canonical="https://www.readysignal.com/ai-marketing-data"
      />

      <header className="sticky top-0 z-50 border-b border-rs-dark/10 bg-white">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" aria-label="Ready Signal home">
            <img src={logo} alt="Ready Signal" className="h-8 w-auto" />
          </a>
          <a
            href="#campaign-form"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-rs-yellow px-5 py-2.5 font-semibold text-rs-dark shadow-sm transition-colors hover:bg-yellow-400"
          >
            {content.navigation.cta}
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <section
          aria-labelledby="campaign-headline"
          className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="space-y-5">
                  <span className="inline-flex rounded-full bg-rs-cyan/10 px-4 py-2 text-sm font-semibold text-rs-cyan">
                    {content.hero.eyebrow}
                  </span>
                  <h1
                    id="campaign-headline"
                    className="text-4xl font-bold leading-tight text-rs-dark sm:text-5xl lg:text-6xl"
                  >
                    {content.hero.headline}
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-rs-dark/75 sm:text-xl">
                    {content.hero.supportingCopy}
                  </p>
                </div>

                <a
                  href="#campaign-form"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-rs-yellow px-8 py-4 font-semibold text-rs-dark shadow-md transition-all hover:bg-yellow-400 hover:shadow-lg"
                >
                  {content.hero.cta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>

              <div
                className="relative mx-auto hidden h-[440px] w-full max-w-[520px] items-center justify-center lg:flex"
                aria-hidden="true"
              >
                <div className="absolute h-[390px] w-[390px] rounded-full border-2 border-dashed border-rs-cyan/30" />
                <div className="absolute h-[280px] w-[280px] rounded-full border border-rs-dark/10" />
                <div className="absolute z-10 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-rs-cyan to-blue-600 text-center text-white shadow-2xl">
                  <div>
                    <Sparkles className="mx-auto mb-1 h-6 w-6" />
                    <span className="text-sm font-bold">AI-ready</span>
                  </div>
                </div>

                <div className="absolute left-0 top-12 rounded-lg border border-rs-dark/10 bg-white px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2 font-semibold text-rs-dark">
                    <BarChart3 className="h-5 w-5 text-rs-cyan" />
                    Campaign data
                  </div>
                </div>
                <div className="absolute right-0 top-20 rounded-lg border border-rs-dark/10 bg-white px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2 font-semibold text-rs-dark">
                    <Database className="h-5 w-5 text-rs-cyan" />
                    External signals
                  </div>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-lg border border-rs-dark/10 bg-white px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2 font-semibold text-rs-dark">
                    <TrendingUp className="h-5 w-5 text-rs-cyan" />
                    Smarter decisions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="campaign-benefits-heading"
          className="bg-rs-light-gray py-16 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-rs-cyan">
                  {content.benefits.eyebrow}
                </p>
                <h2
                  id="campaign-benefits-heading"
                  className="text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
                >
                  {content.benefits.heading}
                </h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {content.benefits.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-rs-dark/10 bg-white p-5 text-rs-dark shadow-sm"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rs-yellow">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="campaign-proof-heading"
          className="bg-white py-16 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-rs-cyan">
                {content.proof.eyebrow}
              </p>
              <h2
                id="campaign-proof-heading"
                className="text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
              >
                {content.proof.heading}
              </h2>
            </div>

            <div
              className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
              aria-label="Featured practitioner companies"
            >
              {content.proof.companies.map((company) => (
                <div
                  key={company}
                  className="flex h-20 items-center justify-center rounded-xl border border-rs-dark/10 bg-rs-light-gray px-5 text-xl font-bold tracking-wide text-rs-dark"
                >
                  {company}
                </div>
              ))}
            </div>

            <figure className="mx-auto mt-10 max-w-4xl rounded-2xl bg-rs-dark p-8 text-center shadow-lg sm:p-10">
              <blockquote className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
                “{content.proof.quote}”
              </blockquote>
              <figcaption className="mt-6 text-white/75">
                <span className="block font-bold text-white">
                  {content.proof.attribution.name}
                </span>
                {content.proof.attribution.title}, {content.proof.attribution.company}
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="campaign-form"
          aria-labelledby="campaign-form-heading"
          className="scroll-mt-20 bg-rs-dark py-16 sm:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="pt-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-rs-yellow">
                  {content.form.eyebrow}
                </p>
                <h2
                  id="campaign-form-heading"
                  className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                >
                  {content.form.heading}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                  {content.form.supportingCopy}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <HubSpotStyledForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
