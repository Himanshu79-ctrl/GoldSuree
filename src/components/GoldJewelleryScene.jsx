
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { MathUtils } from 'three'
import './GoldJewelleryScene.css'

const GOLD = '#d9a83e'
const LIGHT_GOLD = '#ffe6a0'

function FloatingRing({ position, scale = 1, speed = 1 }) {
  const ringRef = useRef(null)

  useFrame((state, delta) => {
    if (!ringRef.current) return

    ringRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.08

    ringRef.current.rotation.z += delta * 0.12
  })

  return (
    <group ref={ringRef} position={position} scale={scale}>
      <mesh rotation={[0.3, 0.2, 0.25]}>
        <torusGeometry args={[0.57, 0.105, 24, 96]} />
        <meshPhysicalMaterial
          color={GOLD}
          metalness={1}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0.12, 0.53, 0.04]}>
        <octahedronGeometry args={[0.19, 0]} />
        <meshPhysicalMaterial
          color={LIGHT_GOLD}
          metalness={0.35}
          roughness={0.08}
          clearcoat={1}
        />
      </mesh>
    </group>
  )
}

function FloatingBangle({ position, scale = 1, speed = 1 }) {
  const bangleRef = useRef(null)

  useFrame((state, delta) => {
    if (!bangleRef.current) return

    bangleRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed + 1.5) * 0.1

    bangleRef.current.rotation.z += delta * 0.09
  })

  return (
    <group ref={bangleRef} position={position} scale={scale}>
      <mesh rotation={[0.95, 0.25, 0.4]}>
        <torusGeometry args={[0.65, 0.075, 20, 100]} />
        <meshPhysicalMaterial
          color="#bd8529"
          metalness={1}
          roughness={0.23}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0.55, 0.25, 0.12]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial
          color={LIGHT_GOLD}
          metalness={1}
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}

function FloatingPendant({ position, scale = 1, speed = 1 }) {
  const pendantRef = useRef(null)

  useFrame((state, delta) => {
    if (!pendantRef.current) return

    pendantRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed + 2.5) * 0.07

    pendantRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={pendantRef} position={position} scale={scale}>
      <mesh rotation={[0.35, 0.2, 0.2]}>
        <torusGeometry args={[0.32, 0.055, 18, 64]} />
        <meshPhysicalMaterial
          color={GOLD}
          metalness={1}
          roughness={0.18}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0, 0, 0.04]}>
        <octahedronGeometry args={[0.24, 0]} />
        <meshPhysicalMaterial
          color="#fff0bd"
          metalness={0.25}
          roughness={0.08}
          clearcoat={1}
        />
      </mesh>

      <mesh position={[0, 0.39, 0]}>
        <torusGeometry args={[0.09, 0.025, 12, 32]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

function JewelleryCollection({ reducedMotion }) {
  const collectionRef = useRef(null)

  useFrame((state, delta) => {
    if (!collectionRef.current || reducedMotion) return

    const targetX = -state.pointer.y * 0.14
    const targetY = state.pointer.x * 0.2

    collectionRef.current.rotation.x = MathUtils.damp(
      collectionRef.current.rotation.x,
      targetX,
      4,
      delta
    )

    collectionRef.current.rotation.y = MathUtils.damp(
      collectionRef.current.rotation.y,
      targetY,
      4,
      delta
    )
  })

  return (
    <group ref={collectionRef}>
      <FloatingRing
        position={[0.05, 0.12, 0.3]}
        scale={1.05}
        speed={0.8}
      />

      <FloatingBangle
        position={[-0.95, -0.62, -0.35]}
        scale={0.82}
        speed={0.65}
      />

      <FloatingPendant
        position={[0.95, 0.72, -0.45]}
        scale={0.9}
        speed={0.9}
      />

      <FloatingRing
        position={[0.95, -0.75, -0.8]}
        scale={0.45}
        speed={1.1}
      />
    </group>
  )
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.7} />

      <spotLight
        position={[3, 5, 5]}
        angle={0.55}
        penumbra={1}
        intensity={100}
        color="#fff0c7"
      />

      <pointLight
        position={[-4, 1, 3]}
        intensity={30}
        color="#e4a333"
      />

      <pointLight
        position={[2, -3, -2]}
        intensity={20}
        color="#ffcf70"
      />
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
      aria-label="Floating three-dimensional gold ring, bangle and gemstone pendant"
    >
      <div className="gold-scene-glow" aria-hidden="true" />

      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        fallback={
          <div className="gold-scene-fallback">
            Discover the GoldSuree difference
          </div>
        }
      >
        <Suspense fallback={null}>
          <SceneLights />
          <JewelleryCollection reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>

      <div className="gold-scene-caption">
        <span className="gold-scene-caption-dot" />
        <span>GOLD, IN A NEW LIGHT</span>
      </div>
    </div>
  )
}
