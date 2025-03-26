import * as THREE from 'three';
import { FPC } from './FPC.js';
import { Mapper } from './Mapper.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.174.0/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,1],
    [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1,1,0,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,0,1,1,1,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,0,1,0,1,1,0,1,0,1,0,1,1,1,0,1,0,0,1],
    [1,1,1,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,1,0,0,1],
    [1,0,1,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,1,1,1,0,1,1,1,1,0,0,1],
    [1,1,1,1,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,0,1],
    [1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

const WallTxr = new THREE.MeshBasicMaterial();
const boxTexture = new THREE.TextureLoader().load('public/Barel3.jpg');
WallTxr.map = boxTexture;

const clock = new THREE.Clock();

// ---------- 3js Scene,render,Camera Setting,FPC
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xaaddff, 1); //Заливка кольором фону
document.body.appendChild(renderer.domElement);

var container = document.getElementById( 'container' );
var stats = new Stats();
container.appendChild( stats.dom );

var camera = new THREE.PerspectiveCamera(100, WIDTH/HEIGHT, 1, 4000 );
camera.position.set(100, 450, 700);
camera.lookAt(0,0,0);
scene.add(camera);

const FPC_Player = new FPC(scene,70,60,70,150,camera);

// ------------ Map creating

var planeGeometry = new THREE.PlaneGeometry(2000, 2000, 12, 12);	
const planeMaterial = new THREE.MeshBasicMaterial();
var planeTexture  = new THREE.TextureLoader().load('public/grass.jpg');
planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
planeTexture.repeat.set( 4, 4 );
planeMaterial.map = planeTexture;
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x=-1.57;

new Mapper(maze, scene, WallTxr);

// ------------ Main Loop

function paint(){
	const deltatime = clock.getDelta();
    
	requestAnimationFrame(paint);

	renderer.render(scene, camera);
	stats.update();

	dispatchEvent( new CustomEvent("frameupdated", {bubbles: true, detail: deltatime}));
}

window.addEventListener('resize',() => onWindowResize(), false);
function onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

			paint();
		}
paint();

/*var block = new THREE.Mesh(new THREE.BoxGeometry(400,200,400), WallTxr );
block.position.set(2000,100,1000); 
block.rotation.set(0,Math.PI/4,0); 
scene.add(block);

var block1 = new THREE.Mesh(new THREE.BoxGeometry(400,200,400), WallTxr );
block1.position.set(2000,100,500); 
scene.add(block1);

var block2 = new THREE.Mesh(new THREE.BoxGeometry(400,200,400), WallTxr );
block2.position.set(2000,100,0); 
block2.rotation.set(0,Math.PI/2,0);
scene.add(block2);*/


//const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', paint);
