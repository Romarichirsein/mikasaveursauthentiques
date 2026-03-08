'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import gsap from 'gsap'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const cartCount = useCart(state => state.count())

  useEffect(() => {
    if (cartCount > 0) {
      gsap.fromTo('.cart-badge',
        { scale: 1.4 },
        { scale: 1, duration: 0.4, ease: 'elastic.out(1.5, 0.4)' }
      )
    }
  }, [cartCount])

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/catalogue', label: 'Catalogue' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="text-green-500 w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-nunito font-extrabold text-2xl tracking-tight text-text-dark leading-none">Mika</span>
              <span className="text-xs font-semibold text-green-dark tracking-widest uppercase">Saveurs authentiques</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link key={link.href} href={link.href} className="text-text-muted hover:text-green-500 font-medium transition-colors">
                {link.label}
              </Link>
            ))}
            
            <Link href="/commande" className="relative group flex items-center justify-center p-2 rounded-full hover:bg-green-50 transition-colors">
              <ShoppingCart className="w-6 h-6 text-text-dark group-hover:text-green-600 transition-colors" />
              {cartCount > 0 && (
                <span className="cart-badge absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/commande" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-text-dark" />
              {cartCount > 0 && (
                <span className="cart-badge absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-dark p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {links.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="block text-lg font-medium text-text-dark hover:text-green-500"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
