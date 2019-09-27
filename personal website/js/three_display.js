//import WEBGL from "webGL.js";

let scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff);
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff, 0)
let geometry = new THREE.BoxGeometry( 1, 1, 1 );
let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
let cube = new THREE.Mesh( geometry, material );

function createSceneTest(){
    renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 );
    document.getElementById('threejsDisplay').appendChild( renderer.domElement );
    scene.add( cube );
    camera.position.z = 5;
}

if ( WEBGL.isWebGLAvailable() ) {

	animate();

} else {

	var warning = WEBGL.getWebGLErrorMessage();
	document.getElementById( 'warningBox' ).appendChild( warning );

}

function animate() {
	requestAnimationFrame( animate );
    renderer.render( scene, camera );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.x += 5;
}
