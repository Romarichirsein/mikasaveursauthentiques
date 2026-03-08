'use client'

import { motion } from 'framer-motion'

interface FilterProps {
  active: boolean
  label: string
  onClick: () => void
}

export function CategoryFilter({ active, label, onClick }: FilterProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2.5 text-sm sm:text-base font-medium transition-colors rounded-full ${
        active 
          ? 'text-green-700 font-bold bg-green-50/50' 
          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
      }`}
    >
      <span className="relative z-10">{label}</span>
      {active && (
        <motion.div
          layoutId="filter-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full z-0 mx-3"
          style={{ background: 'linear-gradient(90deg, #F7931E, #4CAF50)' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  )
}
