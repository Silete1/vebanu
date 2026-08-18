# Sumerian Celestial Background Guide: Anu, God of the Sky & Enterprise Control

> **Sumerian Mythology & Enterprise Metaphor**  
> In ancient Mesopotamian/Sumerian mythology, **Anu (An)** is the supreme Lord of the Heavens (`God of the Sky`). His sacred cuneiform symbol (**DINGIR `𒀭`**) depicts an **eight-pointed celestial star**, representing supreme divine order from above.  
>  
> Whether you choose a **Dark Cosmic Constellation Mesh** or a **Lighter Ethereal Blue Sky & Cloud Loop**, both directly embody Anu's domain: **High-level operational clarity and command from the heavens above.**

---

## 1. Lighter Ethereal Sky & Cloud Loops (Bright Daytime Heavens)
*Recommended for a fresh, clean, high-clarity corporate feel that keeps typography sharp and vibrant.*

All links below have been **100% verified accessible (`HTTP 200 OK`) and will not return 404 errors**.

### A. Summer Clouds & Open Blue Sky Time-Lapse (Direct & Verified)
* **Visual**: Fluffy white clouds drifting across a crisp, light-blue daytime sky—evoking clarity, transparency, and high-altitude perspective.
* **Verified Direct Video Page (`HTTP 200 OK`)**:  
  [Wikimedia Commons: Summer Clouds Time-Lapse (.webm)](https://commons.wikimedia.org/wiki/File:Grand_Canyon_National_Park-_Timelapse_Video_-_Summer_Clouds_(7775362134).webm)
* **License & Usage**: 100% free, open domain, zero watermarks.

### B. Soft Ethereal Cloudscape at Sunset / Golden Horizon (Direct & Verified)
* **Visual**: Delicate light-blue sky shifting into soft golden cloud layers—calming, executive, and gentle behind hero headlines.
* **Verified Direct Video Page (`HTTP 200 OK`)**:  
  [Wikimedia Commons: Clouds at Sunset Time-Lapse (.webm)](https://commons.wikimedia.org/wiki/File:Clouds_at_sunset_(time_lapse).webm)
* **License & Usage**: 100% free, open domain, zero watermarks.

### C. Curated Light Sky & Cloud Categories on Coverr (`HTTP 200 OK`)
* **Coverr Clear Skies & Blue Sky Loops**: [https://coverr.co/s/clear-skies](https://coverr.co/s/clear-skies)
* **Coverr Cloud Background Loops**: [https://coverr.co/s/cloud](https://coverr.co/s/cloud)
* **Coverr Pastel & Minimalist Light Sky**: [https://coverr.co/s/pastel-sky](https://coverr.co/s/pastel-sky)

---

## 2. Dark Constellation & Plexus Mesh Options (Night Sky / Star Chart)
*Recommended for a deep, high-tech, bioluminescent corporate aesthetic.*

### A. The "Constellation Data Mesh" (`DINGIR 𒀭` Star Field)
* **Coverr Cosmic & Tech Mesh**: [https://coverr.co/s/cosmic](https://coverr.co/s/cosmic)
* **Coverr Energy Waves**: [https://coverr.co/s/energy+waves](https://coverr.co/s/energy+waves)
* **Pexels Star Field Loops**: [https://www.pexels.com/search/videos/star%20field/](https://www.pexels.com/search/videos/star%20field/)

---

## 3. Achieving a Seamless Background Across Pages (Next.js Architecture)
*(Reference blueprint only — **not implemented** in app code)*

When you decide to add either the light sky or dark constellation loop, we will use the **Next.js App Router Root Layout Persistence Pattern** (`app/layout.tsx`).

Because components placed directly inside `app/layout.tsx` outside of the page `{children}` tree **do not unmount during route transitions**, your background video stays running continuously without resetting, interrupting, or flickering as the user navigates between Home (`/`), Services (`/services`), and Method (`/method`).

```tsx
// Reference Example for future implementation in app/layout.tsx:
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--color-abyssal-ink)] text-white">
        {/* Persistent background video stays mounted 100% of the time across pages */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/videos/sky-loop.webm" type="video/webm" />
          </video>
        </div>
        
        <div className="relative z-10">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
```
