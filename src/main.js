import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // First Scene (canvas1)
  const scene1 = new THREE.Scene();
  const camera1 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer1 = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
    alpha: true,
  });
  renderer1.setSize(window.innerWidth, window.innerHeight);
  renderer1.shadowMap.enabled = true;

  const controls1 = new OrbitControls(camera1, renderer1.domElement);
  controls1.enableDamping = true;
  controls1.enableRotate = false;

  const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.3);
  scene1.add(ambientLight1);

  const pointLight1 = new THREE.PointLight(0xffffff, 2, 10);
  pointLight1.position.set(0, 2, 3);
  scene1.add(pointLight1);

  let model1;
  const loader = new GLTFLoader();
  loader.load("atlas.glb", (gltf) => {
    model1 = gltf.scene;
    model1.scale.set(1, 1, 1);
    model1.position.set(0, -1, 0);
    scene1.add(model1);

    gsap.to(model1.position, {
      x: -50,
      scrollTrigger: {
        trigger: ".page1",
        start: "center+=150 top",
        end: "bottom center",
        scrub: 2,
      },
    });
  });

  camera1.position.set(4, -2.5, 5);

  function animate1() {
    requestAnimationFrame(animate1);
    controls1.update();
    renderer1.render(scene1, camera1);
  }
  animate1();

  // Second Scene (canvas2)
  const scene2 = new THREE.Scene();
  const camera2 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer2 = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas2"),
    antialias: true,
    alpha: true,
  });
  renderer2.setSize(window.innerWidth, window.innerHeight);
  renderer2.shadowMap.enabled = true;

  const controls2 = new OrbitControls(camera2, renderer2.domElement);
  controls2.enableDamping = true;
  controls2.enableRotate = false;

  const ambientLight2 = new THREE.AmbientLight(0xffffff, 2);
  scene2.add(ambientLight2);

  const pointLight2 = new THREE.PointLight(0xffffff, 3, 10);
  pointLight2.position.set(0, 2, 3);
  scene2.add(pointLight2);

  let model2;
  loader.load("atlas.glb", (gltf) => {
    model2 = gltf.scene;
    model2.scale.set(1, 1, 1);
    model2.position.set(3, -1, 0);

    scene2.add(model2);

    gsap.from(model2.position, {
      x: -5,
      scrollTrigger: {
        trigger: ".page2",
        start: "top center",
        end: "center center",
        scrub: 0.9,
      },
    });

    gsap.from(model2.rotation, {
      y: 2,
      scrollTrigger: {
        trigger: ".page2",
        start: "top center",
        end: "center center",
        scrub: 0.9,
      },
    });
  });

  camera2.position.set(0, -2.4, 3);

  function animate2() {
    requestAnimationFrame(animate2);
    controls2.update();
    renderer2.render(scene2, camera2);
  }
  animate2();

  // Third Scene (canvas3) with HDRI
  const scene3 = new THREE.Scene();
  const camera3 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer3 = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas3"),
    antialias: true,
    alpha: true,
  });
  renderer3.setSize(window.innerWidth, window.innerHeight);
  renderer3.shadowMap.enabled = true;

  const controls3 = new OrbitControls(camera3, renderer3.domElement);
  controls3.enableDamping = true;
  controls3.dampingFactor = 0.05;
  controls3.enableRotate = true;
  controls3.enableZoom = false;
  controls3.enablePan = false;
  controls3.minPolarAngle = Math.PI / 2;
  controls3.maxPolarAngle = Math.PI / 2;

  // Load HDRI as environment map
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load("warm_restaurant_night_1k.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene3.environment = texture;
  });

  // Add a point light
  const pointLight3 = new THREE.PointLight(0xfffff0, 3, 10);
  pointLight3.position.set(0, 2, 3);
  scene3.add(pointLight3);

  let model3;
  loader.load("atlas.glb", (gltf) => {
    model3 = gltf.scene;
    model3.scale.set(1, 1, 1);
    model3.position.set(0, -1, 0);
    scene3.add(model3);

    // Start animation only after model3 is loaded
    animate3();
  });

  camera3.position.set(0, -1.5, 8);

  function animate3() {
    requestAnimationFrame(animate3);

    if (model3) {
      // Ensure model3 is loaded before modifying it
      model3.rotation.y += 0.005;
    }

    controls3.update();
    renderer3.render(scene3, camera3);
  }

  // Mouse move event for all scenes
  window.addEventListener("mousemove", (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    console.log("Mouse Move:", mouseX, mouseY); // Debugging log

    if (pointLight1 && pointLight2 && pointLight3) {
      gsap.to(pointLight1.position, {
        x: mouseX * 5,
        y: mouseY * 5,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(pointLight2.position, {
        x: mouseX * 5,
        y: mouseY * 5,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(pointLight3.position, {
        x: mouseX * 5,
        y: mouseY * 5,
        duration: 0.2,
        ease: "power2.out",
      });

      console.log("Light Positions:", {
        pointLight1: pointLight1.position,
        pointLight2: pointLight2.position,
        pointLight3: pointLight3.position,
      });
    }
  });

  // Resize event for all scenes
  window.addEventListener("resize", () => {
    renderer1.setSize(window.innerWidth, window.innerHeight);
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();

    renderer2.setSize(window.innerWidth, window.innerHeight);
    camera2.aspect = window.innerWidth / window.innerHeight;
    camera2.updateProjectionMatrix();

    renderer3.setSize(window.innerWidth, window.innerHeight);
    camera3.aspect = window.innerWidth / window.innerHeight;
    camera3.updateProjectionMatrix();
  });
  // gsap.registerPlugin(ScrollTrigger);

  const h1 = document.querySelector('.marquee-container h1');
  const words = h1.innerText.split(""); // Split into words
  h1.innerHTML = ""; 

  
  words.forEach((word) => {
      const span = document.createElement("span");
      span.innerText = word;
      h1.appendChild(span);
      console.log(span);
      
  });
});
