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
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

// create meshs

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshStandardMaterial()
);
// Plane
const map = new THREE.Mesh(
  new THREE.PlaneGeometry(),
  new THREE.MeshBasicMaterial({})
);
const shadowPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 3),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    side: THREE.DoubleSide,
    alphaMap: simpleShadow,
  })
);

shadowPlane.rotation.x = -Math.PI * 0.5;
shadowPlane.position.y = map.position.y + 0.02;
sphere.castShadow = true;
map.receiveShadow = true;

// Update the meshs

// rotate the plane so it's fixed
map.rotation.x = -Math.PI * 0.5;
map.scale.x = 10;
map.scale.y = 10;

// update the position of the meshs
sphere.position.set(0, 1, 0);

// Adding them to the scene
scene.add(sphere, map, shadowPlane);

// LIGHTS

// Ambient
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

// Directional
const directional = new THREE.DirectionalLight(0xffffff, 2);
directional.position.x = 4;
directional.position.y = 4;
directional.position.z = 4;
scene.add(directional);

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.setZ(4);
camera.position.setY(0.5);
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
  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5;
  sphere.position.z = Math.sin(elapsedTime) * 1.5;
  sphere.position.y = 1 + Math.abs(Math.sin(elapsedTime * 3));

  // Update the shadow
  shadowPlane.position.x = sphere.position.x;
  shadowPlane.position.z = sphere.position.z;
  shadowPlane.material.opacity = 1 - sphere.position.y * 0.3;

  renderer.render(scene, camera);
  window.requestAnimationFrame(loob);
};
loob();
