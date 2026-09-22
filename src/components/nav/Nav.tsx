import React from 'react'
import Link from 'next/link'

interface NavProps {
  currentPath: string
}

const items = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/tracker', label: 'Tracker' },
  { href: '/services', label: 'Services' },
  { href: '/studio', label: 'Studio' },
]

export const Nav: React.FC<NavProps> = ({ currentPath }) => {
  return (
    <nav className="flex gap-6 justify-between self-end max-w-full text-lg tracking-wide w-[600px] max-md:w-full max-md:text-sm max-md:gap-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            currentPath === item.href ? 'text-white' : 'text-navItem'
          } hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-white`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
