'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Link from 'next/link'
import { Leaf, ArrowRight } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Si réduit, on affiche tout directement via CSS
      gsap.set(['.hero-title', '.hero-subtitle', '.hero-cta', '.hero-image'], { opacity: 1, y: 0, scale: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      
      tl.fromTo('.hero-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      .fromTo('.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
        '-=0.5'
      )
      .fromTo('.hero-image',
        { opacity: 0, scale: 0.9, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.2)' },
        '-=0.8'
      )
      
      // Floating animation for leaves
      gsap.to('.floating-leaf', {
        y: -15,
        rotation: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: "random"
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-bg-light">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-br from-orange-50/80 via-yellow-50/50 to-green-50/80 rounded-bl-[100px] -z-10" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl -z-10" />

      {/* Floating Elements */}
      <Leaf className="floating-leaf absolute top-32 left-[10%] text-green-400/40 w-12 h-12 -z-10" />
      <Leaf className="floating-leaf absolute top-24 right-[25%] text-orange-400/30 w-8 h-8 -z-10" />
      <Leaf className="floating-leaf absolute bottom-40 right-[15%] text-green-500/30 w-10 h-10 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm mb-6 border border-orange-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Préparé avec amour
            </div>
            
            <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-nunito font-extrabold text-text-dark leading-[1.1] mb-6">
              Le goût naturel,<br />
              <span className="text-transparent bg-clip-text bg-gradient-brand">
                la saveur authentique
              </span>
            </h1>
            
            <p className="hero-subtitle text-lg md:text-xl text-text-muted mb-10 text-balance leading-relaxed">
              Découvrez nos jus pressés à froid et nos plats faits maison. 
              Des ingrédients frais, une préparation minutieuse, et une livraison rapide à Yaoundé.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalogue" className="hero-cta btn-primary text-lg">
                Voir le menu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a 
                href="https://wa.me/237694916971" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-cta inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                Nous contacter
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div className="hero-image relative lg:ml-auto w-full max-w-lg mx-auto lg:max-w-none mt-12 lg:mt-0">
            <div className="relative aspect-square w-full rounded-full lg:rounded-[100px] overflow-hidden shadow-2xl shadow-orange-500/20 border-8 border-white">
              {/* Image d'illustration - Pour l'instant placeholder, on mettra une image du projet une fois mappée */}
              <div className="absolute inset-0 bg-gradient-brand opacity-10" />
              <img 
                src="/images/hero_mika.png" 
                alt="Produits Mika Saveurs Authentiques - Mets et Jus Traditionnels" 
                className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
              />
            </div>
            
            {/* Decoration Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4 animate-bounce hover:animate-none">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <p className="font-bold text-text-dark text-sm">100% Naturel</p>
                <p className="text-xs text-text-muted">Sans conservateurs</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
