# Three.js Journey

hey there I'm Zyad and here's the next chapter of Three.js journey in the last chapter we had 11 lesson together the last one was to go live with our ptoject and we did this with vercel now we will start a new chapter

## Chapter Two

in this chapter we will learn about lights, shadows and much more

## Lights

in this lesson we will learn about lights and the types of them and how to use them first you should have three meshs and a floor under them and all of them should have the standard material and after applying it the scene should be black
now lets start adding lights to our scene

- Ambient light

start by creating a constant to this light and then add it to the scene

```js
const ambient = new THREE.AmbientLight();
scene.add(ambient);
```

the ambient lights add light to every pixel of our mesh and you can control the color and the intensity

```js
const ambient = new THREE.AmbientLight(0xffffff, 3);
```

this way it will be brighter now let's move to the next light

- Directional Light

this light works like sun it has a direction and by defauld the direction is from the top

```js
const directional = new THREE.DirectionalLight(0xff0000, 1);
scene.add(directional);
```

the two parameters are the intensity and the color and don't forget to lower the intensity of the ambient light so you can notice the directional one now lets change the direction of the directional light

```js
directional.position.set(1, 0.25, 0);
```

this will make the light to come from the right, feel free to play around
