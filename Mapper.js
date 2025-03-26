import * as THREE from 'three';

export class Wall {
    constructor(Scene, Coords1, Coords2, Material){
        this.Coords1 = Coords1;
        this.Coords2 = Coords2;

        this.Object = new THREE.Mesh(new THREE.BoxGeometry( (Math.abs(Coords1.x - Coords2.x)+ 1) * 100, 200, (Math.abs(Coords1.z - Coords2.z) + 1) * 100), Material );
        this.Object.position.set( (((Coords1.x + Coords2.x) / 2) * 100)-1000, 100, (((Coords1.z + Coords2.z) / 2) * 100 )-1000); 
        Scene.add(this.Object);
    }
}

export class Mapper {
    constructor(maps, scene, WallTexture) {
        this.map = maps.slice();
        this.scene = scene;
        this.WallTexture = WallTexture;

        this.processMap();
    }
    processMap(){
        for (let j = 0; j < this.map.length; j++) {
            let mapLength = this.map[j].length;
            let location = {x: 0,z: 0};
            let streak = 0;
            for (let i = 0; i < mapLength; i++){
                if((streak >= 2) && !this.map[i][j]){
                    streak = 0;
                    for(let b = location.x; b < i+1; b++){
                        this.map[b][j]=0;
                    }
                    let wall = new Wall(this.scene, location, {x:i-1,z:j}, this.WallTexture);
                }

                else if(((streak >= 2) && (i == mapLength-1) && this.map[i][j])){
                    streak = 0;
                    for(let b = location.x; b < i+1; b++){
                        this.map[b][j]=0;
                    }
                    let wall = new Wall(this.scene, location, {x:i,z:j}, this.WallTexture);
                }
                else if (this.map[i][j]){
                    if (!streak) {
                        location.x = i;
                        location.z = j;
                    }
                    streak++;
                }
                else{
                    streak = 0;
                }
            }
        }
        for (let i = 0; i < this.map.length; i++) {
            let mapLength = this.map[i].length;
            let location = {x: 0,z: 0};
            let streak = 0;
            for (let j = 0; j < mapLength; j++){
                
                if((streak && !this.map[i][j])){
                    streak = 0;
                    let wall = new Wall(this.scene, location, {x:i,z:j-1}, this.WallTexture);
                }
                else if((streak && (j == mapLength-1) && this.map[i][j])){
                    streak = 0;

                    let wall = new Wall(this.scene, location, {x:i,z:j}, this.WallTexture);
                }
                else if (this.map[i][j]){
                    if (!streak) {
                        location.x = i;
                        location.z = j;
                    }
                    streak++;
                }
            }
        }
    }
}