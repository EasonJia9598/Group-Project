

var container, stats;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
//
//
// init();
// animate2();

var meshobject;

function init() {
    width = document.getElementById('card2').clientWidth - 20 ;
    height = document.getElementById('card2').clientHeight - 30;

    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('card2').appendChild(renderer.domElement);
    var color = new THREE.Color("rgb(245, 245, 245)");
    renderer.setClearColor(color);

    // container2 = document.createElement( 'canvas-frame' );
    // document.body.appendChild( container2 );

    camera = new THREE.PerspectiveCamera( 45, width / height, 1, 2000 );
    camera.position.z = 350;

    // scene2

    scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    var pointLight = new THREE.PointLight( 0xffffff, 0.8 );


    // create an AudioListener and add it to the camera2
    var listener = new THREE.AudioListener();
    camera.add( listener );

    // create a global audio source
    var sound = new THREE.Audio( listener );

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../sounds/Bonaparte\'s_Retreat.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 0.5 );
        sound.play();
    });


    camera.add( pointLight );
    scene.add( camera );

    // model

    var onProgress = function ( xhr ) {

        if ( xhr.lengthComputable ) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

        }

    };

    var onError = function ( xhr ) { };

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    new THREE.MTLLoader()
        .setPath( '../models/obj/plant/' )
        .load( 'low-poly-mill.mtl', function ( materials ) {

            materials.preload();

            new THREE.OBJLoader()
                .setMaterials( materials )
                .setPath( '../models/obj/plant/' )
                .load( 'low-poly-mill.obj', function ( object ) {

                    object.position.y = - 95;
                    meshobject = object;
                    scene.add( meshobject );

                }, onProgress, onError );

        } );

    // renderer2 = new THREE.WebGLRenderer();
    // renderer2.setPixelRatio( window.devicePixelRatio );
    // renderer2.setSize( width,height );
    // container2.appendChild( renderer2.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    //

    // window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

function onDocumentMouseMove( event ) {

    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;

}

//

function animate() {

    requestAnimationFrame( animate );
    render();

}
var flag = 1;
let SIZE = 50;
var timeGap = SIZE;

function render() {

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    if(meshobject != undefined) {
        meshobject.rotateY(0.01);

        if (meshobject.scale.x <= 1 || meshobject.scale.x > 1.5) {
            if (timeGap > 0) {
                timeGap -= 1;
            } else {
                flag *= -1;
                timeGap = SIZE;
            }
        }

        if (timeGap === SIZE) {

            meshobject.scale.x -= 0.005 * flag;
            meshobject.scale.y -= 0.005 * flag;
            meshobject.scale.z -= 0.005 * flag;
        }
    }

    renderer.render( scene, camera );

}

function start() {
    init();
    animate();
}

