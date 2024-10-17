# Three.js Journey

hey there I'm Zyad and here's the next chapter of Three.js journey in the last chapter we had 11 lesson together the last one was to go live with our ptoject and we did this with vercel now we will start a new chapter

## Chapter Two

in this chapter we will learn about lights, shadows and much more

## Shadows

in this lesson we'll learn how shadows work first you should have a plane as ground and a sphere and ambient light and a directional light so go ahead and do this then come back

### Activate Shadows

we'll need to activate the shadow map on the renderer so go ahead and paste this line of code after creating your renderer

```js
renderer.shadowMap.enabled = true;
```

now we want to go through each mesh and decide if the mesh can cast or receive a shadow since we only have two meshs it will be like this

```js
sphere.castShadow = true;
map.receiveShadow = true;
```

now finally we need to activate cast shadow property on one of these lights

1. PointLight
2. DirectionalLight
3. SpotLight

since we only have the directional light we can do it that way

```js
directional.castShadow = true;
```

### Shadow map optimisations

you'll notice that the shadow isn't smooth we can fix this issue with shadow map optimisations we need to update the width and the height of our directional light shadow map this will fix the quality issue

```js
directional.shadow.mapSize.width = 1024;
directional.shadow.mapSize.height = 1024;
```

you will notice that our shadow now is more realistic

### Near and far

your directional light uses a camera to see the object it's gonna light this camera have a near and fat properties and we can access them through our light this step wont do much to our shadows but it will prevent any bug first we need to add the camera helper to our scene

```js
const directionalLightHelper = new THREE.CameraHelper(
  directional.shadow.camera
);
scene.add(directionalLightHelper);
```

you will notice that the near is good but the far one is too far so we need to update it

```js
directional.shadow.camera.far = 10;
```

this way we will avoid any bugs

### Amplitude

now we can update the camera amplitude cause as you can see it's so huge

```js
directional.shadow.camera.top = 3;
directional.shadow.camera.top = 3;
directional.shadow.camera.bottom = -3;
directional.shadow.camera.left = -3;
```

now we no longer need the camera helper

```js
directionalLightHelper.visible = false;
```

### Blur

we can control the blur using the radius property

```js
directional.shadow.radius = 10;
```

### Shadow map algorithm

there are different types of algroithms that the renderer uses to render the shadows each one of them differ in performance and quality

1. THREE.BasicShadowMap: Very performant but lousy quality

2. THREE.PCFShadowMap: Less performant but smoother edges

3. THREE.PCFSoftShadowMap: Less performant but even softer edges

4. THREE.VSMShadowMap: Less performant, more constraints, can have unexpected results

we will try one of them

```js
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
```

you will notice that our blur is gone thats because the blur only works with THREE.PCFShadowMap so you gotta dicide what you want

### SpotLight

let's add a spot light and a camera helper for it and let it make shadows

```js
const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);
// Spot light helper
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);
```

as we did with the directional light we will change the mapSize of the spotlight

```js
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
```

we will also change the far of the spotlight shadow camera

```js
spotLight.shadow.camera.far = 10;
```

now we can hide the helper as we did before

```js
spotLightCameraHelper.visible = false;
```

### PointLight

as we did with the directional and the spot light we will do the same with the pointLight

```js
const pointLight = new THREE.PointLight(0xffffff, 3);
pointLight.castShadow = true;
pointLight.position.set(1, 1, 0);
scene.add(pointLight);

// Helper
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);
```

then we can edit our properties

```js
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;
```

now we can hide the helper

```js
pointLightCameraHelper.visible = false;
```
