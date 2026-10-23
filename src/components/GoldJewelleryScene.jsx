import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import {
  CanvasTexture,
  TextureLoader,
  MathUtils,
  SRGBColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
} from 'three'
import './GoldJewelleryScene.css'

const GOLD = '#e9b72f'
const PALE_GOLD = '#fff0b5'

// Asli logo image. null = code se bana logo.
const LOGO_URL = '/images/goldsuree-logo.jpeg'

const CAMERA_Z = 5.4
const CAMERA_FOV = 42

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const textureCache = new Map()

function finishTexture(texture, maxAnisotropy) {
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = maxAnisotropy
  texture.generateMipmaps = true
  texture.minFilter = LinearMipmapLinearFilter
  texture.magFilter = LinearFilter
  texture.needsUpdate = true
  return texture
}

function loadLogoTexture(url, maxAnisotropy) {
  return new Promise((resolve, reject) => {
    new TextureLoader().load(
      url,
      (tex) => resolve(finishTexture(tex, maxAnisotropy)),
      undefined,
      reject
    )
  })
}

function whenIdle(fn) {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(fn, { timeout: 300 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(fn, 50)
  return () => window.clearTimeout(id)
}

function getIsMobile() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}

/* ------------------------------------------------------------------ */
/*  Fallback coin texture (sirf tab banta hai jab image load na ho)    */
/* ------------------------------------------------------------------ */
function drawStack(ctx, S, x, baseY, w, count, thick = 15) {
  const rx = (w / 2) * S
  const ry = rx * 0.3
  const th = thick * S
  const px = x * S
  const by = baseY * S

  for (let i = 0; i < count; i++) {
    const cy = by - i * th

    const side = ctx.createLinearGradient(px - rx, 0, px + rx, 0)
    side.addColorStop(0, '#8a5a0a')
    side.addColorStop(0.2, '#e0a82a')
    side.addColorStop(0.45, '#ffe27a')
    side.addColorStop(0.75, '#d99a1c')
    side.addColorStop(1, '#7a4c06')

    ctx.beginPath()
    ctx.ellipse(px, cy, rx, ry, 0, 0, Math.PI * 2)
    ctx.fillStyle = side
    ctx.fill()

    ctx.fillStyle = side
    ctx.fillRect(px - rx, cy - th, rx * 2, th)

    ctx.beginPath()
    ctx.ellipse(px, cy - th, rx, ry, 0, 0, Math.PI * 2)
    ctx.fillStyle = side
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(px, cy, rx, ry, 0, 0, Math.PI)
    ctx.strokeStyle = 'rgba(90,50,5,0.55)'
    ctx.lineWidth = 1.6 * S
    ctx.stroke()
  }

  const topY = by - (count - 1) * th - th
  const top = ctx.createRadialGradient(px - rx * 0.3, topY - ry * 0.3, 2 * S, px, topY, rx)
  top.addColorStop(0, '#fff6b8')
  top.addColorStop(0.5, '#f5c93e')
  top.addColorStop(1, '#c58a14')
  ctx.beginPath()
  ctx.ellipse(px, topY, rx, ry, 0, 0, Math.PI * 2)
  ctx.fillStyle = top
  ctx.fill()
  ctx.strokeStyle = '#a56f0e'
  ctx.lineWidth = 2 * S
  ctx.stroke()

  ctx.beginPath()
  ctx.ellipse(px, topY, rx * 0.78, ry * 0.78, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(165,111,14,0.6)'
  ctx.lineWidth = 1.5 * S
  ctx.stroke()
}

function createCoinTexture(SIZE, maxAnisotropy) {
  const S = SIZE / 1024
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Unable to create GoldSuree coin texture')

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  const cx = 512 * S
  const cy = 512 * S

  const bg = ctx.createRadialGradient(cx, cy * 0.85, 40 * S, cx, cy, 520 * S)
  bg.addColorStop(0, '#fffdf4')
  bg.addColorStop(0.7, '#fcf3d9')
  bg.addColorStop(1, '#f6e6b8')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, SIZE, SIZE)

  const rim = ctx.createLinearGradient(0, 0, SIZE, SIZE)
  rim.addColorStop(0, '#f7d96a')
  rim.addColorStop(0.5, '#d9a21f')
  rim.addColorStop(1, '#f2c94c')
  ctx.beginPath()
  ctx.arc(cx, cy, 492 * S, 0, Math.PI * 2)
  ctx.strokeStyle = rim
  ctx.lineWidth = 22 * S
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx, cy, 474 * S, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(176,120,20,0.55)'
  ctx.lineWidth = 3 * S
  ctx.stroke()

  const shadow = ctx.createRadialGradient(cx, 470 * S, 10 * S, cx, 470 * S, 260 * S)
  shadow.addColorStop(0, 'rgba(190,140,40,0.28)')
  shadow.addColorStop(1, 'rgba(190,140,40,0)')
  ctx.fillStyle = shadow
  ctx.fillRect(0, 300 * S, SIZE, 300 * S)

  drawStack(ctx, S, 512, 355, 140, 7)
  drawStack(ctx, S, 395, 410, 150, 5)
  drawStack(ctx, S, 655, 420, 150, 6)
  drawStack(ctx, S, 330, 465, 135, 4)
  drawStack(ctx, S, 505, 490, 165, 3)

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  let fontSize = 170
  ctx.font = `bold ${fontSize * S}px Georgia, "Times New Roman", serif`
  const targetWidth = 760 * S
  const measured = ctx.measureText('GoldSuree').width
  fontSize = (fontSize * targetWidth) / measured
  ctx.font = `bold ${fontSize * S}px Georgia, "Times New Roman", serif`

  const textY = 700 * S
  const textGold = ctx.createLinearGradient(0, textY - fontSize * S * 0.75, 0, textY + 10 * S)
  textGold.addColorStop(0, '#fff2a0')
  textGold.addColorStop(0.35, '#f1c230')
  textGold.addColorStop(0.7, '#c98a10')
  textGold.addColorStop(1, '#8f5a06')

  ctx.lineJoin = 'round'
  ctx.lineWidth = 3 * S
  ctx.strokeStyle = '#8a5806'
  ctx.strokeText('GoldSuree', cx, textY)
  ctx.fillStyle = textGold
  ctx.fillText('GoldSuree', cx, textY)

  ctx.font = `bold ${50 * S}px Arial, Helvetica, sans-serif`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${7 * S}px`
  ctx.fillStyle = '#5b3a0c'
  ctx.textBaseline = 'middle'
  ctx.fillText('WE BUY GOLD', cx + 3.5 * S, 780 * S)
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'

  const dashL = ctx.createLinearGradient(215 * S, 0, 305 * S, 0)
  dashL.addColorStop(0, 'rgba(201,138,16,0)')
  dashL.addColorStop(1, '#c98a10')
  ctx.strokeStyle = dashL
  ctx.lineWidth = 4 * S
  ctx.beginPath()
  ctx.moveTo(215 * S, 780 * S)
  ctx.lineTo(305 * S, 780 * S)
  ctx.stroke()

  const dashR = ctx.createLinearGradient(719 * S, 0, 809 * S, 0)
  dashR.addColorStop(0, '#c98a10')
  dashR.addColorStop(1, 'rgba(201,138,16,0)')
  ctx.strokeStyle = dashR
  ctx.beginPath()
  ctx.moveTo(719 * S, 780 * S)
  ctx.lineTo(809 * S, 780 * S)
  ctx.stroke()

  return finishTexture(new CanvasTexture(canvas), maxAnisotropy)
}

/* ------------------------------------------------------------------ */
/*  Floating coin (full 360° spin, dono side logo)                     */
/* ------------------------------------------------------------------ */
function FloatingCoin({
  texture,
  position,
  scale = 1,
  speed = 1,
  tilt = [0.12, 0, -0.1],
  reducedMotion = false,
  segments = 96,
}) {
  const ref = useRef(null)

  useFrame(({ clock }, delta) => {
    if (!ref.current || reducedMotion) return
    const dt = Math.min(delta, 0.05)
    const t = clock.elapsedTime * speed
    ref.current.position.y = position[1] + Math.sin(t) * 0.055
    ref.current.rotation.y += dt * 0.6 * speed
    ref.current.rotation.x = tilt[0] + Math.sin(t * 0.5) * 0.035
    ref.current.rotation.z = tilt[2] + Math.sin(t * 0.4) * 0.025
  })

  return (
    <group ref={ref} position={position} rotation={tilt} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.14, segments]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <circleGeometry args={[0.6, segments]} />
        <meshStandardMaterial map={texture} metalness={0.05} roughness={0.55} />
      </mesh>

      <mesh position={[0, 0, -0.08]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.6, segments]} />
        <meshStandardMaterial map={texture} metalness={0.05} roughness={0.55} />
      </mesh>

      {[0.06, -0.06].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[0.612, 0.024, 12, segments]} />
          <meshStandardMaterial color={PALE_GOLD} metalness={1} roughness={0.18} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Orbit rings                                                        */
/* ------------------------------------------------------------------ */
function Orbit({ radius, tube, rotation, speed = 0.025, reducedMotion = false }) {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.z += Math.min(delta, 0.05) * speed
  })
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 6, 64]} />
      <meshBasicMaterial color="#c99b4d" transparent opacity={0.42} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Pedestal                                                           */
/* ------------------------------------------------------------------ */
function GoldPedestal({ reducedMotion }) {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (ref.current && !reducedMotion) {
      ref.current.position.y = -1.65 + Math.sin(clock.elapsedTime * 0.55) * 0.01
    }
  })
  return (
    <group ref={ref} position={[0, -1.65, -0.55]}>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[1.63, 1.78, 0.5, 72]} />
        <meshStandardMaterial color="#eee2cc" metalness={0.06} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[1.62, 0.04, 12, 96]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.205, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.035, 72]} />
        <meshStandardMaterial color="#fbf3e5" roughness={0.27} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Particles                                                          */
/* ------------------------------------------------------------------ */
function GoldParticles({ reducedMotion, count }) {
  const group = useRef(null)
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.sin(i * 12.989) * 1.8,
        y: Math.cos(i * 7.123) * 1.7,
        z: Math.sin(i * 4.21) * 0.35,
        size: 0.009 + (i % 4) * 0.006,
      })),
    [count]
  )

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return
    group.current.children.forEach((p, i) => {
      if (particles[i]) {
        p.position.y = particles[i].y + Math.sin(clock.elapsedTime * 0.5 + i) * 0.04
      }
    })
  })

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#fff2c6' : '#d6a345'} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Coin collection                                                    */
/*  Texture idle time mein load hoti hai, GPU pe pehle upload hoti hai */
/* ------------------------------------------------------------------ */
function JewelleryCollection({ reducedMotion, isMobile, onReady }) {
  const ref = useRef(null)
  const gl = useThree((s) => s.gl)
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    let cancelled = false
    const aniso = Math.min(isMobile ? 8 : 16, gl.capabilities.getMaxAnisotropy())
    const size = isMobile ? 1024 : 1536
    const key = `${LOGO_URL || 'canvas'}-${size}-${aniso}`

    const finish = (tex) => {
      if (cancelled) return
      gl.initTexture(tex) // first frame mein stall nahi aayega
      setTexture(tex)
    }

    if (textureCache.has(key)) {
      finish(textureCache.get(key))
      return () => {
        cancelled = true
      }
    }

    const cancelIdle = whenIdle(async () => {
      let tex = null
      if (LOGO_URL) {
        try {
          tex = await loadLogoTexture(LOGO_URL, aniso)
        } catch (err) {
          console.warn('Logo image load nahi hui, code wala logo use ho raha hai', err)
        }
      }
      if (!tex) {
        try {
          tex = createCoinTexture(size, aniso)
        } catch (err) {
          console.error(err)
          return
        }
      }
      textureCache.set(key, tex)
      finish(tex)
    })

    return () => {
      cancelled = true
      cancelIdle()
    }
  }, [gl, isMobile])

  // Coins mount hone ke 2 frames baad fade-in (shader compile chhup jaye)
  useEffect(() => {
    if (!texture) return
    let r2
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => onReady?.())
    })
    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
    }
  }, [texture, onReady])

  useFrame(({ pointer, clock }, delta) => {
    if (!ref.current || reducedMotion) return
    const dt = Math.min(delta, 0.05)
    ref.current.rotation.x = MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.07, 3, dt)
    ref.current.rotation.y = MathUtils.damp(
      ref.current.rotation.y,
      pointer.x * 0.1 + Math.sin(clock.elapsedTime * 0.25) * 0.02,
      3,
      dt
    )
  })

  if (!texture) return null
const segments = isMobile ? 40 : 64

  return (
    <group ref={ref}>
      <FloatingCoin segments={segments} texture={texture} position={[0, 0.25, 0.42]} scale={0.94} speed={0.65} tilt={[0.08, 0, -0.06]} reducedMotion={reducedMotion} />
      <FloatingCoin segments={segments} texture={texture} position={[-1.02, 0.43, -0.28]} scale={0.61} speed={0.8} tilt={[0.2, 0, 0.12]} reducedMotion={reducedMotion} />
      <FloatingCoin segments={segments} texture={texture} position={[0.98, 0.58, -0.32]} scale={0.56} speed={0.85} tilt={[-0.15, 0, -0.1]} reducedMotion={reducedMotion} />
      <FloatingCoin segments={segments} texture={texture} position={[0.82, -0.62, -0.05]} scale={0.43} speed={0.62} tilt={[0.16, 0, 0.16]} reducedMotion={reducedMotion} />
      <FloatingCoin segments={segments} texture={texture} position={[-0.32, -0.82, -0.52]} scale={0.34} speed={0.72} tilt={[-0.16, 0, 0.08]} reducedMotion={reducedMotion} />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Lights                                                             */
/* ------------------------------------------------------------------ */
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2, 3, 6]} intensity={1.8} color="#fff4d6" />
      <pointLight position={[-3, 2, 3]} intensity={5} color="#ffe0a0" />
      <directionalLight position={[0, 3, -3]} intensity={1.2} color="#f2c96b" />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  ResponsiveRig: screen narrow ho toh poora scene chhota ho jata hai */
/*  taaki coins, rings aur pedestal side se kate nahi                  */
/* ------------------------------------------------------------------ */
function ResponsiveRig({ children }) {
  const size = useThree((s) => s.size)
  const aspect = size.width / Math.max(size.height, 1)
  const visibleWidth =
    2 * Math.tan(MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_Z * aspect
  // Scene lagbhag 4.3 unit chauda hai (outer orbit ring + coins)
  const scale = MathUtils.clamp(visibleWidth / 4.3, 0.5, 1)
  return <group scale={scale}>{children}</group>
}

function Scene({ reducedMotion, isMobile, onReady }) {
  return (
    <>
      <SceneLights />
      <ResponsiveRig>
        <GoldPedestal reducedMotion={reducedMotion} />
        <GoldParticles reducedMotion={reducedMotion} count={isMobile ? 4 : 10} />
        <Orbit radius={1.65} tube={0.005} rotation={[0.9, 0.25, 0.4]} speed={0.025} reducedMotion={reducedMotion} />
        <Orbit radius={1.95} tube={0.004} rotation={[0.3, 1, -0.45]} speed={-0.018} reducedMotion={reducedMotion} />
        <JewelleryCollection reducedMotion={reducedMotion} isMobile={isMobile} onReady={onReady} />
      </ResponsiveRig>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */
export default function GoldJewelleryScene() {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = Boolean(prefersReducedMotion)
  const sceneRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  // Pehle render se hi sahi value, taaki texture/dpr baad mein dobara na badle
  const [isMobile, setIsMobile] = useState(getIsMobile)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const element = sceneRef.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const onReady = useMemo(() => () => setReady(true), [])

  return (
    <div
      ref={sceneRef}
      className="gold-jewellery-scene"
      role="img"
      aria-label="GoldSuree gold coins floating above a cream marble pedestal"
    >
      <div className="gold-scene-glow" aria-hidden="true" />
      <Canvas
  style={{
    opacity: ready ? 1 : 0,
    transform: ready ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.9s ease, transform 0.9s ease',
    willChange: 'opacity, transform',
    touchAction: 'pan-y',
    background: 'transparent',
  }}
  onCreated={({ gl }) => {
    gl.setClearColor(0x000000, 0)
    gl.setClearAlpha(0)
  }}
  camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
  dpr={isMobile ? 1 : 1.25}
  frameloop={reducedMotion ? 'demand' : isVisible ? 'always' : 'never'}
  gl={{
    alpha: true,
    antialias: !isMobile,
    powerPreference: isMobile ? 'default' : 'high-performance',
  }}
  fallback={<div className="gold-scene-fallback">GoldSuree — Your Gold. Your True Worth.</div>}
>
  <Suspense fallback={null}>
    <Scene reducedMotion={reducedMotion} isMobile={isMobile} onReady={onReady} />
  </Suspense>
</Canvas>
    </div>
  )
}