
import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { MathUtils } from 'three'
import './GoldJewelleryScene.css'

const GOLD = '#d9a83e'
const PALE_GOLD = '#ffe7a5'


function OrnateRing({ position, scale = 1, speed = 0.5 }) {
  const ref = useRef(null)

  useFrame(({ clock }, delta) => {
    if (!ref.current) return
    ref.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * speed) * 0.06
    ref.current.rotation.y += delta * 0.08
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Thick polished gold band */}
      <mesh rotation={[0.85, 0.1, 0.3]}>
        <torusGeometry args={[0.68, 0.13, 32, 128]} />
        <meshPhysicalMaterial
          color="#d99b25"
          metalness={1}
          roughness={0.16}
          clearcoat={1}
        />
      </mesh>

      {/* Raised decorative border */}
      {[0.55, 0.81].map((radius, i) => (
        <mesh key={i} rotation={[0.85, 0.1, 0.3]}>
          <torusGeometry args={[radius, 0.025, 12, 128]} />
          <meshStandardMaterial
            color="#fff0ad"
            metalness={1}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Repeating raised floral-style gold details */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2

        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * 0.68,
              Math.sin(angle) * 0.68,
              0,
            ]}
            rotation={[0, 0, angle]}
          >
            <mesh scale={[0.045, 0.075, 0.025]}>
              <sphereGeometry args={[1, 16, 12]} />
              <meshPhysicalMaterial
                color="#ffe3a0"
                metalness={1}
                roughness={0.2}
              />
            </mesh>
          </group>
        )
      })}

      {/* Diamond setting */}
      <group position={[0, 0.72, 0.08]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.17, 0.12, 8]} />
          <meshStandardMaterial
            color="#bd8529"
            metalness={1}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0.12, 0]}>
          <octahedronGeometry args={[0.17, 1]} />
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.05}
            roughness={0.025}
            transmission={0.15}
            thickness={0.5}
            clearcoat={1}
          />
        </mesh>

        {/* Small stones around the centre */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.19,
                0.08,
                Math.sin(angle) * 0.19,
              ]}
            >
              <octahedronGeometry args={[0.045, 0]} />
              <meshPhysicalMaterial
                color="#fffaf0"
                metalness={0.05}
                roughness={0.04}
                clearcoat={1}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function OrnateKada({ position, scale = 1, speed = 0.4 }) {
  const ref = useRef(null)

  useFrame(({ clock }, delta) => {
    if (!ref.current) return
    ref.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * speed + 1) * 0.05
    ref.current.rotation.z += delta * 0.035
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Multiple raised bands make the kada look substantial */}
      {[-0.12, 0, 0.12].map((offset, i) => (
        <mesh
          key={i}
          rotation={[1.05, 0.2, 0.35]}
        >
          <torusGeometry
            args={[0.63 + Math.abs(offset) * 0.1, 0.07, 24, 128]}
          />
          <meshPhysicalMaterial
            color={i === 1 ? '#f2c65c' : '#b8791d'}
            metalness={1}
            roughness={0.19}
            clearcoat={1}
          />
        </mesh>
      ))}

      {/* Detailed repeating ornament around the outer band */}
      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2

        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * 0.64,
              Math.sin(angle) * 0.64,
              0,
            ]}
          >
            <mesh rotation={[0, 0, angle]}>
              <sphereGeometry args={[0.038, 12, 10]} />
              <meshStandardMaterial
                color="#ffe3a0"
                metalness={1}
                roughness={0.2}
              />
            </mesh>

            <mesh
              position={[
                Math.cos(angle) * 0.045,
                Math.sin(angle) * 0.045,
                0.025,
              ]}
              scale={[0.025, 0.055, 0.02]}
            >
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#d49a35"
                metalness={1}
                roughness={0.22}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}


function FloatingPendant({ position, scale = 1 }) {
  const ref = useRef(null)

  useFrame(({ clock }, delta) => {
    if (!ref.current) return

    ref.current.position.y =
      position[1] + Math.sin(clock.elapsedTime * 0.8 + 2) * 0.06

    ref.current.rotation.y += delta * 0.18
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh rotation={[0.4, 0.2, 0.2]}>
        <torusGeometry args={[0.31, 0.055, 20, 80]} />
        <meshPhysicalMaterial
          color={GOLD}
          metalness={1}
          roughness={0.16}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0, -0.02, 0.03]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color="#fff0bd"
          metalness={0.2}
          roughness={0.07}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0, 0.38, 0]}>
        <torusGeometry args={[0.085, 0.023, 12, 36]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

function Orbit({ radius, tube, rotation, speed = 0.04 }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed
    }
  })

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 8, 160]} />
      <meshBasicMaterial
        color="#bd8d45"
        transparent
        opacity={0.72}
      />
    </mesh>
  )
}

function GoldPedestal() {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        -1.65 + Math.sin(clock.elapsedTime * 0.55) * 0.012
    }
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

      {/* Gold trim around top */}
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

function GoldParticles() {
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
    if (!group.current) return

    group.current.children.forEach((particle, i) => {
      particle.position.y =
        particles[i].y +
        Math.sin(clock.elapsedTime * 0.5 + i) * 0.045
    })
  })

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 10, 10]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#fff0bd' : '#c8953d'}
          />
        </mesh>
      ))}
    </group>
  )
}

function JewelleryCollection({ reducedMotion }) {
  const ref = useRef(null)

  useFrame(({ pointer, clock }, delta) => {
    if (!ref.current || reducedMotion) return

    const targetX = -pointer.y * 0.12
    const targetY =
      pointer.x * 0.18 + Math.sin(clock.elapsedTime * 0.25) * 0.035

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
      <FloatingBangle
        position={[-0.9, 0.0, -0.25]}
        scale={0.82}
        speed={0.7}
      />

      <FloatingRing
        position={[0.05, 0.35, 0.3]}
        scale={0.91}
        speed={0.8}
        gemstone
      />

      <FloatingPendant
        position={[1.02, 0.8, -0.4]}
        scale={0.9}
      />

      <FloatingRing
        position={[0.83, -0.65, 0.1]}
        scale={0.58}
        speed={0.9}
      />

      <FloatingRing
        position={[-0.05, -0.72, -0.55]}
        scale={0.42}
        speed={0.6}
      />
    </group>
  )
}

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

function Scene({ reducedMotion }) {
  return (
    <>
      <SceneLights />

      <GoldPedestal />
      <GoldParticles />

      <Orbit
        radius={1.65}
        tube={0.006}
        rotation={[0.9, 0.25, 0.4]}
        speed={reducedMotion ? 0 : 0.035}
      />

      <Orbit
        radius={1.95}
        tube={0.004}
        rotation={[0.3, 1.0, -0.45]}
        speed={reducedMotion ? 0 : -0.025}
      />

      <Orbit
        radius={1.35}
        tube={0.005}
        rotation={[1.1, 0.5, 0.8]}
        speed={reducedMotion ? 0 : 0.02}
      />

      <JewelleryCollection reducedMotion={reducedMotion} />
    </>
  )
}

export default function GoldJewelleryScene() {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = Boolean(prefersReducedMotion)

  return (
    <div
      className="gold-jewellery-scene"
      role="img"
      aria-label="Animated three-dimensional gold jewellery with floating rings, gemstones and a marble display pedestal"
    >
      <div className="gold-scene-glow" aria-hidden="true" />

      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'default',
        }}
        fallback={
          <div className="gold-scene-fallback">
            Gold, in a new light
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
