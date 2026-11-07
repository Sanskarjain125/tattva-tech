import React from 'react';
import './BrandMarquee.css';

const brandPhrases = ['TATTVA TECH', 'IDEAS INTO IMPACT', 'TATTVA TECH', 'IDEAS INTO IMPACT'];
const servicePhrases = ['WEB & APP DEVELOPMENT', 'SAAS', 'UI/UX DESIGN', 'DIGITAL GROWTH', 'AI & AUTOMATION'];

function MarqueeRow({ phrases, direction, label }) {
  return (
    <div className={`brand-marquee-row ${direction}`} role="group" aria-label={label}>
      <div className="brand-marquee-track">
        {[0, 1].map((copy) => (
          <div
            className="brand-marquee-group"
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {phrases.map((phrase, index) => (
              <React.Fragment key={`${phrase}-${index}`}>
                <span className="brand-marquee-phrase">{phrase}</span>
                {index < phrases.length - 1 && (
                  <span className="brand-marquee-dot" aria-hidden="true">•</span>
                )}
              </React.Fragment>
            ))}
            <span className="brand-marquee-dot brand-marquee-loop-dot" aria-hidden="true">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="brand-marquee" aria-label="Tattvaa Tech identity and services">
      <MarqueeRow
        phrases={brandPhrases}
        direction="brand-marquee-left"
        label="Tattvaa Tech — Ideas into Impact"
      />
      <div className="brand-marquee-divider" aria-hidden="true" />
      <MarqueeRow
        phrases={servicePhrases}
        direction="brand-marquee-right"
        label="Our services"
      />
    </section>
  );
}
