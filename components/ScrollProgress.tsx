'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 w-full h-[3px] z-[100] origin-left scale-x-0"
      style={{ background: 'linear-gradient(90deg, #F7931E, #F5C518, #4CAF50)' }}
    />
  )
}
