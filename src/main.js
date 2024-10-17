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

// create meshs

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshStandardMaterial()
);
// Plane
const map = new THREE.Mesh(
  new THREE.PlaneGeometry(),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  })
);
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
scene.add(sphere, map);

// LIGHTS

// Ambient
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

// Directional
const directional = new THREE.DirectionalLight(0xffffff, 3);
directional.position.x = 4;
directional.position.y = 4;
scene.add(directional);

// Shadows
directional.castShadow = true;
directional.shadow.mapSize.width = 1024;
directional.shadow.mapSize.height = 1024;
directional.shadow.camera.far = 10;
directional.shadow.camera.top = 3;
directional.shadow.camera.top = 3;
directional.shadow.camera.bottom = -3;
directional.shadow.camera.left = -3;

// Camera helper
const directionalLightHelper = new THREE.CameraHelper(
  directional.shadow.camera
);
scene.add(directionalLightHelper);
directionalLightHelper.visible = false;
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

renderer.setSize(sizes.width, sizes.height);

const loob = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loob);
};
loob();
