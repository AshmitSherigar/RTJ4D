import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const canvasIds = ["canvas", "canvas2", "canvas3"];
  const scenes = [];

  const rendererParams = {
    antialias: true,
    alpha: true,
  };

  const loader = new GLTFLoader();
  const lightIntensity = [2, 3, 3];
  let originalModel;

  // Load GLTF once
  loader.load("atlas.glb", (gltf) => {
    originalModel = gltf.scene;

    // Setup all scenes
    canvasIds.forEach((id, index) => {
      const { scene, camera, renderer, pointLight, controls } = createScene(id, lightIntensity[index]);
      const model = clone(originalModel);
      model.scale.set(1, 1, 1);
      model.position.set(0, -1, 0);
      scene.add(model);

      // GSAP animations
      if (index === 0) {
        model.position.set(0, -1, 0);
        gsap.to(model.position, {
          x: -50,
          scrollTrigger: {
            trigger: ".page1",
            start: "center+=150 top",
            end: "bottom center",
            scrub: 2,
          },
        });
        camera.position.set(4, -2.5, 5);
      }

      if (index === 1) {
        model.position.set(3, -1, 0);
        gsap.from(model.position, {
          x: -5,
          scrollTrigger: {
            trigger: ".page2",
            start: "top center",
            end: "center center",
            scrub: 0.9,
          },
        });
        gsap.from(model.rotation, {
          y: 2,
          scrollTrigger: {
            trigger: ".page2",
            start: "top center",
            end: "center center",
            scrub: 0.9,
          },
        });
        camera.position.set(0, -2.4, 3);
      }

      if (index === 2) {
        camera.position.set(0, -1.5, 8);
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load("warm_restaurant_night_1k.hdr", (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
        });

        // Spin animation
        animate(() => {
          model.rotation.y += 0.005;
        });
      }

      animate(() => {
        controls.update();
        renderer.render(scene, camera);
      });

      scenes.push({ camera, renderer, pointLight });
    });

    setupMouseLighting(scenes);
    setupResize(scenes);
  });

  // ===================== Utilities =====================

  function createScene(canvasId, lightPower = 2) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId), ...rendererParams });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    const pointLight = new THREE.PointLight(0xffffff, lightPower, 10);
    pointLight.position.set(0, 2, 3);

    scene.add(ambientLight, pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = canvasId === "canvas3";
    if (canvasId === "canvas3") {
      controls.minPolarAngle = Math.PI / 2;
      controls.maxPolarAngle = Math.PI / 2;
    }

    return { scene, camera, renderer, pointLight, controls };
  }

  function animate(callback) {
    function loop() {
      requestAnimationFrame(loop);
      callback();
    }
    loop();
  }

  function setupMouseLighting(scenes) {
    let ticking = false;

    window.addEventListener("mousemove", (e) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

        scenes.forEach(({ pointLight }) => {
          gsap.to(pointLight.position, {
            x: mouseX * 5,
            y: mouseY * 5,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        ticking = false;
      });
    });
  }

  function setupResize(scenes) {
    window.addEventListener("resize", () => {
      scenes.forEach(({ camera, renderer }) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    });
  }

  // ================= Marquee Letters Animation =================
  const h1 = document.querySelector(".marquee-container h1");
  const letters = h1.innerText.split("");
  h1.innerHTML = "";
  letters.forEach((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    h1.appendChild(span);
  });
});
