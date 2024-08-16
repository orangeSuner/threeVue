<template>
  <div class="box"></div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
  import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'

  defineOptions({
    name: 'home',
  })

  onMounted(()=> {
    // 搭建3D环境
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 2000)
    camera.position.set(100, 100, 100)
    camera.lookAt(0, 0, 0)
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 开启抗锯齿
    })

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 10)
    scene.add(ambientLight)

    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 20)
    scene.add(directionalLight)

    // 添加聚光灯
    const spotLight = new THREE.SpotLight(0xff3344, 10)
    spotLight.position.set(200, 200, 200)
    spotLight.target.position.set(10, 0, 10)
    scene.add(spotLight)
    scene.add(spotLight.target)

    // 添加辅助轴
    // const axesHelper = new THREE.AxesHelper(500)
    // scene.add(axesHelper)

    // 创建相机控制器
    const controls = new OrbitControls(camera, renderer.domElement)

    // 加载GLTF模型(压缩过的模型)
    // const dracoLoader = new DRACOLoader()
    // dracoLoader.setDecoderPath('/draco/')
    // dracoLoader.setDecoderConfig({ type: 'js' })
    // gltfLoader.setDRACOLoader(dracoLoader)

    let obj = null
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('/gltf/crane-manipulator/scene.gltf', (model)=> {
      console.log(model)
      obj = model.scene
      obj.position.set(10, 0, 10)
      obj.traverse((m)=> {
        if(m.isMesh) {
          console.log(m)
        }
      })
      obj.scale.set(50, 50, 50)
      scene.add(obj)
      // console.log(scene.children)
    })

    // 渲染器设置
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('.box').appendChild(renderer.domElement)

    // 创建后处理对象EffectComposer，WebGL渲染器作为参数
    const composer = new EffectComposer(renderer)
    // 创建渲染器通道，场景和相机作为参数
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass, scene, camera)
    // 创建OutlinePass通道 OutlinePass第一个参数v2的尺寸和canvas画布保持一致
    const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight)
    const outlinePass = new OutlinePass(v2, scene, camera)
    // 高亮描边发光强度
    outlinePass.edgeStrength = 4
    // 高亮发光描边厚度
    outlinePass.edgeThickness = 2
    // 闪烁频率 默认不闪烁0
    outlinePass.pulsePeriod = 3
    // 高亮描边发光颜色
    outlinePass.visibleEdgeColor.set(0x0b7e27)

    // 点击选中模型并高亮轮廓
    renderer.domElement.addEventListener('click', (e)=> {
      let px = e.offsetX
      let py = e.offsetY
      // 屏幕坐标转换为标准设备坐标
      let x = (px / window.innerWidth) * 2 - 1
      let y = -(py / window.innerHeight) * 2 + 1
      // 创建射线发射器
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera)
      const selectedObjs = raycaster.intersectObjects([...obj.children])
      if(selectedObjs.length > 0) {
        console.log(selectedObjs[0].object)
        // 后期处理-高亮轮廓
        // 高亮描边 射线选中的mesh对象
        outlinePass.selectedObjects = [selectedObjs[0].object]

        // 把设置好的outlinePass通道 添加到后期处理器composer当中
        composer.addPass(outlinePass)
      }
    })

    // 渲染函数
    const render = ()=> {
      controls.update()
      // 有了后期处理器的render就不用再调用渲染的render
      // renderer.render(scene, camera)
      composer.render()
      requestAnimationFrame(render)
    }
    // 启动渲染函数
    render()
  })
    



</script>

<style lang="scss" scoped>
  .box{
    width: 100%;
    height: 100%;
  }
</style>