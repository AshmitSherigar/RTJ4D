# ATLAS: The Titan Who Carried the Heavens

 A scroll-based, interactive 3D web experience built using **Three.js**, **GSAP**, and **GLTF models**, visualizing the burden and mythology of Atlas.

---

## Project Overview

This project is a rich visual tribute to the Greek Titan **Atlas**, who was condemned to carry the heavens on his shoulders. It combines cinematic visuals, 3D model animations, atmospheric lighting, HDR environments, and scroll-triggered effects to create a storytelling experience across multiple full-screen pages.

Each section (`.page1`, `.page2`, `.page3`, `.page4`) introduces a new 3D scene or concept, layered with canvas renderers and scroll animations.

---

## Tech Stack

| Tool / Library    | Purpose                                         |
|-------------------|-------------------------------------------------|
| [Three.js](https://threejs.org/)       | 3D rendering, GLTF loading, OrbitControls |
| [GSAP](https://greensock.com/gsap/)            | Scroll-triggered animation               |
| [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/) | Scroll-based 3D transitions             |
| [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) | Loads `.glb` model of Atlas             |
| [RGBELoader](https://threejs.org/docs/#examples/en/loaders/RGBELoader) | Loads `.hdr` environments (HDRI)        |
| HTML + CSS        | Structure and styling (with custom fonts, hover interactions, animations) |

---

##  Features

- **Three Interactive 3D Scenes**
  - Each rendered in its own `<canvas>` layer
  - Loaded from the same `atlas.glb` model file
  - Independent lighting, camera, and animation logic

- **Scroll-Based Animation**
  - Uses `GSAP + ScrollTrigger` to animate model position and rotation as you scroll
  - Scene 1: Moves model left off-screen
  - Scene 2: Model enters from left and rotates
  - Scene 3: Model rotates continuously in HDR environment

- **Mouse-Driven Lighting**
  - Point lights in all 3 scenes move dynamically with mouse cursor

- **HDRI Background**
  - Scene 3 uses an environment map (`warm_restaurant_night_1k.hdr`) for realistic reflection and lighting

- **Animated Marquee Text**
  - Final page has auto-scrolling text and character-wise `span` hover effects

- **Custom Fonts & Styling**
  - Uses multiple Google Fonts to enhance mood and feel
  - Blur + hover + selection effects, animated SVG stroke fill, and more

---

## Setup Instructions

### 1. Clone or Download the Repository

```bash
git clone https://github.com/AshmitSherigar/RTJ4D.git
cd RTJ4D
npm install
npm run dev