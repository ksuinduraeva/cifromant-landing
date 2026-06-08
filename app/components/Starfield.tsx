'use client'

import { useEffect } from 'react'

export default function Starfield() {
  useEffect(() => {
    const box = document.getElementById('starfield')
    if (!box) return
    const N = window.innerWidth < 700 ? 70 : 140
    const frag = document.createDocumentFragment()
    for (let i = 0; i < N; i++) {
      const s = document.createElement('span')
      s.className = 'star'
      const sz = Math.random() < 0.85 ? Math.random() * 1.6 + 0.6 : Math.random() * 2 + 2
      s.style.width = s.style.height = sz.toFixed(2) + 'px'
      s.style.left = Math.random() * 100 + '%'
      s.style.top = Math.random() * 100 + '%'
      s.style.animationDelay = Math.random() * 6 + 's'
      s.style.animationDuration = 3 + Math.random() * 5 + 's'
      frag.appendChild(s)
    }
    box.appendChild(frag)
  }, [])

  return null
}