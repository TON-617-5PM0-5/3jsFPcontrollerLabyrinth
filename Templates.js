//******************************************************************
//import * as THREE from 'three';

//Управління камерою
//import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';

//Додавання елементів управління
//import Stats from 'https://unpkg.com/three/examples/jsm/libs/stats.module';
//import { GUI } from 'https://unpkg.com/three/examples/jsm/libs/lil-gui.module.min.js';

//Створення рендеру
/*var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0x000000, 1); //Заливка кольором фону
document.body.appendChild(renderer.domElement);*/

//Створення сцени
//var Scene = new THREE.Scene();

//Створення камери
//var camera = new THREE.PerspectiveCamera(100, WIDTH/HEIGHT, 1, 2000 );
//camera.position.z = 50;
//camera.rotation.z=0.5;
//camera.position.set( 0, 0, 700 );
//camera.lookAt( 0, 0, 0 );
//Scene.add(camera);


//Створення координатних осей
//var axes = new THREE.AxesHelper(150);
//Scene.add(axes);


//Створення стрілки з напрямом (нормалі)
//const dir = new THREE.Vector3( 1, 2, 0 );
//dir.normalize();
//const origin = new THREE.Vector3( 0, 0, 0 ); 
//const length = 30;     //довжина
//const hex = 0xffff00;  //колір
//const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
//Scene.add( arrowHelper );


//Створення площини
//var planeGeometry = new THREE.PlaneGeometry(250, 500, 12, 12);	
//const planeMaterial = new THREE.MeshBasicMaterial({color: 0x99aa99 });

//Заливка текстурою
//const planeTexture = new THREE.TextureLoader().load('images/doska3.jpg');
//planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
//planeTexture.repeat.set( 4, 4 );
//planeMaterial.map = planeTexture;

//var plane = new THREE.Mesh(planeGeometry, planeMaterial);
//Scene.add(plane);
//plane.rotation.x=-1.57;


//Створення кулі
//var SphereGeometry = new THREE.SphereGeometry(100, 100, 100);
//var SphereMaterial = new THREE.MeshBasicMaterial();
//const SphereTexture = new THREE.TextureLoader().load('texture file');
//SphereMaterial.map = SphereTexture;
//var Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
//Scene.add(Sphere);
//Sphere.position.set(0, 0, 0);
//Sphere.rotation.x=0.8;


//Створення паралелепіпеда (коробки)
//var boxGeometry = new THREE.BoxGeometry(20, 20, 20);
//const boxMaterial = new THREE.MeshBasicMaterial();
//const boxTexture = new THREE.TextureLoader().load('texture file');
//boxMaterial.map = boxTexture;

//зафарбовування кожної грані
/*const envTexture = new THREE.CubeTextureLoader().load([
    'texture3.jpg',
    'texture3.jpg',
    'texture3.jpg',
    'texture3.jpg',
    'texture3.jpg',
    'texture3.jpg',
]);
//envTexture.mapping = THREE.CubeReflectionMapping
envTexture.mapping = THREE.CubeRefractionMapping;
boxMaterial.envMap = envTexture;*/


//Створення циліндра
//const cylinderGeometry = new THREE.CylinderGeometry( 1, 5, 500, 36 ); 
//const cylinderMaterial = new THREE.MeshBasicMaterial();
//const cylinderTexture = new THREE.TextureLoader().load('images/machta2.jpg');

/*cylinderTexture.wrapS = cylinderTexture.wrapT = THREE.RepeatWrapping;
cylinderTexture.repeat.set( 2, 10 ); */

//cylinderMaterial.map = cylinderTexture;
//const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
//Scene.add( cylinder );

//Створення тору (бублика)
//var torusGeometry = new THREE.TorusGeometry(7,1,6,12);
//var phongMaterial = new THREE.MeshPhongMaterial({color: 0xff9500});
//var torus = new THREE.Mesh(torusGeometry, phongMaterial);
//Scene.add(torus);

//Створення фігури з 5-кутників
//var dodecahedronGeometry = new THREE.DodecahedronGeometry(7);
//var lambertMaterial = new THREE.MeshLambertMaterial({color: 0xeaeff2});
//var dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial);
//Scene.add(dodecahedron);


//Створення просторової лінії
//const points = [];
//points.push( new THREE.Vector3( - 10, 0, 0 ) );
//points.push( new THREE.Vector3( 0, 10, 0 ) );
//points.push( new THREE.Vector3( 10, 0, 0 ) );
//var geometry = new THREE.BufferGeometry().setFromPoints( points );
//var line = new THREE.Line( geometry, basicMaterial );
//Scene.add( line );



//Створення точкового джерела світла
//const light = new THREE.PointLight( 0xff0000, 1, 100 );
//light.position.set( 50, 50, 50 );
//Scene.add( light );
//light.position.set(-10, 15, 50);


//Створення пучка світла
//const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
//Scene.add( directionalLight );


//Управління камерою з допомогою миші
//const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', render);


//Додавання елементів налаштовування об'єктів'
//const stats = Stats()
//document.body.appendChild(stats.dom)

//const gui = new GUI();	
//const cameraFolder = gui.addFolder('Camera');
//cameraFolder.add(camera.position, 'z', 20, 200);
//cameraFolder.add(camera.position, 'y', 0, 50);
//cameraFolder.add(camera.rotation, 'x', 0, Math.PI * 2);
//cameraFolder.add(camera.rotation, 'y', 0, Math.PI * 2);
//cameraFolder.open();


//var t = 0;
//Функція перемальовування сцени
/*function render() {
	requestAnimationFrame(render);
	//t += 0.005;
	renderer.render(Scene, camera);
}
render();*/


//Автоматичне перемальовування при зміні розмірів вікна
/*window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}*/