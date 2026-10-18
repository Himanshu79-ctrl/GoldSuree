
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import {
  CanvasTexture,
  MathUtils,
  SRGBColorSpace,
} from 'three'

import './GoldJewelleryScene.css'

const GOLD = '#d9a83e'
const PALE_GOLD = '#ffe7a5'

// --------------------------------------------------
// GoldSuree coin artwork
// The same artwork is used on BOTH sides of every coin.
// --------------------------------------------------

function createGoldSureeCoinTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Unable to create GoldSuree coin texture')
  }

  // Rich metallic gold base
  const goldGradient = ctx.createRadialGradient(
    355, 285, 30,
    512, 512, 700
  )

  goldGradient.addColorStop(0, '#fff5c9')
  goldGradient.addColorStop(0.19, '#fce49a')
  goldGradient.addColorStop(0.4, '#e7b943')
  goldGradient.addColorStop(0.67, '#c18a28')
  goldGradient.addColorStop(0.84, '#f2d071')
  goldGradient.addColorStop(1, '#966019')

  ctx.fillStyle = goldGradient
  ctx.fillRect(0, 0, 1024, 1024)

  // Soft metallic highlights
  const highlight = ctx.createRadialGradient(
    330, 245, 10,
    420, 360, 520
  )

  highlight.addColorStop(0, 'rgba(255,255,230,0.38)')
  highlight.addColorStop(0.5, 'rgba(255,237,173,0.10)')
  highlight.addColorStop(1, 'rgba(120,70,12,0.16)')

  ctx.fillStyle = highlight
  ctx.fillRect(0, 0, 1024, 1024)

  // Concentric engraved borders
  const borders = [
    { radius: 478, width: 12, color: '#8c5b19' },
    { radius: 460, width: 7, color: '#ffe8a0' },
    { radius: 430, width: 5, color: '#94651e' },
    { radius: 406, width: 3, color: 'rgba(255,246,207,0.8)' },
  ]

  borders.forEach(({ radius, width, color }) => {
    ctx.beginPath()
    ctx.arc(512, 512, radius, 0, Math.PI * 2)
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.stroke()
  })

  // Decorative dots around the inner border
  for (let i = 0; i < 48; i += 1) {
    const angle = (i / 48) * Math.PI * 2
    const x = 512 + Math.cos(angle) * 385
    const y = 512 + Math.sin(angle) * 385

    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#fff0b8'
    ctx.fill()
  }

  // Brand typography with subtle engraved shadow
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.font = 'bold 112px Georgia, "Times New Roman", serif'

  ctx.fillStyle = '#fff0b0'
  ctx.fillText('GoldSuree', 512, 457)

  ctx.fillStyle = '#704414'
  ctx.fillText('GoldSuree', 512, 450)

  // Decorative divider
  ctx.beginPath()
  ctx.moveTo(305, 528)
  ctx.lineTo(719, 528)
  ctx.strokeStyle = '#98651c'
  ctx.lineWidth = 5
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(345, 536)
  ctx.lineTo(679, 536)
  ctx.strokeStyle = 'rgba(255,239,181,0.85)'
  ctx.lineWidth = 2
  ctx.stroke()

  // Brand tagline
  ctx.font = 'bold 34px Arial, sans-serif'
  ctx.fillStyle = '#fff0b4'
  ctx.fillText('WE BUY GOLD', 512, 596)

  ctx.fillStyle = '#80551c'
  ctx.fillText('WE BUY GOLD', 512, 591)

  // Small ornamental stars
  ;[255, 769].forEach((x) => {
    ctx.save()
    ctx.translate(x, 510)
    ctx.rotate(Math.PI / 4)

    ctx.fillStyle = '#fff0b5'
    ctx.fillRect(-9, -9, 18, 18)

    ctx.restore()
  })

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true

  return texture
}

// --------------------------------------------------
// Floating branded 3D gold coin
// Coin cylinder axis is aligned with the Z axis.
// Both faces have the same readable brand artwork.
// --------------------------------------------------

function FloatingCoin({
  position,
  scale = 1,
  speed = 1,
  tilt = [0.15, 0, -0.12],
  reducedMotion = false,
}) {
  const ref = useRef(null)

  const texture = useMemo(
    () => createGoldSureeCoinTexture(),
    []
  )

  useEffect(() => {
    return () => {
      texture.dispose()
    }
  }, [texture])

  useFrame(({ clock }, delta) => {
    if (!ref.current || reducedMotion) return

    const time = clock.elapsedTime * speed

    // Gentle floating motion
    ref.current.position.y =
      position[1] + Math.sin(time) * 0.055

    // Rotate around the coin's vertical viewing axis
    ref.current.rotation.y += delta * 0.3 * speed

    // Subtle natural tilt
    ref.current.rotation.x =
      tilt[0] + Math.sin(time * 0.5) * 0.045

    ref.current.rotation.z =
      tilt[2] + Math.sin(time * 0.4) * 0.035
  })

  return (
    <group
      ref={ref}
      position={position}
      rotation={tilt}
      scale={scale}
    >
      {/* Solid coin body: thickness runs along Z */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.62, 0.62, 0.13, 128]} />

        <meshPhysicalMaterial
          color={GOLD}
          metalness={1}
          roughness={0.23}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* FRONT face: GoldSuree branding */}
      <mesh position={[0, 0, 0.066]} castShadow>
        <circleGeometry args={[0.575, 128]} />

        <meshPhysicalMaterial
          map={texture}
          metalness={0.68}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.12}
          side={2}
        />
      </mesh>

      {/* BACK face: same GoldSuree branding */}
      <mesh
        position={[0, 0, -0.066]}
        rotation={[0, Math.PI, 0]}
        castShadow
      >
        <circleGeometry args={[0.575, 128]} />

        <meshPhysicalMaterial
          map={texture}
          metalness={0.68}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.12}
          side={2}
        />
      </mesh>

      {/* Raised metallic rim on the front */}
      <mesh position={[0, 0, 0.055]}>
        <torusGeometry args={[0.588, 0.022, 16, 128]} />

        <meshPhysicalMaterial
          color={PALE_GOLD}
          metalness={1}
          roughness={0.17}
          clearcoat={1}
        />
      </mesh>

      {/* Raised metallic rim on the reverse */}
      <mesh
        position={[0, 0, -0.055]}
        rotation={[0, Math.PI, 0]}
      >
        <torusGeometry args={[0.588, 0.022, 16, 128]} />

        <meshPhysicalMaterial
          color={PALE_GOLD}
          metalness={1}
          roughness={0.17}
          clearcoat={1}
        />
      </mesh>

      {/* Fine engraved border on the front */}
      <mesh position={[0, 0, 0.067]}>
        <torusGeometry args={[0.535, 0.004, 8, 128]} />

        <meshBasicMaterial
          color="#fff0b5"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Fine engraved border on the reverse */}
      <mesh
        position={[0, 0, -0.067]}
        rotation={[0, Math.PI, 0]}
      >
        <torusGeometry args={[0.535, 0.004, 8, 128]} />

        <meshBasicMaterial
          color="#fff0b5"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// --------------------------------------------------
// Decorative orbital rings around the coins
// --------------------------------------------------

function Orbit({
  radius,
  tube,
  rotation,
  speed = 0.04,
  reducedMotion = false,
}) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.z += delta * speed
    }
  })

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, 160]} />

      <meshBasicMaterial
        color="#bd8d45"
        transparent
        opacity={0.58}
      />
    </mesh>
  )
}

// --------------------------------------------------
// Marble display pedestal
// --------------------------------------------------

function GoldPedestal({ reducedMotion }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return

    ref.current.position.y =
      -1.65 + Math.sin(clock.elapsedTime * 0.55) * 0.012
  })

  return (
    <group ref={ref} position={[0, -1.65, -0.55]}>
      {/* Marble body */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.63, 1.78, 0.5, 96]} />

        <meshPhysicalMaterial
          color="#e9ddc7"
          metalness={0.04}
          roughness={0.31}
          clearcoat={0.4}
        />
      </mesh>

      {/* Gold trim */}
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[1.62, 0.045, 12, 128]} />

        <meshPhysicalMaterial
          color={GOLD}
          metalness={1}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Cream top surface */}
      <mesh position={[0, 0.205, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.035, 96]} />

        <meshStandardMaterial
          color="#f8f0e2"
          roughness={0.28}
        />
      </mesh>
    </group>
  )
}

// --------------------------------------------------
// Subtle floating golden particles
// --------------------------------------------------

function GoldParticles({ reducedMotion }) {
  const group = useRef(null)

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        x: Math.sin(i * 12.989) * 1.8,
        y: Math.cos(i * 7.123) * 1.8,
        z: Math.sin(i * 4.21) * 0.45,
        size: 0.012 + (i % 4) * 0.008,
      })),
    []
  )

  useFrame(({ clock }) => {
    if (!group.current || reducedMotion) return

    group.current.children.forEach((particle, i) => {
      particle.position.y =
        particles[i].y +
        Math.sin(clock.elapsedTime * 0.5 + i) * 0.045
    })
  })

  return (
    <group ref={group}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={[particle.x, particle.y, particle.z]}
        >
          <sphereGeometry args={[particle.size, 10, 10]} />

          <meshBasicMaterial
            color={i % 3 === 0 ? '#fff0bd' : '#c8953d'}
          />
        </mesh>
      ))}
    </group>
  )
}

// --------------------------------------------------
// Coin arrangement and pointer-responsive movement
// --------------------------------------------------

function JewelleryCollection({ reducedMotion }) {
  const ref = useRef(null)

  useFrame(({ pointer, clock }, delta) => {
    if (!ref.current || reducedMotion) return

    const targetX = -pointer.y * 0.09

    const targetY =
      pointer.x * 0.13 +
      Math.sin(clock.elapsedTime * 0.25) * 0.025

    ref.current.rotation.x = MathUtils.damp(
      ref.current.rotation.x,
      targetX,
      3,
      delta
    )

    ref.current.rotation.y = MathUtils.damp(
      ref.current.rotation.y,
      targetY,
      3,
      delta
    )
  })

  return (
    <group ref={ref}>
      {/* Main hero coin */}
      <FloatingCoin
        position={[0, 0.18, 0.35]}
        scale={0.95}
        speed={0.7}
        tilt={[0.12, 0, -0.1]}
        reducedMotion={reducedMotion}
      />

      {/* Left coin */}
      <FloatingCoin
        position={[-1.03, 0.42, -0.3]}
        scale={0.64}
        speed={0.85}
        tilt={[0.25, 0, 0.15]}
        reducedMotion={reducedMotion}
      />

      {/* Upper-right coin */}
      <FloatingCoin
        position={[0.9, 0.76, -0.35]}
        scale={0.56}
        speed={0.9}
        tilt={[-0.18, 0, -0.12]}
        reducedMotion={reducedMotion}
      />

      {/* Lower-right coin */}
      <FloatingCoin
        position={[0.86, -0.65, 0.05]}
        scale={0.48}
        speed={0.65}
        tilt={[0.2, 0, 0.18]}
        reducedMotion={reducedMotion}
      />

      {/* Small background coin */}
      <FloatingCoin
        position={[-0.15, -0.85, -0.6]}
        scale={0.38}
        speed={0.75}
        tilt={[-0.2, 0, 0.1]}
        reducedMotion={reducedMotion}
      />
    </group>
  )
}

// --------------------------------------------------
// Scene lighting
// --------------------------------------------------

function SceneLights() {
  return (
    <>
      <ambientLight intensity={1.3} />

      <directionalLight
        position={[3, 5, 5]}
        intensity={3}
        color="#fff1ce"
      />

      <pointLight
        position={[-3, 2, 3]}
        intensity={18}
        color="#f3c467"
      />

      <pointLight
        position={[2, -1, 2]}
        intensity={8}
        color="#fff1c5"
      />

      <directionalLight
        position={[0, 3, -3]}
        intensity={2}
        color="#d4a34c"
      />
    </>
  )
}

// --------------------------------------------------
// Complete 3D scene
// --------------------------------------------------

function Scene({ reducedMotion }) {
  return (
    <>
      <SceneLights />

      <GoldPedestal reducedMotion={reducedMotion} />

      <GoldParticles reducedMotion={reducedMotion} />

      <Orbit
        radius={1.65}
        tube={0.006}
        rotation={[0.9, 0.25, 0.4]}
        speed={0.035}
        reducedMotion={reducedMotion}
      />

      <Orbit
        radius={1.95}
        tube={0.004}
        rotation={[0.3, 1.0, -0.45]}
        speed={-0.025}
        reducedMotion={reducedMotion}
      />

      <Orbit
        radius={1.35}
        tube={0.005}
        rotation={[1.1, 0.5, 0.8]}
        speed={0.02}
        reducedMotion={reducedMotion}
      />

      <JewelleryCollection reducedMotion={reducedMotion} />
    </>
  )
}

// --------------------------------------------------
// Main component
// --------------------------------------------------

export default function GoldJewelleryScene() {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = Boolean(prefersReducedMotion)

  const sceneRef = useRef(null)

  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches)
    }

    updateDevice()

    mediaQuery.addEventListener('change', updateDevice)

    return () => {
      mediaQuery.removeEventListener('change', updateDevice)
    }
  }, [])

  // Pause rendering when the scene is outside the viewport
  useEffect(() => {
    const element = sceneRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={sceneRef}
      className="gold-jewellery-scene"
      role="img"
      aria-label="Premium three-dimensional metallic gold coins with GoldSuree branding on both faces, floating above a cream marble pedestal"
    >
      <div
        className="gold-scene-glow"
        aria-hidden="true"
      />

      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        dpr={isMobile ? [1, 1.1] : [1, 1.5]}
        frameloop={
          reducedMotion
            ? 'demand'
            : isVisible
              ? 'always'
              : 'never'
        }
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'default',
        }}
        fallback={
          <div className="gold-scene-fallback">
            GoldSuree — Your Gold. Your True Worth.
          </div>
        }
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
