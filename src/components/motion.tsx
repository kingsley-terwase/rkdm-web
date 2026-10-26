import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Box, type SxProps, type Theme } from '@mui/material'
import { keyframes } from '@mui/material/styles'

/* ---------- keyframes ---------- */
export const kf = {
    // a curtain pulled open from the left
    curtain: keyframes`from{clip-path:inset(0 100% 0 0);opacity:.2}to{clip-path:inset(0 0 0 0);opacity:1}`,
    // camera "focus pull": blurry and slightly zoomed -> sharp
    focus: keyframes`from{filter:blur(14px);transform:scale(1.06);opacity:0}to{filter:blur(0);transform:scale(1);opacity:1}`,
    // a card unfolding from its top edge
    unfold: keyframes`from{transform:perspective(900px) rotateX(-28deg);transform-origin:top;opacity:0}to{transform:perspective(900px) rotateX(0);transform-origin:top;opacity:1}`,
    // springy pop with a little tilt
    pop: keyframes`0%{transform:scale(.55) rotate(-10deg);opacity:0}60%{transform:scale(1.08) rotate(3deg);opacity:1}100%{transform:scale(1) rotate(0)}`,
    slideL: keyframes`from{transform:translateX(-60px);opacity:0}to{transform:none;opacity:1}`,
    slideR: keyframes`from{transform:translateX(60px);opacity:0}to{transform:none;opacity:1}`,
    // cards dealt onto the table
    deal: keyframes`from{transform:translateY(50px) rotate(var(--r,-4deg)) scale(.92);opacity:0}to{transform:none;opacity:1}`,
    wiggle: keyframes`0%,100%{transform:rotate(0)}25%{transform:rotate(-14deg) scale(1.15)}60%{transform:rotate(10deg) scale(1.15)}`,
    ping: keyframes`0%{transform:scale(.8);opacity:.7}100%{transform:scale(1.9);opacity:0}`,
    pan: keyframes`from{background-position:0% 40%,0% 40%}to{background-position:100% 60%,100% 60%}`,
    glow: keyframes`0%,100%{text-shadow:0 0 0 rgba(245,179,1,0)}50%{text-shadow:0 0 22px rgba(245,179,1,.65)}`,
    sweep: keyframes`from{transform:translateX(-120%) skewX(-20deg)}to{transform:translateX(320%) skewX(-20deg)}`,
    heartbeat: keyframes`0%,40%,100%{transform:scale(1)}10%{transform:scale(1.09)}20%{transform:scale(1)}30%{transform:scale(1.06)}`,
}

export type Variant = 'curtain' | 'focus' | 'unfold' | 'pop' | 'slideL' | 'slideR' | 'deal'

/* ---------- in-view hook (fires once) ---------- */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
    const ref = useRef<T>(null)
    const [seen, setSeen] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (!('IntersectionObserver' in window)) { setSeen(true); return }
        const io = new IntersectionObserver(([en]) => {
            if (en.isIntersecting) { setSeen(true); io.disconnect() }
        }, { threshold })
        io.observe(el)
        return () => io.disconnect()
    }, [threshold])
    return { ref, seen }
}

export const reduced = { '@media (prefers-reduced-motion: reduce)': { animation: 'none !important', transition: 'none !important', opacity: '1 !important', transform: 'none !important' } }

/* ---------- Anim: wraps any section with a named entrance ---------- */
export function Anim({ variant, delay = 0, duration = 900, children, sx }:
    { variant: Variant; delay?: number; duration?: number; children: ReactNode; sx?: SxProps<Theme> }) {
    const { ref, seen } = useInView()
    return (
        <Box ref={ref} sx={[
            {
                opacity: seen ? undefined : 0,
                animation: seen ? `${kf[variant]} ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms both` : 'none',
                willChange: 'transform, opacity',
            },
            reduced,
            ...(Array.isArray(sx) ? sx : [sx]),
        ] as SxProps<Theme>}>
            {children}
        </Box>
    )
}

/* ---------- CountUp: "25+" "1M+" "120" ---------- */
export function CountUp({ value, ms = 1600 }: { value: string; ms?: number }) {
    const { ref, seen } = useInView<HTMLSpanElement>(0.4)
    const m = value.match(/^(\d+)(.*)$/)
    const target = m ? Number(m[1]) : 0
    const suffix = m ? m[2] : ''
    const [n, setN] = useState(0)
    useEffect(() => {
        if (!seen || !m) return
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setN(target); return }
        let raf = 0
        const t0 = performance.now()
        const tick = (t: number) => {
            const p = Math.min((t - t0) / ms, 1)
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
            if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [seen]) // eslint-disable-line react-hooks/exhaustive-deps
    return <span ref={ref}>{m ? n : value}{suffix}</span>
}