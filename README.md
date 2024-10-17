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
