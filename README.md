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
