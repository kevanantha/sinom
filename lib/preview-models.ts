/** Paths to curated lookalike GLTFs in /public/models */
export const PREVIEW_MODELS = {
  deskElectric: "/models/desk-electric.glb",
  deskMechanical: "/models/desk-mechanical.glb",
  chairErgo: "/models/chair-ergo.glb",
  chairLight: "/models/chair.glb",
  monitor24: "/models/monitor-24.glb",
  monitor27: "/models/monitor-27.glb",
  monitor34: "/models/monitor-34.glb",
  lamp: "/models/lamp.glb",
  plant: "/models/plant.glb",
} as const

export const PREVIEW_MODEL_URLS = Object.values(PREVIEW_MODELS)

export function deskModelUrl(variant: string) {
  return variant === "mechanical"
    ? PREVIEW_MODELS.deskMechanical
    : PREVIEW_MODELS.deskElectric
}

export function chairModelUrl(variant: string) {
  return variant === "mesh-grey"
    ? PREVIEW_MODELS.chairLight
    : PREVIEW_MODELS.chairErgo
}

export function monitorModelUrl(variant: string) {
  if (variant === "ultrawide-34") return PREVIEW_MODELS.monitor34
  if (variant === "uhd-27") return PREVIEW_MODELS.monitor27
  return PREVIEW_MODELS.monitor24
}
