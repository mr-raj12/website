"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const Model_2 = ({ onLoad }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.classList.add("canvas-style-1")
    mountRef.current.appendChild(renderer.domElement)

    camera.position.set(0, 0.3, 1)

    const ambientLight = new THREE.AmbientLight(0x404040, 50)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5).normalize()
    scene.add(directionalLight)

    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")
    loader.setDRACOLoader(dracoLoader)

    let mixer
    loader.load(
      "/BIT-v1.glb",
      (gltf) => {
        scene.add(gltf.scene)
        mixer = new THREE.AnimationMixer(gltf.scene)
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play()
        })
        onLoad && onLoad()
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error)
      }
    )

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.enableZoom = false
    controls.minPolarAngle = Math.PI / 3
    controls.maxPolarAngle = Math.PI / 2 - 0.1

    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const delta = clock.getDelta()
      if (mixer) mixer.update(delta)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={mountRef}></div>
}

export default Model_2
