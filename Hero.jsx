import React, { useEffect, useRef } from 'react'
import './Hero.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const navRef = useRef(null)
  const titleRef = useRef(null)
  const leftTextRef = useRef(null)
  const rightTextRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const video = videoRef.current
    const nav = navRef.current
    const title = titleRef.current
    const leftText = leftTextRef.current
    const rightText = rightTextRef.current
    const overlay = overlayRef.current

    // Wait for video metadata to be ready
    const initScrollTrigger = () => {
      const duration = video.duration || 6

      // Prime the video so GSAP can seek currentTime
      video.play().then(() => video.pause()).catch(() => {})

      // Navbar entrance
      gsap.fromTo(nav,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )

      // Title entrance
      gsap.fromTo(title,
        { y: 60, opacity: 0, letterSpacing: '0.6em' },
        { y: 0, opacity: 1, letterSpacing: '0.15em', duration: 1.6, ease: 'power4.out', delay: 0.7 }
      )

      // Main scroll timeline — pins the hero for 300vh of scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=300%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      })

      // Video scrub tied to scroll
      tl.to(video, {
        currentTime: duration,
        ease: 'none',
      }, 0)

      // Overlay darkens as scroll progresses, then lifts
      tl.fromTo(overlay,
        { opacity: 0.55 },
        { opacity: 0.1, ease: 'power2.out' },
        0
      )
      tl.to(overlay,
        { opacity: 0.6, ease: 'power2.in' },
        0.7
      )

      // Title fades out as scroll begins
      tl.to(title, {
        y: -60,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      }, 0.05)

      // LEFT TEXT — slides in from left at ~20% scroll
      tl.fromTo(leftText,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.25, ease: 'power3.out' },
        0.18
      )
      tl.to(leftText,
        { x: -120, opacity: 0, duration: 0.2, ease: 'power3.in' },
        0.72
      )

      // RIGHT TEXT — slides in from right at ~45% scroll
      tl.fromTo(rightText,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.25, ease: 'power3.out' },
        0.42
      )
      tl.to(rightText,
        { x: 120, opacity: 0, duration: 0.2, ease: 'power3.in' },
        0.82
      )
    }

    if (video.readyState >= 1) {
      initScrollTrigger()
    } else {
      video.addEventListener('loadedmetadata', initScrollTrigger)
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      video.removeEventListener('loadedmetadata', initScrollTrigger)
    }
  }, [])

  return (
    <div className="hero" ref={heroRef}>
      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        className="hero__video"
        src="/video/one.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* CINEMATIC OVERLAY */}
      <div className="hero__overlay" ref={overlayRef} />

      {/* VIGNETTE */}
      <div className="hero__vignette" />

      {/* LETTERBOX BARS */}
      <div className="hero__bar hero__bar--top" />
      <div className="hero__bar hero__bar--bottom" />

      {/* NAVBAR */}
      <nav className="hero__nav" ref={navRef}>
        <div className="hero__nav-logo">
          <span className="logo-dot" />
          POM
        </div>
        <ul className="hero__nav-links">
          <li><a href="#">Origin</a></li>
          <li><a href="#">Craft</a></li>
          <li><a href="#">Journal</a></li>
        </ul>
        <button className="hero__nav-cta">Order Now</button>
      </nav>

      {/* HERO TITLE */}
      <h1 className="hero__title" ref={titleRef}>
        <span className="title-small">100% Pure</span>
        Fresh<br />
        <em>Pomegranate</em>
      </h1>

      {/* LEFT PANEL */}
      <div className="hero__panel hero__panel--left" ref={leftTextRef}>
        <p className="panel-label">THE BURST</p>
        <h2 className="panel-heading">
          Nature's<br />
          Finest Drop
        </h2>
        <p className="panel-body">
          Cold-pressed at peak ripeness.<br />
          Every seed, every flavor,<br />
          captured in a single glass.
        </p>
        <div className="panel-line" />
      </div>

      {/* RIGHT PANEL */}
      <div className="hero__panel hero__panel--right" ref={rightTextRef}>
        <p className="panel-label">PURE · WILD · RAW</p>
        <h2 className="panel-heading">
          Taste the<br />
          Explosion
        </h2>
        <p className="panel-body">
          No additives. No compromise.<br />
          Just the raw, explosive power<br />
          of the pomegranate.
        </p>
        <a href="#" className="panel-btn">
          <span>Discover More</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="scroll-track"><div className="scroll-thumb" /></div>
      </div>
    </div>
  )
}

export default Hero