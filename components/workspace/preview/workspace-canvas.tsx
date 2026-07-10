"use client"

import { Canvas } from "@react-three/fiber"
import { ContactShadows, Environment, Loader } from "@react-three/drei"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import { Suspense } from "react"
import { CameraRig } from "@/components/workspace/preview/camera-rig"
import {
  RoomShell,
  WorkspaceFurniture,
} from "@/components/workspace/preview/furniture"

function Staging() {
  return (
    <>
      <Environment files="/hdri/lebombo_1k.hdr" />
      <ContactShadows
        position={[0, 0.01, -0.8]}
        opacity={0.45}
        scale={8}
        blur={2.2}
        far={4}
      />
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <N8AO aoRadius={0.45} intensity={1.1} distanceFalloff={0.85} />
      </EffectComposer>
    </>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#e8eef2"]} />
      <fog attach="fog" args={["#e8eef2", 14, 28]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 7, 3]}
        intensity={1.05}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <directionalLight
        position={[-3, 4, 2]}
        intensity={0.4}
        color="#b8d4e8"
      />
      <hemisphereLight intensity={0.35} color="#fff8ee" groundColor="#c4b59a" />
      <RoomShell />
      <WorkspaceFurniture />
      <CameraRig />
      <Suspense fallback={null}>
        <Staging />
      </Suspense>
    </>
  )
}

export function WorkspaceCanvas() {
  return (
    <div className="relative size-full min-h-[320px] overflow-hidden rounded-xl bg-[#e8eef2]">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0.15, 1.55, 3.4], fov: 42, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        className="size-full"
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{ background: "transparent" }}
        innerStyles={{ width: 120 }}
        barStyles={{ height: 3, background: "#67b9e8" }}
        dataStyles={{
          color: "#64748b",
          fontSize: 11,
          fontFamily: "inherit",
        }}
        dataInterpolation={(p) => `Loading room ${p.toFixed(0)}%`}
      />
      <p className="pointer-events-none absolute bottom-3 left-3 z-[1] rounded-md bg-background/75 px-2 py-1 text-[10px] tracking-wide text-muted-foreground backdrop-blur md:bottom-4 md:left-4 md:text-[11px]">
        3D preview is illustrative
      </p>
    </div>
  )
}
