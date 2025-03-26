import * as THREE from 'three';

const R180 = Math.PI;
const R90 = Math.PI/2;
const R360 = Math.PI*2;
const R270 = Math.PI*1.5;
const R45 = Math.PI/4;

const PolarityOfVectors = function(velocity,normals,objectRotation){
	const velocityRotation = Math.atan2(velocity.x,velocity.z); // Getting velocity rotation
	const finalVelocityRotation = velocityRotation - ((Math.floor(velocityRotation/R360))*R360+R270); // Prepared Velocity Rotation

	const normalRotation = Math.atan2(normals.x*1,normals.z*1);
	const finalRotation = objectRotation + normalRotation + R90;

	const Main = ((finalRotation) - (Math.floor(finalRotation/R360)*R360));

	let diff = (finalVelocityRotation - Main) % (R360);

	if (diff < 0) {
		diff += (R360);
	}

    if (diff > 0 && diff < (R180)) {
        return 1;  // Правее
    } else if (diff > (R180)) {
        return -1; // Левее
    } else {
        return 0;  // Напротив
    }
}

function CheckInRay(Raycaster, Scene, Origin, Direction){
	Raycaster.set(Origin,Direction);
	return Raycaster.intersectObjects(Scene.children, false);
}

function DidCollide(Raycaster, Scene, Origin, Direction){
	Raycaster.set(Origin,Direction);
	return Raycaster.intersectObjects(Scene.children, false).length != 0;
}

export class FPC {
	constructor(scene, x, y, z, speed, camera) {
		this.position = new THREE.Vector3(x, y, z);
		this.rotation = new THREE.Euler(0, 0, 0, "YXZ");
		this.velocity = new THREE.Vector3(0, 0, 0);
		this.raycaster = new THREE.Raycaster();	


		this.speed = speed;
		this.camera = camera;		
		this.scene = scene;
		this.playerRadius = 8;

		this.keys = { w: false, a: false, s: false, d: false };


		this.UpdateMove = this.UpdateMove.bind(this);
		this.SetMove = this.SetMove.bind(this);
		this.ResetMove = this.ResetMove.bind(this);
		this.UpdateRotation = this.UpdateRotation.bind(this);

		addEventListener("mousemove", this.UpdateRotation);
		addEventListener("keydown", this.SetMove);
		addEventListener("keyup", this.ResetMove);
		addEventListener("frameupdated", this.UpdateMove);

		
	}
	UpdateCamera() {
		this.camera.position.copy(this.position);
		this.camera.rotation.copy(this.rotation);
	}

	UpdateRotation(e){
		if (e.movementX || e.movementY){
			const sensitivity = 0.004;
			this.rotation.y -= e.movementX * sensitivity;
			this.rotation.x -= e.movementY * sensitivity;

			const maxPitch = Math.PI / 2 - 0.1;
			const minPitch = -Math.PI / 2 + 0.1;
			this.rotation.x = Math.max(minPitch, Math.min(maxPitch, this.rotation.x));
		}
	}
	
	UpdateMove(e) {
		const moveSpeed = this.speed * e.detail;

		const directionForward = new THREE.Vector3(); // getting the direction forward
		directionForward.x = -Math.sin(this.rotation.y);
		directionForward.z = -Math.cos(this.rotation.y);
		directionForward.normalize();

		const directionLeft = new THREE.Vector3(); // getting direction left
		directionLeft.crossVectors(new THREE.Vector3(0,1,0), directionForward).normalize();

		this.velocity.set(0, 0, 0); // reseting velocity 

		if (this.keys.w) this.velocity.add(directionForward.multiplyScalar(1));
		if (this.keys.s) this.velocity.add(directionForward.multiplyScalar(-1));
		if (this.keys.a) this.velocity.add(directionLeft.multiplyScalar(1));
		if (this.keys.d) this.velocity.add(directionLeft.multiplyScalar(-1));

		this.velocity.normalize();
		 
		this.raycaster.far = this.playerRadius;
		const intersectedObjects = CheckInRay(this.raycaster, this.scene, this.position, this.velocity); // setting up raycaster and checking collisions

		if (intersectedObjects.length != 0){
			const intersection = intersectedObjects[0];

			const normal = new THREE.Vector3().copy(intersection.normal); // Getting normals of collisions
			const objectRotation = intersection.object.rotation.y; // Getting Object rotation
			const normalRotation = Math.atan2(normal.x*1,normal.z*-1); // Getting rotation of normal

			const finalRotation  = objectRotation*-1 + normalRotation + R90; // Finding global angle opposite to the normal(perpendecuraly)
			const directionIntoNormal = new THREE.Vector3(Math.cos(finalRotation),0,Math.sin(finalRotation)).normalize(); // doing Vector3 from rotation
	
			const Katet = CheckInRay(this.raycaster, this.scene, this.position, directionIntoNormal); // Raycast to get distance to wall. // setting up raycaster perpendecuraly into the wall

			if (Katet.length != 0){
				let a = Math.sqrt((intersection.distance ** 2) - (Katet[0].distance ** 2)); // Pifagor Theoremy. Getting "a" by this rule. for speed of moving

				const polarity = PolarityOfVectors(this.velocity, normal, objectRotation); // Getting ther polarity of 2 vectors

				this.velocity.set(Math.cos(finalRotation + R90),0,Math.sin(finalRotation + R90)); // finding the velocity
				this.velocity.normalize();

				if (!DidCollide(this.raycaster, this.scene, this.position, this.velocity)) this.position.add(this.velocity.multiplyScalar(Math.min(a,moveSpeed)*polarity)); // moving player including speed and polarity 
			}
			
		}
		else{
			this.position.add(this.velocity.multiplyScalar(moveSpeed));
		}

		this.UpdateCamera();
		
	}

	SetMove(e) {
		if (e.key == "w"){
			this.keys.w = true;
		}
		if (e.key == "s"){
			this.keys.s = true;
		}
		if (e.key == "a"){
			this.keys.a = true;
		}
		if (e.key == "d"){
			this.keys.d = true;
		}
	};

	ResetMove(e) {
		if (e.key == "w"){
			this.keys.w = false;
		}
		if (e.key == "s"){
			this.keys.s = false;
		}
		if (e.key == "a"){
			this.keys.a = false;
		}
		if (e.key == "d"){
			this.keys.d = false;
		}
	};
}
