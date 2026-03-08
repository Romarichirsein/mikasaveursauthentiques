---
name: gsap-scroll-animations
description: Implémenter des animations scroll premium avec GSAP + ScrollTrigger dans Next.js. Stagger reveals, parallax, progress bar, counter animations, hover effects. PAS de Three.js. Utiliser ce skill pour tout site nécessitant des animations au scroll sans 3D.
---

# SKILL : GSAP ScrollTrigger — Next.js (Sans Three.js)

## Installation
```bash
npm install gsap
# GSAP est suffisant — pas besoin de @react-three/fiber
```

## Setup Next.js (Client-side uniquement)
```typescript
// lib/gsap.ts — import centralisé
'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
```

## Hook réutilisable useScrollAnimation
```tsx
// hooks/useScrollAnimation.ts
'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function useScrollAnimation<T extends HTMLElement>(
  animation: (el: T, gsap: typeof import('gsap').gsap) => gsap.core.Tween | gsap.core.Timeline,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => animation(ref.current!, gsap), ref)
    return () => ctx.revert()
  }, deps)

  return ref
}
```

## Animations fondamentales

### 1. Reveal au scroll (fade + translateY) — stagger sur enfants
```tsx
// Pattern le plus utilisé
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.reveal-item').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1  // stagger manuel
        }
      )
    })
  })
  return () => ctx.revert()
}, [])
```

### 2. Stagger grid de cartes produits
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.product-card')
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.5,
      ease: 'back.out(1.2)',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '.products-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })
  })
  return () => ctx.revert()
}, [products]) // re-run si produits changent (filtre)
```

### 3. Hero text animation (au load, sans scroll)
```tsx
useEffect(() => {
  const tl = gsap.timeline()
  tl.from('.hero-title', { opacity: 0, y: 60, duration: 0.8, ease: 'power4.out' })
    .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  return () => tl.kill()
}, [])
```

### 4. Parallax section
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.parallax-bg', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  })
  return () => ctx.revert()
}, [])
```

### 5. Counter (chiffres clés)
```tsx
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current!, start: 'top 85%', once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix
      }
    })
  }, [value])

  return <span ref={ref}>0{suffix}</span>
}
```

### 6. Barre de progression scroll (haut de page)
```tsx
// components/ScrollProgress.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
```

### 7. Bounce panier (badge count)
```tsx
// Appeler à chaque ajout au panier
function bounceCartBadge() {
  gsap.fromTo('#cart-badge',
    { scale: 1.4 },
    { scale: 1, duration: 0.4, ease: 'elastic.out(1.5, 0.4)' }
  )
}
```

### 8. Filtre catégorie — underline animé
```tsx
function CategoryFilter({ active, label, onClick }: FilterProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${active ? 'text-green-600' : 'text-gray-500'}`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="filter-underline"  // Framer Motion layout animation
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, #F7931E, #4CAF50)' }}
        />
      )}
    </button>
  )
}
```

## Règles performance critiques
1. **Toujours** `gsap.context()` + `.revert()` dans le cleanup
2. **Jamais** de `new gsap.timeline()` à l'extérieur d'un useEffect
3. `ScrollTrigger.refresh()` après un changement de layout (filtre, resize)
4. `once: true` sur les animations one-shot (reveal, counter)
5. `scrub: true` uniquement pour les parallax (pas pour reveals — ça désanime au scroll retour)
6. Ajouter `will-change: transform` via CSS sur les éléments GSAP intensifs
7. `gsap.killTweensOf(el)` avant re-animation si filtre change

## Prefers-reduced-motion
```typescript
// Toujours vérifier en début de useEffect
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) return  // skip all animations
```

## CSS minimal requis
```css
/* Évite le flash avant animation */
.reveal-item { opacity: 0; }
.hero-title, .hero-subtitle, .hero-cta { opacity: 0; }

/* Perf GPU */
.product-card { will-change: transform; }
```

## Checklist
- [ ] `gsap.registerPlugin(ScrollTrigger)` une seule fois (dans `lib/gsap.ts`)
- [ ] `typeof window !== 'undefined'` guard pour SSR
- [ ] `gsap.context().revert()` dans chaque cleanup
- [ ] `prefers-reduced-motion` respecté partout
- [ ] `ScrollTrigger.refresh()` après filtrage produits
- [ ] Pas d'animation sur `opacity: 0` initial via Tailwind (GSAP gère)
- [ ] `once: true` sur reveals one-shot