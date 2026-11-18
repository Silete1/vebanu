/**
 * The ziggurat of Ur and its plain, as Cycles rendered them: the lab's shot d v2 materials (baked-brick skin
 * over a sun-dried core, erosion, reed-mat courses, bitumen seams, dust in the recesses) under the v2 moon and
 * night sky, baked into one texture per surface. RGB holds everything but the torches; alpha holds the torches
 * alone, which flicker here. The pilgrims on the stair are instanced and lit live by the same moon.
 */
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Group,
  InstancedMesh,
  type Material,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  type Texture,
  Vector3,
} from "three"

import type { Assets } from "./assets"
import { SIGNAL, moonDirection, toThree } from "./data"

export type ZigguratLayer = {
  group: Group
  /** the shrine, for the pointer ("ANU Brain") */
  shrine: Mesh
  update(time: number): void
  dispose(): void
}

/** An unlit baked surface: RGB × scale + the torch layer (alpha) tinted and flickered, fogged like the rest. */
function baked(map: Texture, scale: { moon: number; torch: number }, torch: Color, flicker: { value: number }) {
  const m = new MeshBasicMaterial({ map, color: new Color(scale.moon, scale.moon, scale.moon) })
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTorch = { value: new Vector3(torch.r, torch.g, torch.b).multiplyScalar(scale.torch) }
    shader.uniforms.uFlicker = flicker
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uTorch;\nuniform float uFlicker;")
      .replace(
        "#include <map_fragment>",
        `vec4 bakeTexel = texture2D(map, vMapUv);
        diffuseColor.rgb *= bakeTexel.rgb;
        diffuseColor.rgb += uTorch * pow(bakeTexel.a, 2.2) * uFlicker;`
      )
  }
  return m
}

export function createZiggurat(a: Assets): ZigguratLayer {
  const { data, beauty } = a
  const group = new Group()
  const flicker = { value: 1 }
  // the torch layer was baked as luminance: give it the flame's warmth back
  const torch = new Color().setRGB(...data.torchColor).multiplyScalar(4.5)
  const owned: Material[] = []
  const surface = { Body: "body", GroundNear: "near", GroundFar: "far" } as const

  a.statics.scene.updateMatrixWorld(true)
  for (const node of a.statics.scene.children.slice()) {
    const meshes: Mesh[] = []
    node.traverse((o) => {
      if ((o as Mesh).isMesh) meshes.push(o as Mesh)
    })
    const part = surface[node.name as keyof typeof surface]
    const material = part
      ? baked(beauty[part], data.beauty[part], torch, flicker)
      : node.name === "Door"
        ? new MeshBasicMaterial({ color: new Color(SIGNAL).multiplyScalar(2.2) })
        : undefined
    if (!material) continue
    owned.push(material)
    for (const mesh of meshes) {
      mesh.material = material
      group.attach(mesh) // quantized glTF dequantizes through the node transform: keep the world matrix
    }
  }

  // the shrine, for the pointer (invisible box)
  const roof = toThree(data.roof)
  const shrine = new Mesh(new BoxGeometry(13, 7, 10), new MeshBasicMaterial({ visible: false }))
  shrine.position.set(roof.x, roof.y - 3, roof.z)
  group.add(shrine)

  // pilgrims climbing the stair: one instanced draw, lit by the moon and a little sky
  let figureGeo: Mesh["geometry"] | undefined
  let figureMatrix = new Matrix4()
  a.movers.scene.updateMatrixWorld(true)
  a.movers.scene.getObjectByName("Figure")?.traverse((o) => {
    if ((o as Mesh).isMesh) {
      figureGeo = (o as Mesh).geometry
      figureMatrix = o.matrixWorld.clone()
    }
  })
  const cloth = new MeshStandardMaterial({ color: new Color(0.045, 0.04, 0.035), roughness: 0.95 })
  owned.push(cloth)
  const people = new InstancedMesh(figureGeo, cloth, data.figures.length)
  const dummy = new Object3D()
  data.figures.forEach(([x, y, z, yaw, h], i) => {
    toThree([x, y, z], dummy.position)
    dummy.rotation.set(0, yaw, 0)
    dummy.scale.setScalar(h)
    dummy.updateMatrix()
    people.setMatrixAt(i, dummy.matrix.clone().multiply(figureMatrix))
  })
  group.add(people)

  const moon = new DirectionalLight(new Color().setRGB(...data.moon.color), data.moon.strength * 0.5)
  moon.position.copy(moonDirection(data.moon)).multiplyScalar(500)
  const sky = new AmbientLight(new Color(0.35, 0.42, 0.6), 0.18)
  group.add(moon, sky)

  return {
    group,
    shrine,
    update(time) {
      // a few incommensurate flames' worth of flicker
      flicker.value = 0.86 + 0.08 * Math.sin(time * 9.1) + 0.05 * Math.sin(time * 23.3 + 1.3) + 0.04 * Math.sin(time * 3.7)
    },
    dispose() {
      shrine.geometry.dispose()
      ;(shrine.material as Material).dispose()
      for (const m of owned) m.dispose()
      people.dispose()
    },
  }
}
