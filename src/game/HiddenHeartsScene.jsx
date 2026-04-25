import { useEffect, useRef } from "react";
import * as THREE from "three";
import { generatedAssets, getLevelGeneratedAssets } from "./generatedAssets.js";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

let glowTexture;

function resolvePalette(level) {
  const visual = level.visual || {};
  return {
    accent: level.accent,
    sky: level.sky,
    ground: level.ground,
    horizon: visual.horizon || level.sky,
    secondary: visual.secondary || "#f8c75c",
    mist: visual.mist || level.accent,
    particle: visual.particle || level.accent,
    portal: visual.portal || level.accent,
    ally: visual.ally || "#ffeac2",
    enemy: visual.enemy || "#120b16",
    enemyAura: visual.enemyAura || "#ff3d6e",
    skyline: visual.skyline || "#121827",
    fogDensity: visual.fogDensity || 0.05,
  };
}

function getGlowTexture() {
  if (glowTexture) return glowTexture;

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.22, "rgba(255, 255, 255, 0.82)");
  gradient.addColorStop(0.54, "rgba(255, 255, 255, 0.22)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);

  glowTexture = new THREE.CanvasTexture(canvas);
  glowTexture.colorSpace = THREE.SRGBColorSpace;
  return glowTexture;
}

function makeGlowSprite(color, size = 1, opacity = 0.4) {
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: getGlowTexture(),
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  sprite.scale.set(size, size, size);
  return sprite;
}

function makeSkyDome(palette) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(palette.sky) },
      horizonColor: { value: new THREE.Color(palette.horizon) },
      bottomColor: { value: new THREE.Color(palette.ground).lerp(new THREE.Color(palette.sky), 0.42) },
      accentColor: { value: new THREE.Color(palette.accent) },
    },
    vertexShader: `
      varying vec3 vWorldPosition;

      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 bottomColor;
      uniform vec3 accentColor;
      varying vec3 vWorldPosition;

      void main() {
        float h = normalize(vWorldPosition).y * 0.5 + 0.5;
        vec3 color = mix(bottomColor, horizonColor, smoothstep(0.0, 0.42, h));
        color = mix(color, topColor, smoothstep(0.34, 1.0, h));
        float horizonGlow = pow(max(0.0, 1.0 - abs(h - 0.43) * 3.2), 2.4);
        color += accentColor * horizonGlow * 0.18;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
  });

  const dome = new THREE.Mesh(new THREE.SphereGeometry(64, 32, 18), material);
  dome.renderOrder = -10;
  return dome;
}

function heartGeometry(size = 0.35, depth = 0.16) {
  const shape = new THREE.Shape();
  shape.moveTo(0, size * 0.35);
  shape.bezierCurveTo(0, size * 0.1, -size, size * 0.1, -size, size * 0.55);
  shape.bezierCurveTo(-size, size * 1.05, 0, size * 1.25, 0, size * 1.72);
  shape.bezierCurveTo(0, size * 1.25, size, size * 1.05, size, size * 0.55);
  shape.bezierCurveTo(size, size * 0.1, 0, size * 0.1, 0, size * 0.35);

  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.025,
    bevelThickness: 0.025,
  });
}

function makeWing(material, side = 1) {
  const group = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(side * 1.15, 0.5);
  shape.lineTo(side * 0.72, -0.1);
  shape.lineTo(side * 1.05, -0.58);
  shape.lineTo(side * 0.14, -0.26);
  shape.lineTo(0, 0);
  const wing = new THREE.Mesh(new THREE.ShapeGeometry(shape), material);
  wing.rotation.y = side * -0.35;
  wing.position.set(side * 0.28, 0.52, -0.12);
  group.add(wing);

  const veinMaterial = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  for (let i = 0; i < 3; i += 1) {
    const vein = new THREE.Mesh(new THREE.PlaneGeometry(0.48 - i * 0.06, 0.025), veinMaterial);
    vein.position.set(side * (0.4 + i * 0.18), 0.28 - i * 0.23, -0.1);
    vein.rotation.z = side * (-0.45 - i * 0.2);
    group.add(vein);
  }

  return group;
}

function makePlayer(palette) {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: "#f7f0dd",
    roughness: 0.36,
    metalness: 0.08,
    emissive: palette.accent,
    emissiveIntensity: 0.12,
  });
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.33, 0.92, 8, 20),
    bodyMaterial,
  );
  body.castShadow = true;
  body.position.y = 0.86;
  group.add(body);

  const maskMaterial = new THREE.MeshStandardMaterial({
    color: palette.accent,
    roughness: 0.22,
    metalness: 0.32,
    emissive: palette.accent,
    emissiveIntensity: 0.24,
  });
  const mask = new THREE.Mesh(
    new THREE.SphereGeometry(0.27, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
    maskMaterial,
  );
  mask.position.set(0, 1.55, 0.05);
  group.add(mask);

  const heartCore = new THREE.Mesh(
    heartGeometry(0.09, 0.035),
    new THREE.MeshStandardMaterial({
      color: palette.secondary,
      roughness: 0.18,
      metalness: 0.2,
      emissive: palette.secondary,
      emissiveIntensity: 0.7,
    }),
  );
  heartCore.position.set(0, 1.05, 0.34);
  heartCore.rotation.x = Math.PI;
  group.add(heartCore);

  const wingMaterial = new THREE.MeshStandardMaterial({
    color: "#fff4d8",
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    roughness: 0.32,
    metalness: 0.04,
    emissive: palette.secondary,
    emissiveIntensity: 0.18,
  });
  group.add(makeWing(wingMaterial, -1));
  group.add(makeWing(wingMaterial, 1));

  const aura = new THREE.Mesh(
    new THREE.TorusGeometry(0.86, 0.018, 8, 64),
    new THREE.MeshBasicMaterial({
      color: palette.accent,
      transparent: true,
      opacity: 0.52,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  aura.rotation.x = Math.PI / 2;
  aura.position.y = 0.08;
  group.add(aura);

  const auraOuter = new THREE.Mesh(
    new THREE.TorusGeometry(1.14, 0.01, 8, 80),
    new THREE.MeshBasicMaterial({
      color: palette.secondary,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  auraOuter.rotation.x = Math.PI / 2;
  auraOuter.position.y = 0.06;
  group.add(auraOuter);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.012, 8, 56),
    new THREE.MeshBasicMaterial({
      color: palette.secondary,
      transparent: true,
      opacity: 0.44,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 1.78;
  group.add(halo);

  const glow = makeGlowSprite(palette.accent, 2.15, 0.28);
  glow.position.y = 0.95;
  group.add(glow);

  const attackRing = new THREE.Mesh(
    new THREE.RingGeometry(0.58, 1.45, 96),
    new THREE.MeshBasicMaterial({
      color: palette.secondary,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  attackRing.rotation.x = -Math.PI / 2;
  attackRing.position.y = 0.09;
  attackRing.visible = false;
  group.add(attackRing);

  group.userData = {
    aura,
    auraOuter,
    halo,
    glow,
    attackRing,
    bodyMaterial,
    maskMaterial,
    heartCore,
    hurtUntil: 0,
  };
  return group;
}

function makePickup(label, palette, index, total) {
  const group = new THREE.Group();
  const radius = 4.2;
  const angle = (index / total) * Math.PI * 2 + 0.55;
  const mesh = new THREE.Mesh(
    heartGeometry(0.22, 0.12),
    new THREE.MeshStandardMaterial({
      color: palette.secondary,
      roughness: 0.16,
      metalness: 0.22,
      emissive: palette.accent,
      emissiveIntensity: 0.92,
    }),
  );
  mesh.castShadow = true;
  mesh.rotation.x = Math.PI;
  group.add(mesh);

  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.34, 0),
    new THREE.MeshStandardMaterial({
      color: palette.accent,
      roughness: 0.2,
      metalness: 0.18,
      emissive: palette.particle,
      emissiveIntensity: 0.36,
      transparent: true,
      opacity: 0.45,
    }),
  );
  crystal.position.y = -0.02;
  group.add(crystal);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.46, 0.012, 8, 56),
    new THREE.MeshBasicMaterial({
      color: palette.particle,
      transparent: true,
      opacity: 0.58,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  const glow = makeGlowSprite(palette.particle, 1.25, 0.34);
  glow.position.y = 0.04;
  group.add(glow);

  group.position.set(Math.cos(angle) * radius, 0.72, Math.sin(angle) * radius);
  group.userData = {
    label,
    baseY: group.position.y,
    active: true,
    type: "pickup",
    crystal,
    glow,
    ring,
  };
  return group;
}

function makeEnemy(name, palette, index, total) {
  const group = new THREE.Group();
  const radius = 6.2;
  const angle = (index / total) * Math.PI * 2 + 2.1;
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: palette.enemy,
    roughness: 0.24,
    metalness: 0.42,
    emissive: index % 2 ? palette.enemyAura : palette.accent,
    emissiveIntensity: 0.76,
  });
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.42, 2),
    coreMaterial,
  );
  core.castShadow = true;
  group.add(core);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.68, 1),
    new THREE.MeshBasicMaterial({
      color: palette.enemyAura,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(shell);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.026, 8, 80),
    new THREE.MeshBasicMaterial({
      color: index % 2 ? palette.enemyAura : palette.accent,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  ring.rotation.x = Math.PI / 2.4;
  group.add(ring);

  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.94, 0.01, 8, 88),
    new THREE.MeshBasicMaterial({
      color: palette.secondary,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  outerRing.rotation.x = Math.PI / 1.8;
  outerRing.rotation.y = Math.PI / 6;
  group.add(outerRing);

  const glow = makeGlowSprite(palette.enemyAura, 1.55, 0.36);
  group.add(glow);

  group.position.set(Math.cos(angle) * radius, 0.78, Math.sin(angle) * radius);
  group.userData = {
    name,
    hp: 3,
    active: true,
    seed: index + 1,
    type: "enemy",
    ring,
    outerRing,
    shell,
    core,
    coreMaterial,
    glow,
    hitAt: -10,
  };
  return group;
}

function makeAlly(name, palette, index) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.22, 0.58, 6, 14),
    new THREE.MeshStandardMaterial({
      color: index % 2 ? "#d8fbff" : palette.ally,
      roughness: 0.36,
      metalness: 0.05,
      emissive: palette.ally,
      emissiveIntensity: 0.18,
    }),
  );
  body.position.y = 0.58;
  group.add(body);

  const heart = new THREE.Mesh(
    heartGeometry(0.08, 0.035),
    new THREE.MeshStandardMaterial({
      color: palette.secondary,
      roughness: 0.2,
      metalness: 0.16,
      emissive: palette.secondary,
      emissiveIntensity: 0.62,
    }),
  );
  heart.position.set(0, 1.02, 0.22);
  heart.rotation.x = Math.PI;
  group.add(heart);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.01, 8, 40),
    new THREE.MeshBasicMaterial({
      color: palette.ally,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.08;
  group.add(halo);

  const glow = makeGlowSprite(palette.ally, 1.25, 0.28);
  glow.position.y = 0.6;
  group.add(glow);

  group.position.set(-2.8 + index * 1.1, 0, 3.1 + index * 0.35);
  group.userData = { name, halo, heart, glow };
  return group;
}

function makePortal(palette) {
  const group = new THREE.Group();
  const glow = makeGlowSprite(palette.portal, 4.1, 0.36);
  glow.position.z = -0.03;
  group.add(glow);

  const outer = new THREE.Mesh(
    new THREE.TorusGeometry(1.68, 0.028, 10, 132),
    new THREE.MeshBasicMaterial({
      color: palette.secondary,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(outer);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, 0.08, 12, 112),
    new THREE.MeshStandardMaterial({
      color: palette.portal,
      emissive: palette.portal,
      emissiveIntensity: 0.88,
      roughness: 0.18,
      metalness: 0.45,
    }),
  );
  const inner = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, 96),
    new THREE.MeshBasicMaterial({
      color: palette.portal,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  group.add(ring, inner);

  const shards = [];
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const shard = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.09 + (i % 2) * 0.035, 0),
      new THREE.MeshStandardMaterial({
        color: i % 2 ? palette.secondary : palette.portal,
        roughness: 0.2,
        metalness: 0.28,
        emissive: palette.portal,
        emissiveIntensity: 0.54,
      }),
    );
    shard.position.set(Math.cos(angle) * 1.67, Math.sin(angle) * 1.67, 0.06);
    shards.push(shard);
    group.add(shard);
  }

  const light = new THREE.PointLight(palette.portal, 2.8, 8.5);
  light.position.set(0, 0.1, 0.6);
  group.add(light);
  group.position.set(0, 1.45, -7.4);
  group.visible = false;
  group.userData = { ring, inner, outer, glow, light, shards };
  return group;
}

function makeGround(palette) {
  const group = new THREE.Group();
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(9.4, 128),
    new THREE.MeshStandardMaterial({
      color: palette.ground,
      roughness: 0.56,
      metalness: 0.12,
      emissive: palette.accent,
      emissiveIntensity: 0.055,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  group.add(ground);

  const outerGlow = new THREE.Mesh(
    new THREE.RingGeometry(7.2, 9.45, 128),
    new THREE.MeshBasicMaterial({
      color: palette.mist,
      transparent: true,
      opacity: 0.13,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  outerGlow.rotation.x = -Math.PI / 2;
  outerGlow.position.y = 0.012;
  group.add(outerGlow);

  [1.9, 3.8, 6.4].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(radius, radius + 0.025, 112),
      new THREE.MeshBasicMaterial({
        color: index === 1 ? palette.secondary : palette.accent,
        transparent: true,
        opacity: 0.18 - index * 0.025,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.018 + index * 0.006;
    group.add(ring);
  });

  return group;
}

function addCity(scene, palette) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color: palette.skyline,
    roughness: 0.62,
    metalness: 0.08,
    emissive: palette.horizon,
    emissiveIntensity: 0.055,
  });
  const windowMaterial = new THREE.MeshBasicMaterial({
    color: palette.particle,
    transparent: true,
    opacity: 0.36,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  for (let i = 0; i < 36; i += 1) {
    const width = 0.62 + (i % 5) * 0.13;
    const depth = 0.58 + ((i * 3) % 5) * 0.12;
    const height = 1.15 + ((i * 7) % 11) * 0.28;
    const angle = (i / 36) * Math.PI * 2;
    const radius = 10.6 + (i % 6) * 0.42;
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material,
    );
    building.position.set(
      Math.cos(angle) * radius,
      height / 2 - 0.02,
      Math.sin(angle) * radius,
    );
    building.rotation.y = -angle;
    group.add(building);

    if (i % 2 === 0) {
      const windows = new THREE.Mesh(
        new THREE.PlaneGeometry(width * 0.65, height * 0.42),
        windowMaterial,
      );
      windows.position.copy(building.position);
      windows.position.y += height * 0.1;
      windows.position.x -= Math.cos(angle) * (width / 2 + 0.006);
      windows.position.z -= Math.sin(angle) * (width / 2 + 0.006);
      windows.rotation.y = -angle + Math.PI / 2;
      group.add(windows);
    }

    if (i % 5 === 0) {
      const antenna = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.46 + (i % 3) * 0.12, 6),
        new THREE.MeshBasicMaterial({
          color: palette.secondary,
          transparent: true,
          opacity: 0.42,
        }),
      );
      antenna.position.copy(building.position);
      antenna.position.y = height + 0.18;
      group.add(antenna);
    }
  }

  scene.add(group);
  return group;
}

function makeParticleLayer({ count, radius, minY, maxY, color, size, opacity, rise, drift }) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * radius;
    positions[i * 3] = Math.cos(angle) * distance;
    positions[i * 3 + 1] = minY + Math.random() * (maxY - minY);
    positions[i * 3 + 2] = Math.sin(angle) * distance;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  points.userData = { minY, maxY, rise, drift };
  return points;
}

function addParticles(scene, palette) {
  const layers = [
    makeParticleLayer({
      count: 460,
      radius: 9.2,
      minY: 0.45,
      maxY: 7.8,
      color: palette.particle,
      size: 0.036,
      opacity: 0.52,
      rise: 0.08,
      drift: 0.035,
    }),
    makeParticleLayer({
      count: 120,
      radius: 8.4,
      minY: 0.7,
      maxY: 5.6,
      color: palette.secondary,
      size: 0.075,
      opacity: 0.24,
      rise: 0.035,
      drift: -0.018,
    }),
  ];

  layers.forEach((points) => {
    scene.add(points);
  });
  return layers;
}

function addGeneratedSkyPanel(scene, texture, palette) {
  const material = new THREE.MeshBasicMaterial({
    color: "#ffffff",
    map: texture,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
  });
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(30, 16.875), material);
  panel.position.set(0, 5.2, -18.6);
  panel.renderOrder = -6;
  scene.add(panel);

  const glow = makeGlowSprite(palette.mist, 10, 0.12);
  glow.position.set(0, 4.2, -17.8);
  glow.renderOrder = -5;
  scene.add(glow);
}

function applyPortalTexture(portal, texture) {
  texture.center.set(0.5, 0.5);
  portal.userData.inner.material.map = texture;
  portal.userData.inner.material.opacity = 0.42;
  portal.userData.inner.material.needsUpdate = true;
}

function addPickupIconSprites(pickups, texture) {
  pickups.forEach((pickup) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.82,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    sprite.position.set(0, 0.03, 0.02);
    sprite.scale.set(0.58, 0.58, 0.58);
    pickup.add(sprite);
    pickup.userData.iconSprite = sprite;
  });
}

function addEnemySigilSprites(enemies, texture) {
  enemies.forEach((enemy) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    sprite.position.set(0, 0, -0.08);
    sprite.scale.set(1.38, 1.38, 1.38);
    enemy.add(sprite);
    enemy.userData.sigilSprite = sprite;
  });
}

export default function HiddenHeartsScene({
  level,
  controls,
  disabled,
  onCollect,
  onDefeat,
  onDamage,
  onReadyForPortal,
  onComplete,
}) {
  const hostRef = useRef(null);
  const controlsRef = useRef(controls);
  const disabledRef = useRef(disabled);
  const callbacksRef = useRef({
    onCollect,
    onDefeat,
    onDamage,
    onReadyForPortal,
    onComplete,
  });

  useEffect(() => {
    controlsRef.current = controls;
  }, [controls]);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  useEffect(() => {
    callbacksRef.current = {
      onCollect,
      onDefeat,
      onDamage,
      onReadyForPortal,
      onComplete,
    };
  }, [onCollect, onDefeat, onDamage, onReadyForPortal, onComplete]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const palette = resolvePalette(level);
    const levelAssets = getLevelGeneratedAssets(level);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);
    const textureLoader = new THREE.TextureLoader();
    const generatedTextures = [];
    let active = true;
    const loadGeneratedTexture = (path, onLoad) => {
      if (!path) return;
      textureLoader.load(
        path,
        (texture) => {
          if (!active) {
            texture.dispose();
            return;
          }
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
          generatedTextures.push(texture);
          onLoad(texture);
        },
        undefined,
        () => undefined,
      );
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(palette.sky);
    scene.fog = new THREE.FogExp2(palette.horizon, palette.fogDensity);
    scene.add(makeSkyDome(palette));

    const camera = new THREE.PerspectiveCamera(
      52,
      host.clientWidth / Math.max(host.clientHeight, 1),
      0.1,
      120,
    );
    camera.position.set(0, 5.7, 8.6);

    const hemi = new THREE.HemisphereLight("#fff8e8", palette.sky, 0.95);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight("#fff4dc", 2.5);
    keyLight.position.set(-4.6, 8.4, 4.6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(palette.secondary, 0.72);
    fillLight.position.set(5.8, 4.2, -5.5);
    scene.add(fillLight);

    const rim = new THREE.PointLight(palette.accent, 4.2, 18);
    rim.position.set(3.8, 3.2, -4.8);
    scene.add(rim);

    const lowGlow = new THREE.PointLight(palette.mist, 0.85, 12);
    lowGlow.position.set(-2.6, 1.1, 3.4);
    scene.add(lowGlow);

    scene.add(makeGround(palette));

    const grid = new THREE.GridHelper(18, 28, palette.accent, palette.horizon);
    grid.material.transparent = true;
    grid.material.opacity = 0.16;
    scene.add(grid);

    addCity(scene, palette);
    const particleLayers = addParticles(scene, palette);
    loadGeneratedTexture(levelAssets.skyPanel, (texture) => {
      addGeneratedSkyPanel(scene, texture, palette);
    });

    const player = makePlayer(palette);
    scene.add(player);

    const pickups = level.pickups.map((label, index) => {
      const pickup = makePickup(label, palette, index, level.pickups.length);
      scene.add(pickup);
      return pickup;
    });

    const enemies = level.enemies.map((name, index) => {
      const enemy = makeEnemy(name, palette, index, level.enemies.length);
      scene.add(enemy);
      return enemy;
    });

    const allies = level.allies.map((name, index) => {
      const ally = makeAlly(name, palette, index);
      scene.add(ally);
      return ally;
    });

    const portal = makePortal(palette);
    scene.add(portal);
    loadGeneratedTexture(generatedAssets.textures.portalRing, (texture) => {
      applyPortalTexture(portal, texture);
    });
    loadGeneratedTexture(generatedAssets.textures.pickupIcon, (texture) => {
      addPickupIconSprites(pickups, texture);
    });
    loadGeneratedTexture(generatedAssets.textures.enemySigil, (texture) => {
      addEnemySigilSprites(enemies, texture);
    });

    const keys = new Set();
    let actionPressed = false;
    let lastAttack = 0;
    let lastDamage = 0;
    let portalReadySent = false;
    let completedSent = false;
    let frame = 0;
    const clock = new THREE.Clock();

    const setKey = (event, pressed) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Space"].includes(
          event.key,
        )
      ) {
        event.preventDefault();
      }
      if (pressed) {
        keys.add(event.key.toLowerCase());
        if (event.code === "Space") actionPressed = true;
      } else {
        keys.delete(event.key.toLowerCase());
        if (event.code === "Space") actionPressed = false;
      }
    };

    const onKeyDown = (event) => setKey(event, true);
    const onKeyUp = (event) => setKey(event, false);
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", resize);

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.035);
      const elapsed = clock.elapsedTime;
      const external = controlsRef.current || {};
      const isDisabled = disabledRef.current;
      const attacking = (actionPressed || external.action) && !isDisabled;

      let moveX = 0;
      let moveZ = 0;
      if (!isDisabled) {
        if (keys.has("a") || keys.has("arrowleft") || external.left) moveX -= 1;
        if (keys.has("d") || keys.has("arrowright") || external.right) moveX += 1;
        if (keys.has("w") || keys.has("arrowup") || external.forward) moveZ -= 1;
        if (keys.has("s") || keys.has("arrowdown") || external.backward) moveZ += 1;
      }

      const length = Math.hypot(moveX, moveZ) || 1;
      moveX /= length;
      moveZ /= length;
      const speed = 3.4;
      player.position.x = clamp(player.position.x + moveX * speed * delta, -7.2, 7.2);
      player.position.z = clamp(player.position.z + moveZ * speed * delta, -7.2, 7.2);
      if (moveX || moveZ) {
        player.rotation.y = Math.atan2(moveX, moveZ);
      }
      player.position.y = Math.sin(elapsed * 4) * 0.035;
      player.userData.aura.rotation.z += delta * 0.9;
      player.userData.auraOuter.rotation.z -= delta * 0.55;
      player.userData.halo.rotation.z += delta * 0.8;
      player.userData.heartCore.rotation.z += delta * 0.9;
      player.userData.aura.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.08);
      player.userData.auraOuter.scale.setScalar(1 + Math.cos(elapsed * 2.1) * 0.06);
      player.userData.aura.material.opacity = 0.38 + Math.sin(elapsed * 5) * 0.1;
      player.userData.glow.material.opacity = 0.23 + Math.sin(elapsed * 2.8) * 0.06;
      player.userData.glow.scale.setScalar(2.04 + Math.sin(elapsed * 2.2) * 0.15);
      player.userData.bodyMaterial.emissiveIntensity =
        player.userData.hurtUntil > elapsed ? 0.72 : 0.12 + Math.sin(elapsed * 2.4) * 0.025;
      player.userData.maskMaterial.emissiveIntensity = attacking ? 0.72 : 0.24;
      player.userData.attackRing.visible =
        attacking || player.userData.attackRing.material.opacity > 0.02;
      if (attacking) {
        player.userData.attackRing.rotation.z -= delta * 4.8;
        player.userData.attackRing.scale.setScalar(0.9 + Math.sin(elapsed * 18) * 0.08);
        player.userData.attackRing.material.opacity = 0.42 + Math.sin(elapsed * 14) * 0.12;
      } else {
        player.userData.attackRing.material.opacity *= 0.86;
      }

      camera.position.x += (player.position.x * 0.34 - camera.position.x) * 0.05;
      camera.position.z += (player.position.z + 8.6 - camera.position.z) * 0.05;
      camera.position.y += (5.4 - camera.position.y) * 0.04;
      camera.lookAt(player.position.x, 0.9, player.position.z - 1.5);

      particleLayers.forEach((particles) => {
        particles.rotation.y += delta * particles.userData.drift;
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += delta * particles.userData.rise * (1 + (i % 7) * 0.025);
          if (positions[i + 1] > particles.userData.maxY) {
            positions[i + 1] = particles.userData.minY;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      });

      pickups.forEach((pickup, index) => {
        if (!pickup.userData.active) return;
        pickup.rotation.y += delta * 1.5;
        pickup.userData.ring.rotation.z += delta * (1.4 + index * 0.2);
        pickup.userData.crystal.rotation.x -= delta * 0.75;
        pickup.userData.crystal.rotation.z += delta * 0.55;
        pickup.userData.glow.material.opacity = 0.28 + Math.sin(elapsed * 3.4 + index) * 0.1;
        pickup.userData.glow.scale.setScalar(1.12 + Math.sin(elapsed * 2.6 + index) * 0.08);
        pickup.position.y =
          pickup.userData.baseY + Math.sin(elapsed * 2.5 + index) * 0.18;
        const distance = pickup.position.distanceTo(player.position);
        if (distance < 0.86) {
          pickup.userData.active = false;
          pickup.visible = false;
          callbacksRef.current.onCollect?.(pickup.userData.label);
        }
      });

      enemies.forEach((enemy, index) => {
        if (!enemy.userData.active) return;
        const orbit = elapsed * (0.28 + index * 0.04) + enemy.userData.seed;
        enemy.position.x += Math.cos(orbit) * delta * 0.38;
        enemy.position.z += Math.sin(orbit * 0.8) * delta * 0.38;
        enemy.position.x = clamp(enemy.position.x, -7.4, 7.4);
        enemy.position.z = clamp(enemy.position.z, -7.4, 7.4);
        enemy.rotation.y += delta * 1.6;
        enemy.userData.ring.rotation.z += delta * (1.1 + index);
        enemy.userData.outerRing.rotation.z -= delta * (0.5 + index * 0.2);
        enemy.userData.shell.rotation.x += delta * 0.42;
        enemy.userData.shell.rotation.y -= delta * 0.36;
        enemy.userData.core.scale.setScalar(1 + Math.sin(elapsed * 5 + index) * 0.06);
        const hitFlash = elapsed - enemy.userData.hitAt < 0.18;
        enemy.userData.coreMaterial.emissiveIntensity = hitFlash ? 1.45 : 0.76;
        enemy.userData.glow.material.opacity =
          (hitFlash ? 0.7 : 0.32) + Math.sin(elapsed * 4 + index) * 0.05;
        enemy.userData.glow.scale.setScalar(hitFlash ? 1.9 : 1.48);

        const distance = enemy.position.distanceTo(player.position);
        if (distance < 1.55 && !isDisabled && elapsed - lastDamage > 1.15) {
          lastDamage = elapsed;
          player.userData.hurtUntil = elapsed + 0.34;
          callbacksRef.current.onDamage?.(7 + index * 3);
        }
        if (distance < 1.85 && attacking && elapsed - lastAttack > 0.34) {
          lastAttack = elapsed;
          enemy.userData.hp -= 1;
          enemy.userData.hitAt = elapsed;
          enemy.scale.multiplyScalar(0.92);
          enemy.userData.ring.material.opacity = Math.max(
            0.18,
            enemy.userData.ring.material.opacity - 0.16,
          );
          if (enemy.userData.hp <= 0) {
            enemy.userData.active = false;
            enemy.visible = false;
            callbacksRef.current.onDefeat?.(enemy.userData.name);
          }
        }
      });

      allies.forEach((ally, index) => {
        ally.rotation.y += delta * 0.36;
        ally.userData.halo.rotation.z += delta * (0.8 + index * 0.25);
        ally.userData.heart.rotation.z -= delta * 0.7;
        ally.userData.glow.material.opacity = 0.24 + Math.sin(elapsed * 2.8 + index) * 0.07;
        ally.userData.glow.scale.setScalar(1.14 + Math.sin(elapsed * 2.2 + index) * 0.06);
        ally.position.y = Math.sin(elapsed * 2 + index) * 0.025;
      });

      const allPickups = pickups.every((pickup) => !pickup.userData.active);
      const allEnemies = enemies.every((enemy) => !enemy.userData.active);
      if (allPickups && allEnemies) {
        portal.visible = true;
        portal.userData.ring.rotation.z += delta * 1.2;
        portal.userData.outer.rotation.z -= delta * 0.72;
        portal.userData.glow.material.opacity = 0.28 + Math.sin(elapsed * 3) * 0.1;
        portal.userData.glow.scale.setScalar(3.85 + Math.sin(elapsed * 2.4) * 0.18);
        portal.userData.light.intensity = 2.5 + Math.sin(elapsed * 4) * 0.55;
        portal.userData.inner.material.opacity = 0.24 + Math.sin(elapsed * 4) * 0.09;
        portal.userData.shards.forEach((shard, index) => {
          shard.rotation.x += delta * (1.1 + index * 0.08);
          shard.rotation.y -= delta * (0.8 + index * 0.05);
          const angle = (index / portal.userData.shards.length) * Math.PI * 2 + elapsed * 0.34;
          shard.position.x = Math.cos(angle) * 1.67;
          shard.position.y = Math.sin(angle) * 1.67;
        });
        if (!portalReadySent) {
          portalReadySent = true;
          callbacksRef.current.onReadyForPortal?.();
        }
        if (
          portal.position.distanceTo(player.position) < 1.75 &&
          !completedSent &&
          !isDisabled
        ) {
          completedSent = true;
          callbacksRef.current.onComplete?.();
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", resize);
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      generatedTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, [level]);

  return <div className="scene-host" ref={hostRef} aria-hidden="true" />;
}
