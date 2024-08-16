<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  antialias: true // 抗锯齿
})

camera.position.set(0, 100, 300)
camera.lookAt(0, 0, 0)
scene.add(camera)

const cubeGeometry = new THREE.BoxGeometry(5, 5, 5)
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: '#ff6800',
  transparent: true,
  wireframe: false,
  opacity: 0.5
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
cube.position.set(20,20,20)
// scene.add(cube)

const axesHelper = new THREE.AxesHelper(400)
scene.add(axesHelper)

const controls = new OrbitControls(camera, renderer.domElement)

const ambientLight = new THREE.AmbientLight({ // 环境光
  color: 0xffffff,
  intensity: 0.5 // 光线强度
})
scene.add(ambientLight)

// GUI controls
const gui = new GUI()
const lightFolder = gui.addFolder('环境光')
lightFolder.add(ambientLight, 'intensity', 0, 1).name('环境光强度').step(0.1).onChange((value)=>{
  console.log(value)
})

// 显示框架
const wireframeFolder = gui.addFolder('显示框架').close()
wireframeFolder.add(cubeMaterial, 'wireframe').onChange((value)=>{
  console.log(value)
})

// 创建纹理加载器并创建纹理对象
const loaderSP = new THREE.TextureLoader()
const textureSP = loaderSP.load('/src/assets/image/sp.jpg')

// 矩形平面
const planeGeometry = new THREE.PlaneGeometry(100, 100)
const planeMaterial = new THREE.MeshLambertMaterial({
  // color: '#ff6800',
  map: textureSP,
  side: THREE.DoubleSide,
})
const spMesh = new THREE.Mesh(planeGeometry, planeMaterial)
spMesh.position.set(50, 50, 0)
spMesh.rotateY(-Math.PI / 4)
scene.add(spMesh)

// gridHelper 网格地面辅助对象
const gridHelper = new THREE.GridHelper(500,50,0x00ffff,0x999999)
gridHelper.position.y = 1
scene.add(gridHelper)

// zz贴图
const zzLoader = new THREE.TextureLoader()
const zzTexture = zzLoader.load('/src/assets/image/sp.jpg')

// zz 球体
const zzSphere = new THREE.SphereGeometry(50)
const zzMeterial = new THREE.MeshLambertMaterial({
  map: zzTexture
})
const zzMesh = new THREE.Mesh(zzSphere, zzMeterial)
zzMesh.position.set(-100, 50, 0)
zzMesh.rotation.set(0, -Math.PI/8, -Math.PI/8)
scene.add(zzMesh)

// resize
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

function render() {
  controls.update()
  // zzMesh.rotation.y += 0.005
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

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
