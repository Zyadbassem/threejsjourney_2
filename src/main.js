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

// Square
const square = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial()
);

// Cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(),
  new THREE.MeshStandardMaterial()
);

// Torus
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(),
  new THREE.MeshStandardMaterial()
);

// Plane
const map = new THREE.Mesh(
  new THREE.PlaneGeometry(),
  new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
  })
);

// Update the meshs

// Make the torus smaller
torus.scale.set(0.5, 0.5, 0.5);

// rotate the plane so it's fixed
map.rotation.x = -Math.PI * 0.5;
map.scale.x = 10;
map.scale.y = 10;

// update the position of the meshs
square.position.set(-2, 1, 0);
torus.position.set(2, 1, 0);
cone.position.set(0, 1, 0);

// Adding them to the scene
scene.add(square, torus, map, cone);

// LIGHTS

// // Ambient
// const ambient = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambient);

// // Directional
// const directional = new THREE.DirectionalLight(0x0000ff, 10);
// scene.add(directional);
// directional.position.set(1, 0.25, 0);

// Hemisphere
// const rectArea = new THREE.RectAreaLight(0xff0000, 5, 4, 4);
// scene.add(rectArea);
const spotLight = new THREE.SpotLight(
  0x78ff00,
  4.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
spotLight.position.set(8, 5, 4);
spotLight.lookAt(torus.position);
scene.add(spotLight);
scene.add(spotLight.target);

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

renderer.setSize(sizes.width, sizes.height);

const loob = () => {
  torus.rotation.z += 0.01;
  torus.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loob);
};
loob();
