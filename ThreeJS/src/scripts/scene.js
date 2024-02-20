// import * as THREE from 'three';
// import { VRButton } from 'three/examples/jsm/webxr/VRButton';
// const scene = new THREE.Scene();
// scene.background = new THREE.Color('skyblue');
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
// const renderer = new THREE.WebGLRenderer();

// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.xr.enabled = true;
// renderer.xr.setReferenceSpaceType('viewer');
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.PlaneGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x0ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // Add a directional light to the scene
// // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// // directionalLight.position.set(1, 1, 1).normalize();
// // scene.add(directionalLight);


// camera.position.z = 4;
// const vrButton = VRButton.createButton(renderer);
// document.body.appendChild(vrButton);
// vrButton.addEventListener('click', () => {
//     camera.position.z = 4;
// })
// animate();
// function animate() {
//     // requestAnimationFrame(animate);
//     cube.position.z = 5;
//     renderer.setAnimationLoop(animate);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     // cube.add(camera);
//     renderer.render(scene, camera);
// }
// window.addEventListener('resize', onWindowResize);

// function onWindowResize() {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize(window.innerWidth, window.innerHeight);

// }
import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

// Create a box geometry
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.x = 0;
cube.position.y = 2;
scene.add(cube);

// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Add VR button
document.body.appendChild(VRButton.createButton(renderer));

// Handle window resize events
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Create a render loop
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();