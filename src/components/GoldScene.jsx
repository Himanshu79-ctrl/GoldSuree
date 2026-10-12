"use client";
// npm i three @react-three/fiber @react-three/drei framer-motion

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Float,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { useInView, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Procedural textures + materials (built once, no image files)       */
/* ------------------------------------------------------------------ */
function makeTexture(w, h, draw, srgb = false) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Embossed coin face (white = raised, grey = field)
function drawCoinFace(ctx, s) {
  const c = s / 2;
  ctx.fillStyle = "#707070";
  ctx.fillRect(0, 0, s, s);
  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = s * 0.05;
  ctx.beginPath();
  ctx.arc(c, c, s * 0.455, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(c + Math.cos(a) * s * 0.39, c + Math.sin(a) * s * 0.39, s * 0.009, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.lineWidth = s * 0.012;
  ctx.beginPath();
  ctx.arc(c, c, s * 0.33, 0, Math.PI * 2);
  ctx.stroke();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold ${s * 0.26}px Georgia, serif`;
  ctx.fillText("Au", c, c - s * 0.03);
  ctx.font = `${s * 0.07}px Georgia, serif`;
  ctx.fillText("FINE GOLD", c, c - s * 0.22);
  ctx.fillText("999.9", c, c + s * 0.17);
}

// Reeded coin edge
function drawReeding(ctx, w, h) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  for (let x = 0; x < w; x += 8) ctx.fillRect(x, 0, 4, h);
}

// Stamp on the gold bar
function drawBarStamp(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "#7d5a22";
  ctx.fillStyle = "#7d5a22";
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, w - 32, h - 32);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 46px Georgia, serif";
  ctx.fillText("GOLDSUREE", w / 2, h * 0.3);
  ctx.font = "34px Georgia, serif";
  ctx.fillText("FINE GOLD  999.9", w / 2, h * 0.55);
  ctx.font = "bold 40px Georgia, serif";
  ctx.fillText("10 g", w / 2, h * 0.79);
}

let ASSETS = null;
function getAssets() {
  if (ASSETS) return ASSETS;

  const faceTex = makeTexture(512, 512, drawCoinFace);
  const sideTex = makeTexture(512, 8, drawReeding);
  sideTex.wrapS = THREE.RepeatWrapping;
  sideTex.wrapT = THREE.RepeatWrapping;
  sideTex.repeat.set(2, 1);
  const stampTex = makeTexture(512, 256, drawBarStamp, true);

  const base = {
    color: "#e2b650",
    metalness: 1,
    roughness: 0.2,
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    envMapIntensity: 1.8,
  };

  ASSETS = {
    gold: new THREE.MeshPhysicalMaterial(base),
    matte: new THREE.MeshPhysicalMaterial({
      ...base,
      color: "#c9993f",
      roughness: 0.45,
      clearcoat: 0.1,
    }),
    face: new THREE.MeshPhysicalMaterial({
      ...base,
      bumpMap: faceTex,
      bumpScale: 2,
      roughness: 0.24,
    }),
    side: new THREE.MeshPhysicalMaterial({
      ...base,
      bumpMap: sideTex,
      bumpScale: 1.5,
      roughness: 0.3,
    }),
    nugget: new THREE.MeshPhysicalMaterial({
      ...base,
      color: "#d8aa4a",
      roughness: 0.34,
      clearcoat: 0.15,
    }),
    stamp: new THREE.MeshStandardMaterial({
      map: stampTex,
      transparent: true,
      metalness: 0.8,
      roughness: 0.55,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    }),
  };
  return ASSETS;
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */
function Coin() {
  const A = getAssets();
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* body: [edge, top face, bottom face] */}
      <mesh material={[A.side, A.face, A.face]}>
        <cylinderGeometry args={[0.3, 0.3, 0.055, 96, 1]} />
      </mesh>
      {/* polished rounded rims */}
      <mesh position={[0, 0.0275, 0]} rotation={[Math.PI / 2, 0, 0]} material={A.gold}>
        <torusGeometry args={[0.292, 0.02, 20, 96]} />
      </mesh>
      <mesh position={[0, -0.0275, 0]} rotation={[Math.PI / 2, 0, 0]} material={A.gold}>
        <torusGeometry args={[0.292, 0.02, 20, 96]} />
      </mesh>
    </group>
  );
}

function Bar() {
  const A = getAssets();
  return (
    <group>
      <RoundedBox args={[0.78, 0.2, 0.38]} radius={0.045} smoothness={6} material={A.gold} />
      {/* slightly recessed, matte stamping panel */}
      <RoundedBox
        args={[0.6, 0.012, 0.28]}
        radius={0.006}
        smoothness={2}
        position={[0, 0.1, 0]}
        material={A.matte}
      />
      <mesh position={[0, 0.1075, 0]} rotation={[-Math.PI / 2, 0, 0]} material={A.stamp}>
        <planeGeometry args={[0.56, 0.28]} />
      </mesh>
    </group>
  );
}

function Nugget({ seed = 1 }) {
  const A = getAssets();
  const geo = useMemo(() => {
    let g = new THREE.IcosahedronGeometry(0.22, 4);
    g.deleteAttribute("normal");
    g.deleteAttribute("uv");
    g = mergeVertices(g, 1e-4);
    const p = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i).normalize();
      const n =
        Math.sin(v.x * 4.2 + seed) * Math.cos(v.y * 3.6 + seed * 2) * 0.55 +
        Math.sin(v.z * 6.5 + seed * 3) * 0.28 +
        Math.sin((v.x + v.y + v.z) * 11 + seed) * 0.09;
      v.multiplyScalar(0.22 * (1 + n * 0.32));
      v.y *= 0.82;
      p.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, [seed]);

  return <mesh geometry={geo} material={A.nugget} />;
}

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */
const PIECES = [
  // right side (hero pieces, spill past the calculator card)
  { t: "coin", p: [3.3, 0.6, 0.8], s: 1.7, spin: [0.12, 0.45, 0.05], f: 1.0 },
  { t: "bar", p: [2.5, -1.5, 0.3], s: 1.3, spin: [0.08, 0.3, 0.1], f: 1.2 },
  { t: "nugget", p: [3.7, 1.8, -0.5], s: 1.5, spin: [0.15, 0.3, 0.2], f: 1.5, seed: 4 },
  { t: "coin", p: [1.6, 1.8, -1.5], s: 1.1, spin: [0.2, 0.5, 0.1], f: 1.6 },
  // middle, further back
  { t: "coin", p: [0.4, -1.9, -1.0], s: 1.0, spin: [0.25, 0.45, 0], f: 1.7 },
  { t: "nugget", p: [0.2, 0.9, -2.2], s: 0.9, spin: [0.2, 0.35, 0.2], f: 1.4, seed: 7 },
  { t: "bar", p: [1.0, 0.2, -2.8], s: 1.2, spin: [0.1, 0.3, 0.1], f: 1.1 },
  { t: "coin", p: [-0.6, -0.6, -3.2], s: 0.9, spin: [0.2, 0.4, 0.1], f: 1.3 },
  // left edges and corners
  { t: "coin", p: [-3.7, 1.7, -0.3], s: 1.2, spin: [0.18, 0.5, 0], f: 1.3 },
  { t: "bar", p: [-3.9, -1.2, 0.2], s: 1.4, spin: [0.1, 0.35, 0.15], f: 1.0 },
  { t: "nugget", p: [-2.6, -1.9, -0.4], s: 1.2, spin: [0.25, 0.4, 0.15], f: 1.8, seed: 11 },
  { t: "coin", p: [-2.4, 0.9, -2.0], s: 1.0, spin: [0.15, 0.45, 0.1], f: 1.5 },
  { t: "nugget", p: [-1.2, 1.9, 0.4], s: 0.7, spin: [0.3, 0.4, 0.2], f: 2.0, seed: 3 },
];

function Piece({ data, still }) {
  const ref = useRef();
  const viewport = useThree((s) => s.viewport);

  // keep pieces on screen on any aspect ratio (phones included)
  const kx = THREE.MathUtils.clamp(viewport.width / 8.2, 0.32, 1.35);
  const ks = THREE.MathUtils.clamp(viewport.width / 8.2, 0.62, 1.1);

  useFrame((_, dt) => {
    if (still || !ref.current) return;
    ref.current.rotation.x += data.spin[0] * dt;
    ref.current.rotation.y += data.spin[1] * dt;
    ref.current.rotation.z += data.spin[2] * dt;
  });

  return (
    <Float
      speed={still ? 0 : data.f}
      rotationIntensity={0.15}
      floatIntensity={0.8}
      floatingRange={[-0.18, 0.18]}
    >
      <group position={[data.p[0] * kx, data.p[1], data.p[2]]} scale={data.s * ks}>
        <group ref={ref} rotation={[0.5, 0.3, 0.1]}>
          {data.t === "coin" && <Coin />}
          {data.t === "bar" && <Bar />}
          {data.t === "nugget" && <Nugget seed={data.seed} />}
        </group>
      </group>
    </Float>
  );
}

/* Mouse + scroll driven rig */
function Rig({ children, still }) {
  const g = useRef();
  const m = useRef({ x: 0, y: 0 });

  // window-level listener: the canvas has pointer-events-none, so r3f's own pointer never updates
  useEffect(() => {
    const onMove = (e) => {
      m.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      m.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(() => {
    if (still || !g.current) return;
    const sy = typeof window !== "undefined" ? window.scrollY : 0;
    g.current.rotation.y = THREE.MathUtils.lerp(
      g.current.rotation.y,
      m.current.x * 0.25 + Math.sin(sy * 0.002) * 0.25,
      0.05
    );
    g.current.rotation.x = THREE.MathUtils.lerp(
      g.current.rotation.x,
      -m.current.y * 0.14,
      0.05
    );
  });
  return <group ref={g}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/*  Exported background                                                */
/* ------------------------------------------------------------------ */
export default function GoldScene({ className = "", fogColor = "#eee7db" }) {
  const wrap = useRef(null);
  const inView = useInView(wrap, { margin: "200px" });
  const reduce = useReducedMotion();

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6.4], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        frameloop={inView && !reduce ? "always" : "demand"}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        {/* atmospheric depth: far pieces melt softly into the page colour */}
        <fog attach="fog" args={[fogColor, 7.5, 17]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#fff1d0" />
        <directionalLight position={[-5, -2, 3]} intensity={0.8} color="#ffd9a0" />
        <pointLight position={[0, 0, 4]} intensity={8} color="#ffe6b0" distance={12} />

        {/* Contrasty studio reflections: this is what makes gold look real */}
        <Environment resolution={512} frames={1}>
          <Lightformer form="rect" intensity={5} position={[0, 6, -4]} scale={[14, 3, 1]} color="#fff3d6" />
          <Lightformer form="rect" intensity={4} position={[-6, 1, 2]} scale={[2.5, 9, 1]} color="#ffe2a8" />
          <Lightformer form="rect" intensity={4} position={[6, -1, 3]} scale={[2.5, 9, 1]} color="#fff0cc" />
          <Lightformer form="rect" intensity={3} position={[0, -5, 2]} scale={[12, 2, 1]} color="#ffd48a" />
          <Lightformer form="circle" intensity={6} position={[3, 3, 5]} scale={2} color="#ffffff" />
          <Lightformer form="ring" intensity={2} position={[0, 0, 7]} scale={5} color="#fff7e6" />
        </Environment>

        <Rig still={reduce}>
          {PIECES.map((d, i) => (
            <Piece key={i} data={d} still={reduce} />
          ))}
        </Rig>

        {/* fine floating gold dust */}
        {!reduce && (
          <Sparkles
            count={55}
            scale={[11, 6, 5]}
            size={3}
            speed={0.25}
            opacity={0.85}
            color="#ffdf9a"
          />
        )}
      </Canvas>
    </div>
  );
}