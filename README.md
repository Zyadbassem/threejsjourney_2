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

this will make the light to come from the right, feel free to play around, now let's move to the next light

- Hemisphere Light

this light is just light the ambient light but it has to colors one comes from top and the other one comes from bottom

```js
const hemisphere = new THREE.HemisphereLight(0xff0000, 0x0000ff, 1);
scene.add(hemisphere);
```

comment the other lights so you can notice this one and let's move to the next color

- Point Light

this light works like a flash light and has tow parameters just like the ambient light

```js
const point = new THREE.PointLight(0x00ff00, 2);
scene.add(point);
pointLight.position.set(1, -0.5, 1);
```

we have two more parameters we can use distance which controls the distance which the intensity will lower after we pass it

```js
const point = new THREE.PointLight(0x00ff00, 2, 0.5);
```

and the next one is the decay, the lower the decay, the faster the light will decay.

```js
const point = new THREE.PointLight(0x00ff00, 2, 0, 0.5);
```

now let's move to the next light

- RectAreaLight

this light is like the directional light but its in the shape of rectangle

```js
const rectArea = new THREE.RectAreaLight(0xff0000, 5, 4, 4);
```

the last 2 parameters is the width and height of the rectangle
