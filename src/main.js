import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
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
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg"
);

const floorDispTextture = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg"
);

const floorARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg"
);

const floorAlphaTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/alpha.webp"
);

const floorNormalTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg"
);
floorNormalTexture.encoding = THREE.LinearEncoding;

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
    displacementScale: 0.5,
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
  new THREE.MeshStandardMaterial()
);
walls.position.y = 2.5 / 2;
house.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial()
);
roof.position.y = 3.26;
roof.rotateY(Math.PI * 0.25);
house.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial()
);
door.position.z = 2.0001;
door.position.y = 1.1;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

/* 
GRAVES
*/
const graves = new THREE.Group();
scene.add(graves);

const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const gravesMaterial = new THREE.MeshStandardMaterial();

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

// Ambient
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = false;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft ambient light
scene.add(ambientLight);

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();
const loob = () => {
  const elapsedTime = clock.getElapsedTime();

  renderer.render(scene, camera);
  window.requestAnimationFrame(loob);
};
loob();
