/**
 * Standalone landing-page Trust Banner for future redesign work.
 * Visually and data-independent from SocialTrustStrip — no shared imports/data.
 * Not wired into the live home page — used only by the /landing-preview route.
 */
const PLACEHOLDER_LOGOS = [
  { id: 'placeholder-1', label: 'Company A' },
  { id: 'placeholder-2', label: 'Company B' },
  { id: 'placeholder-3', label: 'Company C' },
  { id: 'placeholder-4', label: 'Company D' },
  { id: 'placeholder-5', label: 'Company E' },
] as const;

const TrustBanner = () => {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-base sm:text-lg text-rs-dark font-semibold font-sans">
            Trusted by forward-thinking data and finance teams at:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center">
          {PLACEHOLDER_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="w-full max-w-[160px] h-14 sm:h-16 rounded-lg border border-rs-dark/15 bg-rs-light-gray flex items-center justify-center px-3"
              aria-label={`Placeholder logo: ${logo.label}`}
            >
              <span className="text-xs sm:text-sm font-medium text-rs-dark/50 font-sans tracking-wide uppercase">
                {logo.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
