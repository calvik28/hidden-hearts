import { useEffect, useRef } from "react";
import * as THREE from "three";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

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
  return wing;
}

function makePlayer(level) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.33, 0.92, 8, 20),
    new THREE.MeshStandardMaterial({
      color: "#f7f0dd",
      roughness: 0.44,
      metalness: 0.08,
      emissive: level.accent,
      emissiveIntensity: 0.08,
    }),
  );
  body.castShadow = true;
  body.position.y = 0.86;
  group.add(body);

  const mask = new THREE.Mesh(
    new THREE.SphereGeometry(0.27, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
    new THREE.MeshStandardMaterial({
      color: level.accent,
      roughness: 0.25,
      metalness: 0.28,
      emissive: level.accent,
      emissiveIntensity: 0.18,
    }),
  );
  mask.position.set(0, 1.55, 0.05);
  group.add(mask);

  const wingMaterial = new THREE.MeshStandardMaterial({
    color: "#fff4d8",
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    roughness: 0.38,
    emissive: level.accent,
    emissiveIntensity: 0.12,
  });
  group.add(makeWing(wingMaterial, -1));
  group.add(makeWing(wingMaterial, 1));

  const aura = new THREE.Mesh(
    new THREE.TorusGeometry(0.86, 0.018, 8, 64),
    new THREE.MeshBasicMaterial({
      color: level.accent,
      transparent: true,
      opacity: 0.52,
    }),
  );
  aura.rotation.x = Math.PI / 2;
  aura.position.y = 0.08;
  group.add(aura);
  group.userData.aura = aura;
  return group;
}

function makePickup(label, level, index, total) {
  const group = new THREE.Group();
  const radius = 4.2;
  const angle = (index / total) * Math.PI * 2 + 0.55;
  const mesh = new THREE.Mesh(
    heartGeometry(0.22, 0.12),
    new THREE.MeshStandardMaterial({
      color: level.accent,
      roughness: 0.18,
      metalness: 0.25,
      emissive: level.accent,
      emissiveIntensity: 0.78,
    }),
  );
  mesh.castShadow = true;
  mesh.rotation.x = Math.PI;
  group.add(mesh);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.46, 0.012, 8, 56),
    new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.45,
    }),
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  group.position.set(Math.cos(angle) * radius, 0.72, Math.sin(angle) * radius);
  group.userData = {
    label,
    baseY: group.position.y,
    active: true,
    type: "pickup",
  };
  return group;
}

function makeEnemy(name, level, index, total) {
  const group = new THREE.Group();
  const radius = 6.2;
  const angle = (index / total) * Math.PI * 2 + 2.1;
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.42, 2),
    new THREE.MeshStandardMaterial({
      color: "#120b16",
      roughness: 0.3,
      metalness: 0.35,
      emissive: index % 2 ? "#5d1337" : "#1b1a52",
      emissiveIntensity: 0.72,
    }),
  );
  core.castShadow = true;
  group.add(core);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.026, 8, 80),
    new THREE.MeshBasicMaterial({
      color: index % 2 ? "#ff3d6e" : level.accent,
      transparent: true,
      opacity: 0.72,
    }),
  );
  ring.rotation.x = Math.PI / 2.4;
  group.add(ring);

  group.position.set(Math.cos(angle) * radius, 0.78, Math.sin(angle) * radius);
  group.userData = {
    name,
    hp: 3,
    active: true,
    seed: index + 1,
    type: "enemy",
    ring,
    core,
  };
  return group;
}

function makeAlly(name, level, index) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.22, 0.58, 6, 14),
    new THREE.MeshStandardMaterial({
      color: index % 2 ? "#d8fbff" : "#ffeac2",
      roughness: 0.42,
      emissive: level.accent,
      emissiveIntensity: 0.12,
    }),
  );
  body.position.y = 0.58;
  group.add(body);

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.01, 8, 40),
    new THREE.MeshBasicMaterial({
      color: level.accent,
      transparent: true,
      opacity: 0.4,
    }),
  );
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.08;
  group.add(halo);

  group.position.set(-2.8 + index * 1.1, 0, 3.1 + index * 0.35);
  group.userData = { name, halo };
  return group;
}

function makePortal(level) {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.35, 0.08, 12, 112),
    new THREE.MeshStandardMaterial({
      color: level.accent,
      emissive: level.accent,
      emissiveIntensity: 0.88,
      roughness: 0.18,
      metalness: 0.45,
    }),
  );
  const inner = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, 96),
    new THREE.MeshBasicMaterial({
      color: level.accent,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    }),
  );
  ring.rotation.y = Math.PI / 2;
  inner.rotation.y = Math.PI / 2;
  group.add(ring, inner);
  group.position.set(0, 1.45, -7.4);
  group.visible = false;
  group.userData = { ring, inner };
  return group;
}

function addCity(scene, level) {
  const material = new THREE.MeshStandardMaterial({
    color: "#121827",
    roughness: 0.62,
    metalness: 0.08,
    emissive: level.accent,
    emissiveIntensity: 0.03,
  });
  const windowMaterial = new THREE.MeshBasicMaterial({
    color: level.accent,
    transparent: true,
    opacity: 0.42,
  });

  for (let i = 0; i < 28; i += 1) {
    const width = 0.7 + (i % 4) * 0.16;
    const height = 1.3 + ((i * 7) % 9) * 0.32;
    const angle = (i / 28) * Math.PI * 2;
    const radius = 10.8 + (i % 5) * 0.35;
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, width),
      material,
    );
    building.position.set(
      Math.cos(angle) * radius,
      height / 2 - 0.02,
      Math.sin(angle) * radius,
    );
    building.rotation.y = -angle;
    scene.add(building);

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
      scene.add(windows);
    }
  }
}

function addParticles(scene, level) {
  const count = 420;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = 0.6 + Math.random() * 7.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      color: level.accent,
      size: 0.035,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
    }),
  );
  scene.add(points);
  return points;
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

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(level.sky);
    scene.fog = new THREE.FogExp2(level.sky, 0.05);

    const camera = new THREE.PerspectiveCamera(
      52,
      host.clientWidth / Math.max(host.clientHeight, 1),
      0.1,
      120,
    );
    camera.position.set(0, 5.7, 8.6);

    const hemi = new THREE.HemisphereLight("#fcf4e6", level.sky, 1.3);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight("#ffffff", 2.4);
    keyLight.position.set(-4, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    scene.add(keyLight);

    const rim = new THREE.PointLight(level.accent, 3.8, 18);
    rim.position.set(3.8, 3.2, -4);
    scene.add(rim);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(9.4, 128),
      new THREE.MeshStandardMaterial({
        color: level.ground,
        roughness: 0.6,
        metalness: 0.12,
        emissive: level.accent,
        emissiveIntensity: 0.035,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(18, 28, level.accent, "#455067");
    grid.material.transparent = true;
    grid.material.opacity = 0.18;
    scene.add(grid);

    addCity(scene, level);
    const particles = addParticles(scene, level);

    const player = makePlayer(level);
    scene.add(player);

    const pickups = level.pickups.map((label, index) => {
      const pickup = makePickup(label, level, index, level.pickups.length);
      scene.add(pickup);
      return pickup;
    });

    const enemies = level.enemies.map((name, index) => {
      const enemy = makeEnemy(name, level, index, level.enemies.length);
      scene.add(enemy);
      return enemy;
    });

    const allies = level.allies.map((name, index) => {
      const ally = makeAlly(name, level, index);
      scene.add(ally);
      return ally;
    });

    const portal = makePortal(level);
    scene.add(portal);

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
      player.userData.aura.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.08);
      player.userData.aura.material.opacity = 0.38 + Math.sin(elapsed * 5) * 0.1;

      camera.position.x += (player.position.x * 0.34 - camera.position.x) * 0.05;
      camera.position.z += (player.position.z + 8.6 - camera.position.z) * 0.05;
      camera.position.y += (5.4 - camera.position.y) * 0.04;
      camera.lookAt(player.position.x, 0.9, player.position.z - 1.5);

      particles.rotation.y += delta * 0.035;
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += delta * (0.07 + (i % 5) * 0.01);
        if (positions[i] > 8.2) positions[i] = 0.4;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      pickups.forEach((pickup, index) => {
        if (!pickup.userData.active) return;
        pickup.rotation.y += delta * 1.5;
        pickup.position.y =
          pickup.userData.baseY + Math.sin(elapsed * 2.5 + index) * 0.18;
        const distance = pickup.position.distanceTo(player.position);
        if (distance < 0.86) {
          pickup.userData.active = false;
          pickup.visible = false;
          callbacksRef.current.onCollect?.(pickup.userData.label);
        }
      });

      const attacking = actionPressed || external.action;
      enemies.forEach((enemy, index) => {
        if (!enemy.userData.active) return;
        const orbit = elapsed * (0.28 + index * 0.04) + enemy.userData.seed;
        enemy.position.x += Math.cos(orbit) * delta * 0.38;
        enemy.position.z += Math.sin(orbit * 0.8) * delta * 0.38;
        enemy.position.x = clamp(enemy.position.x, -7.4, 7.4);
        enemy.position.z = clamp(enemy.position.z, -7.4, 7.4);
        enemy.rotation.y += delta * 1.6;
        enemy.userData.ring.rotation.z += delta * (1.1 + index);
        enemy.userData.core.scale.setScalar(1 + Math.sin(elapsed * 5 + index) * 0.06);

        const distance = enemy.position.distanceTo(player.position);
        if (distance < 1.55 && !isDisabled && elapsed - lastDamage > 1.15) {
          lastDamage = elapsed;
          callbacksRef.current.onDamage?.(7 + index * 3);
        }
        if (distance < 1.85 && attacking && elapsed - lastAttack > 0.34) {
          lastAttack = elapsed;
          enemy.userData.hp -= 1;
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
        ally.position.y = Math.sin(elapsed * 2 + index) * 0.025;
      });

      const allPickups = pickups.every((pickup) => !pickup.userData.active);
      const allEnemies = enemies.every((enemy) => !enemy.userData.active);
      if (allPickups && allEnemies) {
        portal.visible = true;
        portal.userData.ring.rotation.x += delta * 0.9;
        portal.userData.ring.rotation.z += delta * 1.2;
        portal.userData.inner.material.opacity = 0.22 + Math.sin(elapsed * 4) * 0.08;
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
      renderer.dispose();
    };
  }, [level]);

  return <div className="scene-host" ref={hostRef} aria-hidden="true" />;
}
