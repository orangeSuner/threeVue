<script setup>
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const render = new THREE.WebGLRenderer()

camera.position.set(1, 1, 1)
scene.add(camera)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: '#ff6800'})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

render.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(render.domElement)
render.render(scene, camera)

</script>

<template>
  <div></div>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
html, body {
  width: 100vw;
  height: 100vh;
}
</style>
