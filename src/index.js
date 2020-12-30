import Vue from 'vue'
import App from './App.vue'
import './index.css'
import * as THREE from './three.module.js'
import { OrbitControls } from './OrbitControls.js'


window.THREE = THREE,
window.spotLight,
window.render;

Vue.config.productionTip = false


let renderer, scene, camera;

let spotLight, lightHelper, shadowCameraHelper;

function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  renderer.shadowMap.enabled = true;

  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 160, 40, 10 );

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.addEventListener( 'change', render );
  controls.minDistance = 20;
  controls.maxDistance = 500;
  controls.enablePan = false;

  const ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
  scene.add( ambient );

  spotLight = new THREE.SpotLight( 0xffffff, 1 );
  window.spotLight = spotLight;
  spotLight.position.set( 15, 40, 35 );
  spotLight.angle = Math.PI / 4;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 200;

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;
  spotLight.shadow.camera.near = 10;
  spotLight.shadow.camera.far = 200;
  spotLight.shadow.focus = 1;
  scene.add( spotLight );

  lightHelper = new THREE.SpotLightHelper( spotLight );
  scene.add( lightHelper );

  shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
  scene.add( shadowCameraHelper );

  //

  let material = new THREE.MeshPhongMaterial( { color: 0x808080, dithering: true } );

  let geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );

  let mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( 0, - 1, 0 );
  mesh.rotation.x = - Math.PI * 0.5;
  mesh.receiveShadow = true;
  scene.add( mesh );

  //

  material = new THREE.MeshPhongMaterial( { color: 0x4080ff, dithering: true } );

  geometry = new THREE.CylinderBufferGeometry( 5, 5, 2, 32, 1, false );

  mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( 0, 5, 0 );
  mesh.castShadow = true;
  scene.add( mesh );

  render();

  window.addEventListener( 'resize', onResize, false );

}

function onResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function render() {
  lightHelper.update();

  shadowCameraHelper.update();

  renderer.render( scene, camera );

}
window.render = render;
init();

render();



new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
