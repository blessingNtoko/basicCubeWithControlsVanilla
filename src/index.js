// import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
let scene, camera, renderer, objects3D, light, raycaster, cameraCenter, mouse, boxGeometry;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    light = new THREE.DirectionalLight(0xffffff, 1);
    raycaster = new THREE.Raycaster();
    cameraCenter = new THREE.Vector3();
    mouse = new THREE.Vector2();
    boxGeometry = new THREE.BoxGeometry();

    renderer.setClearColor('#555');
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(10, 20, 90);
    light.position.set(-1, 2, 4);
    scene.add(light);

    cameraCenter.x = camera.position.x;
    cameraCenter.y = camera.position.y;

    objects3D = [];

    setInterval(() => {
        objects3D.push(makeInstance(boxGeometry, '#' + Math.floor(Math.random() * 16777215).toString(16), false, [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), Math.floor(Math.random() * 50)]))
    }, 1000);

    objects3D.forEach(obj => console.log('3D Object :: ', obj));

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }, false);

    requestAnimationFrame(animate);
}

function updateCamera() {
    camera.position.x = cameraCenter.x + (window.innerWidth * mouse.x);
    camera.position.y = cameraCenter.y + (window.innerHeight * mouse.y);
}

function makeInstance(geometry, color, wireframe, coords) {
    const [x, y, z] = coords;
    const material = new THREE.MeshPhongMaterial({
        color,
        wireframe
    });
    const objToAdd = new THREE.Mesh(geometry, material);
    scene.add(objToAdd);

    objToAdd.position.x = x;
    objToAdd.position.y = y;
    objToAdd.position.z = z;

    return objToAdd;
}

function animate() {
    objects3D.forEach(obj => obj.rotation.x += .01);

    updateCamera();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();