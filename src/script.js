import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import helvetikerText from "three/examples/fonts/helvetiker_regular.typeface.json";
import mapcapImg from "../static/textures/matcaps/8.png";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
//texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(mapcapImg);

//textGeomery
const fontLoader = new FontLoader();
const font = fontLoader.parse(helvetikerText);
const textGeometry = new TextGeometry("Hello World", {
  font: font,
  size: 3,
  height: 1,
  curveSegments: 10,
  bevelEnabled: true,
  bevelThickness: 0.5,
  bevelSize: 0.1,
  bevelSegments: 10,
});
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: texture });
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textGeometry.center();
scene.add(textMesh);

//圆环
for (let i = 0; i < 500; i++) {
  const tourgeomery = new THREE.TorusGeometry(1, 0.6, 16, 100);
  // const material = new THREE.MeshMatcapMaterial({ map: texture });
  const material = new THREE.MeshMatcapMaterial({ matcap: texture });
  const cube = new THREE.Mesh(tourgeomery, material);
  const random = Math.random();
  cube.position.set(
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50,
    (Math.random() - 0.5) * 50
  );
  cube.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  cube.scale.set(random, random, random);
  scene.add(cube);
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 16);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
