/**
 * The ziggurat and the plain, lit by light baked in Blender Cycles: the lightmap's RGB is moon + night sky +
 * the shrine's blue door, its alpha the torches (flickered here). Mud-brick, plaster and cracked-mud textures
 * are CC0 (Poly Haven), tiled at their real size; a faint live moon adds the brick relief the bake can't.
 */
import {
  BufferAttribute,
  Color,
  DirectionalLight,
  Group,
  type Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Vector2,
  Vector3,
} from "three"

import type { Assets } from "./assets"
import { SIGNAL, moonDirection } from "./data"

export type ZigguratLayer = {
  group: Group
  /** the shrine, for the pointer ("ANU Brain") */
  shrine: Mesh
  update(time: number): void
  dispose(): void
}

/** Adds the torch layer (lightmap alpha) to MeshStandardMaterial's baked irradiance. */
function withTorches(material: MeshStandardMaterial, torch: { color: Color; scale: number }, flicker: { value: number }) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTorch = { value: new Vector3(torch.color.r, torch.color.g, torch.color.b).multiplyScalar(torch.scale) }
    shader.uniforms.uFlicker = flicker
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uTorch;\nuniform float uFlicker;")
      .replace(
        "irradiance += lightMapIrradiance;",
        "irradiance += lightMapIrradiance + uTorch * pow(lightMapTexel.a, 2.2) * uFlicker;"
      )
  }
}

export function createZiggurat(a: Assets): ZigguratLayer {
  const { data, tex, lightmap } = a
  const group = new Group()
  const flicker = { value: 1 }
  const torchColor = new Color().setRGB(...data.torchColor)
  const PI = Math.PI
  const clay = new Color(0xa27a57)
  const tint = (value: number) =>
    new Color().setRGB(...([clay.r, clay.g, clay.b].map((c) => (0.78 + 0.22 * (c / Math.max(clay.r, clay.g, clay.b))) * value) as [number, number, number]))

  const lm = data.lightmaps
  const standard = (map: typeof tex.wallDiff, normal: typeof tex.wallNor, color: Color, lightMap = lightmap.body, scale = lm.body) => {
    const m = new MeshStandardMaterial({
      map,
      normalMap: normal,
      normalScale: new Vector2(0.9, 0.9),
      color,
      roughness: 0.93,
      metalness: 0,
      lightMap,
      lightMapIntensity: scale.moon * PI,
    })
    withTorches(m, { color: torchColor, scale: (lm.body === scale ? lm.body.torch : lm.ground.torch) * PI }, flicker)
    return m
  }
  lightmap.body.channel = 1
  const wall = standard(tex.wallDiff, tex.wallNor, tint(0.62))
  const top = standard(tex.topDiff, tex.topNor, tint(0.8))
  const glow = new MeshBasicMaterial({ color: new Color(SIGNAL).multiplyScalar(2.4) })
  const inlay = new MeshBasicMaterial({ color: new Color(SIGNAL).multiplyScalar(0.5) })

  const owned: Material[] = [wall, top, glow, inlay]
  // quantized glTF keeps its dequantization in the node transforms: `attach` keeps each mesh's world matrix
  a.gltf.scene.updateMatrixWorld(true)
  for (const node of a.gltf.scene.children.slice()) {
    const meshes: Mesh[] = []
    node.traverse((o) => {
      if ((o as Mesh).isMesh) meshes.push(o as Mesh)
    })
    const pick =
      node.name === "Body"
        ? (mesh: Mesh) => ((mesh.material as Material).name.split(".")[0] === "top" ? top : wall)
        : node.name === "Door"
          ? () => glow
          : node.name === "Inlay"
            ? () => inlay
            : undefined
    if (!pick) continue
    for (const mesh of meshes) {
      mesh.material = pick(mesh)
      group.attach(mesh)
    }
  }

  // the shrine's box, for the pointer (invisible)
  const roof = new Vector3(data.roof[0], data.roof[2], -data.roof[1])
  const shrine = new Mesh(new PlaneGeometry(1, 1), new MeshBasicMaterial({ visible: false }))
  shrine.scale.set(9, 7, 1)
  shrine.position.set(roof.x, roof.y - 3.4, roof.z + 3.6)
  shrine.rotation.y = (data.yawDeg * PI) / 180
  group.add(shrine)

  // the plain: one big quad; lightmap UVs cover the baked patch and clamp to its open edge beyond
  const size = 9000
  const plane = new PlaneGeometry(size, size, 1, 1).rotateX(-PI / 2)
  const p = plane.attributes.position
  const uv = new Float32Array(p.count * 2)
  const uv1 = new Float32Array(p.count * 2)
  const half = data.groundPatch / 2
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i)
    const z = p.getZ(i)
    uv.set([x / data.tile.ground, -z / data.tile.ground], i * 2)
    uv1.set([(x + half) / data.groundPatch, (-z + half) / data.groundPatch], i * 2)
  }
  plane.setAttribute("uv", new BufferAttribute(uv, 2))
  plane.setAttribute("uv1", new BufferAttribute(uv1, 2))
  lightmap.ground.channel = 1
  const ground = standard(tex.groundDiff, tex.groundNor, new Color().setRGB(0.86 * 0.26, 0.8 * 0.26, 0.72 * 0.26), lightmap.ground, lm.ground)
  ground.normalScale.set(0.7, 0.7)
  owned.push(ground)
  const plain = new Mesh(plane, ground)
  plain.position.y = -0.02
  group.add(plain)

  // a faint live moon for relief and the slabs' sheen (the bake already holds the moon's light)
  const moon = new DirectionalLight(new Color().setRGB(...data.moon.color), data.moon.strength * 0.35)
  moon.position.copy(moonDirection(data.moon)).multiplyScalar(500)
  group.add(moon)

  return {
    group,
    shrine,
    update(time) {
      // a few incommensurate flames' worth of flicker
      flicker.value = 0.86 + 0.08 * Math.sin(time * 9.1) + 0.05 * Math.sin(time * 23.3 + 1.3) + 0.04 * Math.sin(time * 3.7)
    },
    dispose() {
      plane.dispose()
      shrine.geometry.dispose()
      for (const m of owned) m.dispose()
      ;(shrine.material as Material).dispose()
    },
  }
}
