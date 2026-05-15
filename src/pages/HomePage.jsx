import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWindowWidth } from '../hooks/useWindowWidth'
gsap.registerPlugin(ScrollTrigger)

const HERO_IMAGE = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&q=80'

const CARD_IMAGES = {
  food1:  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
  delhi:  'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80',
  food2:  'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
  mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80',
}

const FOOD_PHOTOS = [
  'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=800&q=80',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
  'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80',
]

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CityCardsSection />
      <FoodShowcaseSection />
      <StorySection />
      <Sayings />
      <Plates />
      <Journey />
      <Jaipur /> 
      <Delhi />
      <Mumbai />
    </div>
  )
}

function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      minHeight: '500px',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <img
        src={HERO_IMAGE}
        alt="NH48 hero"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.42)',
      }} />

      {/* Centered text */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Yellow rectangle behind heading */}
          <div style={{
            backgroundColor: 'rgba(245,196,44,0.18)',
            padding: '8px 24px 4px',
            marginBottom: '12px',
            display: 'inline-block',
          }}>
            <h1 style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 'clamp(48px, 8vw, 96px)',
              color: '#F5C42C',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}>
              WELCOME TO NH48
            </h1>
          </div>

          <p style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(13px, 1.8vw, 18px)',
            color: 'white',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}>
            FROM CAPITAL TO COAST
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function CityCardsSection() {
  const sectionRef = useRef(null)
  const width = useWindowWidth()

  useGSAP(() => {
    const tl = {
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
    gsap.to(sectionRef.current.querySelectorAll('.drift-left'),  { x: -50, ease: 'none', scrollTrigger: tl })
    gsap.to(sectionRef.current.querySelectorAll('.drift-right'), { x:  50, ease: 'none', scrollTrigger: tl })
  }, { scope: sectionRef })

  const cardW = 'clamp(180px, 20vw, 260px)'
  const mob = width < 768

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#1B5C4F',
        paddingTop: '80px',
        paddingBottom: '160px',
        overflow: 'hidden',
      }}
    >
      {/* Cards row — scrollable on mobile */}
      <div style={{
        display: 'flex',
        justifyContent: mob ? 'flex-start' : 'space-evenly',
        alignItems: 'flex-end',
        width: '100%',
        padding: mob ? '0 24px' : '0 40px',
        minHeight: mob ? 'auto' : '320px',
        overflowX: mob ? 'auto' : 'visible',
        gap: mob ? '20px' : '0',
        paddingBottom: mob ? '24px' : '0',
        scrollSnapType: mob ? 'x mandatory' : 'none',
      }}>

        {/* Card 1 — Oval food */}
        <div className="drift-left"
             style={{ width: mob ? 'clamp(150px, 55vw, 200px)' : cardW, marginBottom: 0, flexShrink: 0, scrollSnapAlign: mob ? 'start' : 'none' }}>
          <div style={{
            width: '100%', aspectRatio: '1/1',
            borderRadius: '50%', overflow: 'hidden', border: '3px solid #D4B84A',
          }}>
            <img src={CARD_IMAGES.food1} alt="Delhi food"
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Card 2 — Arch Delhi */}
        <div className="drift-right"
             style={{ width: mob ? 'clamp(150px, 55vw, 200px)' : cardW, flexShrink: 0, position: 'relative', marginBottom: mob ? '0' : '60px', scrollSnapAlign: mob ? 'start' : 'none' }}>
          <div style={{
            width: '100%', aspectRatio: '3/4', overflow: 'hidden',
            border: '3px solid #D4B84A',
            clipPath: 'polygon(0% 100%, 0% 35%, 50% 0%, 100% 35%, 100% 100%)',
            position: 'relative',
          }}>
            <img src={CARD_IMAGES.delhi} alt="Delhi"
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 30%, transparent)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              paddingBottom: '20px',
            }}>
              <p style={{ fontFamily: 'Bebas Neue, cursive', color: '#F5C42C', fontSize: 'clamp(14px, 1.4vw, 18px)', letterSpacing: '0.1em' }}>DELHI / NH48</p>
            </div>
          </div>
        </div>

        {/* Card 3 — Oval food */}
        <div className="drift-left"
             style={{ width: mob ? 'clamp(150px, 55vw, 200px)' : cardW, flexShrink: 0, scrollSnapAlign: mob ? 'start' : 'none' }}>
          <div style={{
            width: '100%', aspectRatio: '1/1',
            borderRadius: '50%', overflow: 'hidden', border: '3px solid #D4B84A',
          }}>
            <img src={CARD_IMAGES.food2} alt="Mumbai food"
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Card 4 — Arch Mumbai */}
        <div className="drift-right"
             style={{ width: mob ? 'clamp(150px, 55vw, 200px)' : cardW, flexShrink: 0, position: 'relative', marginBottom: mob ? '0' : '60px', scrollSnapAlign: mob ? 'start' : 'none' }}>
          <div style={{
            width: '100%', aspectRatio: '3/4', overflow: 'hidden',
            border: '3px solid #D4B84A',
            clipPath: 'polygon(0% 100%, 0% 35%, 50% 0%, 100% 35%, 100% 100%)',
            position: 'relative',
          }}>
            <img src={CARD_IMAGES.mumbai} alt="Mumbai"
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 30%, transparent)',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              paddingBottom: '20px',
            }}>
              <p style={{ fontFamily: 'Bebas Neue, cursive', color: '#F5C42C', fontSize: 'clamp(14px, 1.4vw, 18px)', letterSpacing: '0.1em' }}>MUMBAI / NH48</p>
            </div>
          </div>
        </div>

      </div>

      {/* Tagline */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '48px', padding: '0 32px' }}>
        <p style={{
          fontFamily: 'Bebas Neue, cursive',
          color: 'white',
          fontSize: mob ? '22px' : 'clamp(20px, 2.8vw, 36px)',
          textAlign: 'center',
          letterSpacing: '0.04em',
          lineHeight: 1.3,
          maxWidth: '700px',
        }}>
          FOURTEEN HUNDRED KILOMETERS OF FLAVOR,
          DISTILLED INTO A SINGLE SEAT AT OUR TABLE.
        </p>
      </div>

      {/* Scallop — absolute at bottom, never overlaps text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1200 64" preserveAspectRatio="none"
             style={{ width: '100%', height: '64px', display: 'block' }}>
          <path
            d="M0,0 C50,64 100,64 150,0 C200,64 250,64 300,0 C350,64 400,64 450,0
               C500,64 550,64 600,0 C650,64 700,64 750,0 C800,64 850,64 900,0
               C950,64 1000,64 1050,0 C1100,64 1150,64 1200,0 L1200,64 L0,64 Z"
            fill="#F5EFE0"
          />
        </svg>
      </div>
    </section>
  )
}

function FoodShowcaseSection() {
  const width = useWindowWidth()
  const mob = width < 768

  const btnStyle = {
    display: 'inline-block',
    padding: '12px 40px',
    border: '2px solid #1B5C4F',
    color: '#1B5C4F',
    fontFamily: 'Barlow Condensed, sans-serif',
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'background-color 0.2s, color 0.2s',
    width: mob ? '100%' : 'auto',
    maxWidth: '320px',
    textAlign: 'center',
  }

  return (
    <section style={{
      width: '100%',
      backgroundColor: '#F5EFE0',
      padding: mob ? '48px 24px' : '80px 48px',
    }}>
      {/* 3 photos grid — single column on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
        gap: mob ? '12px' : '16px',
        width: '100%',
        marginBottom: '48px',
      }}>
        {FOOD_PHOTOS.map((src, i) => (
          <div key={i} style={{
            aspectRatio: '4/3',
            overflow: 'hidden',
            border: '2px solid #D4B84A',
            borderRadius: '6px',
          }}>
            <img src={src} alt="NH48 dish"
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Buttons — stacked on mobile, row on desktop */}
      <div style={{
        display: 'flex',
        flexDirection: mob ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}>
        <a href="/menu/food" style={btnStyle}
           onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1B5C4F'; e.currentTarget.style.color = 'white' }}
           onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1B5C4F' }}
        >VIEW FULL MENU</a>

        <a href="#" style={btnStyle}
           onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1B5C4F'; e.currentTarget.style.color = 'white' }}
           onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1B5C4F' }}
        >ORDER ONLINE</a>
      </div>
    </section>
  )
}



// Replace these with your actual image imports
// import delhiSign    from './assets/story/delhi-sign.png'
// import delhiGate   from './assets/story/delhi-gate.png'
// import delhiFood   from './assets/story/delhi-food.png'
// import delhiMomos  from './assets/story/delhi-momos.png'
// import mumbaiSign  from './assets/story/mumbai-sign.png'
// import mumbaiTaxi  from './assets/story/mumbai-taxi.png'
// import mumbaiBus   from './assets/story/mumbai-bus.png'
// import mumbaiFood  from './assets/story/mumbai-food.png'

// Replace with your actual imports
const STORY_IMAGES = {
  // Delhi (5)
  delhiSign:     '/assets/story/delhi.png',
  delhiTomb:     '/assets/story/tomb.png',
  delhiPoori:    '/assets/story/poori.png',
  delhiMomos:    '/assets/story/momos.png',
  indiaGate:     '/assets/story/igate.png',
  // Mumbai (7)
  vadaPav:       '/assets/story/pav.png',
  mumbaiBus:     '/assets/story/bus.png',
  mumbaiTaxi:    '/assets/story/taxi.png',
  tajHotel:      '/assets/story/taj.png',
  vadaPavHand:   '/assets/story/pavhand.png',
  mumbaiSign:    '/assets/story/mumbai.png',
  gatewayIndia:  '/assets/story/gateoi.png',
}

function StarBurst({ size = 120, stroke = '#8B3A3A', strokeWidth = 2 }) {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI) / 8 - Math.PI / 2
    const r = i % 2 === 0 ? size / 2 : size / 4
    return `${size / 2 + r * Math.cos(angle)},${size / 2 + r * Math.sin(angle)}`
  }).join(' ')
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <polygon points={pts} fill="transparent" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  )
}

// Reusable: plain image tile (monuments, signs, etc.)
function Tile({ src, alt, style }) {
  return (
    <div style={{ position: 'absolute', ...style }}>
      <img src={src} alt={alt}
           style={{ width: '100%', height: 'auto', display: 'block',
                    filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.4))' }} />
    </div>
  )
}

// Reusable: circular food image
function CircleImg({ src, alt, style }) {
  return (
    <div style={{ position: 'absolute', ...style }}>
      <div style={{ borderRadius: '50%', overflow: 'hidden',
                    border: '3px solid #D4B84A', aspectRatio: '1/1' }}>
        <img src={src} alt={alt}
             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}

function StorySection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const tl = {
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
    gsap.to(sectionRef.current.querySelectorAll('.story-drift-up'),   { y: -40, ease: 'none', scrollTrigger: tl })
    gsap.to(sectionRef.current.querySelectorAll('.story-drift-down'), { y:  40, ease: 'none', scrollTrigger: tl })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#C9A84C',
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
        `,
        backgroundSize: '28px 28px',
        paddingTop: '60px',
        paddingBottom: '80px',
        overflow: 'hidden',
        minHeight: '600px',
      }}
    >
      {/* OUR STORY heading */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <h2 style={{
          fontFamily: 'Bebas Neue, cursive',
          color: '#1B5C4F',
          fontSize: 'clamp(32px, 5vw, 64px)',
          letterSpacing: '0.08em',
          margin: 0,
        }}>
          OUR STORY
        </h2>
      </div>

      {/* Three-column layout */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0 2vw',
      }}>

        {/* ── DELHI COLLAGE (left) ── */}
        <div className="story-drift-up" style={{
          position: 'relative',
          width: 'clamp(180px, 24vw, 320px)',
          height: 'clamp(380px, 52vw, 600px)',
          flexShrink: 0,
          marginRight: '-48px',
          zIndex: 2,
        }}>
          {/* India Gate — top right, large, slight tilt */}
          <Tile src={STORY_IMAGES.indiaGate} alt="India Gate"
                style={{ top: '0%', right: '-5%', width: '58%', transform: 'rotate(5deg)', zIndex: 2 }} />

          {/* Delhi sign — top left, overlapping gate, rotated */}
          <Tile src={STORY_IMAGES.delhiSign} alt="New Delhi sign"
                style={{ top: '4%', left: '0%', width: '68%', transform: 'rotate(-10deg)', zIndex: 3 }} />

          {/* Humayun's Tomb — mid, behind sign */}
          <Tile src={STORY_IMAGES.delhiTomb} alt="Delhi monument"
                style={{ top: '30%', left: '5%', width: '72%', transform: 'rotate(3deg)', zIndex: 2 }} />

          {/* Poori — circular, mid-left */}
          <CircleImg src={STORY_IMAGES.delhiPoori} alt="Delhi poori"
                     style={{ top: '28%', left: '-8%', width: '48%', zIndex: 4 }} />

          {/* Momos — circular, bottom */}
          <CircleImg src={STORY_IMAGES.delhiMomos} alt="Delhi momos"
                     style={{ bottom: '4%', left: '8%', width: '50%', transform: 'rotate(4deg)', zIndex: 3 }} />
        </div>

        {/* ── TEAL CARD ── */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: '#1B5C4F',
          width: 'clamp(320px, 48vw, 700px)',
          padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 64px)',
          flexShrink: 0,
        }}>
          {/* Accent square — top right */}
          <div style={{
            position: 'absolute', top: '-8px', right: '-8px',
            width: 'clamp(48px, 5vw, 72px)', height: 'clamp(48px, 5vw, 72px)',
            backgroundColor: '#8B3A3A', zIndex: 0,
          }} />

          {/* Dashed divider */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: '50%',
            borderTop: '2px dashed rgba(100,180,200,0.45)',
            pointerEvents: 'none', zIndex: 2,
          }} />

          <p style={{
            fontFamily: 'Bebas Neue, cursive',
            color: '#F5EFE0',
            fontSize: 'clamp(13px, 1.6vw, 21px)',
            letterSpacing: '0.06em',
            lineHeight: 1.55,
            textAlign: 'center',
            margin: '0 0 clamp(32px, 4vw, 56px) 0',
            position: 'relative', zIndex: 3,
          }}>
            TRACING THE SPINE OF NH48, TWO FRIENDS NAVIGATE THE
            DISTANCE FROM THE CAPITAL'S HEAT TO THE COAST'S HEART.
            THEIR JOURNEY RECLAIMS THE HONEST, UNEDITED RECIPES THAT
            LIVE IN THE DUST AND LIGHT OF THE OPEN ROADS OF NH48.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 3 }}>
            <button
              style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: 'clamp(14px, 1.4vw, 18px)',
                letterSpacing: '0.12em',
                color: '#F5EFE0',
                backgroundColor: '#8B3A3A',
                border: '2px solid #8B3A3A',
                padding: '12px 40px',
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#8B3A3A' }}
            >
              VIEW STORY
            </button>
          </div>
        </div>

        {/* ── MUMBAI COLLAGE (right) ── */}
        <div className="story-drift-down" style={{
          position: 'relative',
          width: 'clamp(180px, 24vw, 320px)',
          height: 'clamp(380px, 52vw, 600px)',
          flexShrink: 0,
          marginLeft: '-48px',
          zIndex: 2,
        }}>
          {/* Mumbai sign — top right, rotated */}
          <Tile src={STORY_IMAGES.mumbaiSign} alt="Mumbai sign"
                style={{ top: '0%', right: '0%', width: '55%', transform: 'rotate(12deg)', zIndex: 3 }} />

          {/* Gateway of India — top left */}
          <Tile src={STORY_IMAGES.gatewayIndia} alt="Gateway of India"
                style={{ top: '2%', left: '5%', width: '52%', transform: 'rotate(-5deg)', zIndex: 2 }} />

          {/* Taj Hotel — mid, behind taxi */}
          <Tile src={STORY_IMAGES.tajHotel} alt="Taj Hotel"
                style={{ top: '28%', left: '0%', width: '65%', transform: 'rotate(3deg)', zIndex: 2 }} />

          {/* Taxi — mid-right, overlapping */}
          <Tile src={STORY_IMAGES.mumbaiTaxi} alt="Mumbai taxi"
                style={{ top: '34%', right: '-5%', width: '62%', transform: 'rotate(-4deg)', zIndex: 3 }} />

          {/* Bus — lower mid */}
          <Tile src={STORY_IMAGES.mumbaiBus} alt="Mumbai bus"
                style={{ top: '52%', left: '5%', width: '60%', transform: 'rotate(2deg)', zIndex: 4 }} />

          {/* Vada pav in hand — circular, mid-left */}
          <CircleImg src={STORY_IMAGES.vadaPavHand} alt="Vada pav in hand"
                     style={{ top: '38%', left: '-8%', width: '46%', zIndex: 5 }} />

          {/* Vada pav plate — circular, bottom */}
          <CircleImg src={STORY_IMAGES.vadaPav} alt="Vada pav"
                     style={{ bottom: '2%', left: '5%', width: '50%', transform: 'rotate(-3deg)', zIndex: 4 }} />
        </div>

      </div>

      {/* Starburst — bottom left */}
      <div style={{
        position: 'absolute', bottom: '6%', left: '3%',
        opacity: 0.85, pointerEvents: 'none',
      }}>
        <StarBurst size={110} stroke="#8B3A3A" strokeWidth={2} />
      </div>

    </section>
  )
}

function Sayings() {
  const [active, setActive] = useState(0)

  const slides = [
    {
      quote: "NH48 CAPTURES THE SPIRIT OF THE OPEN ROAD, BLENDING VINTAGE-INSPIRED HIGHWAY DECOR WITH A SPRAWLING MENU THAT MASTERFULLY FUSES REGIONAL INDIAN SPECIALTIES AND GLOBAL FLAVORS INTO A HIGH-SPIRITED CULINARY JOURNEY.",
      image: 'public/assets/sayings/nh48-chronicle.png',
    },
    {
      quote: "A FEAST FOR THE SENSES — THE FLAVORS TRANSPORT YOU FROM THE STREETS OF DELHI TO THE SHORES OF MUMBAI IN A SINGLE MEAL.",
      image: '/public/assets/sayings/nh48-chronicle.png',
    },
    {
      quote: "THE AMBIANCE IS UNMATCHED. EVERY CORNER TELLS A STORY OF THE ROAD, AND EVERY DISH DELIVERS ON THAT PROMISE.",
      image: '/public/assets/sayings/nh48-chronicle.png',
    },
    {
      quote: "BOLD, HONEST, UNFORGETTABLE. NH48 IS NOT JUST A RESTAURANT — IT IS A JOURNEY YOU KEEP COMING BACK TO.",
      image: '/public/assets/sayings/nh48-chronicle.png',
    },
  ]

  return (
    <section style={{
      width: '100%',
      backgroundColor: '#F5EFE0',
      borderTop: '3px solid #D4B84A',
      paddingTop: '52px',
      paddingBottom: '64px',
    }}>

      {/* Heading */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '36px' }}>
        <h2 style={{
          fontFamily: 'Bebas Neue, cursive',
          color: '#1B5C4F',
          fontSize: 'clamp(28px, 4.5vw, 58px)',
          letterSpacing: '0.06em',
          margin: 0,
        }}>
          WHAT THEY SAY ABOUT US
        </h2>
      </div>

      {/* Slide card */}
      <div style={{
        display: 'flex',
        margin: '0 auto',
        width: 'clamp(320px, 72vw, 920px)',
        height: 'clamp(200px, 24vw, 300px)',
        overflow: 'hidden',
      }}>
        {/* Left: newspaper image */}
        <div style={{
          width: '50%',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src={slides[active].image}
            alt="NH48 Chronicle"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              transition: 'opacity 0.4s ease',
            }}
          />
        </div>

        {/* Right: teal quote panel */}
        <div style={{
          width: '50%',
          flexShrink: 0,
          backgroundColor: '#4A8C82',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(20px, 3vw, 40px)',
        }}>
          <p style={{
            fontFamily: 'Bebas Neue, cursive',
            color: '#F5EFE0',
            fontSize: 'clamp(11px, 1.1vw, 15px)',
            letterSpacing: '0.07em',
            lineHeight: 1.65,
            textAlign: 'center',
            margin: 0,
            transition: 'opacity 0.4s ease',
          }}>
            {slides[active].quote}
          </p>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '24px',
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              backgroundColor: i === active ? '#1B5C4F' : '#A0B8B4',
              transition: 'background-color 0.2s',
            }}
          />
        ))}
      </div>

    </section>
  )
}

function Plates() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const tl = {
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    }
    gsap.to(sectionRef.current.querySelectorAll('.plate-drift-up'),   { y: -30, ease: 'none', scrollTrigger: tl })
    gsap.to(sectionRef.current.querySelectorAll('.plate-drift-down'), { y:  30, ease: 'none', scrollTrigger: tl })
  }, { scope: sectionRef })

  const plates = [
    { name: 'BUTTER CHICKEN',   file: 'butter-chicken',   labelPos: 'bottom', drift: 'down', marginTop: '180px' },
    { name: 'SARSO KA SAAG',    file: 'sarso-ka-saag',    labelPos: 'top',    drift: 'up',   marginTop: '100px'  },
    { name: 'DAL BHATI CHURMA', file: 'dal-bhati-churma', labelPos: 'bottom', drift: 'down', marginTop: '280px' },
    { name: 'DHOKLA',           file: 'dhokla',            labelPos: 'bottom', drift: 'up',   marginTop: '140px'  },
    { name: 'PAV BHAJI',        file: 'pav-bhaji',         labelPos: 'top',    drift: 'up',   marginTop: '100px'  },
    { name: 'RAGI PODDI',       file: 'ragi-poddi',        labelPos: 'bottom', drift: 'down', marginTop: '300px' },
    { name: 'DOSA',             file: 'dosa',              labelPos: 'top',    drift: 'up',   marginTop: '100px'  },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#1B5C4F',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        paddingTop: '64px',
        paddingBottom: '120px',
        overflow: 'hidden',
      }}
    >
      {/* Heading */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '48px',
        width: '100%',
      }}>
        <svg width="72" height="57" viewBox="0 0 72 57" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M46.1462 21.1309C46.1462 21.1309 49.2654 9.97958 36.0086 0C22.7603 9.97958 25.871 21.1309 25.871 21.1309C12.6227 11.7412 0 22.3026 0 22.3026C0 22.3026 13.2483 19.3693 17.0359 29.3489C20.8236 39.3285 33.4378 43.4335 33.4378 43.4335L33.3006 54.4413V54.6326C33.2921 55.9399 34.4318 57 35.8372 57H35.8886C37.2854 57 38.4166 55.9478 38.4251 54.6486V54.6087L38.5622 43.4255C38.5622 43.4255 51.185 39.3205 54.9641 29.3409C58.7517 19.3613 72 22.2946 72 22.2946C72 22.2946 59.3944 11.7412 46.1462 21.1309Z" fill="#A94545"/>
        </svg>
        <h2 style={{
          fontFamily: 'Bebas Neue, cursive',
          color: '#F5EFE0',
          fontSize: 'clamp(28px, 4vw, 52px)',
          letterSpacing: '0.08em',
          margin: 0,
          textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
        }}>
          PLATES OF THE NH48
        </h2>
        <svg width="72" height="57" viewBox="0 0 72 57" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
          <path d="M46.1462 21.1309C46.1462 21.1309 49.2654 9.97958 36.0086 0C22.7603 9.97958 25.871 21.1309 25.871 21.1309C12.6227 11.7412 0 22.3026 0 22.3026C0 22.3026 13.2483 19.3693 17.0359 29.3489C20.8236 39.3285 33.4378 43.4335 33.4378 43.4335L33.3006 54.4413V54.6326C33.2921 55.9399 34.4318 57 35.8372 57H35.8886C37.2854 57 38.4166 55.9478 38.4251 54.6486V54.6087L38.5622 43.4255C38.5622 43.4255 51.185 39.3205 54.9641 29.3409C58.7517 19.3613 72 22.2946 72 22.2946C72 22.2946 59.3944 11.7412 46.1462 21.1309Z" fill="#A94545"/>
        </svg>
      </div>

      {/* Cards row */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 'clamp(12px, 2vw, 28px)',
        padding: '0 clamp(16px, 4vw, 60px)',
        width: '100%',
      }}>
        {plates.map((plate) => (
          <div
            key={plate.file}
            className={plate.drift === 'up' ? 'plate-drift-up' : 'plate-drift-down'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',   // ← align to left so label tab can hang out
              marginTop: plate.marginTop,
              flexShrink: 0,
              width: 'clamp(110px, 12vw, 175px)',
              position: 'relative',
            }}
          >
            {/* Label top — overhangs left */}
            {plate.labelPos === 'top' && (
              <div style={{
                backgroundColor: '#8B3A3A',
                padding: '5px 10px',
                // Overhang: pull it left of the card
                marginLeft: '-18px',
                marginBottom: '0px',
              }}>
                <span style={{
                  fontFamily: 'Bebas Neue, cursive',
                  color: '#F5EFE0',
                  fontSize: 'clamp(9px, 0.9vw, 13px)',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}>
                  {plate.name}
                </span>
              </div>
            )}

            {/* Image */}
            <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img
                src={`/assets/dishes/${plate.file}.png`}
                alt={plate.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Label bottom — overhangs left */}
            {plate.labelPos === 'bottom' && (
              <div style={{
                backgroundColor: '#8B3A3A',
                padding: '5px 10px',
                marginLeft: '-18px',
                marginTop: '0px',
              }}>
                <span style={{
                  fontFamily: 'Bebas Neue, cursive',
                  color: '#F5EFE0',
                  fontSize: 'clamp(9px, 0.9vw, 13px)',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}>
                  {plate.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Skyline — full width, bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        lineHeight: 0,
        pointerEvents: 'none',
      }}>
        <svg
          viewBox="0 0 1512 72"
          preserveAspectRatio="xMidYMax slice"   // ← "slice" stretches to fill full width
          style={{ width: '100%', height: '72px', display: 'block' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ...keep exact same SVG path content as original... */}
        </svg>
      </div>
    </section>
  )
}



function Journey  () {
  // Path to your uploaded image
  const imageUrl = "public/assets/journey/main.png"; 

  return (
    <section style={{
      width: '100%',
      backgroundColor: '#F5F2E6', // Matches the cream background in your image
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 0', // Vertical breathing room
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px', // Standard container width
        padding: '0 20px',
      }}>
        <img 
          src={imageUrl} 
          alt="A Journey Through City Signatures - Delhi, Jaipur, Mumbai" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            // Optional: adds a very subtle shadow to match the editorial feel
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
          }}
        />
      </div>
    </section>
  );
};

// Reusing the Lotus icon from your previous section for consistency
const LotusIcon = ({ color, size = 40 }) => (
  <svg width={size} height={(size/72)*57} viewBox="0 0 72 57" style={{ display: 'inline-block' }}>
    <path 
      d="M46.1462 21.1309C46.1462 21.1309 49.2654 9.97958 36.0086 0C22.7603 9.97958 25.871 21.1309 25.871 21.1309C12.6227 11.7412 0 22.3026 0 22.3026C0 22.3026 13.2483 19.3693 17.0359 29.3489C20.8236 39.3285 33.4378 43.4335 33.4378 43.4335L33.3006 54.4413V54.6326C33.2921 55.9399 34.4318 57 35.8372 57H35.8886C37.2854 57 38.4166 55.9478 38.4251 54.6486V54.6087L38.5622 43.4255C38.5622 43.4255 51.185 39.3205 54.9641 29.3409C58.7517 19.3613 72 22.2946 72 22.2946C72 22.2946 59.3944 11.7412 46.1462 21.1309Z" 
      fill={color}
    />
  </svg>
);

function Jaipur(){

}

function Delhi(){

}

function Mumbai(){

}