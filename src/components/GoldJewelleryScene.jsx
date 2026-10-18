
import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import { MathUtils } from 'three'
import { useReducedMotion } from 'framer-motion'

import './GoldJewelleryScene.css'

const FONT_URL = '/fonts/helvetiker_bold.typeface.json'

// --------------------------------------------------
// 3D GOLD SUREE LETTERING
// Real extruded text geometry, not an image texture.
// --------------------------------------------------

function CoinFaceBrand({ back = false }) {
  return (
    <group
      position={[0, 0, back ? -0.071 : 0.071]}
      rotation={back ? [0, Math.PI, 0] : [0, 0, 0]}
    >
      {/* Brand name */}
      <Text3D
        font={FONT_URL}
        size={0.135}
        height={0.018}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.002}
        bevelSize={0.0015}
        bevelSegments={3}
        letterSpacing={-0.008}
        position={[0, 0.07, 0]}
        anchorX="center"
        anchorY="middle"
      >
        GoldSuree
        <meshStandardMaterial
          color="#fff1bb"
          metalness={0.9}
          roughness={0.22}
        />
      </Text3D>

      {/* Divider */}
      <mesh position={[0, -0.035, 0.002]}>
        <boxGeometry args={[0.39, 0.006, 0.008]} />
        <meshStandardMaterial
          color="#98651c"
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* Tagline */}
      <Text3D
        font={FONT_URL}
        size={0.047}
        height={0.009}
        curveSegments={8}
        bevelEnabled
        bevelThickness={0.001}
        bevelSize={0.0008}
        bevelSegments={2}
        letterSpacing={0.005}
        position={[0, -0.115, 0.003]}
        anchorX="center"
        anchorY="middle"
      >
        WE BUY GOLD
        <meshStandardMaterial
          color="#fff0b0"
          metalness={0.85}
          roughness={0.25}
        />
      </Text3D>
    </group>
  )
}

// --------------------------------------------------
// COIN GEOMETRY
// Solid gold body + two faces + double raised rims.
// Cylinder is rotated so the coin faces point along Z.
// --------------------------------------------------

function FloatingCoin({
  position,
  scale = 1,
  speed = 1,
  tilt = [0.15, 0, -0.12],
  reducedMotion = false,
}) {
  const ref = useRef(null)

  useFrame(({ clock }, delta) => {
    if (!ref.current || reducedMotion) return

    const time = clock.elapsedTime * speed

    ref.current.position.y =
      position[1] + Math.sin(time) * 0.045

    ref.current.rotation.y += delta * 0.25 * speed

    ref.current.rotation.x =
      tilt[0] + Math.sin(time * 0.5) * 0.035

    ref.current.rotation.z =
      tilt[2] + Math.sin(time * 0.4) * 0.025
  })

  return (
    <group
      ref={ref}
      position={position}
      rotation={tilt}
      scale={scale}
    >
      {/* Solid coin edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.62, 0.14, 128]} />
        <meshStandardMaterial
          color="#c9942c"
          metalness={1}
          roughness={0.22}
        />
      </mesh>

      {/* Front face */}
      <mesh position={[0, 0, 0.071]} castShadow>
        <circleGeometry args={[0.585, 128]} />
        <meshStandardMaterial
          color="#e5b747"
          metalness={0.9}
          roughness={0.25}
          side={2}
        />
      </mesh>

      {/* Back face */}
      <mesh
        position={[0, 0, -0.071]}
        rotation={[0, Math.PI, 0]}
        castShadow
      >
        <circleGeometry args={[0.585, 128]} />
        <meshStandardMaterial
          color="#e5b747"
          metalness={0.9}
          roughness={0.25}
          side={2}
        />
      </mesh>

      {/* Front raised rim */}
      <mesh position={[0, 0, 0.073]}>
        <torusGeometry args={[0.59, 0.018, 16, 128]} />
        <meshStandardMaterial
          color="#ffe8a4"
          metalness={1}
          roughness={0.18}
        />
      </mesh>

      {/* Back raised rim */}
      <mesh
        position={[0, 0, -0.073]}
        rotation={[0, Math.PI, 0]}
      >
        <torusGeometry args={[0.59, 0.018, 16, 128]} />
        <meshStandardMaterial
          color="#ffe8a4"
          metalness={1}
          roughness={0.18}
        />
      </mesh>

      {/* Front and reverse 3D branding */}
      <CoinFaceBrand />
      <CoinFaceBrand back />
    </group>
  )
}

// --------------------------------------------------
// SUBTLE ORBITAL DETAILS
// --------------------------------------------------

function Orbit({ radius, rotation, reducedMotion }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) {
      ref.current.rotation.z += delta * 0.025
    }
  })

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.004, 8, 128]} />
      <meshBasicMaterial
        color="#bd8d45"
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

// --------------------------------------------------
// PEDESTAL
// --------------------------------------------------

function GoldPedestal() {
  return (
    <group position={[0, -1.55, -0.5]}>
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[1.55, 1.7, 0.42, 96]} />
        <meshStandardMaterial
          color="#e9ddc7"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[0, 0.17, 0]}>
        <torusGeometry args={[1.55, 0.035, 12, 128]} />
        <meshStandardMaterial
          color="#d9a83e"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.165, 0]}>
        <cylinderGeometry args={[1.53, 1.53, 0.025, 96]} />
        <meshStandardMaterial
          color="#f8f0e2"
          roughness={0.28}
        />
      </mesh>
    </group>
  )
}

// --------------------------------------------------
// COIN ARRANGEMENT
// --------------------------------------------------

function JewelleryCollection({ reducedMotion }) {
  const ref = useRef(null)

  useFrame(({ pointer, clock }, delta) => {
    if (!ref.current || reducedMotion) return

    ref.current.rotation.x = MathUtils.damp(
      ref.current.rotation.x,
      -pointer.y * 0.07,
      3,
      delta
    )

    ref.current.rotation.y = MathUtils.damp(
      ref.current.rotation.y,
      pointer.x * 0.1 +
        Math.sin(clock.elapsedTime * 0.2) * 0.02,
      3,
      delta
    )
  })

  return (
    <group ref={ref}>
      {/* Hero coin */}
      <FloatingCoin
        position={[0, 0.12, 0.45]}
        scale={0.95}
        speed={0.7}
        reducedMotion={reducedMotion}
      />

      {/* Left coin */}
      <FloatingCoin
        position={[-1.02, 0.42, -0.25]}
        scale={0.62}
        speed={0.8}
        tilt={[0.22, 0, 0.14]}
        reducedMotion={reducedMotion}
      />

      {/* Upper-right coin */}
      <FloatingCoin
        position={[0.9, 0.72, -0.35]}
        scale={0.54}
        speed={0.9}
        tilt={[-0.16, 0, -0.1]}
        reducedMotion={reducedMotion}
      />

      {/* Lower-right coin */}
      <FloatingCoin
        position={[0.82, -0.62, 0.05]}
        scale={0.46}
        speed={0.65}
        tilt={[0.18, 0, 0.14]}
        reducedMotion={reducedMotion}
      />

      {/* Small background coin */}
      <FloatingCoin
        position={[-0.15, -0.82, -0.5]}
        scale={0.36}
        speed={0.75}
        reducedMotion={reducedMotion}
      />
    </group>
  )
}

// --------------------------------------------------
// SCENE
// --------------------------------------------------

function Scene({ reducedMotion }) {
  return (
    <>
      <ambientLight intensity={1.1} />

      <directionalLight
        position={[3, 5, 5]}
        intensity={2.5}
        color="#fff1ce"
      />

      <pointLight
        position={[-3, 2, 3]}
        intensity={12}
        color="#f3c467"
      />

      <pointLight
        position={[2, -1, 2]}
        intensity={6}
        color="#fff0c0"
      />

      <directionalLight
        position={[0, 3, -3]}
        intensity={1.8}
        color="#d4a34c"
      />

      <GoldPedestal />

      <Orbit
        radius={1.65}
        rotation={[0.9, 0.25, 0.4]}
        reducedMotion={reducedMotion}
      />

      <Orbit
        radius={1.9}
        rotation={[0.3, 1, -0.45]}
        reducedMotion={reducedMotion}
      />

      <JewelleryCollection reducedMotion={reducedMotion} />
    </>
  )
}

// --------------------------------------------------
// EXPORTED HERO SCENE
// --------------------------------------------------

export default function GoldJewelleryScene() {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = Boolean(prefersReducedMotion)

  const camera = useMemo(
    () => ({ position: [0, 0, 6.4], fov: 42 }),
    []
  )

  return (
    <div
      className="gold-jewellery-scene"
      role="img"
      aria-label="Premium metallic gold coins with three-dimensional GoldSuree branding on both faces"
    >
      <div className="gold-scene-glow" aria-hidden="true" />

      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'default',
        }}
      >
        <Suspense fallback={null}>
          <Scene reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  )
}
