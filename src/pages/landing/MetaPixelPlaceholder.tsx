/**
 * Meta Pixel placeholder for the new landing route only.
 *
 * PENDING a real Meta Pixel ID — do NOT enable live tracking until a real
 * numeric Pixel ID is provisioned. This block is intentionally inert:
 * no fbevents.js load, no fbq() calls, no real Pixel ID committed.
 *
 * Replace PENDING_PIXEL_ID with the real ID and activate the standard Meta
 * Pixel snippet when ready. Do not add GTM or HubSpot tags here.
 */
const PENDING_PIXEL_ID = 'PENDING_PIXEL_ID';

function MetaPixelPlaceholder() {
  return (
    <>
      {/*
        Meta Pixel Code — PENDING real Pixel ID (PENDING_PIXEL_ID).
        INERT PLACEHOLDER: no live tracking calls. Replace PENDING_PIXEL_ID
        when a real numeric Meta Pixel ID is available.
      */}
      <div
        id="meta-pixel-placeholder"
        data-meta-pixel-id={PENDING_PIXEL_ID}
        data-meta-pixel-status="pending"
        data-meta-pixel-inert="true"
        hidden
        aria-hidden="true"
      >
        {/* Meta Pixel placeholder token: PENDING_PIXEL_ID — not a live Pixel ID */}
        Meta Pixel pending: {PENDING_PIXEL_ID}
      </div>
      {/*
        Standard Meta Pixel body (commented / inert — do not uncomment until
        PENDING_PIXEL_ID is replaced with a real numeric ID):

        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'PENDING_PIXEL_ID');
        fbq('track', 'PageView');
      */}
      <script
        type="text/plain"
        id="meta-pixel-placeholder-snippet"
        data-meta-pixel-id={PENDING_PIXEL_ID}
        data-meta-pixel-status="pending"
        dangerouslySetInnerHTML={{
          __html: [
            '/* Meta Pixel Code — INERT PLACEHOLDER',
            ' * Status: PENDING a real Pixel ID',
            ' * Token: PENDING_PIXEL_ID',
            ' * Do not enable until a real numeric Meta Pixel ID is provisioned.',
            ' * No fbevents.js load. No fbq() calls. No live tracking.',
            " * When ready: replace PENDING_PIXEL_ID and switch type to text/javascript",
            ' * after pasting the official Meta Pixel snippet.',
            ' */',
            "// fbq('init', 'PENDING_PIXEL_ID');",
            "// fbq('track', 'PageView');",
          ].join('\n'),
        }}
      />
    </>
  );
}

export default MetaPixelPlaceholder;
