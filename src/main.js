import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableRotate=false;
controls.minDistance = 4.5;
controls.maxDistance = 6;



// Ambient Light (Very Dim)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

// Mouse-Controlled Spotlight
const spotLight = new THREE.SpotLight(0xffffff, 5, 10, Math.PI / 3, 0.3, 1);
spotLight.castShadow = true;
spotLight.position.set(0, 3, 3);
scene.add(spotLight);

// Load Model
const loader = new GLTFLoader();
loader.load("/atlas.glb", (gltf) => {
  const model = gltf.scene;
  model.scale.set(1, 1, 1);
  model.position.set(0, -1, 0);

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(model);
}, undefined, (error) => {
  console.error("Error loading the model:", error);
});

camera.position.set(4, -2.5, 5);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Mouse move event to control spotlight
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -(e.clientY / window.innerHeight) * 2 + 1;

  spotLight.position.set(x * 5, y * 5, 5);
});

// Responsive resizing
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
console.log(controls);


