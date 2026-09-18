"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, Text3D, OrbitControls, Environment } from "@react-three/drei";

/**
 * A REAL 3D question mark (extruded + beveled glyph) with a glossy gold material.
 * It continuously revolves a full 360°, and you can drag it with the cursor to
 * spin it in any direction. Rendered with Three.js via react-three-fiber.
 *
 * Loaded via a client-only dynamic import (WebGL can't server-render).
 */
export default function Question3D() {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[400px]">
      {/* ambient gold glow behind the mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl"
      />
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* lighting for a glossy, solid look */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 6, 5]} intensity={2.4} />
        <pointLight position={[-5, -3, 4]} intensity={1.4} color="#ffdd66" />
        <pointLight position={[4, -4, -4]} intensity={0.9} color="#ffffff" />

        <Suspense fallback={null}>
          <Center>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={3.6}
              height={0.5}
              curveSegments={24}
              bevelEnabled
              bevelThickness={0.14}
              bevelSize={0.1}
              bevelSegments={10}
            >
              ?
              <meshPhysicalMaterial
                color="#FFC400"
                metalness={0.15}
                roughness={0.22}
                clearcoat={1}
                clearcoatRoughness={0.12}
              />
            </Text3D>
          </Center>
          {/* soft reflections for realism (falls back gracefully) */}
          <Environment preset="sunset" />
        </Suspense>

        {/* auto-revolve 360° + drag to spin in any direction */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={3}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
