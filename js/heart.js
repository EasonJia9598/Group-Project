

var renderer;
var stats;
var flag = 1;
let SIZE = 50;
var timeGap = SIZE;
let scale_small = 0.5;
let scale_midle = 2.1;
let scale_large = 3.0;
var bottom_size = scale_small;
var top_size = scale_midle;
var mid_size = scale_midle;
var index = 0;
var stage = 0;
var times = 1;
function initThree() {
    width = document.getElementById('canvas-frame').clientWidth ;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    var color = new THREE.Color("rgb(245,245,245)");
    renderer.setClearColor(color);

    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.left = '0px';
    // stats.domElement.style.top = '0px';
    // document.getElementById('canvas-frame').appendChild(stats.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 300;
    camera.position.y = 300;
    camera.position.z = 900;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 0;
    camera.lookAt({
        x : 100,
        y : 0,
        z : 0
    });
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    // light = new THREE.AmbientLight(0x00bfff);
    // light.position.set(100, 100, 200);
    // scene2.add(light);
    var ambientLight = new THREE.AmbientLight( 0x00bfff, 0.4 );
    scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );

}

var cube;
var boxMesh,objMesh = undefined;
var pivot = undefined;
var material;
var mesh2;

function initObject() {
    console.log(`B`);

    var manager = new THREE.LoadingManager();

    var loader = new THREE.OBJLoader(manager);
    loader.load('../models/obj/heart.obj', function (object) {
        objMesh = object;
        objMesh.position = new THREE.Vector3(0, 0, 0);

        pivot = new THREE.Group();
        box = new THREE.Box3().setFromObject(objMesh);

        pivot.add(objMesh);

        box.center(objMesh.position);

        objMesh.position.multiplyScalar(-1);

        scene.add(pivot);
        box.center(pivot.position);

    });



    var geometry = new THREE.RingGeometry( 250, 300, 89 );

    var material = new THREE.MeshBasicMaterial( { color: 0x00baff, side: THREE.DoubleSide ,opacity: 0, transparent: true, depthWrite: false} );
    var mesh = new THREE.Mesh( geometry, material );
    mesh2 = mesh;

    mesh.position.x += 160;
    mesh.position.y += 180;

    scene.add( mesh2 );

}

function initGrid(){
    var helper = new THREE.GridHelper( 1000, 50 );
    helper.setColors( 0x0000ff, 0x808080 );
    scene.add( helper );
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    // initGrid();
    initObject();
    animation();

}

// 帧循环、游戏循环
function animation()
{

    console.log(`A`);

    //mesh.rotation.y +=0.01;
    // boxMesh.rotateY(0.01);
    if(pivot != undefined){
        pivot.rotateY(0.02 );
        console.log(bottom_size);
            if (pivot.scale.x <= bottom_size || pivot.scale.x >= top_size) { // heart
                if (timeGap > 0) {
                    timeGap -= 1;
                } else {
                    flag *= -1;
                    timeGap = SIZE;
                    if (stage === 2) index+=1;
                    // window.alert(index);
                }
            } else if (pivot.scale.x >= mid_size && pivot.scale.x < top_size) { // ring
                mesh2.material.opacity -= 0.01 * flag;
            }

        if(stage === 2){
            if ((index %2 - 1) === 0 && index <= 2 * times + 4){
                document.getElementById('audio2').play();
            }
            if (index >= 2 * times + 6){
                flag = 0;
            }else if(index >= 2 * times + 5){
                document.getElementById('audio').play();
            }
        }else{
             document.getElementById('audio3').play();
        }


        if (timeGap === SIZE){
            pivot.scale.x  -= 0.015 * flag;
            pivot.scale.y  -= 0.015 * flag;
            pivot.scale.z  -= 0.015 * flag;
        }
    }


    renderer.render(scene, camera);
    requestAnimationFrame(animation);

}

function motion_change_small_middle() {
    bottom_size = scale_small;
    top_size = scale_midle;
    mid_size = scale_midle;
    mesh2.material.opacity = 0;

}
function motion_change_small_large() {
    top_size = scale_large;
    bottom_size = scale_small;
    mid_size = scale_midle;
    stage = 2;

}

function select_change(){
    var e = document.getElementById("times");
    times = e.options[e.selectedIndex].value;
    // window.alert(times);

}

function start_again(){
    index = -1;
    flag = -1;

}
