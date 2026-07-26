# ReadySignal CTA Audit Findings

Audited URL: https://www.readysignal.com/

Method: deployed HTML and CSS inspected at 1440×900 desktop and 390×844 mobile viewports on July 26, 2026.

## Gap: CTA visibility/contrast

No contrast gap was observed: the primary `#hero-start-free-trial` and navigation CTA use `.bg-rs-yellow` (`rgb(252, 185, 0)`) with `.text-rs-dark` (`rgb(64, 76, 87)`), a 5.06:1 contrast ratio. The hero CTA also has strong visual weight from `px-8 py-4`, `font-semibold`, `shadow-md`, and a measured 205×60px desktop size.

## Gap: Above-fold clarity

No above-fold gap was observed at 1440×900: the H1, “Stop Reacting to Market Shifts. Start Predicting Them.”, spans y=216–456, and `#hero-start-free-trial` (“Start Free Trial”) spans y=588–648. Both the value proposition and primary CTA are therefore visible without scrolling.

## Gap: Trust signals

The hero shows three near-fold proof metrics—“3M+ Data Features,” “50%+ Error Reduction,” and “100% Explainable”—but no customer logo, testimonial, security/compliance badge, or review count. The recognizable source strip (`section.bg-rs-light-gray.py-12`) naming Federal Reserve, NOAA, Bureau of Labor, OECD, and S&P Global begins around y=2,105 on desktop, well below the initial viewport.

## Gap: Sticky nav CTA presence

On desktop, `nav.sticky.top-0.z-50` remains at y=0 after scrolling and its “Start Free Trial” link remains visible at y=12. At the mobile breakpoint, that CTA is inside `.hidden.md\:flex`, measures 0×0, and is not visible even though the navigation itself remains sticky.

## Gap: Mobile CTA placement/tap targets

No hero CTA placement or tap-target gap was observed: at the mobile viewport, `#hero-start-free-trial` is visible without scrolling at y=440 and measures 358×56px. Its `.px-8.py-4` styling exceeds the approximately 44×44px minimum target.

## Proposed Tweaks

1. **Gap:** Trust signals
   **Tweak:** Move the existing `section.bg-rs-light-gray.py-12` source strip from below the “See Ready Signal in Action” section to immediately after the hero section; retain its current copy, icons, and styling unchanged.

2. **Gap:** Trust signals
   **Tweak:** Change the source-strip lead copy from “Ingesting 40,000+ validated signals daily from the world's most trusted economic and environmental sources.” to “Trusted data sources: Federal Reserve, NOAA, Bureau of Labor, OECD, and S&P Global — 40,000+ validated signals daily.”

3. **Gap:** Sticky nav CTA presence
   **Tweak:** At widths below `768px`, place the existing navigation “Start Free Trial” link beside the menu button and style it with `display: inline-flex; min-height: 44px; padding: 0.625rem 1rem;`; keep the “Log In” link hidden and retain the existing yellow background and dark text.
