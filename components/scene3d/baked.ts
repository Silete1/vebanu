/**
 * The shared material for surfaces baked in Blender Cycles (the ziggurat and its plain, the Workshops shop):
 * unlit, the bake carries the light. Optional layers: a flickering torch layer in the alpha, and a tiling detail
 * layer for close-ups.
 */
import { Color, MeshBasicMaterial, type Texture, Vector3 } from "three"

import type { Assets } from "./assets"

export type BakedDetail = { maps: NonNullable<Assets["detail"]>; meta: Assets["data"]["detail"]; moon: Vector3 }
export type BakedTorch = { color: Color; scale: number; flicker: { value: number } }

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

/**
 * An unlit baked surface (a Cycles COMBINED bake): RGB × scale, fogged like the rest; with `torch`, the alpha layer
 * tinted and flickered (the ziggurat's torches).
 * With `detail` (close-ups) a tiling brick/plaster layer at world scale rides on the bake within ~70 m of the
 * camera: its albedo over its mean (so the bake keeps its light) and its normal lit by the bake's moon.
 */
export function bakedMaterial(map: Texture, scale: number, opts: { torch?: BakedTorch; detail?: BakedDetail } = {}) {
  const { torch, detail } = opts
  const m = new MeshBasicMaterial({ map, color: new Color(scale, scale, scale) })
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTorch = { value: torch ? new Vector3(torch.color.r, torch.color.g, torch.color.b).multiplyScalar(torch.scale) : new Vector3() }
    shader.uniforms.uFlicker = torch?.flicker ?? { value: 0 }
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
      ${torch ? "diffuseColor.rgb += uTorch * pow(bakeTexel.a, 2.2) * uFlicker;" : ""}${detailCode}`
    )
  }
  return m
}
