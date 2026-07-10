"use client"

import { useEffect, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { useWorkspaceStore, type CameraView } from "@/lib/workspace-store"

const PRESETS: Record<
  CameraView,
  { position: [number, number, number]; target: [number, number, number] }
> = {
  front: { position: [0.15, 1.55, 3.4], target: [0, 0.9, -0.6] },
  top: { position: [0, 5.2, 0.2], target: [0, 0, -0.5] },
  side: { position: [3.6, 1.4, 0.4], target: [0, 0.85, -0.5] },
}

type ControlsHandle = {
  target: THREE.Vector3
  update: () => void
}

export function CameraRig() {
  const cameraView = useWorkspaceStore((s) => s.cameraView)
  const controlsRef = useRef<ControlsHandle | null>(null)
  const { camera } = useThree()
  const anim = useRef({
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(),
    toTarget: new THREE.Vector3(),
    t: 1,
  })

  useEffect(() => {
    const preset = PRESETS[cameraView]
    const controls = controlsRef.current
    anim.current.fromPos.copy(camera.position)
    anim.current.toPos.set(...preset.position)
    if (controls) {
      anim.current.fromTarget.copy(controls.target)
    } else {
      anim.current.fromTarget.set(...PRESETS.front.target)
    }
    anim.current.toTarget.set(...preset.target)
    anim.current.t = 0
  }, [cameraView, camera])

  useFrame((_, delta) => {
    const a = anim.current
    if (a.t >= 1) return
    a.t = Math.min(1, a.t + delta * 2.2)
    const k = 1 - Math.pow(1 - a.t, 3)
    camera.position.lerpVectors(a.fromPos, a.toPos, k)
    const controls = controlsRef.current
    if (controls) {
      controls.target.lerpVectors(a.fromTarget, a.toTarget, k)
      controls.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef as never}
      makeDefault
      enablePan={false}
      minDistance={2.2}
      maxDistance={6}
      maxPolarAngle={Math.PI / 2.05}
      minPolarAngle={0.15}
      target={PRESETS.front.target}
    />
  )
}
