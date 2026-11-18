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

/**
 * MeshStandardMaterial plus the baked torch layer (lightmap alpha, flickered) and, on walls, the Ur courses the
 * lab's Blender material has: a reed-mat band every 2.4 m with a bitumen seam above it, and grime near the ground.
 */
function earthen(material: MeshStandardMaterial, torch: { color: Color; scale: number }, flicker: { value: number }, courses: boolean) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTorch = { value: new Vector3(torch.color.r, torch.color.g, torch.color.b).multiplyScalar(torch.scale) }
    shader.uniforms.uFlicker = flicker
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWorld;")
      .replace("#include <project_vertex>", "#include <project_vertex>\nvWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;")
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform vec3 uTorch;\nuniform float uFlicker;\nvarying vec3 vWorld;")
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
        float ground = mix(0.62, 1.0, smoothstep(0.0, 5.0, vWorld.y));
        diffuseColor.rgb *= ground * (0.92 + 0.08 * sin(vWorld.x * 0.21 + sin(vWorld.z * 0.13) * 2.0));
        ${courses ? `float k = fract(vWorld.y / 2.4);
        float reed = smoothstep(0.0, 0.012, k) * (1.0 - smoothstep(0.035, 0.05, k));
        float seam = smoothstep(0.05, 0.058, k) * (1.0 - smoothstep(0.066, 0.074, k));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.16, 0.12, 0.07) * 0.6, reed * 0.85);
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.012, 0.011, 0.010), seam * 0.9);` : ""}`
      )
      .replace("irradiance += lightMapIrradiance;", "irradiance += lightMapIrradiance + uTorch * pow(lightMapTexel.a, 2.2) * uFlicker;")
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
  const standard = (map: typeof tex.wallDiff, normal: typeof tex.wallNor, color: Color, courses = false, lightMap = lightmap.body, scale = lm.body) => {
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
    earthen(m, { color: torchColor, scale: (lm.body === scale ? lm.body.torch : lm.ground.torch) * PI }, flicker, courses)
    return m
  }
  lightmap.body.channel = 1
  const wall = standard(tex.wallDiff, tex.wallNor, tint(0.62), true)
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
  const ground = standard(tex.groundDiff, tex.groundNor, new Color().setRGB(0.86 * 0.26, 0.8 * 0.26, 0.72 * 0.26), false, lightmap.ground, lm.ground)
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
