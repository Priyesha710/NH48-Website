import { useWindowWidth } from '../hooks/useWindowWidth'
import { Link } from 'react-router-dom'

// ─── Lotus SVG path (for footer) ─────────────────────────────────────────────
const LotusPath = "M46.1462 21.1309C46.1462 21.1309 49.2654 9.97958 36.0086 0C22.7603 9.97958 25.871 21.1309 25.871 21.1309C12.6227 11.7412 0 22.3026 0 22.3026C0 22.3026 13.2483 19.3693 17.0359 29.3489C20.8236 39.3285 33.4378 43.4335 33.4378 43.4335L33.3006 54.4413V54.6326C33.2921 55.9399 34.4318 57 35.8372 57H35.8886C37.2854 57 38.4166 55.9478 38.4251 54.6486V54.6087L38.5622 43.4255C38.5622 43.4255 51.185 39.3205 54.9641 29.3409C58.7517 19.3613 72 22.2946 72 22.2946C72 22.2946 59.3944 11.7412 46.1462 21.1309Z"

// ─── Footer shared styles ─────────────────────────────────────────────────────
const ftLabel = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '20px',
  textTransform: 'uppercase',
  color: '#FFFFFF',
  margin: 0,
}
const ftBody = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  textTransform: 'uppercase',
  color: '#FFD5D5',
  margin: 0,
}

// ─── Scallop Divider (matches Figma: connected cream arcs at teal→cream boundary) ─
// The teal section ends with connected cream bumps pointing downward
// Uses the same SVG technique as the homepage ScallopBorder (proven working)
function ScallopDivider() {
  const count = 72           // enough arcs across full width
  const arcW  = 21           // each scallop width — matches Figma 21px pitch
  const r     = arcW / 2
  const height = r           // strip height = one radius (half-circle visible)
  const totalW = count * arcW

  // Technique: draw the TEAL shape that has scalloped bottom edge
  // Start bottom-left, arch along bottom edge (sweep=1 → arcs bow downward),
  // then close the rectangle at the top. This is position='top' from homepage.
  let d = `M 0,${height}`
  for (let i = 0; i < count; i++) {
    const x2 = (i + 1) * arcW
    d += ` A${r},${r} 0 0,1 ${x2},${height}`
  }
  d += ` L${totalW},0 L0,0 Z`

  return (
    <div aria-hidden="true" style={{ lineHeight: 0, overflow: 'hidden', width: '100%', backgroundColor: '#FCF9EB' }}>
      <svg
        viewBox={`0 0 ${totalW} ${height}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: `${height}px`, display: 'block' }}
      >
        <path d={d} fill="#14534D" />
      </svg>
    </div>
  )
}

// ─── Indian City Skyline border ───────────────────────────────────────────────
// Uses the generated city silhouette image as a repeating background
function CitySkylineBorder({ mob }) {
  const h = mob ? 55 : 80
  // The generated image is a grid of silhouettes — we clip to just the top row
  // by setting a tall backgroundSize and only showing the top `h` pixels
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height: `${h}px`,
        overflow: 'hidden',
        backgroundImage: 'url(/assets/indian-city-skyline.png)',
        backgroundRepeat: 'repeat-x',
        // Scale so the full image height maps to ~6x the display height
        // → only the very top row (first band of domes) is visible
        backgroundSize: `auto ${h * 6}px`,
        backgroundPosition: 'top left',
      }}
    />
  )
}

// ─── Food Label Card ──────────────────────────────────────────────────────────
// Uses actual vintage Indian food label photos from generated images
function FoodCard({ src, alt, shape }) {
  const isOval = shape === 'oval'
  return (
    <div style={{
      position: 'relative',
      flexShrink: 0,
      width: isOval ? '210px' : '185px',
      height: isOval ? '290px' : '285px',
      borderRadius: isOval ? '50%' : '4px',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          display: 'block',
        }}
      />
    </div>
  )
}

// ─── Menu CTA Button (Figma: 207×43, #A94545, white inset border) ─────────────
function MenuBtn({ label, to }) {
  return (
    <Link
      to={to}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '207px',
        height: '43px',
        backgroundColor: '#A94545',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {/* Inset white border — Figma Rectangle 269 */}
      <div style={{
        position: 'absolute',
        top: '5.5px',
        left: '9px',
        right: '9px',
        bottom: '5.5px',
        border: '1.11px solid rgba(255,255,255,0.85)',
        pointerEvents: 'none',
      }} />
      <span style={{
        fontFamily: 'Bebas Neue, cursive',
        fontSize: '17.76px',
        letterSpacing: '0.05em',
        color: '#FFFEFE',
        textShadow: '0px 1.937px 1.937px rgba(0,0,0,0.25)',
        position: 'relative',
        zIndex: 1,
      }}>
        {label}
      </span>
    </Link>
  )
}

// ─── Section 1: Teal (Figma: bg #14534D, h 754px) ────────────────────────────
function TealSection({ mob }) {
  // 4 cards: Samosa (oval), Kachori (rect), Chai (oval), Vada Pav (rect)
  const cards = [
    { src: '/assets/label-samosa.png',  alt: 'Samosa',    shape: 'oval' },
    { src: '/assets/label-kachori.png', alt: 'Kachori',   shape: 'rect' },
    { src: '/assets/label-chai.png',    alt: 'Chai',      shape: 'oval' },
    { src: '/assets/label-vadapav.png', alt: 'Vada Pav',  shape: 'rect' },
  ]

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      backgroundColor: '#14534D',
      overflow: 'hidden',
    }}>
      {/* ── Subtle dot-pattern texture ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Cards row — Figma: 4 illustrated food stickers */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: mob ? '12px' : 'clamp(20px, 3.2vw, 52px)',
          padding: mob ? '40px 16px 28px' : '68px 60px 48px',
          flexWrap: mob ? 'wrap' : 'nowrap',
        }}>
          {cards.map((c, i) => (
            <FoodCard key={i} src={c.src} alt={c.alt} shape={mob ? 'rect' : c.shape} />
          ))}
        </div>

        {/* Quote — Figma: 823px, 40px Bernier, white, centered */}
        <div style={{
          maxWidth: '823px',
          margin: '0 auto',
          padding: mob ? '0 24px 44px' : '0 32px 60px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: mob ? '22px' : 'clamp(26px, 2.65vw, 40px)',
            lineHeight: '1.05',
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '0.01em',
          }}>
            FROM THE HEART OF DELHI TO THE SHORES OF MUMBAI,{' '}
            WE'VE MAPPED THE BOLDEST FLAVORS OF THE HIGHWAY{' '}
            ONTO EVERY PLATE, READY FOR YOU TO EXPLORE.
          </p>
        </div>
      </div>

      {/* ── Scallop border — Figma: cream arcs at teal→cream boundary ── */}
      <ScallopDivider />
    </section>
  )
}

// ─── Section 2: Cream menu CTA (Figma: bg #FCF9EB) ───────────────────────────
function CreamSection({ mob }) {
  return (
    <section style={{
      width: '100%',
      backgroundColor: '#FCF9EB',
      overflow: 'hidden',
    }}>
      {/* Content wrapper — centered, matches Figma max-width */}
      <div style={{
        maxWidth: '760px',
        margin: '0 auto',
        padding: mob ? '36px 20px 40px' : '60px 24px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: mob ? '20px' : '32px',
      }}>

        {/* ── Two square food images — Figma: 342×342px each ── */}
        <div style={{
          display: 'flex',
          gap: mob ? '10px' : '18px',
          justifyContent: 'center',
          width: '100%',
        }}>
          {[
            { src: '/assets/dishes/butter-chicken.png', alt: 'Food menu — butter chicken' },
            { src: '/assets/menu-drinks.png',            alt: 'Drinks menu — cocktails' },
          ].map(({ src, alt }, i) => (
            <div key={i} style={{
              position: 'relative',
              width: mob ? '46%' : '342px',
              aspectRatio: '1 / 1',
              flexShrink: 0,
            }}>
              {/* Image */}
              <img
                src={src}
                alt={alt}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                }}
              />
              {/* Inset border frame — Figma: Rectangle 346/347 (border box inset ~10px) */}
              <div style={{
                position: 'absolute',
                top: '10px', left: '10px',
                right: '10px', bottom: '10px',
                border: mob ? '1.5px solid rgba(20,83,77,0.5)' : '2px solid rgba(20,83,77,0.45)',
                pointerEvents: 'none',
              }} />
            </div>
          ))}
        </div>

        {/* ── Two menu buttons — Figma: 207×43, #A94545, white border ── */}
        <div style={{
          display: 'flex',
          gap: mob ? '10px' : '18px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <MenuBtn label="FOOD MENU"   to="/menu/food"   />
          <MenuBtn label="DRINKS MENU" to="/menu/drinks" />
        </div>
      </div>

      {/* ── Indian City Skyline border — Figma: city silhouette at bottom ── */}
      <CitySkylineBorder mob={mob} />
    </section>
  )
}

// ─── Site Footer (exact same as HomePage) ────────────────────────────────────
function SiteFooter({ mob, tab }) {
  return (
    <footer style={{
      position: 'relative', width: '100%',
      backgroundColor: '#A94545',
      minHeight: mob ? 'auto' : tab ? '420px' : '563px',
      overflow: 'hidden',
    }}>
      {/* Lotus decoration */}
      {!mob && (
        <div aria-hidden="true" style={{
          position: 'absolute',
          left: '79.89%', top: tab ? '140px' : '282px',
          height: tab ? '200px' : '272px',
          zIndex: 0, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 72 57" style={{ height: '100%', width: 'auto', display: 'block' }}>
            <path d={LotusPath} fill="#742D2D" />
          </svg>
        </div>
      )}

      {!mob ? (
        <div style={{ position: 'relative', zIndex: 1, minHeight: tab ? '420px' : '563px', width: '100%' }}>
          <div style={{ position: 'absolute', left: tab ? '30px' : '45px', top: '10px' }}>
            <h2 style={{ fontFamily: 'Bebas Neue, cursive', fontWeight: 400, fontSize: tab ? '80px' : '124px', lineHeight: '143px', color: '#FFFFFF', margin: 0, textShadow: '0px 8.52px 8.52px rgba(0,0,0,0.25)' }}>NH48</h2>
          </div>
          <div style={{ position: 'absolute', left: tab ? '30px' : '45px', top: tab ? '130px' : '173px', width: tab ? '260px' : '350px' }}>
            <p style={{ ...ftLabel, marginBottom: '16px' }}>LOCATION &amp; CONTACT</p>
            <p style={ftBody}>LOCATION — 4824 MACARTHUR BLVD NW LL,<br />WASHINGTON D.C. 20007</p>
            <p style={{ ...ftLabel, marginTop: tab ? '24px' : '45px', marginBottom: '16px' }}>HOURS</p>
            <p style={ftBody}>SUNDAY – WEDNESDAY: 5:00 PM – 10:30 PM<br />(LAST SEATING 9:30 PM)<br />THURSDAY – SATURDAY: 5:00 PM – 11:00 PM<br />(LAST SEATING 10:00 PM)<br />MONDAY: CLOSED</p>
          </div>
          <div style={{ position: 'absolute', left: tab ? '46%' : '50.07%', top: tab ? '130px' : '173px', width: tab ? '220px' : '371px' }}>
            <p style={ftBody}>HAVE A QUESTION OR A SPECIAL REQUEST? EMAIL US AT <a href="mailto:prady.rana@outlook.com" style={{ color: '#FFD5D5', textDecoration: 'underline', textUnderlineOffset: '3px', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>PRADY.RANA@OUTLOOK.COM</a>. DUE TO HIGH DEMAND, OUR TEAM WILL PROVIDE A RESPONSE WITHIN 48 BUSINESS HOURS (MON–SAT).</p>
            <p style={{ ...ftBody, marginTop: tab ? '20px' : '40px' }}>TO PROVIDE THE BEST EXPERIENCE FOR LARGE PARTIES (8+), WE KINDLY ASK FOR BOOKINGS TO BE MADE 40–45 DAYS IN ADVANCE.</p>
            <p style={{ ...ftBody, marginTop: tab ? '20px' : '32px' }}>HAVE A QUESTION OR A SPECIAL REQUEST? EMAIL US AT <a href="mailto:prady.rana@outlook.com" style={{ color: '#FFD5D5', textDecoration: 'underline', textUnderlineOffset: '3px', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit' }}>PRADY.RANA@OUTLOOK.COM</a>. DUE TO HIGH DEMAND, OUR TEAM WILL PROVIDE A RESPONSE WITHIN 48 BUSINESS HOURS (MON–SAT).</p>
          </div>
          <div style={{ position: 'absolute', left: tab ? 'auto' : '88.1%', right: tab ? '30px' : 'auto', top: tab ? '130px' : '173px' }}>
            <p style={{ ...ftLabel, marginBottom: '20px' }}>FOLLOW US</p>
            <div style={{ display: 'flex', gap: tab ? '12px' : '17px', alignItems: 'center' }}>
              {[
                { label: 'Instagram', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" stroke="none"/></svg> },
                { label: 'Facebook', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label: 'TikTok', icon: <svg width="31" height="31" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg> },
              ].map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label} style={{ color: '#FFFFFF', display: 'flex', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '36px 24px 44px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '80px', lineHeight: 1, color: '#FFFFFF', margin: 0, textShadow: '0px 6px 6px rgba(0,0,0,0.25)' }}>NH48</h2>
          <div><p style={{ ...ftLabel, marginBottom: '10px' }}>LOCATION &amp; CONTACT</p><p style={ftBody}>LOCATION — 4824 MACARTHUR BLVD NW LL, WASHINGTON D.C. 20007</p></div>
          <div><p style={{ ...ftLabel, marginBottom: '10px' }}>HOURS</p><p style={ftBody}>SUNDAY – WEDNESDAY: 5:00 PM – 10:30 PM (LAST SEATING 9:30 PM)<br />THURSDAY – SATURDAY: 5:00 PM – 11:00 PM (LAST SEATING 10:00 PM)<br />MONDAY: CLOSED</p></div>
          <p style={ftBody}>HAVE A QUESTION? EMAIL <a href="mailto:prady.rana@outlook.com" style={{ color: '#FFD5D5', textDecoration: 'underline' }}>PRADY.RANA@OUTLOOK.COM</a>. RESPONSE WITHIN 48 BUSINESS HOURS (MON–SAT).</p>
          <div><p style={{ ...ftLabel, marginBottom: '10px' }}>FOLLOW US</p>
            <div style={{ display: 'flex', gap: '14px' }}>
              {[
                <svg key="ig" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>,
                <svg key="fb" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                <svg key="tt" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>,
              ].map((icon, i) => <a key={i} href="#" style={{ color: '#FFFFFF', display: 'flex' }}>{icon}</a>)}
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MenuLandingPage() {
  const width = useWindowWidth()
  const mob = width < 640
  const tab = width < 900 && width >= 640

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ── HERO — Figma: top:72, height:708px, full-bleed food image ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: mob ? '55vw' : '708px',
        minHeight: mob ? '220px' : '480px',
        overflow: 'hidden',
      }}>
        <img
          src="/assets/menu-hero.png"
          alt="NH48 signature dishes"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%',
            display: 'block',
          }}
        />
        {/* Bottom gradient into teal */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, rgba(20,83,77,0.5) 100%)',
          pointerEvents: 'none',
        }} />
      </section>

      {/* ── SECTION 1: Teal — Figma: bg:#14534D, h:754px ── */}
      <TealSection mob={mob} />

      {/* ── SECTION 2: Cream — Figma: bg:#FCF9EB, food images + menu buttons ── */}
      <CreamSection mob={mob} />

      {/* ── FOOTER — identical to homepage ── */}
      <SiteFooter mob={mob} tab={tab} />
    </div>
  )
}
