'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

const YM_ID = 109903220

declare global {
  interface Window {
    ym?: (id: number, action: string, ...rest: unknown[]) => void
  }
}

// Отправляет «hit» в Метрику при каждой смене маршрута (SPA-навигация Next.js).
// Первый hit на загрузке тоже идёт отсюда, поэтому в init стоит defer:true —
// чтобы не было двойного засчёта стартовой страницы.
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ym) return
    const query = searchParams?.toString()
    const url = pathname + (query ? `?${query}` : '')
    window.ym(YM_ID, 'hit', url)
  }, [pathname, searchParams])

  return null
}

export default function YandexMetrica() {
  return (
    <>
      <Script id="yandex-metrica" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(${YM_ID}, "init", {
            defer: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
          });
        `}
      </Script>

      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>

      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YM_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}
