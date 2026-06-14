'use client'

import { useEffect } from 'react'

// Плавное появление блоков с классом .reveal при прокрутке.
// Порт скрипта из дизайна v2: каскадная задержка между соседями
// + страховки, чтобы контент никогда не остался невидимым.
export default function Reveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('.reveal')]
    if (els.length === 0) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const show = (el: HTMLElement) => {
      if (el.classList.contains('in')) return
      if (!reduceMotion && el.parentElement) {
        const sibs = [...el.parentElement.querySelectorAll<HTMLElement>('.reveal')]
        el.style.transitionDelay = Math.min(sibs.indexOf(el), 3) * 0.09 + 's'
      }
      el.classList.add('in')
    }

    // При reduced-motion — показываем всё сразу, без анимации.
    if (reduceMotion) {
      els.forEach(show)
      return
    }

    const inView = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.top < vh * 0.92 && r.bottom > 0
    }

    // То, что уже на экране, раскрываем немедленно.
    els.forEach((e) => { if (inView(e)) show(e) })

    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            show(en.target as HTMLElement)
            io?.unobserve(en.target)
          }
        })
      }, { threshold: 0.14 })
      els.forEach((e) => { if (!e.classList.contains('in')) io!.observe(e) })
    } else {
      els.forEach(show)
    }

    // Страховка: ничего не остаётся скрытым.
    const safety = setTimeout(() => {
      els.forEach((e) => { if (inView(e)) show(e) })
    }, 1400)

    return () => {
      io?.disconnect()
      clearTimeout(safety)
    }
  }, [])

  return null
}