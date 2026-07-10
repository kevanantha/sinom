"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { CameraRig } from "@/components/workspace/preview/camera-rig"
import { RoomShell, WorkspaceFurniture } from "@/components/workspace/preview/furniture"

function Scene() {
  return (
    <>
      <color attach="background" args={["#e8eef2"]} />
      <fog attach="fog" args={["#e8eef2", 12, 24]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 7, 3]} intensity={1.25} />
      <directionalLight position={[-3, 4, 2]} intensity={0.45} color="#b8d4e8" />
      <hemisphereLight intensity={0.35} color="#fff8ee" groundColor="#c4b59a" />
      <RoomShell />
      <WorkspaceFurniture />
      <CameraRig />
    </>
  )
}

export function WorkspaceCanvas() {
  return (
    <div className="relative size-full min-h-[320px] overflow-hidden rounded-xl bg-[#e8eef2]">
      <Canvas
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
    </div>
  )
}
