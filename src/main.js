import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Sky } from "three/addons/objects/Sky.js";
// Get the canvas
const canvas = document.querySelector(".webgl");

// Create a scene
const scene = new THREE.Scene();

// Get sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Load Textures
const textureLoader = new THREE.TextureLoader();
/**
 * FLOOR TEXTURES
 */
const floorDiffTextture = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
);

const floorDispTextture = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
);

const floorARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
);

const floorAlphaTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/alpha.webp"
);

const floorNormalTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
);

floorDiffTextture.repeat.set(8, 8);
floorARMTextures.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDispTextture.repeat.set(8, 8);

floorDiffTextture.wrapS = THREE.RepeatWrapping;
floorARMTextures.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDispTextture.wrapS = THREE.RepeatWrapping;

floorDiffTextture.wrapT = THREE.RepeatWrapping;
floorARMTextures.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDispTextture.wrapT = THREE.RepeatWrapping;

floorDiffTextture.colorSpace = THREE.SRGBColorSpace;

/*
 * Wall Textures
 **/

const wallDiffTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp"
);
const wallARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp"
);
const wallNormalTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp"
);

wallDiffTextures.colorSpace = THREE.SRGBColorSpace;

/**
 * ROOF TEXTURES
 */
const roofDiffTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp"
);
const roofARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp"
);
const roofNormalTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp"
);
roofDiffTextures.colorSpace = THREE.SRGBColorSpace;
roofDiffTextures.repeat.set(3, 1);
roofARMTextures.repeat.set(3, 1);
roofNormalTextures.repeat.set(3, 1);

roofDiffTextures.wrapS = THREE.RepeatWrapping;
roofARMTextures.wrapS = THREE.RepeatWrapping;
roofNormalTextures.wrapS = THREE.RepeatWrapping;

/**
 * BUSHES TEXTURES
 */
const bushesDiffTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp"
);
const bushesARMTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp"
);
const bushesNormalTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/bush/leaves_forest_ground_1k/leaves_forest_nor_gl_diff_1k.webp"
);
bushesDiffTexture.colorSpace = THREE.SRGBColorSpace;
bushesDiffTexture.repeat.set(2, 1);
bushesARMTexture.repeat.set(2, 1);
bushesNormalTexture.repeat.set(2, 1);

bushesDiffTexture.wrapS = THREE.RepeatWrapping;
bushesARMTexture.wrapS = THREE.RepeatWrapping;
bushesNormalTexture.wrapS = THREE.RepeatWrapping;

/**
 * DOOR TEXTURES
 */
const doorDiffTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/color.webp"
);
const doornormalTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/normal.webp"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/roughness.webp"
);
const doorHeightTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/height.webp"
);
const doorMetalnessTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/metalness.webp"
);
const doorAlphaTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/alpha.webp"
);
const doorAoTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/ambientOcclusion.webp"
);
doorDiffTexture.colorSpace = THREE.SRGBColorSpace;
/**
 * GRAVES TEXTURES
 */
const gravesDiffTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
);
const gravesARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
);
const gravesNormalTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
);
gravesDiffTextures.colorSpace = THREE.SRGBColorSpace;
gravesDiffTextures.repeat.set(0.3, 0.4);
gravesARMTextures.repeat.set(0.3, 0.4);
gravesNormalTextures.repeat.set(0.3, 0.4);
// create meshs

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorDiffTextture,
    aoMap: floorARMTextures,
    roughnessMap: floorARMTextures,
    metalnessMap: floorARMTextures,
    normalMap: floorNormalTexture,
    displacementMap: floorDispTextture,
    displacementScale: 0.2,
  })
);
scene.add(floor);

// Rotate the floor
floor.rotateX(-Math.PI * 0.5);

/**
 * House
 */

// House Group
const house = new THREE.Group();
scene.add(house);

// walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallDiffTextures,
    roughnessMap: wallARMTextures,
    aoMap: wallARMTextures,
    metalnessMap: wallARMTextures,
    normalMap: wallNormalTextures,
  })
);
walls.position.y = 2.5 / 2;
house.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofDiffTextures,
    metalnessMap: roofARMTextures,
    roughnessMap: roofARMTextures,
    aoMap: roofARMTextures,
    normalMap: roofNormalTextures,
  })
);
roof.position.y = 3.26;
roof.rotateY(Math.PI * 0.25);
house.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorDiffTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAoTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    displacementMap: doorHeightTexture,
    normalMap: doornormalTexture,
    displacementScale: 0.1,
    displacementBias: -0.04,
  })
);
door.position.z = 2.01;
door.position.y = 1.1;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushesDiffTexture,
  aoMap: bushesARMTexture,
  roughnessMap: bushesARMTexture,
  metalnessMap: bushesARMTexture,
  normalMap: bushesNormalTexture,
  color: "#ccffcc",
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.2, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.2, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.2, 2.6);

house.add(bush1, bush2, bush3, bush4);

/* 
GRAVES
*/
const graves = new THREE.Group();
scene.add(graves);

const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const gravesMaterial = new THREE.MeshStandardMaterial({
  map: gravesDiffTextures,
  aoMap: gravesARMTextures,
  metalnessMap: gravesARMTextures,
  roughnessMap: gravesARMTextures,
  normalMap: gravesNormalTextures,
});

for (let i = 0; i < 40; i++) {
  const grave = new THREE.Mesh(gravesGeometry, gravesMaterial);
  graves.add(grave);

  const angle = Math.PI * 2 * Math.random();
  grave.position.x = Math.sin(angle) * (3 + Math.random() * 5);
  grave.position.z = Math.cos(angle) * (3 + Math.random() * 5);
  grave.position.y = Math.random() * 0.4;
  grave.rotateX((Math.random() - 0.5) * 0.4);
  grave.rotateZ((Math.random() - 0.5) * 0.4);
  grave.rotateY((Math.random() - 0.5) * 0.4);
}

/**
 * LIGHTS
 */

const pointLight = new THREE.PointLight("#ff7d46", 3);
pointLight.position.set(0, 2, 2.5);
house.add(pointLight);

const directionalLight = new THREE.DirectionalLight("#86cdff", 2);
directionalLight.position.set(6, 5, -6);
directionalLight.castShadow = false;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight("#86cdff", 0.275); // Soft ambient light
scene.add(ambientLight);

// Ghosts
const ghost1 = new THREE.PointLight("red", 9);
ghost1.position.set(0, 0.3, 0);

const ghost2 = new THREE.PointLight("blue", 9);
ghost2.position.set(0, 0.3, 0);

const ghost3 = new THREE.PointLight("yellow", 9);
ghost2.position.set(0, 0.3, 0);
scene.add(ghost1, ghost2, ghost3);

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.setZ(5);
camera.position.setY(3);
camera.position.setX(4);
scene.add(camera);

//Controls
const controls = new OrbitControls(camera, canvas);

// Update after resizing
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

/*
 ** Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;
for (const grave of graves.children) {
  grave.castShadow = true;
}

// mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

// shadows
ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

// fog
scene.fog = new THREE.FogExp2("#04343f", 0);
/*
 * SKY
 **/
const sky = new Sky();
scene.add(sky);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);
sky.scale.set(100, 100, 100);

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();
const loob = () => {
  const elapsedTime = clock.getElapsedTime();

  // ghosts
  const angle = elapsedTime * 0.7;

  ghost1.position.x = 5 * Math.sin(angle);
  ghost1.position.z = 5 * Math.cos(angle);
  ghost1.position.y = Math.sin(angle);

  ghost2.position.x = 3 * Math.sin(angle * 5);
  ghost2.position.z = 3 * Math.cos(angle) * Math.sin(angle * 2.38);
  ghost2.position.y = Math.sin(angle);

  ghost3.position.x = 7 * Math.sin(angle * 2);
  ghost3.position.z = 7 * Math.cos(angle) * Math.sin(angle * 2.38);
  ghost3.position.y = Math.sin(angle);
  renderer.render(scene, camera);
  window.requestAnimationFrame(loob);
};
loob();
