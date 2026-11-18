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

type Detail = { maps: NonNullable<Assets["detail"]>; meta: Assets["data"]["detail"]; moon: Vector3 }

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

/**
 * An unlit baked surface: RGB × scale + the torch layer (alpha) tinted and flickered, fogged like the rest.
 * With `detail` (close-ups) a tiling brick/plaster layer at world scale rides on the bake within ~70 m of the
 * camera: its albedo over its mean (so the bake keeps its light) and its normal lit by the bake's moon.
 */
function baked(map: Texture, scale: { moon: number; torch: number }, torch: Color, flicker: { value: number }, detail?: Detail) {
  const m = new MeshBasicMaterial({ map, color: new Color(scale.moon, scale.moon, scale.moon) })
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTorch = { value: new Vector3(torch.r, torch.g, torch.b).multiplyScalar(scale.torch) }
    shader.uniforms.uFlicker = flicker
    let fragmentHead = "#include <common>\nuniform vec3 uTorch;\nuniform float uFlicker;"
    let detailCode = ""
    if (detail) {
      const lin = (v: number[]) => new Vector3(...v.map(srgbToLinear))
      Object.assign(shader.uniforms, {
        uWallDiff: { value: detail.maps.wallDiff },
        uWallNor: { value: detail.maps.wallNor },
        uTopDiff: { value: detail.maps.topDiff },
        uTopNor: { value: detail.maps.topNor },
        uWallMean: { value: lin(detail.meta.wall.mean) },
        uTopMean: { value: lin(detail.meta.top.mean) },
        uRep: { value: new Vector3(detail.meta.wall.repeat, detail.meta.top.repeat, 0) },
        uMoon: { value: detail.moon },
      })
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vDetailPos;")
        .replace("#include <project_vertex>", "#include <project_vertex>\nvDetailPos = (modelMatrix * vec4(transformed, 1.0)).xyz;")
      fragmentHead +=
        "\nvarying vec3 vDetailPos;\nuniform sampler2D uWallDiff, uWallNor, uTopDiff, uTopNor;\nuniform vec3 uWallMean, uTopMean, uRep, uMoon;"
      detailCode = `
        vec3 gn = normalize(cross(dFdx(vDetailPos), dFdy(vDetailPos)));
        vec3 an = abs(gn);
        bool top = an.y > 0.7;
        vec3 T = top ? vec3(1.0, 0.0, 0.0) : (an.x > an.z ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0));
        vec3 B = top ? vec3(0.0, 0.0, 1.0) : vec3(0.0, 1.0, 0.0);
        vec2 duv = vec2(dot(vDetailPos, T), dot(vDetailPos, B)) / (top ? uRep.y : uRep.x);
        vec3 alb = top ? texture2D(uTopDiff, duv).rgb : texture2D(uWallDiff, duv).rgb;
        vec3 tn = (top ? texture2D(uTopNor, duv).rgb : texture2D(uWallNor, duv).rgb) * 2.0 - 1.0;
        vec3 dn = normalize(T * tn.x + B * tn.y + gn * tn.z);
        float shade = 1.0 + 0.9 * (max(dot(dn, uMoon), 0.0) - max(dot(gn, uMoon), 0.0));
        float k = 0.85 * smoothstep(70.0, 12.0, distance(vDetailPos, cameraPosition));
        diffuseColor.rgb *= mix(vec3(1.0), clamp(alb / (top ? uTopMean : uWallMean), 0.35, 2.0) * shade, k);`
    }
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", fragmentHead).replace(
      "#include <map_fragment>",
      `vec4 bakeTexel = texture2D(map, vMapUv);
      diffuseColor.rgb *= bakeTexel.rgb;
      diffuseColor.rgb += uTorch * pow(bakeTexel.a, 2.2) * uFlicker;${detailCode}`
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
    const detail = part === "body" && a.detail ? { maps: a.detail, meta: data.detail, moon: moonDirection(data.moon) } : undefined
    const material = part
      ? baked(beauty[part], data.beauty[part], torch, flicker, detail)
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
