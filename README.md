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

### Floor

first thing we're gonna do is the floor we will use a plane geometry and MeshStandardMaterial and then we'll rotate it quarter a circle so it is more like a floor

```js
// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial()
);

// Rotate the floor
floor.rotateX(-Math.PI * 0.5);
```

now you should have a floor, feel free to remove the sphere

### House

so now let's create our house first we will create a group then add house compenents to it like walls and roof and door

```js
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
```

and this way we built our house you can change the color of the door so you can see it and all these things we learned before so if you find anything you cant understand you can go back to its lesson

### Graves

we now want to have some graves on the floor to do this we will create a group in this group we will add our graves in a loob and we will adjust thier postion so it be as a circle we will use Math.PI which is half a circle and we will multibly it by 2 so it's a full circle then we will make this circle bigger by using a radius which will be random number from 3 to 4

```js
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
```

### Floor Textures

now we finished adding meshs lets make our meshs look better by applying cool textures, you will find a new folder in our static folder it contains every texture we will need in this lesson so here's what we are gonna do:

1. load the textures using texturesLoader

2. adjust the textures as we need, we'll change the repeating and colorSpace

3. attach the textures to the Floor material

so now lets do this

```js
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
```

and now your floor should look more realistic

### Walls Textures

same as we did with the floor textures we will follow the same steps

```js
/*
 * Wall Textures
 **/

const wallDiffTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg"
);
const wallARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg"
);
const wallNormalTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg"
);

wallDiffTextures.colorSpace = THREE.SRGBColorSpace;
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
```

this way your walls will be more realistic

### Roof Textures

again same as the previous textures we will do the same

```js
const roofDiffTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg"
);
const roofARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg"
);
const roofNormalTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg"
);
roofDiffTextures.colorSpace = THREE.SRGBColorSpace;
roofDiffTextures.repeat.set(3, 1);
roofARMTextures.repeat.set(3, 1);
roofNormalTextures.repeat.set(3, 1);

roofDiffTextures.wrapS = THREE.RepeatWrapping;
roofARMTextures.wrapS = THREE.RepeatWrapping;
roofNormalTextures.wrapS = THREE.RepeatWrapping;
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
```

### Bushes Textures

yes just like the previous ones

```js
/**
 * BUSHES TEXTURES
 */
const bushesDiffTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg"
);
const bushesARMTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg"
);
const bushesNormalTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/bush/leaves_forest_ground_1k/leaves_forest_nor_gl_diff_1k.jpg"
);
bushesDiffTexture.colorSpace = THREE.SRGBColorSpace;
bushesDiffTexture.repeat.set(2, 1);
bushesARMTexture.repeat.set(2, 1);
bushesNormalTexture.repeat.set(2, 1);

bushesDiffTexture.wrapS = THREE.RepeatWrapping;
bushesARMTexture.wrapS = THREE.RepeatWrapping;
bushesNormalTexture.wrapS = THREE.RepeatWrapping;
const bushMaterial = new THREE.MeshStandardMaterial({
  map: bushesDiffTexture,
  aoMap: bushesARMTexture,
  roughnessMap: bushesARMTexture,
  metalnessMap: bushesARMTexture,
  normalMap: bushesNormalTexture,
  color: "#ccffcc",
});
```

### Graves Textures

```js
const gravesDiffTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg"
);
const gravesARMTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg"
);
const gravesNormalTextures = textureLoader.load(
  "./textures/16-haunted-house-resources/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg"
);
gravesDiffTextures.colorSpace = THREE.SRGBColorSpace;
gravesDiffTextures.repeat.set(0.3, 0.4);
gravesARMTextures.repeat.set(0.3, 0.4);
gravesNormalTextures.repeat.set(0.3, 0.4);
const gravesMaterial = new THREE.MeshStandardMaterial({
  map: gravesDiffTextures,
  aoMap: gravesARMTextures,
  metalnessMap: gravesARMTextures,
  roughnessMap: gravesARMTextures,
  normalMap: gravesNormalTextures,
});
```

### door textures

don't worry we are almost there this is the last texture

```js
/**
 * DOOR TEXTURES
 */
const doorDiffTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/color.jpg"
);
const doornormalTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/normal.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/roughness.jpg"
);
const doorHeightTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/height.jpg"
);
const doorMetalnessTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/metalness.jpg"
);
const doorAlphaTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/alpha.jpg"
);
const doorAoTexture = textureLoader.load(
  "./textures/16-haunted-house-resources/door/ambientOcclusion.jpg"
);
doorDiffTexture.colorSpace = THREE.SRGBColorSpace;
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial({
    map: doorDiffTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAoTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    displacementMap: doorHeightTexture,
    normalMap: doornormalTexture,
    displacementScale: 0.5,
    displacementBias: 0.04,
  })
);
```

voi la this was the last texture, take a break and come back

### LIGHTS

we already have an ambient light and a directional light now we gotta change thier color to something that looks like a moon light and we will add another light to light the front of our house

```js
/**
 * LIGHTS
 */

const pointLight = new THREE.PointLight("#ff7d46", 3);
pointLight.position.set(0, 2, 2.5);
house.add(pointLight);

const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(5, 10, -7.5);
directionalLight.castShadow = false;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight("#86cdff", 0.275); // Soft ambient light
scene.add(ambientLight);
```

### Ghosts

now we want to add some ghosts that walk on a circle we will not use real ghosts model instead we will use lights

```js
// Ghosts
const ghost1 = new THREE.PointLight("red", 9);
ghost1.position.set(0, 0.3, 0);

const ghost2 = new THREE.PointLight("blue", 9);
ghost2.position.set(0, 0.3, 0);

const ghost3 = new THREE.PointLight("yellow", 9);
ghost2.position.set(0, 0.3, 0);
scene.add(ghost1, ghost2, ghost3);
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
```

this will add lights that moves everywhere like a ghost

### Shadows

to make our scene look more realistic we will enable shadows

```js
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
```
