# Three.js Journey

hey there I'm Zyad and here's the next chapter of Three.js journey in the last chapter we had 11 lesson together the last one was to go live with our ptoject and we did this with vercel now we will start a new chapter

## Chapter Two

in this chapter we will learn about lights, shadows and much more

## Hunted house

in this lesson we're gonna practice what we learned til now by building a hunted house with graves around it

### Set up

your js file should look like this

```js
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

// create meshs

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshStandardMaterial()
);

// Adding them to the scene
scene.add(sphere);

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
camera.position.setZ(5);
camera.position.setY(3);
camera.position.setX(2);
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
```

now let's start our lesson
