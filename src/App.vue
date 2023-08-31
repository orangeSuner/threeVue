<script setup>
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const render = new THREE.WebGLRenderer()

camera.position.set(20, 20, 100)
scene.add(camera)

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5)
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: '#ff6800',
  transparent: true,
  opacity: 0.5
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.set(20,20,20)
scene.add(cube)

const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

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
